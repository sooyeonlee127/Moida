package com.ssafy.moida.model.user;

import com.ssafy.moida.model.project.Status;
import com.ssafy.moida.model.project.VolunteerDateInfo;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UsersVolunteer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status = Status.REGISTER;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id")
    private Users users;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "volunteer_date_info_id")
    private VolunteerDateInfo volunteerDateInfo;

    @Builder
    public UsersVolunteer(Status status, Users users,
        VolunteerDateInfo volunteerDateInfo) {
        this.status = status;
        this.users = users;
        this.volunteerDateInfo = volunteerDateInfo;
    }

    /**
     * [세은] 사용자 봉사 상태 변경
     * @param status
     */
    public void updateStatus(Status status){
        this.status = status;
    }
}
