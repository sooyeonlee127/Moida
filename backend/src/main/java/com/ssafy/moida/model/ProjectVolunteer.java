package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="p_volunteer")
public class ProjectVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double difficultyLevel;
    private Date startDate;
    private Date endDate;
    private String location;
    private String description;
}
