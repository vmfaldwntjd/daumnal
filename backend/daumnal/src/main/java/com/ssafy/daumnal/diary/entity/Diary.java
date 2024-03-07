package com.ssafy.daumnal.diary.entity;

import com.ssafy.daumnal.global.entity.BaseEntity;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@OnDelete(action = OnDeleteAction.CASCADE)
@Table(name = "diary")
public class Diary extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}