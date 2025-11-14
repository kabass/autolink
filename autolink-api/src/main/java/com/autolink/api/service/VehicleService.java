package com.autolink.api.service;

import com.autolink.api.dto.VehicleRequest;
import com.autolink.api.dto.VehicleResponse;
import com.autolink.api.dto.VehicleSearchRequest;
import com.autolink.api.entity.User;
import com.autolink.api.entity.Vehicle;
import com.autolink.api.repository.UserRepository;
import com.autolink.api.repository.VehicleRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final UserRepository userRepository;

    public Page<VehicleResponse> searchVehicles(VehicleSearchRequest searchRequest) {
        Pageable pageable = PageRequest.of(searchRequest.getPage(), searchRequest.getSize());
        
        Specification<Vehicle> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            
            // Seulement les véhicules actifs
            predicates.add(cb.equal(root.get("isActive"), true));
            
            // Recherche par query
            if (searchRequest.getQuery() != null && !searchRequest.getQuery().isEmpty()) {
                String queryLower = searchRequest.getQuery().toLowerCase();
                Predicate makePredicate = cb.like(cb.lower(root.get("make")), "%" + queryLower + "%");
                Predicate modelPredicate = cb.like(cb.lower(root.get("model")), "%" + queryLower + "%");
                predicates.add(cb.or(makePredicate, modelPredicate));
            }
            
            // Filtre par marque
            if (searchRequest.getMake() != null && !searchRequest.getMake().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("make")), "%" + searchRequest.getMake().toLowerCase() + "%"));
            }
            
            // Filtre par modèle
            if (searchRequest.getModel() != null && !searchRequest.getModel().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("model")), "%" + searchRequest.getModel().toLowerCase() + "%"));
            }
            
            // Filtre par ville
            if (searchRequest.getCity() != null && !searchRequest.getCity().isEmpty() && !searchRequest.getCity().equals("all")) {
                predicates.add(cb.equal(cb.lower(root.get("city")), searchRequest.getCity().toLowerCase()));
            }
            
            // Filtre par kilométrage maximum
            if (searchRequest.getMaxMileage() != null && !searchRequest.getMaxMileage().isEmpty() && !searchRequest.getMaxMileage().equals("all")) {
                try {
                    Integer maxMileage = Integer.parseInt(searchRequest.getMaxMileage().replaceAll("\\D", ""));
                    predicates.add(cb.lessThanOrEqualTo(root.get("mileage"), maxMileage));
                } catch (NumberFormatException e) {
                    // Ignorer si le format n'est pas valide
                }
            }
            
            // Filtre par type (vente/location)
            if (searchRequest.getType() != null && !searchRequest.getType().equals("all")) {
                if (searchRequest.getType().equals("sale")) {
                    predicates.add(cb.equal(root.get("isRental"), false));
                } else if (searchRequest.getType().equals("rental")) {
                    predicates.add(cb.equal(root.get("isRental"), true));
                }
            }
            
            // Filtre par prix minimum
            if (searchRequest.getMinPrice() != null && !searchRequest.getMinPrice().isEmpty()) {
                try {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("price"), Double.parseDouble(searchRequest.getMinPrice())));
                } catch (NumberFormatException e) {
                    // Ignorer
                }
            }
            
            // Filtre par prix maximum
            if (searchRequest.getMaxPrice() != null && !searchRequest.getMaxPrice().isEmpty()) {
                try {
                    predicates.add(cb.lessThanOrEqualTo(root.get("price"), Double.parseDouble(searchRequest.getMaxPrice())));
                } catch (NumberFormatException e) {
                    // Ignorer
                }
            }
            
            // Filtre par année minimum
            if (searchRequest.getMinYear() != null && !searchRequest.getMinYear().isEmpty()) {
                try {
                    predicates.add(cb.greaterThanOrEqualTo(root.get("year"), Integer.parseInt(searchRequest.getMinYear())));
                } catch (NumberFormatException e) {
                    // Ignorer
                }
            }
            
            // Filtre par année maximum
            if (searchRequest.getMaxYear() != null && !searchRequest.getMaxYear().isEmpty()) {
                try {
                    predicates.add(cb.lessThanOrEqualTo(root.get("year"), Integer.parseInt(searchRequest.getMaxYear())));
                } catch (NumberFormatException e) {
                    // Ignorer
                }
            }
            
            // Filtre par type de carburant
            if (searchRequest.getFuelType() != null) {
                predicates.add(cb.equal(root.get("fuelType"), searchRequest.getFuelType()));
            }
            
            // Filtre par transmission
            if (searchRequest.getTransmission() != null) {
                predicates.add(cb.equal(root.get("transmission"), searchRequest.getTransmission()));
            }
            
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        
        return vehicleRepository.findAll(spec, pageable).map(this::mapToResponse);
    }

    public Optional<VehicleResponse> getVehicleById(Long id) {
        return vehicleRepository.findById(id)
                .filter(Vehicle::getIsActive)
                .map(this::mapToResponse);
    }

    @Transactional
    public VehicleResponse createVehicle(Long userId, VehicleRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Vehicle vehicle = new Vehicle();
        mapRequestToEntity(request, vehicle);
        vehicle.setUser(user);
        vehicle.setCreatedAt(LocalDateTime.now());
        vehicle.setUpdatedAt(LocalDateTime.now());

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return mapToResponse(savedVehicle);
    }

    @Transactional
    public VehicleResponse updateVehicle(Long id, Long userId, VehicleRequest request) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (!vehicle.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        mapRequestToEntity(request, vehicle);
        vehicle.setUpdatedAt(LocalDateTime.now());

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return mapToResponse(savedVehicle);
    }

    @Transactional
    public void deleteVehicle(Long id, Long userId) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (!vehicle.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        vehicle.setIsActive(false);
        vehicle.setUpdatedAt(LocalDateTime.now());
        vehicleRepository.save(vehicle);
    }

    public Page<VehicleResponse> getUserVehicles(Long userId, Pageable pageable) {
        return vehicleRepository.findByUserId(userId, pageable)
                .map(this::mapToResponse);
    }

    @Transactional
    public void incrementViews(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));
        vehicle.setViews(vehicle.getViews() + 1);
        vehicleRepository.save(vehicle);
    }

    private void mapRequestToEntity(VehicleRequest request, Vehicle vehicle) {
        if (request.getMake() != null) vehicle.setMake(request.getMake());
        if (request.getModel() != null) vehicle.setModel(request.getModel());
        if (request.getYear() != null) vehicle.setYear(request.getYear());
        if (request.getPrice() != null) vehicle.setPrice(request.getPrice());
        if (request.getRentalPricePerDay() != null) vehicle.setRentalPricePerDay(request.getRentalPricePerDay());
        if (request.getRentalPricePerWeek() != null) vehicle.setRentalPricePerWeek(request.getRentalPricePerWeek());
        if (request.getRentalPricePerMonth() != null) vehicle.setRentalPricePerMonth(request.getRentalPricePerMonth());
        if (request.getMileage() != null) vehicle.setMileage(request.getMileage());
        if (request.getFuelType() != null) vehicle.setFuelType(request.getFuelType());
        if (request.getTransmission() != null) vehicle.setTransmission(request.getTransmission());
        if (request.getSeats() != null) vehicle.setSeats(request.getSeats());
        if (request.getDoors() != null) vehicle.setDoors(request.getDoors());
        if (request.getColor() != null) vehicle.setColor(request.getColor());
        if (request.getCondition() != null) vehicle.setCondition(request.getCondition());
        if (request.getIsRental() != null) vehicle.setIsRental(request.getIsRental());
        if (request.getDescription() != null) vehicle.setDescription(request.getDescription());
        if (request.getImages() != null) vehicle.setImages(request.getImages());
        if (request.getFeatures() != null) vehicle.setFeatures(request.getFeatures());
        if (request.getCity() != null) vehicle.setCity(request.getCity());
        if (request.getLatitude() != null) vehicle.setLatitude(request.getLatitude());
        if (request.getLongitude() != null) vehicle.setLongitude(request.getLongitude());
        if (request.getAvailableFrom() != null) vehicle.setAvailableFrom(request.getAvailableFrom());
        if (request.getAvailableTo() != null) vehicle.setAvailableTo(request.getAvailableTo());
        if (request.getPickupLocation() != null) vehicle.setPickupLocation(request.getPickupLocation());
    }

    private VehicleResponse mapToResponse(Vehicle vehicle) {
        VehicleResponse response = new VehicleResponse();
        response.setId(vehicle.getId());
        response.setMake(vehicle.getMake());
        response.setModel(vehicle.getModel());
        response.setYear(vehicle.getYear());
        response.setPrice(vehicle.getPrice());
        response.setRentalPricePerDay(vehicle.getRentalPricePerDay());
        response.setRentalPricePerWeek(vehicle.getRentalPricePerWeek());
        response.setRentalPricePerMonth(vehicle.getRentalPricePerMonth());
        response.setMileage(vehicle.getMileage());
        response.setFuelType(vehicle.getFuelType());
        response.setTransmission(vehicle.getTransmission());
        response.setSeats(vehicle.getSeats());
        response.setDoors(vehicle.getDoors());
        response.setColor(vehicle.getColor());
        response.setCondition(vehicle.getCondition());
        response.setIsRental(vehicle.getIsRental());
        response.setDescription(vehicle.getDescription());
        response.setImages(vehicle.getImages());
        response.setFeatures(vehicle.getFeatures());
        response.setCity(vehicle.getCity());
        response.setLatitude(vehicle.getLatitude());
        response.setLongitude(vehicle.getLongitude());
        response.setAvailableFrom(vehicle.getAvailableFrom());
        response.setAvailableTo(vehicle.getAvailableTo());
        response.setPickupLocation(vehicle.getPickupLocation());
        response.setViews(vehicle.getViews());
        response.setFavoritesCount(vehicle.getFavoritesCount());
        response.setIsActive(vehicle.getIsActive());
        response.setUserId(vehicle.getUser().getId());
        response.setUserFirstName(vehicle.getUser().getFirstName());
        response.setUserLastName(vehicle.getUser().getLastName());
        response.setCreatedAt(vehicle.getCreatedAt());
        response.setUpdatedAt(vehicle.getUpdatedAt());
        return response;
    }
}

