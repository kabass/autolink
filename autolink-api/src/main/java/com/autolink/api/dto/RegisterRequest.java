package com.autolink.api.dto;

import com.autolink.api.entity.User;
import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phone;
    private User.UserRole role;
    private String city;
}

