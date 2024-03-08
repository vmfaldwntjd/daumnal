package com.ssafy.daumnal.member.controller;

import com.ssafy.daumnal.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
}