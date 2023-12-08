package com.ninos.service.admin;

import java.io.IOException;
import java.util.List;

import com.ninos.model.dto.CarDTO;

public interface AdminService {

    boolean postCar(CarDTO carDTO) throws IOException;

    List<CarDTO> getAllCars();

    void deleteCar(Long id);



}
