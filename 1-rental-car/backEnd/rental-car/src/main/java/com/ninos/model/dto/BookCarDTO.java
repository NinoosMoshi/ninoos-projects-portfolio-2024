package com.ninos.model.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BookCarDTO {

    private Long id;
    private Date fromDate;
    private Date toDate;
    private Long days;
    private Long price;

    private Long userId;
    private Long carId;


}
