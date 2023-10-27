package com.example.collabboard.service;

import com.example.collabboard.dto.BoardDto;
import com.example.collabboard.mapper.BoardMapper;
import com.example.collabboard.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BoardService {

    @Value("${frontend.board.url}")
    private String baseUrl;
    private final BoardRepository boardRepository;
    private final BoardMapper boardMapper;
    private final UserService userService;

    public Mono<BoardDto> createBoard(String userId, BoardDto boardDto) {
        boardDto.setUserIds(Set.of(userId));
        String uniqueLink = baseUrl.concat("/").concat(UUID.randomUUID().toString());
        boardDto.setUniqueLink(uniqueLink);

        return boardRepository
                .save(boardMapper.toBoard(boardDto))
                .map(boardMapper::toBoardDto);
    }

    public Flux<BoardDto> getAllBoardsByUserId(String userId) {
        return boardRepository
                .findAllByUserIdsContains(userId)
                .map(boardMapper::toBoardDto);
    }

    public Mono<BoardDto> getBoardByLink(String uniqueLink) {
        return boardRepository
                .findByUniqueLink(uniqueLink)
                .map(boardMapper::toBoardDto);
    }

    public Mono<Boolean> joinBoard(String uniqueLink, String userId) {
        return getBoardByLink(uniqueLink)
                .flatMap(boardDto -> {
                    boardDto.getUserIds().add(userId);

                    return Mono.zip(
                            userService.updateUser(userId, boardDto.getId()),
                            boardRepository.save(boardMapper.toBoard(boardDto))
                    );
                }).map(tuple -> true);
    }


}
