package com.ninos.service.customer;

import java.util.List;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.dto.ReservationDTO;

public interface CustomerService {

    List<CategoryDTO> getAllCategories();

    List<CategoryDTO> getAllCategoriesByName(String name);

    List<ProductDTO> getAllProductsByCategory(Long categoryId);

    List<ProductDTO> getProductsByCategoryIdAndName(Long categoryId, String title);

    ReservationDTO postReservation(ReservationDTO reservationDTO);

    List<ReservationDTO> getReservationByUser(Long customerId);
}
