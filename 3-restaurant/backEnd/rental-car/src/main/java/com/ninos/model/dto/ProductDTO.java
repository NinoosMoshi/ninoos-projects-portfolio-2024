package com.ninos.model.dto;

import lombok.Data;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

@Data
public class ProductDTO {

    private Long id;
    private String name;
    private BigDecimal price;
    private String description;

    private byte[] returnedImg;
    private MultipartFile img;

    private Long categoryId;
    private String categoryName;

}