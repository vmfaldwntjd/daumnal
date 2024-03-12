package com.ssafy.daumnal.global.util;

import com.ssafy.daumnal.global.dto.TokenResponse;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static com.ssafy.daumnal.global.constants.JwtConstants.*;

@Component
public class JwtProvider {

    private final Key key;

    @Value("${spring.jwt.live.access}")
    private Long accessExpiresIn;

    public JwtProvider(@Value("${spring.jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    // 토큰 생성하기
    public TokenResponse generateToken(Long memberId, Long socialId, String socialProvider) {

        String accessToken = Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(memberId))
                .issuedAt(new Date())
                .expiration(new Date(accessExpiresIn))
                .claim(ID_CATEGORY, socialId)
                .claim(PROVIDER_CATEGORY, socialProvider)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        return TokenResponse.builder()
                .accessToken(accessToken)
                .build();
    }
}
