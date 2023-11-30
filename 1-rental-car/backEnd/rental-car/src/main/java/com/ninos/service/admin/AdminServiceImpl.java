package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.CarDTO;
import com.ninos.model.entity.Car;
import com.ninos.repository.CarRepository;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;


    @Override
    public boolean postCar(CarDTO carDTO) throws IOException {
        try {
            Car car = new Car();
            car.setBrand(carDTO.getBrand());
            car.setName(carDTO.getName());
            car.setDate(carDTO.getDate());
            car.setColor(carDTO.getColor());
            car.setType(carDTO.getType());
            car.setPrice(carDTO.getPrice());
            car.setDescription(carDTO.getDescription());
            car.setTransmission(carDTO.getTransmission());
            car.setImage(carDTO.getImage().getBytes());
            carRepository.save(car);
            return true;
        }
        catch (Exception e){
            return false;
        }
    }



}
