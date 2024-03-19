package com.ssafy.daumnal.global.util;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class RedisRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void setValues(String key, String data, Duration duration) {
        ValueOperations<String, String> valueOpers = redisTemplate.opsForValue();
        valueOpers.set(key, data, duration);
    }

    public String getValues(String key) {
        ValueOperations<String, String> valueOpers = redisTemplate.opsForValue();
        return valueOpers.get(key);
    }

    public void deleteValues(String key) {
        redisTemplate.delete(key);
    }
}
