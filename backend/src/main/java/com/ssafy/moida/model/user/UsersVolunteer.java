package com.ssafy.moida.model.user;

import com.ssafy.moida.model.article.Status;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class UsersVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.SIGNUP; //SIGNUP, CANCEL, DONE

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "v_date_info_id")
    private VolunteerDateInfo volunteerDateInfo;

}
