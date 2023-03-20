package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name="v_date_info")
public class VolunteerDateInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date volunteerDate;
    private int maximumAmount;

}
