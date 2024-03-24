package com.ssafy.daumnal.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.daumnal.global.constants.ErrorCode;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.ssafy.daumnal.global.constants.ErrorCode.SERVER_ERROR;

@Component
@RequiredArgsConstructor
public class CustomAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException, ServletException {
        writeResponse(request, response);
    }

    private void writeResponse(HttpServletRequest request, HttpServletResponse response) throws IOException {
        Object exception = request.getAttribute("exception");

        if (exception instanceof ErrorCode) {
            Map<String, Object> errorDetails = getErrorDetails(response, (ErrorCode) exception);
            response.getWriter().write(objectMapper.writeValueAsString(errorDetails));
        } else {
            Map<String, Object> serverErrorDetails = getErrorDetails(response);
            response.getWriter().write(objectMapper.writeValueAsString(serverErrorDetails));
        }

    }

    private Map<String, Object> getErrorDetails(HttpServletResponse response) {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(SERVER_ERROR.getStatus().value());

        Map<String, Object> errorDetails = new LinkedHashMap<>();
        errorDetails.put("code", SERVER_ERROR.getStatus().value());
        errorDetails.put("status", SERVER_ERROR.getStatus());
        errorDetails.put("message", SERVER_ERROR.getMessage());
        return errorDetails;
    }

    private static Map<String, Object> getErrorDetails(HttpServletResponse response, ErrorCode exception) {
        ErrorCode err = exception;
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(err.getStatus().value());

        Map<String, Object> errorDetails = new LinkedHashMap<>();
        errorDetails.put("code", err.getStatus().value());
        errorDetails.put("status", err.getStatus());
        errorDetails.put("message", err.getMessage());
        return errorDetails;
    }
}
