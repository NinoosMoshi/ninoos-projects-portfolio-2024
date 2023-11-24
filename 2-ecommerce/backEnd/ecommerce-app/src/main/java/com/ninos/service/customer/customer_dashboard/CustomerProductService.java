package com.ninos.service.customer.customer_dashboard;

import java.util.List;

import com.ninos.model.dto.ProductDTO;

public interface CustomerProductService {

    List<ProductDTO> getAllProducts();
    List<ProductDTO> getAllProductsByName(String name);

}
