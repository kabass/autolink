package com.autolink.api.config;

import com.autolink.api.entity.User;
import com.autolink.api.entity.Vehicle;
import com.autolink.api.entity.Favorite;
import com.autolink.api.repository.UserRepository;
import com.autolink.api.repository.VehicleRepository;
import com.autolink.api.repository.FavoriteRepository;
import com.autolink.api.service.KeycloakService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
@Profile("!prod")
@Slf4j
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;
    private final VehicleRepository vehicleRepository;
    private final FavoriteRepository favoriteRepository;
    private final KeycloakService keycloakService;

    @Override
    @Transactional
    public void run(String... args) {
        // Ne charger les données que si la base est vide
        if (userRepository.count() > 0) {
            System.out.println("Base de données déjà initialisée, skip des données de test");
            return;
        }

        System.out.println("Initialisation des données de test...");

        // Créer les utilisateurs
        User buyer1 = createUser("Jean", "Dupont", "jean.dupont@email.com", "password", 
                "+221 33 123 45 67", User.UserRole.BUYER, "Dakar", true);
        User seller1 = createUser("Marie", "Diop", "marie.diop@email.com", "password",
                "+221 33 987 65 43", User.UserRole.SELLER, "Dakar", true);
        createUser("Amadou", "Sarr", "amadou.sarr@email.com", "password",
                "+221 33 555 44 33", User.UserRole.SUPERVISOR, "Dakar", true);
        User seller2 = createUser("Fatou", "Ndiaye", "fatou.ndiaye@email.com", "password",
                "+221 33 111 22 33", User.UserRole.SELLER, "Thiès", true);
        User buyer2 = createUser("Ibrahima", "Ba", "ibrahima.ba@email.com", "password",
                "+221 33 444 55 66", User.UserRole.BUYER, "Kaolack", false);

        // Créer les véhicules à vendre
        Vehicle vehicle1 = createVehicle("Toyota", "Corolla", 2022, new BigDecimal("8500000"), null, null, null,
                15000, Vehicle.FuelType.ESSENCE, Vehicle.TransmissionType.AUTOMATIQUE, 5, 4, "Blanc", "Excellent",
                false, "Véhicule en excellent état, parfaitement entretenu. Première main, tous les entretiens effectués chez le concessionnaire officiel Toyota.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation automatique", "Système de navigation", "Bluetooth", "Vitres électriques")),
                "Dakar", 14.7167, -17.4677, null, null, null, seller1);

        Vehicle vehicle2 = createVehicle("Peugeot", "3008", 2023, new BigDecimal("12000000"), null, null, null,
                5000, Vehicle.FuelType.ESSENCE, Vehicle.TransmissionType.AUTOMATIQUE, 5, 5, "Noir", "Excellent",
                false, "SUV Peugeot 3008 en excellent état, très peu kilométré. Toutes les options, toit ouvrant panoramique.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation automatique", "Toit ouvrant", "GPS", "Caméra de recul")),
                "Dakar", 14.7167, -17.4677, null, null, null, seller1);

        Vehicle vehicle3 = createVehicle("Hyundai", "Tucson", 2023, new BigDecimal("9500000"), null, null, null,
                12000, Vehicle.FuelType.ESSENCE, Vehicle.TransmissionType.AUTOMATIQUE, 5, 5, "Bleu", "Excellent",
                false, "Hyundai Tucson 2023, très bon état. Climatisation, GPS, caméra de recul.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation", "GPS", "Caméra de recul", "Régulateur de vitesse")),
                "Dakar", 14.7167, -17.4677, null, null, null, seller2);

        createVehicle("Kia", "Sportage", 2023, new BigDecimal("7800000"), null, null, null,
                6000, Vehicle.FuelType.ESSENCE, Vehicle.TransmissionType.AUTOMATIQUE, 5, 5, "Gris", "Excellent",
                false, "Kia Sportage 2023, état impeccable. Première main, garantie constructeur encore valable.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation", "GPS", "Bluetooth", "Vitres électriques")),
                "Thiès", 14.7833, -16.9167, null, null, null, seller2);

        createVehicle("Mercedes-Benz", "Classe C", 2022, new BigDecimal("18000000"), null, null, null,
                18000, Vehicle.FuelType.DIESEL, Vehicle.TransmissionType.AUTOMATIQUE, 5, 4, "Noir", "Très bon",
                false, "Mercedes Classe C 2022, véhicule de prestige en très bon état. Intérieur cuir, toutes les options.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Sièges en cuir", "GPS premium", "Toit ouvrant", "Système audio premium")),
                "Dakar", 14.7167, -17.4677, null, null, null, seller1);

        // Créer les véhicules à louer
        createVehicle("Toyota", "Hilux", 2023, BigDecimal.ZERO, 
                new BigDecimal("35000"), new BigDecimal("200000"), new BigDecimal("700000"),
                8000, Vehicle.FuelType.DIESEL, Vehicle.TransmissionType.MANUELLE, 5, 4, "Gris", "Excellent",
                true, "Toyota Hilux 2023, parfait pour les déplacements longue distance. Très robuste et fiable.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation", "GPS", "Bluetooth", "4x4")),
                "Thiès", 14.7833, -16.9167, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 12, 31), "Thiès, Sénégal", seller1);

        createVehicle("Renault", "Duster", 2021, BigDecimal.ZERO,
                new BigDecimal("25000"), new BigDecimal("150000"), new BigDecimal("550000"),
                25000, Vehicle.FuelType.DIESEL, Vehicle.TransmissionType.MANUELLE, 5, 5, "Rouge", "Très bon",
                true, "Renault Duster 2021, SUV robuste idéal pour les routes sénégalaises. Disponible immédiatement.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation", "GPS", "4x4", "Bluetooth")),
                "Kaolack", 14.1500, -16.0833, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 12, 31), "Kaolack, Sénégal", seller2);

        createVehicle("Nissan", "Navara", 2021, BigDecimal.ZERO,
                new BigDecimal("30000"), new BigDecimal("180000"), new BigDecimal("650000"),
                30000, Vehicle.FuelType.DIESEL, Vehicle.TransmissionType.MANUELLE, 5, 4, "Blanc", "Très bon",
                true, "Nissan Navara 2021, pick-up confortable et spacieux. Parfait pour les familles et les professionnels.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Climatisation", "GPS", "Bluetooth", "Sièges confortables")),
                "Ziguinchor", 12.5833, -16.2667, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 12, 31), "Ziguinchor, Sénégal", seller1);

        createVehicle("Mercedes-Benz", "Classe C", 2022, BigDecimal.ZERO,
                new BigDecimal("45000"), new BigDecimal("280000"), new BigDecimal("950000"),
                18000, Vehicle.FuelType.DIESEL, Vehicle.TransmissionType.AUTOMATIQUE, 5, 4, "Noir", "Excellent",
                true, "Mercedes Classe C 2022 de luxe disponible à la location. Confort premium, toutes les options.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("Sièges en cuir", "GPS premium", "Toit ouvrant", "Système audio premium")),
                "Dakar", 14.7167, -17.4677, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 12, 31), "Dakar, Sénégal", seller1);

        createVehicle("BMW", "X5", 2023, BigDecimal.ZERO,
                new BigDecimal("50000"), new BigDecimal("300000"), new BigDecimal("1000000"),
                5000, Vehicle.FuelType.ESSENCE, Vehicle.TransmissionType.AUTOMATIQUE, 7, 5, "Blanc", "Excellent",
                true, "BMW X5 2023, SUV de luxe 7 places. Parfait pour les familles nombreuses. Disponible à la location.",
                new ArrayList<>(Arrays.asList(
                        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop"
                )),
                new ArrayList<>(Arrays.asList("7 places", "Sièges en cuir", "GPS premium", "Toit panoramique")),
                "Dakar", 14.7167, -17.4677, LocalDate.of(2024, 1, 1), LocalDate.of(2024, 12, 31), "Dakar, Sénégal", seller1);

        // Créer des favoris
        createFavorite(buyer1, vehicle1);
        createFavorite(buyer1, vehicle2);
        createFavorite(buyer2, vehicle3);

        System.out.println("✅ Données de test initialisées avec succès!");
        System.out.println("   - " + userRepository.count() + " utilisateurs");
        System.out.println("   - " + vehicleRepository.count() + " véhicules");
        System.out.println("   - " + favoriteRepository.count() + " favoris");
    }

    private User createUser(String firstName, String lastName, String email, String password,
                           String phone, User.UserRole role, String city, boolean isVerified) {
        // Try to create user in Keycloak first (if available)
        try {
            if (!keycloakService.userExists(email)) {
                keycloakService.createUser(email, password, firstName, lastName);
                log.info("User created in Keycloak: {}", email);
            }
        } catch (Exception e) {
            log.warn("Failed to create user in Keycloak for {}: {}. Continuing with database user creation.", 
                email, e.getMessage());
        }
        
        // Create user in database
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        // Passwords are managed exclusively in Keycloak; do not store locally
        user.setPassword(null);
        user.setPhone(phone);
        user.setRole(role);
        user.setCity(city);
        user.setIsVerified(isVerified);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

    private Vehicle createVehicle(String make, String model, Integer year, BigDecimal price,
                                 BigDecimal rentalPricePerDay, BigDecimal rentalPricePerWeek, BigDecimal rentalPricePerMonth,
                                 Integer mileage, Vehicle.FuelType fuelType, Vehicle.TransmissionType transmission,
                                 Integer seats, Integer doors, String color, String condition, Boolean isRental,
                                 String description, List<String> images, List<String> features,
                                 String city, Double latitude, Double longitude,
                                 LocalDate availableFrom, LocalDate availableTo, String pickupLocation,
                                 User user) {
        Vehicle vehicle = new Vehicle();
        vehicle.setMake(make);
        vehicle.setModel(model);
        vehicle.setYear(year);
        vehicle.setPrice(price);
        vehicle.setRentalPricePerDay(rentalPricePerDay);
        vehicle.setRentalPricePerWeek(rentalPricePerWeek);
        vehicle.setRentalPricePerMonth(rentalPricePerMonth);
        vehicle.setMileage(mileage);
        vehicle.setFuelType(fuelType);
        vehicle.setTransmission(transmission);
        vehicle.setSeats(seats);
        vehicle.setDoors(doors);
        vehicle.setColor(color);
        vehicle.setCondition(condition);
        vehicle.setIsRental(isRental);
        vehicle.setDescription(description);
        vehicle.setImages(images);
        vehicle.setFeatures(features);
        vehicle.setCity(city);
        vehicle.setLatitude(latitude);
        vehicle.setLongitude(longitude);
        vehicle.setAvailableFrom(availableFrom);
        vehicle.setAvailableTo(availableTo);
        vehicle.setPickupLocation(pickupLocation);
        vehicle.setViews(0);
        vehicle.setFavoritesCount(0);
        vehicle.setIsActive(true);
        vehicle.setUser(user);
        vehicle.setCreatedAt(LocalDateTime.now());
        vehicle.setUpdatedAt(LocalDateTime.now());
        return vehicleRepository.save(vehicle);
    }

    private void createFavorite(User user, Vehicle vehicle) {
        Favorite favorite = new Favorite();
        favorite.setUser(user);
        favorite.setVehicle(vehicle);
        favorite.setCreatedAt(LocalDateTime.now());
        favoriteRepository.save(favorite);
        
        // Mettre à jour le compteur
        vehicle.setFavoritesCount(vehicle.getFavoritesCount() + 1);
        vehicleRepository.save(vehicle);
    }
}

