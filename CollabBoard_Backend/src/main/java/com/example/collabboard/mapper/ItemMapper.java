package com.example.collabboard.mapper;

import com.example.collabboard.dto.*;
import com.example.collabboard.model.Item;
import lombok.RequiredArgsConstructor;
import org.bson.BsonObjectId;
import org.modelmapper.ModelMapper;
import org.springframework.data.mongodb.core.ChangeStreamEvent;
import org.springframework.stereotype.Component;

import java.util.Objects;

@Component
@RequiredArgsConstructor
public class ItemMapper {

    private final ModelMapper modelMapper;

   public Event toEvent(ChangeStreamEvent<Item> changeStreamEvent) {
       Event event = null;
       switch (Objects.requireNonNull(changeStreamEvent.getOperationType())) {
           case DELETE -> {
               ItemDeleted itemDeleted = new ItemDeleted();
               itemDeleted.setItemId(
                       (((BsonObjectId) Objects.requireNonNull(Objects.requireNonNull(changeStreamEvent.getRaw())
                               .getDocumentKey()).get("_id")).getValue().toString()));
               event = itemDeleted;
           }
           case REPLACE, INSERT, UPDATE -> {
               ItemSaved itemSaved = new ItemSaved();
               itemSaved.setItemResource(modelMapper.map(changeStreamEvent.getBody(), ItemResource.class));
               event = itemSaved;
           }
           default -> throw new UnsupportedOperationException(
                   String.format("The Mongo operation type [%s] is not supported", changeStreamEvent.getOperationType()));
       }

       return event;
   }
}
