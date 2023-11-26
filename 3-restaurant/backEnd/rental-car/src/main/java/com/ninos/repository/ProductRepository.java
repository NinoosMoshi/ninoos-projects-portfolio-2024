package com.ninos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findAllByCategoryId(Long categoryId);

    List<Product> findAllByCategoryIdAndNameContaining(Long categoryId, String title);
}
