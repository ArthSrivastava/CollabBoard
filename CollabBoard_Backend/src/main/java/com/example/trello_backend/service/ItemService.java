package com.example.trello_backend.service;

import com.example.trello_backend.dto.ItemPatchResource;
import com.example.trello_backend.dto.ItemResource;
import com.example.trello_backend.dto.ItemUpdateResource;
import com.example.trello_backend.dto.NewItemResource;
import com.example.trello_backend.model.Item;
import com.example.trello_backend.repository.ItemRepository;
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

    public Mono<ItemResource> getItemById(String id) {
        return itemRepository.findById(id)
                .flatMap(item -> {
                    ItemResource itemResource = modelMapper.map(item, ItemResource.class);
                    return Mono.just(itemResource);
                });
    }

    //update full resource
    public Mono<ItemResource> updateItem(String id, ItemUpdateResource itemUpdateResource) {
        return itemRepository.findById(id)
                .flatMap(item -> {
                    item.setDescription(itemUpdateResource.getDescription());
                    item.setStatus(itemUpdateResource.getStatus());
                    return itemRepository.save(item);
                }).map(item -> modelMapper.map(item, ItemResource.class));
    }

    public Mono<ItemResource> patch(String id, ItemPatchResource itemPatchResource) {
        return itemRepository.findById(id)
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

    public Mono<Void> deleteById(String id) {
        return itemRepository.findById(id)
                .flatMap(itemRepository::delete);
    }
}
