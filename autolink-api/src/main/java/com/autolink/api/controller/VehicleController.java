package com.autolink.api.controller;

import com.autolink.api.dto.VehicleRequest;
import com.autolink.api.dto.VehicleResponse;
import com.autolink.api.dto.VehicleSearchRequest;
import com.autolink.api.service.VehicleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vehicles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class VehicleController {
    private final VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<Page<VehicleResponse>> searchVehicles(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String maxMileage,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String minPrice,
            @RequestParam(required = false) String maxPrice,
            @RequestParam(required = false) String minYear,
            @RequestParam(required = false) String maxYear,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) String transmission,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        VehicleSearchRequest searchRequest = new VehicleSearchRequest();
        searchRequest.setQuery(query);
        searchRequest.setMake(make);
        searchRequest.setModel(model);
        searchRequest.setCity(city);
        searchRequest.setMaxMileage(maxMileage);
        searchRequest.setType(type);
        searchRequest.setMinPrice(minPrice);
        searchRequest.setMaxPrice(maxPrice);
        searchRequest.setMinYear(minYear);
        searchRequest.setMaxYear(maxYear);
        if (fuelType != null) {
            try {
                searchRequest.setFuelType(com.autolink.api.entity.Vehicle.FuelType.valueOf(fuelType.toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Ignorer si le type n'est pas valide
            }
        }
        if (transmission != null) {
            try {
                searchRequest.setTransmission(com.autolink.api.entity.Vehicle.TransmissionType.valueOf(transmission.toUpperCase()));
            } catch (IllegalArgumentException e) {
                // Ignorer si le type n'est pas valide
            }
        }
        searchRequest.setPage(page);
        searchRequest.setSize(size);

        Page<VehicleResponse> vehicles = vehicleService.searchVehicles(searchRequest);
        return ResponseEntity.ok(vehicles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleResponse> getVehicleById(@PathVariable Long id) {
        return vehicleService.getVehicleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createVehicle(
            @RequestParam Long userId,
            @RequestBody VehicleRequest request
    ) {
        try {
            VehicleResponse vehicle = vehicleService.createVehicle(userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(vehicle);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVehicle(
            @PathVariable Long id,
            @RequestParam Long userId,
            @RequestBody VehicleRequest request
    ) {
        try {
            VehicleResponse vehicle = vehicleService.updateVehicle(id, userId, request);
            return ResponseEntity.ok(vehicle);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicle(
            @PathVariable Long id,
            @RequestParam Long userId
    ) {
        try {
            vehicleService.deleteVehicle(id, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<VehicleResponse>> getUserVehicles(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<VehicleResponse> vehicles = vehicleService.getUserVehicles(userId, pageable);
        return ResponseEntity.ok(vehicles);
    }

    @PostMapping("/{id}/view")
    public ResponseEntity<?> incrementViews(@PathVariable Long id) {
        try {
            vehicleService.incrementViews(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    private static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}

