package com.ninos.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

@Data
public class CarDTO {

    private Long id;
    private String brand;
    private String name;
    private String type;
    private String transmission;
    private String color;
    private Date date;
    private BigDecimal price;
    private String description;
    private MultipartFile image;

    private byte[] returnImage;

}
