package outfitoasis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import outfitoasis.model.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
