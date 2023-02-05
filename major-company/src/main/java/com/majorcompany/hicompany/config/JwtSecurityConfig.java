package com.majorcompany.hicompany.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.majorcompany.hicompany.jwt.JwtFilter;
import com.majorcompany.hicompany.jwt.TokenProvider;

/* Jwt관련 필터를 UsernamePasswordAuthenticationFilter 앞 쪽에 추가 */
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
	private final TokenProvider tokenProvider;
	
	@Autowired
	public JwtSecurityConfig(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}
	
	@Override
	public void configure(HttpSecurity http) {
		JwtFilter customFilter = new JwtFilter(tokenProvider);							// JwtFilter를 jwt 패키지에 추가
		http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);	// JwtFilter를 Filterchain 상에 추가
	}
}
