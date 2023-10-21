package com.example.collabboard.dto.event;

import com.example.collabboard.dto.ItemResource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemSaved implements Event {
    private ItemResource itemResource;
}
