package com.ninos.service.admin;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ninos.model.dto.BookCarDTO;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.entity.BookCar;
import com.ninos.model.entity.Car;
import com.ninos.model.enums.BookCarStatus;
import com.ninos.repository.BookCarRepository;
import com.ninos.repository.CarRepository;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl implements AdminService{

    private final CarRepository carRepository;
    private final BookCarRepository bookCarRepository;


    @Override
    public boolean postCar(CarDTO carDTO) throws IOException {
        try {
            Car car = new Car();
            car.setBrand(carDTO.getBrand());
            car.setName(carDTO.getName());
            car.setYear(carDTO.getYear());
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

    @Override
    public List<CarDTO> getAllCars() {
        List<Car> cars = carRepository.findAll();
        return cars.stream().map(Car::getCarDto).collect(Collectors.toList());
    }

    @Override
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    @Override
    public CarDTO getCarById(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        return optionalCar.map(Car::getCarDto).orElse(null);
    }



    @Override
    public boolean updateCar(Long carId, CarDTO carDTO) throws IOException {
        Optional<Car> optionalCar = carRepository.findById(carId);

        if(optionalCar.isPresent()){
            Car existingCar = optionalCar.get();
            if(carDTO.getImage() != null)
                existingCar.setImage(carDTO.getImage().getBytes());

            existingCar.setPrice(carDTO.getPrice());
            existingCar.setYear(carDTO.getYear());
            existingCar.setType(carDTO.getType());
            existingCar.setDescription(carDTO.getDescription());
            existingCar.setTransmission(carDTO.getTransmission());
            existingCar.setColor(carDTO.getColor());
            existingCar.setName(carDTO.getName());
            existingCar.setBrand(carDTO.getBrand());
            carRepository.save(existingCar);
            return true;
        } else{
        return false;
        }
    }


    @Override
    public List<BookCarDTO> getBookings() {
        List<BookCar> cars = bookCarRepository.findAll();
        return cars.stream().map(BookCar::getBookCatDto).collect(Collectors.toList());
    }

    @Override
    public boolean changeBookingStatus(Long bookingId, String status) {
        Optional<BookCar> optionalBookCar = bookCarRepository.findById(bookingId);
        if(optionalBookCar.isPresent()){
            BookCar existingBookCar = optionalBookCar.get();
            if(Objects.equals(status, "Approve")){
                existingBookCar.setBookCarStatus(BookCarStatus.APPROVED);
            }
            else{
                existingBookCar.setBookCarStatus(BookCarStatus.REJECTED);
            }
            bookCarRepository.save(existingBookCar);
            return true;
        }

         return false;
    }


}
