package com.ssafy.daumnal.diary.repository;

import com.ssafy.daumnal.diary.dto.nativedto.CalendarContent;
import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.emotion.dto.nativedto.GetEmotionByMonth;
import com.ssafy.daumnal.member.entity.Member;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    boolean existsByMember(Member member);

    List<Diary> findDiariesByMemberOrderByCreatedAtDesc(Member member);

    @Query(value = "select diary.id as diaryId, music_id as musicId, case\n" +
            "           when angry = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'angry'\n" +
            "           when disgust = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'disgust'\n" +
            "           when fear = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'fear'\n" +
            "           when happiness = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'happiness'\n" +
            "           when neutral = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'neutral'\n" +
            "           when sadness = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'sadness'\n" +
            "           when surprise = greatest(angry, disgust, fear, happiness, neutral, sadness, surprise) then 'surprise'\n" +
            "       end as emotionFirst,\n" +
            "       hash_tag as diaryHashTag, day(diary.created_at) as diaryDay from diary\n" +
            "inner join emotion on diary.emotion_id = emotion.id\n" +
            "where member_id = :memberId and year(diary.created_at) = :yearSql and month(diary.created_at) = :monthSql order by diary.created_at", nativeQuery = true)
    List<CalendarContent> findDiariesByYearAndMonth(@Param("memberId") Long memberId, @Param("yearSql") int yearSql, @Param("monthSql") int monthSql);

    @Query(value = "select emotion.fear as fear, emotion.surprise as surprise, emotion.angry as angry, emotion.sadness as sadness,\n" +
            "       emotion.neutral as neutral, emotion.happiness as happiness, emotion.disgust as disgust, day(diary.created_at) as diaryDay from diary\n" +
            "inner join emotion on diary.emotion_id = emotion.id\n" +
            "inner join member on diary.member_id = member.id\n" +
            "where year(diary.created_at) = :yearSql and month(diary.created_at) = :monthSql and member_id = :memberId and member.status = 1;", nativeQuery = true)
    List<GetEmotionByMonth> findAllEmotionByMonth(@Param("memberId") Long memberId, @Param("yearSql") int yearSql,
                                                  @Param("monthSql") int monthSql);

    List<Diary> findAllByMemberAndMusicIdNotNull(Member member, Sort sort);
}