package com.bvicam.auditorium.booking.controller;

import com.bvicam.auditorium.booking.dto.response.AuthResponseDto;
import com.bvicam.auditorium.booking.dto.response.UserResponseDto;
import com.bvicam.auditorium.booking.mapper.AuthMapper;
import com.bvicam.auditorium.booking.model.Role;
import com.bvicam.auditorium.booking.model.User;
import com.bvicam.auditorium.booking.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final AuthMapper authMapper;

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public Page<UserResponseDto> getAllUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<User> users = userRepository.findByRoleIn(
                List.of(Role.FACULTY, Role.STUDENT),
                PageRequest.of(page, size)
        );

        return users.map(authMapper::toUserResponse);
    }

}
