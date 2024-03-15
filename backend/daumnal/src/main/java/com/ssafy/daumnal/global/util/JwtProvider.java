package com.ssafy.daumnal.global.util;

import com.ssafy.daumnal.global.dto.TokenMemberDTO;
import com.ssafy.daumnal.global.dto.TokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Duration;
import java.util.Date;

import static com.ssafy.daumnal.global.constants.JwtConstants.*;

@Component
@Slf4j
public class JwtProvider {

    private final SecretKey key;
    private final RedisRepository redisRepository;

    @Value("${spring.jwt.live.access}")
    private Long accessExpiresIn;

    @Value("${spring.jwt.live.refresh}")
    private Long refreshExpiresIn;

    public JwtProvider(@Value("${spring.jwt.secret}") String secret,
                       RedisRepository redisRepository) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
        this.redisRepository = redisRepository;
    }

    // 토큰 생성하기
    public TokenResponse generateToken(Long memberId, Long socialId, String socialProvider) {

        StringBuilder sb = new StringBuilder();

        String accessToken = Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(memberId))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + accessExpiresIn))
                .claim(ID_CATEGORY, socialId)
                .claim(PROVIDER_CATEGORY, socialProvider)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        String refreshToken = Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(memberId))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + refreshExpiresIn))
                .claim(ID_CATEGORY, socialId)
                .claim(PROVIDER_CATEGORY, socialProvider)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        String refreshId = sb.append(memberId).append("_refresh").toString();
        sb.setLength(0);
        String accessId = sb.append(memberId).append("_access").toString();

        redisRepository.setValues(accessId, accessToken, Duration.ofMillis(accessExpiresIn));
        redisRepository.setValues(refreshId, refreshToken, Duration.ofMillis(refreshExpiresIn));

        return TokenResponse.builder()
                .accessToken(accessToken)
                .build();
    }

    // jwt payload 정보 가져오는 로직 구현하기
    public TokenMemberDTO getMemberData(String accessToken) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload();

        TokenMemberDTO tokenMemberDTO = TokenMemberDTO.accessToken(Long.parseLong(claims.getSubject()),
                Long.parseLong(String.valueOf(claims.get(ID_CATEGORY))),
                String.valueOf(claims.get(PROVIDER_CATEGORY))
                );

        return tokenMemberDTO;
    }

    // accessToken 가져오기
    public String getAccessToken(Authentication authentication) {
        return authentication.getName();
    }
}
