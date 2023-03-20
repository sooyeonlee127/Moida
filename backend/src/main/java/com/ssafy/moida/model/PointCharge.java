package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class PointCharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "reg_date")
    private Timestamp regDate;
    private Long amount;
}
