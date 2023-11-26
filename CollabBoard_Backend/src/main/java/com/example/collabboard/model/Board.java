package com.example.collabboard.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Set;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Board {
    @Id
    private String id;
    private String name;
    private String uniqueLink;
    private Set<String> userIds;
}
