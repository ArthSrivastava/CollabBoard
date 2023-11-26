package com.example.collabboard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardDto {
    private String id;
    private String name;
    private String uniqueLink;
    private Set<String> userIds;
}
