package com.ninos.service.customer;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import com.ninos.model.dto.BookCarDTO;
import com.ninos.model.dto.CarDTO;
import com.ninos.model.dto.CarDtoListDTO;
import com.ninos.model.dto.SearchCarDTO;
import com.ninos.model.entity.BookCar;
import com.ninos.model.entity.Car;
import com.ninos.model.entity.User;
import com.ninos.model.enums.BookCarStatus;
import com.ninos.repository.BookCarRepository;
import com.ninos.repository.CarRepository;
import com.ninos.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class CustomerServiceImpl implements CustomerService{

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final BookCarRepository bookCarRepository;


    @Override
    public List<CarDTO> getAllCars() {
        return carRepository.findAll().stream().map(Car::getCarDto).collect(Collectors.toList());
    }



//    @Override
//    public boolean bookCar(BookCarDTO bookCarDTO) {
//        Optional<Car> optionalCar = carRepository.findById(bookCarDTO.getCarId());
//        Optional<User> optionalUser = userRepository.findById(bookCarDTO.getUserId());
//
//        if(optionalCar.isPresent() && optionalUser.isPresent()){
//            Car existingCar = optionalCar.get();
//            BookCar bookCar = new BookCar();
//            bookCar.setUser(optionalUser.get());
//            bookCar.setCar(existingCar);
//            bookCar.setBookCarStatus(BookCarStatus.PENDING);
//
////            bookCar.setFromDate(bookCarDTO.getFromDate());
////            bookCar.setToDate(bookCarDTO.getToDate());
//
//            long diffInMilliSeconds = bookCarDTO.getToDate().getTime() - bookCarDTO.getFromDate().getTime();
//            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);
//
//            bookCar.setDays(days);
//            bookCar.setPrice(existingCar.getPrice() * days);
//            bookCarRepository.save(bookCar);
//
//            return true;
//        }
//
//        return false;
//    }

    @Override
    public boolean bookCar(Long carId, BookCarDTO bookCarDTO) {
        User  user = null;
        Car car = null;

//        Optional<Car> optionalCar = carRepository.findById(bookCarDTO.getCarId());
        Optional<Car> optionalCar = carRepository.findById(carId);
        Optional<User> optionalUser = userRepository.findById(bookCarDTO.getUserId());

        if(optionalCar.isPresent() && optionalUser.isPresent()){
            Car existingCar = optionalCar.get();
            BookCar bookCar = new BookCar();
            bookCar.setUser(optionalUser.get());
            bookCar.setCar(existingCar);
            bookCar.setBookCarStatus(BookCarStatus.PENDING);

            bookCar.setFromDate(bookCarDTO.getFromDate());
            bookCar.setToDate(bookCarDTO.getToDate());

            long diffInMilliSeconds = bookCarDTO.getToDate().getTime() - bookCarDTO.getFromDate().getTime();
            long days = TimeUnit.MILLISECONDS.toDays(diffInMilliSeconds);

            bookCar.setDays(days);
            bookCar.setPrice(existingCar.getPrice() * days);
            bookCarRepository.save(bookCar);

            return true;
        }
        else{
        return false;
        }


    }






    @Override
    public CarDTO getCarById(long carId) {
        Optional<Car> optionalCar = carRepository.findById(carId);
//        return optionalCar.map(Car::getCarDto).orElse(null);
        if(optionalCar.isPresent()){
            return optionalCar.get().getCarDto();
        }else{
            return null;
        }
    }


    @Override
    public List<BookCarDTO> getBookingsByUserId(Long userId) {
        return bookCarRepository.findAllByUserId(userId).stream().map(BookCar::getBookCatDto).collect(Collectors.toList());
    }


    @Override
    public CarDtoListDTO searchCar(SearchCarDTO searchCarDTO) {
        Car car = new Car();
        car.setBrand(searchCarDTO.getBrand());
        car.setType(searchCarDTO.getType());
        car.setTransmission(searchCarDTO.getTransmission());
        car.setColor(searchCarDTO.getColor());

        ExampleMatcher exampleMatcher = ExampleMatcher.matchingAll()
                .withMatcher("brand", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("type", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("transmission", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase())
                .withMatcher("color", ExampleMatcher.GenericPropertyMatchers.contains().ignoreCase());

        Example<Car> carExample = Example.of(car,exampleMatcher);
        List<Car> carList = carRepository.findAll(carExample);
        CarDtoListDTO carDtoListDTO = new CarDtoListDTO();
        carDtoListDTO.setCarDTOList(carList.stream().map(Car::getCarDto).collect(Collectors.toList()));

        return carDtoListDTO;
    }


}
