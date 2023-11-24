package com.ninos.service.customer.customer_dashboard;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.ProductDTO;
import com.ninos.model.entity.Product;
import com.ninos.repository.ProductRepository;

@AllArgsConstructor
@Service
public class CustomerProductServiceImpl implements CustomerProductService{


    private final ProductRepository productRepository;

    @Override
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(Product::getDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> getAllProductsByName(String name) {
        List<Product> products = productRepository.findAllByNameContaining(name);
        return products.stream().map(Product::getDto).collect(Collectors.toList());
    }


}
