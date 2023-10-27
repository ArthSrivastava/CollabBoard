package com.example.collabboard.mapper;

import com.example.collabboard.dto.UserDto;
import com.example.collabboard.model.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper modelMapper;

    public User toUser(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    public UserDto toUserDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }
}
