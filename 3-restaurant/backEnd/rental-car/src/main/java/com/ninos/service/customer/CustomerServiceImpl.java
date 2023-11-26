package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.entity.Category;
import com.ninos.model.entity.Product;
import com.ninos.repository.CategoryRepository;
import com.ninos.repository.ProductRepository;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;


    @Override
    public List<CategoryDTO> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(Category::getDto).collect(Collectors.toList());
    }


    @Override
    public List<CategoryDTO> getAllCategoriesByName(String name) {
        List<Category> categories = categoryRepository.findAllByNameContaining(name);
        return categories.stream().map(Category::getDto).collect(Collectors.toList());
    }


    @Override
    public List<ProductDTO> getAllProductsByCategory(Long categoryId) {
        return productRepository.findAllByCategoryId(categoryId).stream().map(Product::getProductDto).collect(Collectors.toList());
    }


    @Override
    public List<ProductDTO> getProductsByCategoryIdAndName(Long categoryId, String title) {
        return productRepository.findAllByCategoryIdAndNameContaining(categoryId,title).stream().map(Product::getProductDto).collect(Collectors.toList());
    }



}
