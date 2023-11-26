package com.example.collabboard.repository;

import com.example.collabboard.model.Item;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface ItemRepository extends ReactiveMongoRepository<Item, String> {
    Flux<Item> findAllByBoardId(String boardId);
}
