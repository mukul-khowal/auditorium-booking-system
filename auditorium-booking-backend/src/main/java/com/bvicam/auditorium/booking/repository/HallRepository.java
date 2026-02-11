package com.bvicam.auditorium.booking.repository;

import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HallRepository extends JpaRepository<Hall, Long> {

    List<Hall> findByEnabledTrue();

    List<Hall> findByCreatedBy(User user);

    List<Hall> findByCreatedByAndEnabledTrue(User user);

    boolean existsByName(String name);
}
