package com.autolink.api.dto;

import com.autolink.api.entity.Vehicle;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class VehicleRequest {
    private String make;
    private String model;
    private Integer year;
    private BigDecimal price;
    private BigDecimal rentalPricePerDay;
    private BigDecimal rentalPricePerWeek;
    private BigDecimal rentalPricePerMonth;
    private Integer mileage;
    private Vehicle.FuelType fuelType;
    private Vehicle.TransmissionType transmission;
    private Integer seats;
    private Integer doors;
    private String color;
    private String condition;
    private Boolean isRental;
    private String description;
    private List<String> images;
    private List<String> features;
    private String city;
    private Double latitude;
    private Double longitude;
    private LocalDate availableFrom;
    private LocalDate availableTo;
    private String pickupLocation;
}

