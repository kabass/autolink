package com.autolink.api.repository;

import com.autolink.api.entity.Favorite;
import com.autolink.api.entity.User;
import com.autolink.api.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Optional<Favorite> findByUserAndVehicle(User user, Vehicle vehicle);
    boolean existsByUserAndVehicle(User user, Vehicle vehicle);
    Page<Favorite> findByUser(User user, Pageable pageable);
    void deleteByUserAndVehicle(User user, Vehicle vehicle);
}

