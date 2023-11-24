package com.ninos.model.dto;


import lombok.Data;

import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryDTO {

    private Long id;
    private String name;
    private String description;

    private byte[] byteImg;
    private MultipartFile img;

}