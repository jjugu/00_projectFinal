package com.majorcompany.hicompany.config;

import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@OpenAPIDefinition(
		info = @Info(title = "기업 인사관리 서비스 API 명세서",
					 description = "React부터 Spring Data Jpa까지 진행하는 서비스 API 명세서",
					 version = "v1"))
@Configuration
public class SwaggerConfig {

	@Bean
	public GroupedOpenApi chatOpenApi() {
		String [] paths = {"/api/v1/**", "/auth/**","/salary/**", "/board/**", "/notice/**"};	// Swagger에서 처리 되었으면 하는 경로 설정
		
		return GroupedOpenApi.builder()
							 .group("기업 인사관리 서비스 API v1")
							 .pathsToMatch(paths)
							 .build();
	}
}










