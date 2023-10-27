package com.example.collabboard.repository;

import com.example.collabboard.model.Board;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface BoardRepository extends ReactiveMongoRepository<Board, String> {
    Flux<Board> findAllByUserIdsContains(String userId);
    Mono<Board> findByUniqueLink(String uniqueLink);
}
