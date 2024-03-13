package com.ssafy.daumnal.global.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKey;
import java.util.Date;

import static com.ssafy.daumnal.global.constants.JwtConstants.*;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Slf4j
class JwtProviderTest {

    private SecretKey key;

    @BeforeEach
    void init() {
        String secret = "jxgEQeXHuPq8VdbyYFNkANdudQ53YUasjioejalksdjfaoigjioejfakls123diojseoifjdklfjwogjdfkjgoszzdjfeiofjoidjf4";
        key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));
    }

    @DisplayName("두 개의 jwt 토큰 비교 테스트")
    @Test
    void token_same_test() {
        //given
        Long memberId = 1L;
        Long socialId = 12L;
        String socialProvider = "kakao";
        Long accessExpiresIn = 300000000L;

        //when
        String accessToken = Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(memberId))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + accessExpiresIn))
                .claim(ID_CATEGORY, socialId)
                .claim(PROVIDER_CATEGORY, socialProvider)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        String accessTokenAnother = Jwts.builder()
                .issuer(ISSUER)
                .subject(String.valueOf(memberId))
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + accessExpiresIn))
                .claim(ID_CATEGORY, socialId)
                .claim(PROVIDER_CATEGORY, socialProvider)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();

        log.info("accessToken={}", accessToken);
        log.info("accessTokenAnother={}", accessTokenAnother);

        //then
        assertThat(accessToken)
                .isEqualTo(accessTokenAnother);
    }

    @DisplayName("jwt 검증 테스트")
    @Test
    void getMemberData() {
        //given
        String accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJkYXVtbmFsVXJsIiwic3ViIjoiMSIsImlhdCI6MTcxMDMxMTI0NywiZXhwIjoxNzEwNjExMjQ3LCJzb2NpYWxJZCI6MTIsInNvY2lhbFByb3ZpZGVyIjoia2FrYW8ifQ.I39C7iuumUWgxDBuLeoOB-pdgSxtwFKy9em0u2WWFG9P_VYVrUYHIxMaBzPJtYzbG3heuBzSXLGQEGL2PL7_9w";
        log.info("accessToken={}", accessToken);
        String socialIdResult = "12";
        String memberIdResult = "1";
        String socialProviderResult = "kakao";

        //when
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(accessToken)
                .getPayload();

        String id_category = String.valueOf(claims.get(ID_CATEGORY));
        String memberId = claims.getSubject();
        String socialProvider = String.valueOf(claims.get(PROVIDER_CATEGORY));

        //then
        assertThat(id_category).isEqualTo(socialIdResult);
        assertThat(memberId).isEqualTo(memberIdResult);
        assertThat(socialProvider).isEqualTo(socialProviderResult);
    }
}