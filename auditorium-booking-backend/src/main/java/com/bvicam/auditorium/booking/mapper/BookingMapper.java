package com.bvicam.auditorium.booking.mapper;

import com.bvicam.auditorium.booking.dto.request.BookingRequestDto;
import com.bvicam.auditorium.booking.dto.response.BookingResponseDto;
import com.bvicam.auditorium.booking.model.Booking;
import com.bvicam.auditorium.booking.model.BookingStatus;
import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.stereotype.Component;

@Component
public class BookingMapper {

    // Convert Request DTO → Entity
    public Booking toEntity(
            BookingRequestDto request,
            Hall hall,
            User user
    ) {


        return Booking.builder()
                .hall(hall)
                .user(user)
                .eventName(request.getEventName())
                .organizingClub(request.getOrganizingClub())
                .eventType(request.getEventType())
                .phone(request.getPhone())
                .alternatePhone(request.getAlternatePhone())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .status(BookingStatus.PENDING)
                .build();
    }

    // Convert Entity → Response DTO
    public BookingResponseDto toResponse(Booking booking) {

        return BookingResponseDto.builder()
                .id(booking.getId())
                .hallName(booking.getHall().getName())
                .userName(booking.getUser().getName())
                .eventName(booking.getEventName())
                .organizingClub(booking.getOrganizingClub())
                .eventType(booking.getEventType())
                .phone(booking.getPhone())
                .alternatePhone(booking.getAlternatePhone())
                .startTime(booking.getStartTime())
                .endTime(booking.getEndTime())
                .status(booking.getStatus())
                .build();
    }
}