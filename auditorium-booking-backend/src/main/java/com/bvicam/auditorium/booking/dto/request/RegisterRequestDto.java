package com.bvicam.auditorium.booking.dto.request;

import com.bvicam.auditorium.booking.model.Role;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequestDto {
    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone must be 10 digits")
    private String phone;

    @NotNull(message = "Role is required")
    private Role role;

    @NotBlank(message = "Institute is required")
    private String institute;

    @NotBlank(message = "Department is required")
    private String department;

    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must be 8+ chars with upper, lower, number & special character"
    )
    @NotBlank(message = "Password is required")
    private String password;
}
