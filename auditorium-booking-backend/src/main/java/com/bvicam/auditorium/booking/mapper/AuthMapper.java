package com.bvicam.auditorium.booking.mapper;

import com.bvicam.auditorium.booking.dto.request.RegisterRequestDto;
import com.bvicam.auditorium.booking.dto.response.AuthResponseDto;
import com.bvicam.auditorium.booking.model.User;
import org.springframework.stereotype.Component;

@Component
public class AuthMapper {

    public User toUser(RegisterRequestDto dto) {
        return User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .role(dto.getRole())
                .institute(dto.getInstitute())
                .department(dto.getDepartment())
                // password set in service (encoded)
                .enabled(false)
                .build();
    }

    public AuthResponseDto toAuthResponse(User user) {
        return AuthResponseDto.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .institute(user.getInstitute())
                .department(user.getDepartment())
                .enabled(user.isEnabled())
                .build();
    }
}
