package com.ssafy.moida;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class MoidaApplication {
	// [세은] aws s3 관련 설정 : 지연 문제 해결
	static {
		System.setProperty("com.amazonaws.sdk.disableEc2Metadata", "true");
	}
	public static void main(String[] args) {
		SpringApplication.run(MoidaApplication.class, args);
	}

	// [세은] modelMapper 빈 등록
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

}
