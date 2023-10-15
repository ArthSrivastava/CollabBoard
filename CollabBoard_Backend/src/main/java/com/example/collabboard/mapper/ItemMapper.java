package com.example.collabboard.mapper;

import com.example.collabboard.dto.*;
import com.example.collabboard.model.Item;
import org.bson.BsonObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.mongodb.core.ChangeStreamEvent;

import java.util.Objects;

@Mapper(componentModel = "spring")
public interface ItemMapper {

   ItemResource toResource(Item item);

   @Mapping(target = "id", ignore = true)
   @Mapping(target = "status", ignore = true)
   @Mapping(target = "createdDate", ignore = true)
   @Mapping(target = "lastModifiedDate", ignore = true)
   @Mapping(target = "version", ignore = true)
   Item toModel(NewItemResource item);

   @Mapping(target = "id", ignore = true)
   @Mapping(target = "createdDate", ignore = true)
   @Mapping(target = "lastModifiedDate", ignore = true)
   @Mapping(target = "version", ignore = true)
   void update(ItemUpdateResource updateResource, @MappingTarget Item item);

   default Event toEvent(ChangeStreamEvent<Item> changeStreamEvent) {
       Event event = null;
       switch (Objects.requireNonNull(changeStreamEvent.getOperationType())) {
           case DELETE -> {
               ItemDeleted itemDeleted = new ItemDeleted();
               itemDeleted.setItemId(
                       (((BsonObjectId) Objects.requireNonNull(Objects.requireNonNull(changeStreamEvent.getRaw())
                               .getDocumentKey()).get("_id")).getValue().toString()));
               event = itemDeleted;
           }
           case INSERT, UPDATE -> {
           }
           case REPLACE -> {
               ItemSaved itemSaved = new ItemSaved();
               itemSaved.setItemResource(toResource(changeStreamEvent.getBody()));
               event = itemSaved;
           }
           default -> throw new UnsupportedOperationException(
                   String.format("The Mongo operation type [%s] is not supported", changeStreamEvent.getOperationType()));
       }

       return event;
   }
}
