package com.ninos.service.customer;

import java.util.List;

import com.ninos.model.dto.BookCarDTO;
import com.ninos.model.dto.CarDTO;

public interface CustomerService {

    List<CarDTO> getAllCars();

//    boolean bookCar(BookCarDTO bookCarDTO);
    boolean bookCar(Long carId,BookCarDTO bookCarDTO);

    CarDTO getCarById(long carId);

    List<BookCarDTO> getBookingsByUserId(Long userId);

}
