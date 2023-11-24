package com.ninos.controller.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.service.admin.category.CategoryService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/admin")
public class AdminCategoryController {


    private final CategoryService categoryService;

    @PostMapping("/category")
    public ResponseEntity<CategoryDTO> addCategory(@ModelAttribute CategoryDTO categoryDTO) throws IOException {
        CategoryDTO categoryDTO1 = categoryService.addCategory(categoryDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryDTO1);
    }


}
