package com.ssafy.moida.api.common;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateTransactionDto {
    private String hash;
    private String fromHash;
    private String toHash;
    private String nonce;
    private int gas;
    private String gasPrice;
    private String maxFeePerGas;
    private String maxPriorityFeePerGas;
    private String r;
    private String s;
    private String v;
    private String value;
    private String input;
}
