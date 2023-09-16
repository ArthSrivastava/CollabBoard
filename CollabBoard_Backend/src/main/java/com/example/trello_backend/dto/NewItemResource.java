package com.example.trello_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class NewItemResource {

    @NotBlank
    private String description;
}
