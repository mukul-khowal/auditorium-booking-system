package com.bvicam.auditorium.booking.service;

import com.bvicam.auditorium.booking.dto.request.LoginRequestDto;
import com.bvicam.auditorium.booking.dto.request.RegisterRequestDto;
import com.bvicam.auditorium.booking.dto.response.AuthResponseDto;
import com.bvicam.auditorium.booking.dto.response.UserResponseDto;

public interface AuthService {

    AuthResponseDto register(RegisterRequestDto registerRequest);

    AuthResponseDto login(LoginRequestDto loginRequest);

    UserResponseDto getMyProfile(String email);
}
