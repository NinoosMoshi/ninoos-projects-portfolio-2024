package com.ninos.controller.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ninos.model.dto.BookCarDTO;
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


    @GetMapping("/cars")
    public ResponseEntity<List<CarDTO>> getAllCategories(){
        List<CarDTO> allCars = adminService.getAllCars();
        return ResponseEntity.ok(allCars);
    }


    @DeleteMapping("/car/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id){
        adminService.deleteCar(id);
        return ResponseEntity.ok(null);
    }


    @GetMapping("/car/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long id){
        CarDTO carDTO = adminService.getCarById(id);
        return ResponseEntity.ok(carDTO);
    }


    @PutMapping("/car/{carId}")
    public ResponseEntity<Void> updateCar(@PathVariable Long carId, @ModelAttribute CarDTO carDTO) throws IOException{
        try {
            boolean success = adminService.updateCar(carId,carDTO);
            if(success) return ResponseEntity.status(HttpStatus.OK).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        catch(Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }



     @GetMapping("/car/bookings")
     public ResponseEntity<List<BookCarDTO>> getBookings(){
        return ResponseEntity.ok(adminService.getBookings());
     }


     @GetMapping("/car/booking/{bookingId}/{status}")
     public ResponseEntity<?> changeBookingStatus(@PathVariable Long bookingId, @PathVariable String status){
         boolean success = adminService.changeBookingStatus(bookingId, status);
         if (success) return ResponseEntity.ok().build();
         return ResponseEntity.notFound().build();
     }




}
