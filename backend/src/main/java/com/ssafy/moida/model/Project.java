package com.ssafy.moida.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.sql.Date;

@Entity
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long amount;
    private Long target_amount;
    private Date start_date;
    private Date end_date;
    private String subject;
    private String description;
    private int generation;
    private Category category; //SQUIRREL, CRANE, WILD_ANIMAL

}
