package com.ninos.service.customer;

import java.util.List;

import com.ninos.model.dto.CategoryDTO;

public interface CustomerService {

    List<CategoryDTO> getAllCategories();

    List<CategoryDTO> getAllCategoriesByName(String name);

}
