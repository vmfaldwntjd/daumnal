package com.ssafy.daumnal.member.repository;

import com.ssafy.daumnal.member.entity.Member;
import com.ssafy.daumnal.member.entity.SocialProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsMemberBySocialIdAndSocialProvider(Long socialId, SocialProvider socialProvider);

    boolean existsMemberByNickname(String memberNickname);
}