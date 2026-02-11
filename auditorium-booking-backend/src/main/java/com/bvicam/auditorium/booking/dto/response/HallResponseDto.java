package com.bvicam.auditorium.booking.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HallResponseDto {

    private Long id;
    private String name;
    private String location;
    private int capacity;
    private String amenities;
    private String description;

    private String createdByName;
    private boolean enabled;

    private LocalDateTime createdAt;
}
