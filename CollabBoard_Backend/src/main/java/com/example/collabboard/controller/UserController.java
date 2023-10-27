package com.example.collabboard.controller;

import com.example.collabboard.dto.UserDto;
import com.example.collabboard.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public Mono<UserDto> createUser(@RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }

    @GetMapping("/{userId}")
    public Mono<UserDto> getUserById(@PathVariable String userId) {
        return userService.getUserById(userId);
    }

}
