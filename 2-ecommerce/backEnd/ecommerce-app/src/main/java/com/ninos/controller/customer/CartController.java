package com.ninos.controller.customer;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.AddProductInCartDTO;
import com.ninos.service.customer.cart.CartService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer")
public class CartController {

    private final CartService cartService;

    @PostMapping("/cart")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductInCartDTO addProductInCartDTO){
        return cartService.addProductToCart(addProductInCartDTO);
    }

}
