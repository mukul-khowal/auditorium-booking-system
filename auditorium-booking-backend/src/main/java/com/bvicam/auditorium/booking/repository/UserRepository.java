package com.bvicam.auditorium.booking.repository;

import com.bvicam.auditorium.booking.model.Role;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    List<User> findAll();

    Page<User> findByRoleIn(List<Role> roles, Pageable pageable);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
