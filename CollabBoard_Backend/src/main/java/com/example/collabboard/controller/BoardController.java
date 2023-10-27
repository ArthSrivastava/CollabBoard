package com.example.collabboard.controller;

import com.example.collabboard.dto.BoardDto;
import com.example.collabboard.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class BoardController {

    private final BoardService boardService;

    @PostMapping("/users/{userId}/boards")
    public Mono<BoardDto> createBoard(@PathVariable String userId, @RequestBody BoardDto boardDto) {
        return boardService
                .createBoard(userId, boardDto);
    }

    @GetMapping("/users/{userId}/boards")
    public Flux<BoardDto> getAllBoardsByUserId(@PathVariable String userId) {
        return boardService
                .getAllBoardsByUserId(userId);
    }

    @GetMapping("/boards")
    public Mono<BoardDto> getBoardByUniqueLink(@RequestParam String uniqueLink) {
        return boardService
                .getBoardByLink(uniqueLink);
    }

    @PostMapping("/users/{userId}/boards")
    public Mono<Boolean> joinBoard(@PathVariable String userId, @RequestParam String uniqueLink) {
        return boardService
                .joinBoard(uniqueLink, userId);
    }
}
