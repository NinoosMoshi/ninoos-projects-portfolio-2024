package com.ninos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ninos.model.entity.Order;
import com.ninos.model.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order,Long> {

    Order findByUserIdAndOrderStatus(Long userId, OrderStatus orderStatus);

}
