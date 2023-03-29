package com.ssafy.moida.utils;

import com.ssafy.moida.auth.PrincipalDetails;
import com.ssafy.moida.model.user.Role;
import com.ssafy.moida.model.user.Users;
import com.ssafy.moida.service.user.UserService;
import com.ssafy.moida.utils.error.ErrorCode;
import com.ssafy.moida.utils.exception.CustomException;
import org.springframework.stereotype.Component;

/**
 * [세은] 토큰 유효성 검사 클래스
 */
@Component
public class TokenUtils {
    private final UserService userService;

    public TokenUtils(UserService userService) {
        this.userService = userService;
    }

    /**
     * [세은] 토큰의 유효성을 검사하고 관리자인지 확인한 후 토큰 유저 반환
     * @param principalDetails
     * @param checkAdmin
     * @return
     */
    public Users validateAdminTokenAndGetUser(PrincipalDetails principalDetails, boolean checkAdmin){
        if(principalDetails == null) {
            throw new CustomException(ErrorCode.INVALID_CLIENT_TOKEN);
        }

        Users loginUser = null;
        try{
            loginUser = userService.findByEmail(principalDetails.getUsername());
        } catch (CustomException e){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        if(checkAdmin && !loginUser.getRole().equals(Role.ROLE_ADMIN)){
            throw new CustomException(ErrorCode.FORBIDDEN_USER);
        }

        return loginUser;
    }
}
