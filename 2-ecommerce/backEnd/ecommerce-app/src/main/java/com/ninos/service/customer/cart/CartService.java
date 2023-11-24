package com.ninos.service.customer.cart;

import org.springframework.http.ResponseEntity;

import com.ninos.model.dto.AddProductInCartDTO;

public interface CartService {

    ResponseEntity<?> addProductToCart(AddProductInCartDTO addProductInCartDTO);
}
