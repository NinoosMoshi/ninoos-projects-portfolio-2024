package com.ninos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.BookCar;

public interface BookCarRepository extends JpaRepository<BookCar,Long> {
}
