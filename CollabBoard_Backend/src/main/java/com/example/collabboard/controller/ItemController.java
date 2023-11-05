package com.example.collabboard.controller;

import com.example.collabboard.config.SSEConfig;
import com.example.collabboard.dto.*;
import com.example.collabboard.dto.event.Event;
import com.example.collabboard.dto.event.HeartBeat;
import com.example.collabboard.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ItemController {
    private final ItemService itemService;


    //Server Sent Events
    @GetMapping("/items/events")
    public Flux<ServerSentEvent<Event>> getEventStream() {
        Flux<Event> eventFlux = itemService.listenToEvents();

        if(SSEConfig.HEART_BEAT_DELAY_MS > 0) {
            //Sending a heart beat signal every 25 seconds to keep the connection alive
            Flux<HeartBeat> heartBeatFlux = Flux.interval(Duration.ofMillis(SSEConfig.HEART_BEAT_DELAY_MS))
                    .map(sequence -> new HeartBeat());
            eventFlux = Flux.merge(heartBeatFlux, eventFlux);
        }
        return eventFlux
                .map(event -> ServerSentEvent.<Event>builder()
                        .retry(Duration.ofMillis(SSEConfig.RECONNECTION_DELAY_MS))
                        .event(event.getClass().getSimpleName())
                        .data(event)
                        .build());
    }

    @GetMapping(value = "/items/boards/{boardId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ItemResource> getAllItems(@PathVariable String boardId) {
        return itemService.getAllItems(boardId);
    }

    @PostMapping("/users/{userId}/boards/{boardId}/items")
    public Mono<ItemResource> create(@PathVariable String userId,
                                     @PathVariable String boardId,
                                     @RequestBody NewItemResource itemResource) {
        return itemService.createItemResource(userId, boardId, itemResource);
    }

    @PutMapping("/items/{id}")
    public Mono<ItemResource> update(@PathVariable String id,
                                     @RequestHeader(name = "if-match", required = false) Long version,
                                     @RequestBody ItemUpdateResource itemUpdateResource) {
        return itemService.updateItem(id, version, itemUpdateResource);
    }

    @PatchMapping("/items/{id}")
    public Mono<ItemResource> update(@PathVariable String id,
                                     @RequestHeader(name = "if-match", required = false) Long version,
                                     @RequestBody ItemPatchResource itemPatchResource) {
        return itemService.patch(id, version, itemPatchResource);
    }


    @DeleteMapping("/items/{id}")
    public Mono<Void> delete(@PathVariable String id,
                             @RequestHeader(name = "if-match", required = false) Long version) {
        return itemService.deleteById(id, version);
    }
}
