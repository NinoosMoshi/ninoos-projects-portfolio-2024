package com.ninos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}