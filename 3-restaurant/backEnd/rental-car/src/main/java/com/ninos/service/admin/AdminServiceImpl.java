package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.entity.Category;
import com.ninos.model.entity.Product;
import com.ninos.repository.CategoryRepository;
import com.ninos.repository.ProductRepository;


@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;


    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) throws IOException {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setImg(categoryDTO.getImg().getBytes());


        return categoryRepository.save(category).getDto();
    }

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
    public ProductDTO addProduct(Long categoryId, ProductDTO productDTO) throws IOException {
        Optional<Category> category = categoryRepository.findById(categoryId);
        if(category.isPresent()){
            Product product = new Product();
            BeanUtils.copyProperties(productDTO, product);
            product.setImg(productDTO.getImg().getBytes());
            product.setCategory(category.get());
            Product createdProduct = productRepository.save(product);

            ProductDTO createdProductDTO = new ProductDTO();
            createdProductDTO.setId(createdProduct.getId());
            return createdProductDTO;
        }
        return null;
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
