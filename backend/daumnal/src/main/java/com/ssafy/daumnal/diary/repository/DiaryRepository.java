package com.ssafy.daumnal.diary.repository;

import com.ssafy.daumnal.diary.dto.nativedto.CalendarContent;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    boolean existsByMember(Member member);

    List<Diary> findDiariesByMemberOrderByCreatedAtDesc(Member member);

    @Query(value = "select diary.id as diaryId, music_id as musicId, greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) as emotionFirst,\n" +
            "       hash_tag as diaryHashTag, day(diary.created_at) as diaryDay from diary\n" +
            "inner join emotion on diary.emotion_id = emotion.id\n" +
            "where member_id = :memberId and year(diary.created_at) = :yearSql and month(diary.created_at) = :monthSql", nativeQuery = true)
    List<CalendarContent> findDiariesByYearAndMonth(@Param("memberId") Long memberId, @Param("yearSql") int yearSql, @Param("monthSql") int monthSql);
}