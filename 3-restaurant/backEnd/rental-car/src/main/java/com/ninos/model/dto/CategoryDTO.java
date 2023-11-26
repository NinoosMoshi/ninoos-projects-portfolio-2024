package com.ninos.model.dto;


import lombok.Data;

import org.springframework.web.multipart.MultipartFile;

@Data
public class CategoryDTO {

    private Long id;
    private String name;
    private String description;

    private MultipartFile img;  // to save image
    private byte[] byteImg;     // to retrieve image

}