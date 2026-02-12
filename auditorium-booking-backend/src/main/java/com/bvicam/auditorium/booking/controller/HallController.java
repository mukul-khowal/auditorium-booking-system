package com.bvicam.auditorium.booking.controller;

import com.bvicam.auditorium.booking.dto.request.HallRequestDto;
import com.bvicam.auditorium.booking.dto.response.HallResponseDto;
import com.bvicam.auditorium.booking.service.HallService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/halls")
@RequiredArgsConstructor
public class HallController {

    private final HallService hallService;

    // CREATE
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HallResponseDto> createHall(
            @Valid @RequestBody HallRequestDto request,
            Authentication authentication) {

        String email = authentication.getName();
        return new ResponseEntity<>(
                hallService.createHall(request, email),
                HttpStatus.CREATED
        );
    }

    // UPDATE
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<HallResponseDto> updateHall(
            @PathVariable Long id,
            @Valid @RequestBody HallRequestDto request) {

        return ResponseEntity.ok(hallService.updateHall(id, request));
    }

    // DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteHall(@PathVariable Long id) {

        hallService.deleteHall(id);
        return ResponseEntity.ok("Hall deleted successfully");
    }

    // GET ALL (ADMIN)
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<HallResponseDto>> getAllHalls() {

        return ResponseEntity.ok(hallService.getAllHalls());
    }

    // GET AVAILABLE (ALL LOGGED USERS)
    @GetMapping("/available")
    public ResponseEntity<List<HallResponseDto>> getEnabledHalls() {

        return ResponseEntity.ok(hallService.getAllEnabledHalls());
    }

    // GET SPECIFIC
    @GetMapping("/{id}")
    public ResponseEntity<HallResponseDto> getHall(@PathVariable Long id) {

        return ResponseEntity.ok(hallService.getHallById(id));
    }
}

