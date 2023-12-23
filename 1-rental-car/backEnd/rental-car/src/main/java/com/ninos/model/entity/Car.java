package com.ninos.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

import com.ninos.model.dto.CarDTO;

@Data
@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String name;
    private String type;
    private String transmission;
    private String color;
    private Date year;
    private Long price;

    @Lob
    private String description;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] image;


    public CarDTO getCarDto(){
        CarDTO carDTO = new CarDTO();
        carDTO.setId(id);
        carDTO.setName(name);
        carDTO.setBrand(brand);
        carDTO.setColor(color);
        carDTO.setPrice(price);
        carDTO.setDescription(description);
        carDTO.setType(type);
        carDTO.setTransmission(transmission);
        carDTO.setYear(year);
        carDTO.setReturnImage(image);
        return carDTO;
    }


}
