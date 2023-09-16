package com.example.trello_backend.dto;

import com.example.trello_backend.model.ItemStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class ItemResource {
    private String id;
    private Long version;
    private String description;
    private ItemStatus itemStatus;
    private Instant createdDate;
    private Instant lastModifiedDate;
}
