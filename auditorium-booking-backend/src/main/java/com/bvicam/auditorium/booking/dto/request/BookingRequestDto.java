package com.bvicam.auditorium.booking.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingRequestDto {

    @NotNull
    private Long hallId;

    @NotBlank
    private String eventName;

    private String organizingClub;

    @NotBlank
    private String eventType; // Half Day / Full Day

    @NotBlank
    private String phone;

    private String alternatePhone;

    @NotNull
    private LocalDateTime startTime;

    @NotNull
    private LocalDateTime endTime;
}
