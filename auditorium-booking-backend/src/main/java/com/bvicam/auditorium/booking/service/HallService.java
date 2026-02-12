package com.bvicam.auditorium.booking.service;

import com.bvicam.auditorium.booking.dto.request.HallRequestDto;
import com.bvicam.auditorium.booking.dto.response.HallResponseDto;

import java.util.List;

public interface HallService {

    HallResponseDto createHall(HallRequestDto request, String email);

    HallResponseDto updateHall(Long id, HallRequestDto request);

    void deleteHall(Long id);

    List<HallResponseDto> getAllHalls();

    List<HallResponseDto> getAllEnabledHalls();

    HallResponseDto getHallById(Long id);
}
