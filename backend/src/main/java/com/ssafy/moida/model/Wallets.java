package com.ssafy.moida.model;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Wallets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String address;
    private BigDecimal balance;
    //@Column(name = "receiving_count")
    private int receivingCount;
    private int cash;
}
