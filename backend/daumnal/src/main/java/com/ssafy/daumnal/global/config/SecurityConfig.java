package com.ssafy.daumnal.global.config;

import com.ssafy.daumnal.global.util.JwtAuthenticationFilter;
import com.ssafy.daumnal.global.util.JwtProvider;
import com.ssafy.daumnal.global.util.MemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Collections;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final MemberDetailsService memberDetailsService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(corsConfigurer -> corsConfigurer.configurationSource(request -> {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(List.of("https://daumnal.n-e.kr", "http://localhost:3000"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowCredentials(true);
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    config.setExposedHeaders(Collections.singletonList("Authorization"));
                    config.setMaxAge(3600L);
                    return config;
                }))
                .httpBasic(HttpBasicConfigurer::disable)
                .csrf(CsrfConfigurer::disable)
                .formLogin(FormLoginConfigurer::disable)
                .sessionManagement(management ->
                        management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request ->
                        request.requestMatchers( "/api/members/login", "/api/musics")
                                .permitAll()
                                .anyRequest()
                                .authenticated())
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, memberDetailsService),
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}