package com.ninos.service.customer;

import java.util.List;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;

public interface CustomerService {

    List<CategoryDTO> getAllCategories();

    List<CategoryDTO> getAllCategoriesByName(String name);

    List<ProductDTO> getAllProductsByCategory(Long categoryId);

    List<ProductDTO> getProductsByCategoryIdAndName(Long categoryId, String title);

}
