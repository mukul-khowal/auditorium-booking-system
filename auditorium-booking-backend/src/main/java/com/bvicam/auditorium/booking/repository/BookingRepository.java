package com.bvicam.auditorium.booking.repository;

import com.bvicam.auditorium.booking.model.Booking;
import com.bvicam.auditorium.booking.model.BookingStatus;
import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    List<Booking> findByStatus(BookingStatus status);

    boolean existsByHallAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            Hall hall,
            LocalDateTime endTime,
            LocalDateTime startTime
    );
}