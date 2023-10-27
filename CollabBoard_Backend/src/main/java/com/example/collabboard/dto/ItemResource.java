package com.example.collabboard.dto;

import com.example.collabboard.model.ItemStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class ItemResource {
    private String id;
    private Long version;
    private String description;
    private ItemStatus status;
    private String userId;
    private String boardId;
    private Instant createdDate;
    private Instant lastModifiedDate;
}
