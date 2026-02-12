package com.bvicam.auditorium.booking.controller;

import com.bvicam.auditorium.booking.dto.request.LoginRequestDto;
import com.bvicam.auditorium.booking.dto.request.RegisterRequestDto;
import com.bvicam.auditorium.booking.dto.response.AuthResponseDto;
import com.bvicam.auditorium.booking.dto.response.UserResponseDto;
import com.bvicam.auditorium.booking.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDto> register(
            @Valid @RequestBody RegisterRequestDto request) {
        System.out.println("Register request Called");
        AuthResponseDto response = authService.register(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(
            @Valid @RequestBody LoginRequestDto request) {

        AuthResponseDto response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getMyProfile(
            Authentication authentication) {

        String email = authentication.getName();
        UserResponseDto response = authService.getMyProfile(email);

        return ResponseEntity.ok(response);
    }

}