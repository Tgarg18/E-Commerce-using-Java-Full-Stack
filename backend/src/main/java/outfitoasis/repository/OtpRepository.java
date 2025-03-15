package outfitoasis.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import outfitoasis.model.Otp;

public interface OtpRepository extends JpaRepository<Otp, Long> {
    Optional<Otp> findByEmail(String email);
}
