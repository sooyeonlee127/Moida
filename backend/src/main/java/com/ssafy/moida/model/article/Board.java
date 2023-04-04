package com.ssafy.moida.model.article;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2000)
    private String description;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime regDate;

    @Column(nullable = false, length = 200)
    private String subject;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="users_id")
    private Users users;

    @Builder
    public Board(String description, String subject, Project project, Users users) {
        this.description = description;
        this.subject = subject;
        this.project = project;
        this.users = users;
    }

    /**
     * [세은] 공지사항 수정
     * @param subject
     * @param description
     */
    public void updateBoard(String subject, String description){
        if(!StringUtils.isBlank(subject)) this.subject = subject;
        if(!StringUtils.isBlank(description)) this.description = description;
    }
}
