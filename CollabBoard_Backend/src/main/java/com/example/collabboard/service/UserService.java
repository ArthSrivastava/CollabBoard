package com.example.collabboard.service;

import com.example.collabboard.dto.UserDto;
import com.example.collabboard.mapper.UserMapper;
import com.example.collabboard.model.User;
import com.example.collabboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public Mono<UserDto> createUser(UserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        return userRepository
                .save(userMapper.toUser(userDto))
                .map(userMapper::toUserDto);
    }

    public Mono<UserDto> getUserById(String userId) {
        return userRepository
                .findById(userId)
                .map(userMapper::toUserDto);
    }

    public Mono<UserDto> getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toUserDto);
    }

    public Mono<UserDto> updateUser(String userId, String boardId) {
        return getUserById(userId)
                .flatMap(userDto1 -> {
                    userDto1.getBoardIds().add(boardId);
                    return userRepository.save(userMapper.toUser(userDto1));
                }).map(userMapper::toUserDto);
    }
}