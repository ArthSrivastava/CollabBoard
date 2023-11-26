package com.example.collabboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveUserDetailsServiceAutoConfiguration;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;

@SpringBootApplication(exclude = {ReactiveUserDetailsServiceAutoConfiguration.class})
@EnableReactiveMongoAuditing
public class CollabBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollabBoardApplication.class, args);
    }

}
