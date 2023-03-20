package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Nft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Column(name = "external_url")
    private String externalUrl;
    private String image;
    private String name;
    @Column(name = "reg_date")
    private Timestamp regDate;
}
