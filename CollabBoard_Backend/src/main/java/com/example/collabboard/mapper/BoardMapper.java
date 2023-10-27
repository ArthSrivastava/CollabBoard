package com.example.collabboard.mapper;

import com.example.collabboard.dto.BoardDto;
import com.example.collabboard.model.Board;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BoardMapper {
    private final ModelMapper modelMapper;

    public Board toBoard(BoardDto boardDto) {
        return modelMapper.map(boardDto, Board.class);
    }

    public BoardDto toBoardDto(Board board) {
        return modelMapper.map(board, BoardDto.class);
    }
}

