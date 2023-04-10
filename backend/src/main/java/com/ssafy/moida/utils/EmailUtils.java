package com.ssafy.moida.utils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.util.Random;

/**
 * email에 관련된 각종 함수를 처리하는 서비스
 * */

@Slf4j
@Component
public class EmailUtils {
    private final JavaMailSender emailSender;

    private String code;

    public EmailUtils(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    /**
     * [한선영] 인증코드 생성
     * @return key.toString() (인증코드)
     * */
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));  //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));  //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));                      // 0~9
                    break;
            }
        }
        return key.toString();
    }

    /**
     * [한선영] 이메일 내용(인증코드 및 메시지) 생성
     * @param email
     * @return message
     * */
    public MimeMessage createMessage(String email) throws MessagingException, UnsupportedEncodingException {
        // 인증코드 생성
        code = createKey();

        // 인증코드가 포함된 메일 내용 작성
        String msg="";
        msg += "<div style='margin:20px;'>";
        msg += "<h1> 안녕하세요. </h1>";
        msg += "<h1> 야생동물 상생 플랫폼 [모이다] 입니다. </h1>";
        msg += "<br>";
        msg += "<p>아래 인증 코드를 복사해 입력하여 회원가입을 진행해주세요. <p>";
        msg += "<br>";
        msg += "<p>감사합니다.<p>";
        msg += "<br>";
        msg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msg += "<h3 style='color:RoyalBlue;'>회원가입 인증 코드입니다.</h3>";
        msg += "<div style='font-size:130%'>";
        msg += "CODE : <strong>";
        msg += code+"</strong><div><br/> ";
        msg += "</div>";

        //메세지 작성
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, email); // 메일 받는 대상
        message.setSubject("[모이다]회원가입 인증 코드"); // 메일 제목
        message.setText(msg, "utf-8", "html"); // 메일 내용
        message.setFrom(new InternetAddress("jikumjikum207@gmail.com","모이다")); // 보내는 사람

        return message;

    }

    /**
     * [한선영] 임시 비밀번호 이메일 내용 생성
     * @param email
     * @return message
     * */
    public MimeMessage createForgotPwdMessage(String email) throws MessagingException, UnsupportedEncodingException {
        // 인증코드 생성
        code = createKey();

        // 인증코드가 포함된 메일 내용 작성
        String msg="";
        msg += "<div style='margin:20px;'>";
        msg += "<h1> 안녕하세요. </h1>";
        msg += "<h1> 야생동물 상생 플랫폼 [모이다] 입니다. </h1>";
        msg += "<br>";
        msg += "<p>아래 임시 비밀번호를 복사해 입력하여 로그인 해주세요. <p>";
        msg += "<br>";
        msg += "<p>감사합니다.<p>";
        msg += "<br>";
        msg += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msg += "<h3 style='color:RoyalBlue;'>임시 비밀번호입니다.</h3>";
        msg += "<div style='font-size:130%'>";
        msg += "CODE : <strong>";
        msg += code+"</strong><div><br/> ";
        msg += "</div>";

        //메세지 작성
        MimeMessage message = emailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, email); // 메일 받는 대상
        message.setSubject("[모이다]회원가입 임시 비밀번호"); // 메일 제목
        message.setText(msg, "utf-8", "html"); // 메일 내용
        message.setFrom(new InternetAddress("jikumjikum207@gmail.com","모이다")); // 보내는 사람

        return message;

    }

    /**
     * [한선영] 이메일 전송
     * @param emailMsg
     * @return code
     * */
    public String sendMessage(MimeMessage emailMsg) {
        emailSender.send(emailMsg);
        return code;
    }

}
