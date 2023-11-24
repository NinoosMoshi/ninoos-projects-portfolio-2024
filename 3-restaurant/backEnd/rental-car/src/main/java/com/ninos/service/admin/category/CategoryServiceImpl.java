package com.ninos.service.admin.category;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.entity.Category;
import com.ninos.repository.CategoryRepository;


@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;


    @Override
    public CategoryDTO addCategory(CategoryDTO categoryDTO) throws IOException {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        category.setImg(categoryDTO.getImg().getBytes());


        return categoryRepository.save(category).getDto();
    }
}
