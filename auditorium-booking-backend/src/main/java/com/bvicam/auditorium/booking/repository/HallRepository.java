package com.bvicam.auditorium.booking.repository;

import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HallRepository extends JpaRepository<Hall, Long> {

    List<Hall> findByEnabledTrue();

    boolean existsByName(String name);
}
