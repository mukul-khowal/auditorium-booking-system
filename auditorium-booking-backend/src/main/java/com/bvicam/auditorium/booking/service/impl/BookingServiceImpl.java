package com.bvicam.auditorium.booking.service.impl;

import com.bvicam.auditorium.booking.dto.request.BookingRequestDto;
import com.bvicam.auditorium.booking.dto.response.BookingResponseDto;
import com.bvicam.auditorium.booking.exception.BadRequestException;
import com.bvicam.auditorium.booking.mapper.BookingMapper;
import com.bvicam.auditorium.booking.model.Booking;
import com.bvicam.auditorium.booking.model.BookingStatus;
import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import com.bvicam.auditorium.booking.repository.BookingRepository;
import com.bvicam.auditorium.booking.repository.HallRepository;
import com.bvicam.auditorium.booking.repository.UserRepository;
import com.bvicam.auditorium.booking.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final HallRepository hallRepository;
    private final UserRepository userRepository;
    private final BookingMapper bookingMapper;


    @Override
    public BookingResponseDto createBooking(BookingRequestDto request, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));

        Hall hall = hallRepository.findById(request.getHallId())
                .orElseThrow(() -> new BadRequestException("Hall not found"));

        if (!hall.isEnabled()) {
            throw new BadRequestException("Hall is not available");
        }

        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new BadRequestException("Invalid booking time");
        }

        boolean conflict = bookingRepository
                .existsByHallAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
                        hall,
                        request.getEndTime(),
                        request.getStartTime()
                );

        if (conflict) {
            throw new BadRequestException("Hall already booked for this time slot");
        }

        Booking booking = bookingMapper.toEntity(request, hall, user);

        return bookingMapper.toResponse(
                bookingRepository.save(booking)
        );
    }


    @Override
    public List<BookingResponseDto> getMyBookings(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));

        return bookingRepository.findByUser(user)
                .stream()
                .map(bookingMapper::toResponse)
                .toList();

    }

    @Override
    public List<BookingResponseDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(bookingMapper::toResponse)
                .toList();

    }

    @Override
    public BookingResponseDto updateStatus(Long bookingId, BookingStatus status) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new BadRequestException("Booking not found"));

        booking.setStatus(status);

        return bookingMapper.toResponse(
                bookingRepository.save(booking)
        );

    }

}
