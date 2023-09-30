package com.example.collabboard.dto;

import com.example.collabboard.model.ItemStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NonNull;

import java.util.Optional;

@Data
public class ItemPatchResource {
    private Optional<@NotBlank String> description;

    private Optional<@NonNull ItemStatus> status;
}
