package com.ninos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {

     Optional<CartItems> findByProductIdAndOrderIdAndUserId(Long productId, Long orderId, Long userId);

}
