package com.bvicam.auditorium.booking.dto.response;

import com.bvicam.auditorium.booking.model.BookingStatus;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingResponseDto {

    private Long id;

    private String hallName;

    private String userName;

    private String eventName;

    private String organizingClub;

    private String eventType;

    private String phone;

    private String alternatePhone;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private BookingStatus status;
}
