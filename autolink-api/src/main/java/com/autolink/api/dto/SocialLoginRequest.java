package com.autolink.api.dto;

import lombok.Data;

@Data
public class SocialLoginRequest {
    private String code;
    private String redirectUri;
    private String state;
}


