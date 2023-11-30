package com.ninos.service.admin;

import java.io.IOException;

import com.ninos.model.dto.CarDTO;

public interface AdminService {

    boolean postCar(CarDTO carDTO) throws IOException;


}
