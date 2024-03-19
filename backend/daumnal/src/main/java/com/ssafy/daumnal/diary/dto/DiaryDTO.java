package com.ssafy.daumnal.diary.dto;

import lombok.*;

public class DiaryDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    @Builder
    public static class GetDiaryWrittenTodayResponse {
        private boolean written;
    }
}
