package com.ninos.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ninos.model.dto.ReservationDTO;
import com.ninos.model.enums.ReservationStatus;

@Entity
@Getter
@Setter
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tableType;

    private String description;

    private Date dateTime;

    private String timePicker;

    private ReservationStatus reservationStatus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;


    public ReservationDTO getREservationDto(){
      ReservationDTO reservationDTO = new ReservationDTO();
      reservationDTO.setId(id);
      reservationDTO.setTableType(tableType);
      reservationDTO.setReservationStatus(reservationStatus);
      reservationDTO.setDescription(description);
      reservationDTO.setDateTime(dateTime);
      reservationDTO.setTimePicker(timePicker);
      reservationDTO.setCustomerId(user.getId());
      reservationDTO.setCustomerName(user.getName());
      return reservationDTO;
    }


}
