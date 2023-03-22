package com.ssafy.moida.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * 봉사 일시 레포지토리
 */
@Repository
public interface VolunteerDateInfoRepository extends JpaRepository<com.ssafy.moida.model.VolunteerDateInfo, Long> {

}
