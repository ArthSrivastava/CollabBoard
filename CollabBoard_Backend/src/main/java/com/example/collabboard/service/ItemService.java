package com.example.collabboard.service;

import com.example.collabboard.dto.ItemPatchResource;
import com.example.collabboard.dto.ItemResource;
import com.example.collabboard.dto.ItemUpdateResource;
import com.example.collabboard.dto.NewItemResource;
import com.example.collabboard.exception.ItemNotFoundException;
import com.example.collabboard.exception.UnexpectedItemVersionException;
import com.example.collabboard.model.Item;
import com.example.collabboard.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;
    private final ModelMapper modelMapper;

    public Mono<ItemResource> createItemResource(NewItemResource newItemResource) {
        Item item = modelMapper.map(newItemResource, Item.class);
        return itemRepository.save(item).flatMap(
                savedItem -> {
                    ItemResource itemResource = modelMapper.map(savedItem, ItemResource.class);
                    return Mono.just(itemResource);
                }
        );
    }

    public Flux<ItemResource> getAllItems() {
        return itemRepository.findAll()
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
