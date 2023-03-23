package com.ssafy.moida.repository.user;

import com.ssafy.moida.model.user.RefreshRedisToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshRedisRepository extends CrudRepository<RefreshRedisToken, String> {
}
