package com.example.collabboard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableReactiveMongoAuditing;

@SpringBootApplication
@EnableReactiveMongoAuditing
public class CollabBoardApplication {

    public static void main(String[] args) {
        SpringApplication.run(CollabBoardApplication.class, args);
    }

}
