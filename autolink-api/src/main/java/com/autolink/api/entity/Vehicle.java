package com.autolink.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String make;

    @Column(nullable = false)
    private String model;

    @Column(nullable = false)
    private Integer year;

    @Column(nullable = false)
    private BigDecimal price;

    private BigDecimal rentalPricePerDay;
    private BigDecimal rentalPricePerWeek;
    private BigDecimal rentalPricePerMonth;

    @Column(nullable = false)
    private Integer mileage;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FuelType fuelType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransmissionType transmission;

    @Column(nullable = false)
    private Integer seats;

    private Integer doors;
    private String color;
    private String condition;

    @Column(nullable = false)
    private Boolean isRental = false;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ElementCollection
    @CollectionTable(name = "vehicle_images", joinColumns = @JoinColumn(name = "vehicle_id"))
    @Column(name = "image_url")
    private List<String> images = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "vehicle_features", joinColumns = @JoinColumn(name = "vehicle_id"))
    @Column(name = "feature")
    private List<String> features = new ArrayList<>();

    @Column(nullable = false)
    private String city;

    private Double latitude;
    private Double longitude;

    private LocalDate availableFrom;
    private LocalDate availableTo;
    private String pickupLocation;

    @Column(nullable = false)
    private Integer views = 0;

    @Column(nullable = false)
    private Integer favoritesCount = 0;

    @Column(nullable = false)
    private Boolean isActive = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum FuelType {
        ESSENCE, DIESEL, ELECTRIC, HYBRID
    }

    public enum TransmissionType {
        MANUELLE, AUTOMATIQUE
    }
}

