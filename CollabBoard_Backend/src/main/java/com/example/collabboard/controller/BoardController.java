package com.example.collabboard.controller;

import com.example.collabboard.dto.BoardDto;
import com.example.collabboard.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

    @GetMapping(value = "/users/{userId}/boards", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<BoardDto> getAllBoardsByUserId(@PathVariable String userId) {
        return boardService
                .getAllBoardsByUserId(userId);
    }

    @GetMapping("/boards")
    public Mono<BoardDto> getBoardByUniqueLink(@RequestParam String uniqueLink) {
        return boardService
                .getBoardByLink(uniqueLink);
    }

    @GetMapping("/boards/{boardId}")
    public Mono<BoardDto> getBoardById(@PathVariable String boardId) {
        return boardService.getBoardById(boardId);
    }

    @PostMapping("/users/{userId}/boards/join")
    public Mono<Boolean> joinBoard(@PathVariable String userId, @RequestParam String uniqueLink) {
        return boardService
                .joinBoard(uniqueLink, userId);
    }
}
