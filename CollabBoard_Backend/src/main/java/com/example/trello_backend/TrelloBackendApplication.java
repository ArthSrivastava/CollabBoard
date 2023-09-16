package com.example.trello_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;

@SpringBootApplication
@EnableReactiveMongoAuditing
public class TrelloBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TrelloBackendApplication.class, args);
    }

}
