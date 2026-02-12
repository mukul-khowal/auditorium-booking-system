package com.bvicam.auditorium.booking.service.impl;

import com.bvicam.auditorium.booking.dto.request.HallRequestDto;
import com.bvicam.auditorium.booking.dto.response.HallResponseDto;
import com.bvicam.auditorium.booking.exception.BadRequestException;
import com.bvicam.auditorium.booking.model.Hall;
import com.bvicam.auditorium.booking.model.User;
import com.bvicam.auditorium.booking.repository.HallRepository;
import com.bvicam.auditorium.booking.repository.UserRepository;
import com.bvicam.auditorium.booking.service.HallService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HallServiceImpl implements HallService {

    private final HallRepository hallRepository;
    private final UserRepository userRepository;

    @Override
    public HallResponseDto createHall(HallRequestDto request, String email) {

        if (hallRepository.existsByName(request.getName())) {
            throw new BadRequestException("Hall already exists");
        }

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));

        Hall hall = Hall.builder()
                .name(request.getName())
                .location(request.getLocation())
                .capacity(request.getCapacity())
                .amenities(request.getAmenities())
                .description(request.getDescription())
                .createdBy(admin)
                .enabled(true)
                .build();

        return mapToResponse(hallRepository.save(hall));
    }

    @Override
    public HallResponseDto updateHall(Long id, HallRequestDto request) {

        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Hall not found"));

        hall.setName(request.getName());
        hall.setLocation(request.getLocation());
        hall.setCapacity(request.getCapacity());
        hall.setAmenities(request.getAmenities());
        hall.setDescription(request.getDescription());

        return mapToResponse(hallRepository.save(hall));
    }

    @Override
    public void deleteHall(Long id) {

        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Hall not found"));

        hallRepository.delete(hall);
    }

    @Override
    public List<HallResponseDto> getAllHalls() {
        return hallRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public List<HallResponseDto> getAllEnabledHalls() {
        return hallRepository.findByEnabledTrue()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public HallResponseDto getHallById(Long id) {

        Hall hall = hallRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("Hall not found"));

        return mapToResponse(hall);
    }

    private HallResponseDto mapToResponse(Hall hall) {
        return HallResponseDto.builder()
                .id(hall.getId())
                .name(hall.getName())
                .location(hall.getLocation())
                .capacity(hall.getCapacity())
                .amenities(hall.getAmenities())
                .description(hall.getDescription())
                .createdByName(hall.getCreatedBy().getName())
                .enabled(hall.isEnabled())
                .createdAt(hall.getCreatedAt())
                .build();
    }
}
