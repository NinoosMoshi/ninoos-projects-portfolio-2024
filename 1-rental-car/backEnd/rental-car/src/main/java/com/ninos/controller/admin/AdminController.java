package com.ninos.controller.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.CarDTO;
import com.ninos.service.admin.AdminService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {


    private final AdminService adminService;


    @PostMapping("/car")
    public ResponseEntity<?> postCar(@ModelAttribute CarDTO carDTO) throws IOException {
        boolean success = adminService.postCar(carDTO);
        if(success){
            return ResponseEntity.status(HttpStatus.CREATED).build();
        }else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }


//    @GetMapping("/cars")
//    public ResponseEntity<?> getAllCars(){
//        return ResponseEntity.ok(adminService.getAllCars());
//    }

    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCategories(){
        List<CarDTO> allCars = adminService.getAllCars();
        return ResponseEntity.ok(allCars);
    }




}
