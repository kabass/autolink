package com.autolink.api.service;

import com.autolink.api.dto.VehicleResponse;
import com.autolink.api.entity.Favorite;
import com.autolink.api.entity.User;
import com.autolink.api.entity.Vehicle;
import com.autolink.api.repository.FavoriteRepository;
import com.autolink.api.repository.UserRepository;
import com.autolink.api.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final VehicleService vehicleService;

    @Transactional
    public Favorite addFavorite(Long userId, Long vehicleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        if (favoriteRepository.existsByUserAndVehicle(user, vehicle)) {
            throw new RuntimeException("Vehicle already in favorites");
        }

        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setVehicle(vehicle);
        
        Favorite savedFavorite = favoriteRepository.save(favorite);
        
        // Incrémenter le compteur de favoris
        vehicle.setFavoritesCount(vehicle.getFavoritesCount() + 1);
        vehicleRepository.save(vehicle);
        
        return savedFavorite;
    }

    @Transactional
    public void removeFavorite(Long userId, Long vehicleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        favoriteRepository.deleteByUserAndVehicle(user, vehicle);
        
        // Décrémenter le compteur de favoris
        vehicle.setFavoritesCount(Math.max(0, vehicle.getFavoritesCount() - 1));
        vehicleRepository.save(vehicle);
    }

    public boolean isFavorite(Long userId, Long vehicleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        return favoriteRepository.existsByUserAndVehicle(user, vehicle);
    }

    public Page<VehicleResponse> getUserFavorites(Long userId, Pageable pageable) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteRepository.findByUser(user, pageable)
                .map(favorite -> vehicleService.getVehicleById(favorite.getVehicle().getId())
                        .orElseThrow(() -> new RuntimeException("Vehicle not found")));
    }
}

