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

import java.util.Arrays;
import java.util.Collections;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtProvider jwtProvider;
    private final MemberDetailsService memberDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        System.out.println("1");
        http
                .cors(corsConfigurer -> corsConfigurer.configurationSource(request -> {
                    System.out.println("2");
                    CorsConfiguration config = new CorsConfiguration();
                    System.out.println("3");
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
                    System.out.println("4");
                    config.setAllowedMethods(Collections.singletonList("*"));
                    System.out.println("5");
                    config.setAllowCredentials(true);
                    System.out.println("6");
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    System.out.println("7");
                    config.setExposedHeaders(Arrays.asList("Authorization"));
                    System.out.println("8");
                    config.setMaxAge(3600L);
                    System.out.println("8");
                    return config;
                }))
                .httpBasic(HttpBasicConfigurer::disable)
                .csrf(CsrfConfigurer::disable)
                .formLogin(FormLoginConfigurer::disable)
                .sessionManagement(management ->
                        management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(request ->
                        request.requestMatchers( "/api/members/login")
                                .permitAll()
                                .anyRequest()
                                .authenticated())
                .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, memberDetailsService),
                        UsernamePasswordAuthenticationFilter.class);
        System.out.println("9");

        return http.build();
    }
}
