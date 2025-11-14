package com.autolink.api.dto;

import com.autolink.api.entity.Vehicle;
import lombok.Data;

@Data
public class VehicleSearchRequest {
    private String query;
    private String make;
    private String model;
    private String city;
    private String maxMileage;
    private String type; // "all", "sale", "rental"
    private String minPrice;
    private String maxPrice;
    private String minYear;
    private String maxYear;
    private Vehicle.FuelType fuelType;
    private Vehicle.TransmissionType transmission;
    private Integer page = 0;
    private Integer size = 20;
}

