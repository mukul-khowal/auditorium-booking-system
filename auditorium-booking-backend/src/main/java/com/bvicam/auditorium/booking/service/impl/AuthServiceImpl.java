package com.bvicam.auditorium.booking.service.impl;

import com.bvicam.auditorium.booking.dto.request.LoginRequestDto;
import com.bvicam.auditorium.booking.dto.request.RegisterRequestDto;
import com.bvicam.auditorium.booking.dto.response.AuthResponseDto;
import com.bvicam.auditorium.booking.exception.BadRequestException;
import com.bvicam.auditorium.booking.mapper.AuthMapper;
import com.bvicam.auditorium.booking.model.User;
import com.bvicam.auditorium.booking.repository.UserRepository;
import com.bvicam.auditorium.booking.service.AuthService;
import com.bvicam.auditorium.booking.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final JwtUtil jwtUtil;


    @Override
    public AuthResponseDto register(RegisterRequestDto request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }

        if (userRepository.existsByPhone(request.getPhone())) {
            throw new BadRequestException("Phone already registered");
        }

        User user = authMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser.getEmail());

        AuthResponseDto response = authMapper.toAuthResponse(savedUser);
        response.setToken(token);
        return response;
    }

    @Override
    public AuthResponseDto login(LoginRequestDto request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new BadRequestException("Account not approved yet");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        AuthResponseDto response = authMapper.toAuthResponse(user);
        response.setToken(token);
        return response;
    }
}
