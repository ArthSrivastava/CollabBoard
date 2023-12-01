package com.example.collabboard.service;

import com.example.collabboard.dto.*;
import com.example.collabboard.dto.event.Event;
import com.example.collabboard.exception.ItemNotFoundException;
import com.example.collabboard.exception.UnexpectedItemVersionException;
import com.example.collabboard.mapper.ItemMapper;
import com.example.collabboard.model.Item;
import com.example.collabboard.repository.ItemRepository;
import com.mongodb.client.model.changestream.OperationType;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.mongodb.core.ChangeStreamOptions;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final ModelMapper modelMapper;
    private final ReactiveMongoTemplate reactiveMongoTemplate;
   private final ItemMapper itemMapper;

    //Change Stream Events MongoDB
   public Flux<Event> listenToEvents(String boardId) {
       Criteria boardIdCriteria = Criteria.where("boardId").is(boardId);
       ChangeStreamOptions changeStreamOptions = ChangeStreamOptions.builder()
               .returnFullDocumentOnUpdate()
               .filter(Aggregation.newAggregation(
                       Aggregation.match(Criteria.where("operationType")
                               .in(OperationType.INSERT.getValue(),
                                       OperationType.REPLACE.getValue(),
                                       OperationType.UPDATE.getValue(),
                                       OperationType.DELETE.getValue())

                       ),
                       Aggregation.match(boardIdCriteria)
               )).build();
       return reactiveMongoTemplate.changeStream("item", changeStreamOptions, Item.class)
               .map(itemMapper::toEvent);
   }

    public Mono<ItemResource> createItemResource(String userId, String boardId, NewItemResource newItemResource) {
        Item item = modelMapper.map(newItemResource, Item.class);
        item.setUserId(userId);
        item.setBoardId(boardId);
        return itemRepository.save(item).flatMap(
                savedItem -> {
                    ItemResource itemResource = modelMapper.map(savedItem, ItemResource.class);
                    return Mono.just(itemResource);
                }
        );
    }

    public Flux<ItemResource> getAllItems(String boardId) {
        return itemRepository.findAllByBoardId(boardId)
                .flatMap(item -> Flux.just(modelMapper.map(item, ItemResource.class)));
    }

    public Mono<Item> getItemById(String id, Long expectedVersion) {
        return itemRepository.findById(id)
                .switchIfEmpty(Mono.error(new ItemNotFoundException(id)))
                .handle((item,sink) -> {
                    if (expectedVersion != null && !expectedVersion.equals(item.getVersion())) {
                        sink.error(new UnexpectedItemVersionException(expectedVersion, item.getVersion()));
                    } else {
                        sink.next(item);
                    }
                });
    }

    //update full resource
    public Mono<ItemResource> updateItem(String id, Long expectedVersion, ItemUpdateResource itemUpdateResource) {
        return getItemById(id, expectedVersion)
                .flatMap(item -> {
                    item.setDescription(itemUpdateResource.getDescription());
                    item.setStatus(itemUpdateResource.getStatus());
                    return itemRepository.save(item);
                }).map(item -> modelMapper.map(item, ItemResource.class));
    }

    public Mono<ItemResource> patch(String id, Long expectedVersion, ItemPatchResource itemPatchResource) {

        System.out.println("expectedVERSION:" + expectedVersion);
        return getItemById(id, expectedVersion)
                .flatMap(item -> {
                    if (itemPatchResource.getDescription() != null) {
                        item.setDescription(itemPatchResource.getDescription().get());
                    }
                    if (itemPatchResource.getStatus() != null) {
                        item.setStatus(itemPatchResource.getStatus().get());
                    }
                    return itemRepository.save(item);
                }).map(item -> modelMapper.map(item, ItemResource.class));
    }

    public Mono<Void> deleteById(String id, Long expectedVersion) {
        return getItemById(id, expectedVersion)
                .flatMap(itemRepository::delete);
    }
}
