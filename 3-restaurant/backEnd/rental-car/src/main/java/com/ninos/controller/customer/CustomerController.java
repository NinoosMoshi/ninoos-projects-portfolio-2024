package com.ninos.controller.customer;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CategoryDTO;
import com.ninos.model.dto.ProductDTO;
import com.ninos.model.dto.ReservationDTO;
import com.ninos.service.customer.CustomerService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;


    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDTO>> getAllCategories(){
        List<CategoryDTO> allCategories = customerService.getAllCategories();
        return ResponseEntity.ok(allCategories);
    }


    @GetMapping("/categories/search/{name}")
    public ResponseEntity<List<CategoryDTO>> getAllCategoriesByTitle(@PathVariable String name){
        List<CategoryDTO> allCategories = customerService.getAllCategoriesByName(name);
        return ResponseEntity.ok(allCategories);
    }


    @GetMapping("/{categoryId}/products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(@PathVariable Long categoryId){
        List<ProductDTO> allProducts = customerService.getAllProductsByCategory(categoryId);
        return ResponseEntity.ok(allProducts);
    }


    @GetMapping("/{categoryId}/product/{title}")
    public ResponseEntity<List<ProductDTO>> getAllProductsByCategoryAndTitle(@PathVariable Long categoryId,
                                                                             @PathVariable String title){
        List<ProductDTO> allProducts = customerService.getProductsByCategoryIdAndName(categoryId,title);
        return ResponseEntity.ok(allProducts);
    }


    @PostMapping("/reservation")
    public ResponseEntity<?> postReservation(@RequestBody ReservationDTO reservationDTO) throws IOException {
        ReservationDTO postedReservationDto = customerService.postReservation(reservationDTO);
        if(postedReservationDto == null) return new ResponseEntity<>("Something went wrong", HttpStatus.BAD_REQUEST);
        return ResponseEntity.status(HttpStatus.CREATED).body(postedReservationDto);
    }


    @GetMapping("/reservations/{customerId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable Long customerId){
        List<ReservationDTO> reservationDTOList = customerService.getReservationByUser(customerId);
        if(reservationDTOList == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(reservationDTOList);
    }


}
