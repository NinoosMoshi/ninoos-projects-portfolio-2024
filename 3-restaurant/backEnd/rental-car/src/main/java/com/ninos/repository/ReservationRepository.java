package com.ninos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByUserId(Long customerId);

}
