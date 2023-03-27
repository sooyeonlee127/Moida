package com.ssafy.moida.model.article;

import com.ssafy.moida.model.project.Project;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.model.user.UsersVolunteer;
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
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String subject;

    @Column(length = 500)
    private String description;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime regDate;

    @Column(nullable = false)
    private Double difficultyLevel;

    @Column(nullable = false)
    private String category;

    @Column(nullable = true)
    private String url;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_volunteer_id")
    private UsersVolunteer usersVolunteer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @Builder
    public Article(String subject, String description, Double difficultyLevel, String category,
        String url, UsersVolunteer usersVolunteer, Project project, Users users) {
        this.subject = subject;
        this.description = description;
        this.difficultyLevel = difficultyLevel;
        this.category = category;
        this.url = url;
        this.usersVolunteer = usersVolunteer;
        this.project = project;
        this.users = users;
    }

    /**
     * [세은] 게시글 수정
     * @param subject
     * @param description
     */
    public void updateArticle(String subject, String description){
        if(!StringUtils.isBlank(subject)) this.subject = subject;
        if(!StringUtils.isBlank(description)) this.description = description;
    }
}
