package com.ninos.service.admin;

import java.io.IOException;
import java.util.List;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.dto.ReservationDTO;

public interface AdminService {

    CategoryDTO addCategory(CategoryDTO categoryDTO) throws IOException;

    List<CategoryDTO> getAllCategories();

    List<CategoryDTO> getAllCategoriesByName(String name);

    ProductDTO addProduct(Long categoryId, ProductDTO productDTO) throws IOException;


    List<ProductDTO> getAllProductsByCategory(Long categoryId);

    List<ProductDTO> getProductsByCategoryIdAndName(Long categoryId, String title);

    void deleteProduct(Long productId);

    ProductDTO updateProduct(Long productId, ProductDTO productDTO) throws IOException;

    ProductDTO getProduct(Long productId);

    List<ReservationDTO> getAllReservations();

    ReservationDTO changeReservationStatus(Long reservationId, String status);
}

