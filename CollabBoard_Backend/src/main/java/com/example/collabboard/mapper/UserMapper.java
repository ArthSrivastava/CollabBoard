package com.example.collabboard.mapper;

import com.example.collabboard.dto.UserDto;
import com.example.collabboard.model.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

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

    public User fromJwtClaims(Map<String, Object> claims) { return modelMapper.map(claims, User.class); }
}
