package com.ssafy.daumnal.diary.repository;

import com.ssafy.daumnal.diary.entity.Diary;
import com.ssafy.daumnal.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepository extends JpaRepository<Diary, Long> {

    boolean existsByMember(Member member);
}