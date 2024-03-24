package com.ssafy.daumnal.global.util;

import com.ssafy.daumnal.global.dto.TokenMemberDTO;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

import static com.ssafy.daumnal.global.constants.ErrorCode.INVALID_MEMBER_TOKEN;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final MemberDetailsService memberDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authorization = request.getHeader("Authorization");
        if (!Objects.isNull(authorization)) {
            String token = authorization.substring(7);
            TokenMemberDTO memberData = null;
            try {
                memberData = jwtProvider.getMemberData(token);

                String requestURI = request.getRequestURI();
                if (memberData.getType().equals("refresh") && !requestURI.equals("/api/members/reissue")) {
                    throw new JwtException("refresh 토큰 인증 오류");
                }
                UserDetails memberDetails = memberDetailsService.loadUserByUsername(String.valueOf(memberData.getMemberId()));
                Authentication authToken = new UsernamePasswordAuthenticationToken(memberDetails,
                        "", memberDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);
            } catch (JwtException e) {
                request.setAttribute("exception", INVALID_MEMBER_TOKEN);
            }
        }

        filterChain.doFilter(request, response);
    }
}
