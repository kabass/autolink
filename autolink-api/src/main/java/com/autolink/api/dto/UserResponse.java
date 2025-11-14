package com.autolink.api.dto;

import com.autolink.api.entity.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatar;
    private User.UserRole role;
    private Boolean isVerified;
    private String city;
    private LocalDateTime birthDate;
    private User.Gender gender;
    private LocalDateTime createdAt;

    // Permissions calculées
    private Boolean canSell;
    private Boolean canBuy;
    private Boolean canRent;
    private Boolean canSupervise;
    private Boolean canManageUsers;
    
    // Keycloak tokens
    private String accessToken;
    private String refreshToken;
}

