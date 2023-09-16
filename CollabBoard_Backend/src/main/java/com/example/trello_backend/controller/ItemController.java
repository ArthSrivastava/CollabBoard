package com.example.trello_backend.controller;

import com.example.trello_backend.dto.ItemPatchResource;
import com.example.trello_backend.dto.ItemResource;
import com.example.trello_backend.dto.ItemUpdateResource;
import com.example.trello_backend.dto.NewItemResource;
import com.example.trello_backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/items")
public class ItemController {
    private final ItemService itemService;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ItemResource> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public Mono<ItemResource> create(@RequestBody NewItemResource itemResource) {
        return itemService.createItemResource(itemResource);
    }

    @PutMapping("/{id}")
    public Mono<ItemResource> update(@PathVariable String id, @RequestBody ItemUpdateResource itemUpdateResource) {
        return itemService.updateItem(id, itemUpdateResource);
    }

    @PatchMapping("/{id}")
    public Mono<ItemResource> update(@PathVariable String id, @RequestBody ItemPatchResource itemPatchResource) {
        return itemService.patch(id, itemPatchResource);
    }


    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id) {
        return itemService.deleteById(id);
    }
}
