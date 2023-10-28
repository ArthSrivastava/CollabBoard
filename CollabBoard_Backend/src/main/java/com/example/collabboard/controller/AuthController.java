package com.example.collabboard.controller;

import com.example.collabboard.dto.LoginRequest;
import com.example.collabboard.dto.UserDto;
import com.example.collabboard.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.server.WebSession;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
@Slf4j
public class AuthController {

    private final ReactiveAuthenticationManager authenticationManager;
    private final UserService userService;

    @PostMapping("/login")
    public Mono<UserDto> login(@RequestBody LoginRequest loginRequest, WebSession session) {
        return authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword(), null)
        ).flatMap(authentication -> {
            log.info("Authentication: {}", authentication);
            return userService.getUserByEmail(loginRequest.getEmail())
                    .doOnNext(userDto -> {
                        session.getAttributes().putIfAbsent("user", userDto.getEmail());
                    });
        }).onErrorResume(e -> Mono.error(new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid Credentials!")));
    }
}
