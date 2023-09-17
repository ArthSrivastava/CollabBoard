package com.example.collabboard.dto;

import com.example.collabboard.model.ItemStatus;
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
