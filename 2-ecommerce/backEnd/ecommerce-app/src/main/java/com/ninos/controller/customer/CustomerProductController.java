package com.ninos.controller.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.ProductDTO;
import com.ninos.service.customer.customer_dashboard.CustomerProductService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer")
public class CustomerProductController {


    private final CustomerProductService customerProductService;

    @GetMapping("/products")
    public ResponseEntity<List<ProductDTO>> getAllProduct(){
        List<ProductDTO> allProducts = customerProductService.getAllProducts();
        return ResponseEntity.ok(allProducts);
    }


    @GetMapping("/products/search/{name}")
    public ResponseEntity<List<ProductDTO>> getAllProductsByName(@PathVariable String name){
        List<ProductDTO> allProducts = customerProductService.getAllProductsByName(name);
        return ResponseEntity.ok(allProducts);
    }


}
