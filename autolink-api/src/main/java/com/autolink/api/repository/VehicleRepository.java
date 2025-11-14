package com.autolink.api.repository;

import com.autolink.api.entity.User;
import com.autolink.api.entity.Vehicle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long>, JpaSpecificationExecutor<Vehicle> {
    Page<Vehicle> findByIsActiveTrue(Pageable pageable);
    List<Vehicle> findByUserId(Long userId);
    Page<Vehicle> findByUserId(Long userId, Pageable pageable);
    
    @Query("SELECT v FROM Vehicle v WHERE v.isActive = true AND " +
           "(:query IS NULL OR LOWER(v.make) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(v.model) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<Vehicle> searchVehicles(@Param("query") String query, Pageable pageable);
}

