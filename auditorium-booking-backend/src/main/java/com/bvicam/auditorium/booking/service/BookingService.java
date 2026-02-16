package com.bvicam.auditorium.booking.service;

import com.bvicam.auditorium.booking.dto.request.BookingRequestDto;
import com.bvicam.auditorium.booking.dto.response.BookingResponseDto;
import com.bvicam.auditorium.booking.model.BookingStatus;

import java.util.List;

public interface BookingService {

    BookingResponseDto createBooking(BookingRequestDto request, String email);

    List<BookingResponseDto> getMyBookings(String email);

    List<BookingResponseDto> getAllBookings();

    BookingResponseDto updateStatus(Long bookingId, BookingStatus status);
}

