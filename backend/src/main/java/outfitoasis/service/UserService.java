package outfitoasis.service;

import outfitoasis.exception.UserException;
import outfitoasis.model.User;

public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;
}
