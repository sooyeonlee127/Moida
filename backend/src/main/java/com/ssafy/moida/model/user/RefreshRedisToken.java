package com.ssafy.moida.model.user;

import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

@Getter
@RedisHash("RefreshToken")
public class RefreshRedisToken {

    @Id
    private String usersId;
    private String token;

    private RefreshRedisToken(String usersId, String token) {
        this.usersId = usersId;
        this.token = token;
    }

    public static RefreshRedisToken createToken(String usersId, String token) {
        return new RefreshRedisToken(usersId, token);
    }

    public void reissue(String token) {
        this.token = token;
    }

}
