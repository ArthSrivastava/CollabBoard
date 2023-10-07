package com.example.collabboard.controller;

import com.example.collabboard.dto.ItemPatchResource;
import com.example.collabboard.dto.ItemResource;
import com.example.collabboard.dto.ItemUpdateResource;
import com.example.collabboard.dto.NewItemResource;
import com.example.collabboard.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/items")
@CrossOrigin(origins = "http://localhost:5173")
public class ItemController {
    private final ItemService itemService;


    @GetMapping(produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ItemResource> getAllItems() {
        return itemService.getAllItems();
    }

    @PostMapping
    public Mono<ItemResource> create(@RequestBody NewItemResource itemResource) {
        return itemService.createItemResource(itemResource);
    }

    @PutMapping("/{id}")
    public Mono<ItemResource> update(@PathVariable String id,
                                     @RequestHeader(name = "if-match", required = false) Long version,
                                     @RequestBody ItemUpdateResource itemUpdateResource) {
        return itemService.updateItem(id, version, itemUpdateResource);
    }

    @PatchMapping("/{id}")
    public Mono<ItemResource> update(@PathVariable String id,
                                     @RequestHeader(name = "if-match", required = false) Long version,
                                     @RequestBody ItemPatchResource itemPatchResource) {
        return itemService.patch(id, version, itemPatchResource);
    }


    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable String id,
                             @RequestHeader(name = "if-match", required = false) Long version) {
        return itemService.deleteById(id, version);
    }
}
