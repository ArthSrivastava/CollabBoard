package com.example.trello_backend.dto;

import com.example.trello_backend.model.ItemStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;

@Data
public class ItemUpdateResource {

    @NotBlank
    private String description;

    @NonNull
    private ItemStatus status;
}
