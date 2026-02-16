package com.bvicam.auditorium.booking.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "hall_id", nullable = false)
    private Hall hall;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // 🔹 NEW FIELDS

    @Column(nullable = false)
    private String eventName;

    private String organizingClub;

    @Column(nullable = false)
    private String eventType; // Half Day / Full Day

    @Column(nullable = false)
    private String phone;

    private String alternatePhone;

    // 🔹 TIME FIELDS

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(nullable = false)
    private LocalDateTime endTime;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
