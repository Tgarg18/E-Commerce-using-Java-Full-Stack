package outfitoasis.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import outfitoasis.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findByEmail(String email);
}
