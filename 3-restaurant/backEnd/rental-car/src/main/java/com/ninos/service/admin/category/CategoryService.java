package com.ninos.service.admin.category;

import java.io.IOException;

import com.ninos.model.dto.CategoryDTO;

public interface CategoryService {

    CategoryDTO addCategory(CategoryDTO categoryDTO) throws IOException;

}

