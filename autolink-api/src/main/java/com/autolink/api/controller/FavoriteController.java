package com.autolink.api.controller;

import com.autolink.api.dto.VehicleResponse;
import com.autolink.api.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FavoriteController {
    private final FavoriteService favoriteService;

    @PostMapping
    public ResponseEntity<?> addFavorite(
            @RequestParam Long userId,
            @RequestParam Long vehicleId
    ) {
        try {
            favoriteService.addFavorite(userId, vehicleId);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @DeleteMapping
    public ResponseEntity<?> removeFavorite(
            @RequestParam Long userId,
            @RequestParam Long vehicleId
    ) {
        try {
            favoriteService.removeFavorite(userId, vehicleId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    @GetMapping("/check")
    public ResponseEntity<Boolean> isFavorite(
            @RequestParam Long userId,
            @RequestParam Long vehicleId
    ) {
        try {
            boolean isFavorite = favoriteService.isFavorite(userId, vehicleId);
            return ResponseEntity.ok(isFavorite);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(false);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<VehicleResponse>> getUserFavorites(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<VehicleResponse> favorites = favoriteService.getUserFavorites(userId, pageable);
            return ResponseEntity.ok(favorites);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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

