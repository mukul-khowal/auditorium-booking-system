package com.bvicam.auditorium.booking.controller;

import com.bvicam.auditorium.booking.dto.request.BookingRequestDto;
import com.bvicam.auditorium.booking.dto.response.BookingResponseDto;
import com.bvicam.auditorium.booking.model.BookingStatus;
import com.bvicam.auditorium.booking.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    @PreAuthorize("hasAnyRole('FACULTY','STUDENT')")
    public ResponseEntity<BookingResponseDto> createBooking(
            @Valid @RequestBody BookingRequestDto request,
            Authentication authentication) {

        return new ResponseEntity<>(
                bookingService.createBooking(request, authentication.getName()),
                HttpStatus.CREATED
        );
    }

    @GetMapping("/my")
    @PreAuthorize("hasAnyRole('FACULTY','STUDENT')")
    public ResponseEntity<List<BookingResponseDto>> getMyBookings(
            Authentication authentication) {

        return ResponseEntity.ok(
                bookingService.getMyBookings(authentication.getName())
        );
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BookingResponseDto>> getAllBookings() {

        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    @PatchMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<BookingResponseDto> updateStatus(
            @PathVariable Long id,
            @RequestParam BookingStatus status) {

        return ResponseEntity.ok(
                bookingService.updateStatus(id, status)
        );
    }
}

