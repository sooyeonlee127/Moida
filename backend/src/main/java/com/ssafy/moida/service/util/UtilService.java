package com.ssafy.moida.service.util;

import com.ssafy.moida.repository.user.UserRepository;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@Slf4j
@Service
@Transactional
public class UtilService {

    private final UserRepository userRepository;
    private final JavaMailSender emailSender;

    private String code;

    public UtilService(UserRepository userRepository, JavaMailSender emailSender) {
        this.userRepository = userRepository;
        this.emailSender = emailSender;
    }

    // 인증코드 생성
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

    // 이메일에 들어갈 인증코드와 메시지 생성
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

    // 이메일 전송
    public String sendMessage(MimeMessage emailMsg) {
        emailSender.send(emailMsg);
        return code;
    }

    // 이메일 인증 검사(중복검사)
    public void DuplicatedUserByEmail(String email) {
        // 이메일 중복이면 false
        // 이메일 중복이 아니면 인증 번호 생성해서 해당 이메일로 전송하고 true

        // 이메일이 존재하면 true, 아니라면 false
        boolean userEmail = userRepository.existsByEmail(email);

        // 이메일이 존재한다면 중복이므로 에러 던지기
        if(userEmail) {
            throw new CustomException(ErrorCode.DUPLICATE_RESOURCE);
        }

    }

}
