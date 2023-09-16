package com.example.trello_backend.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "id")
public class Item {

    @Id
    private String id;
    private String description;
    private ItemStatus status = ItemStatus.TODO;

    @CreatedDate
    private Instant createdDate;

    @LastModifiedDate
    private Instant lastModifiedDate;
}
