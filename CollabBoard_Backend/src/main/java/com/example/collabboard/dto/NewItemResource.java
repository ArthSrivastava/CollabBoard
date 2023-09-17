package com.example.collabboard.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NewItemResource {

    @NotBlank
    private String description;
}
