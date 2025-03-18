package outfitoasis.service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import outfitoasis.model.Otp;
import outfitoasis.repository.OtpRepository;

@Service
public class AuthService {

    @Autowired
    private OtpRepository otpRepository;

    @Autowired
    private JavaMailSender mailSender;

    private final Map<String, LocalDateTime> otpRequestTimestamps = new ConcurrentHashMap<>();

    public void sendOtp(String email) {
        LocalDateTime lastRequestTime = otpRequestTimestamps.get(email);

        if (lastRequestTime != null && lastRequestTime.isAfter(LocalDateTime.now().minusMinutes(1))) {
            throw new RuntimeException("Please wait before requesting another OTP.");
        }

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(1);

        Otp otpEntity = otpRepository.findByEmail(email).orElse(new Otp());
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpirationTime(expirationTime);

        otpRepository.save(otpEntity);
        otpRequestTimestamps.put(email, LocalDateTime.now());

        sendOtpEmail(email, otp);
    }

    public boolean validateOtp(String email, String otp) {
        Optional<Otp> otpEntityOpt = otpRepository.findByEmail(email);

        if (otpEntityOpt.isPresent()) {
            Otp otpEntity = otpEntityOpt.get();

            if (otpEntity.getOtp().equals(otp) && otpEntity.getExpirationTime().isAfter(LocalDateTime.now())) {
                otpRepository.delete(otpEntity);
                return true;
            }
        }
        return false;
    }

    private void sendOtpEmail(String email, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(email);
            helper.setSubject("Your OTP Code for OutfitOasis");
            String htmlContent = "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;'>"
                    + "<h2 style='text-align: center; color: #333;'>OutfitOasis - OTP Verification</h2>"
                    + "<p style='font-size: 16px; color: #555;'>Hello,</p>"
                    + "<p style='font-size: 16px; color: #555;'>Your OTP for verification is:</p>"
                    + "<div style='text-align: center; font-size: 24px; font-weight: bold; background: #eee; padding: 10px; border-radius: 5px;'>"
                    + otp + "</div>"
                    + "<p style='font-size: 14px; color: #777;'>This OTP is valid for <b>1 minute</b>. Please do not share it with anyone.</p>"
                    + "<p style='font-size: 14px; color: #777;'>If you did not request this OTP, please ignore this email.</p>"
                    + "<hr style='border: 0; height: 1px; background: #ddd;'>"
                    + "<p style='text-align: center; font-size: 12px; color: #999;'>© 2024 OutfitOasis. All rights reserved.</p>"
                    + "</div>";
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }

}
