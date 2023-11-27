package com.ninos.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import com.ninos.model.enums.ReservationStatus;

@Getter
@Setter
public class ReservationDTO {

    private Long id;

    private String tableType;

    private String description;

    private Date dateTime;

    private String timePicker;

    private ReservationStatus reservationStatus;

    private Long customerId;

    private String customerName;

}
