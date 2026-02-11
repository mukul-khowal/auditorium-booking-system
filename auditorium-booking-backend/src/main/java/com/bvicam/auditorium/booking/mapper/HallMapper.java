package com.bvicam.auditorium.booking.mapper;

import com.bvicam.auditorium.booking.dto.request.HallRequestDto;
import com.bvicam.auditorium.booking.dto.response.HallResponseDto;
import com.bvicam.auditorium.booking.model.Hall;
import org.springframework.stereotype.Component;

@Component
public class HallMapper {

    public Hall toEntity(HallRequestDto dto) {
        return Hall.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .capacity(dto.getCapacity())
                .amenities(dto.getAmenities())
                .description(dto.getDescription())
                .build();
    }

    public HallResponseDto toResponse(Hall hall) {
        return HallResponseDto.builder()
                .id(hall.getId())
                .name(hall.getName())
                .location(hall.getLocation())
                .capacity(hall.getCapacity())
                .amenities(hall.getAmenities())
                .description(hall.getDescription())
                .createdByName(hall.getCreatedBy().getName())
                .enabled(hall.isEnabled())
                .createdAt(hall.getCreatedAt())
                .build();
    }
}