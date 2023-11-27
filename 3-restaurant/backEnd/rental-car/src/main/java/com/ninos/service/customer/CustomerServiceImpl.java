package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.dto.ReservationDTO;
import com.ninos.model.entity.Category;
import com.ninos.model.entity.Product;
import com.ninos.model.entity.Reservation;
import com.ninos.model.entity.User;
import com.ninos.model.enums.ReservationStatus;
import com.ninos.repository.CategoryRepository;
import com.ninos.repository.ProductRepository;
import com.ninos.repository.ReservationRepository;
import com.ninos.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;


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


    @Override
    public ReservationDTO postReservation(ReservationDTO reservationDTO) {
        Optional<User> optionalUser = userRepository.findById(reservationDTO.getCustomerId());
        if(optionalUser.isPresent()){
            Reservation reservation = new Reservation();
            reservation.setTableType(reservationDTO.getTableType());
            reservation.setDateTime(reservationDTO.getDateTime());
            reservation.setTimePicker(reservationDTO.getTimePicker());
            reservation.setDescription(reservationDTO.getDescription());
            reservation.setUser(optionalUser.get());
            reservation.setReservationStatus(ReservationStatus.PENDING);
            Reservation postedReservation = reservationRepository.save(reservation);

            ReservationDTO postedReservationDto = new ReservationDTO();
            postedReservationDto.setId(postedReservation.getId());
            return postedReservationDto;
        }
        return null;
    }



    @Override
    public List<ReservationDTO> getReservationByUser(Long customerId) {
       return reservationRepository.findAllByUserId(customerId).stream().map(Reservation::getREservationDto).collect(Collectors.toList());
    }


}
