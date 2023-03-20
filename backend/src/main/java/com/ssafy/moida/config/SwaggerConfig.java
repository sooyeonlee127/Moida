package com.ssafy.moida.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityScheme.In;
import io.swagger.v3.oas.models.security.SecurityScheme.Type;
import java.util.Arrays;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Swagger Api Config
 */
@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI(){
        Info info = new Info()
            .title("모이다 API Documentation")
            .version("v1.0.0")
            .description("모이다 API에 대한 설명 문서입니다!");

        SecurityScheme securityScheme = new SecurityScheme()
            .type(Type.HTTP)
            .scheme("Bearer")
            .bearerFormat("JWT")
            .in(In.HEADER).name("Authorization");
        SecurityRequirement schemaRequirement = new SecurityRequirement().addList("bearerAuth");

        return new OpenAPI()
            .components(new Components().addSecuritySchemes("bearerAuth", securityScheme)).security(
                Arrays.asList(schemaRequirement)).info(info);
    }
}
