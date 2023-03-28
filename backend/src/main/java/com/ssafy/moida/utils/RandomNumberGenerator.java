package com.ssafy.moida.utils;

import java.util.Random;
import org.springframework.stereotype.Component;

/**
 * [세은] 랜덤 인증 코드 발급
 */
@Component
public class RandomNumberGenerator {
    public String generateRandomNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000; // 6자리 랜덤 숫자 생성
        return Integer.toString(randomNumber);
    }
}
