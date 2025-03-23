package outfitoasis.controller;

import java.time.LocalDateTime;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import outfitoasis.config.JwtProvider;
import outfitoasis.exception.UserException;
import outfitoasis.model.User;
import outfitoasis.repository.UserRepository;
import outfitoasis.request.GoogleAuthRequest;
import outfitoasis.request.LoginRequest;
import outfitoasis.response.AuthResponse;
import outfitoasis.service.AuthService;
import outfitoasis.service.CartService;
import outfitoasis.service.CustomUserServiceImplementation;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;
    private JwtProvider jwtProvider;
    private PasswordEncoder passwordEncoder;
    private CustomUserServiceImplementation customUserServiceImplementation;
    private CartService cartService;
    private AuthService authService;

    @Value("${GOOGLE_CLIENT_ID}")
    String GoogleClientId;

    AuthController(UserRepository userRepository, CustomUserServiceImplementation customUserServiceImplementation,
            PasswordEncoder passwordEncoder, JwtProvider jwtProvider, CartService cartService,
            AuthService authService) {
        this.userRepository = userRepository;
        this.customUserServiceImplementation = customUserServiceImplementation;
        this.passwordEncoder = passwordEncoder;
        this.jwtProvider = jwtProvider;
        this.cartService = cartService;
        this.authService = authService;
    }

    @SuppressWarnings("deprecation")
    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest googleAuthRequest) {
        try {
            System.out.println(GoogleClientId);
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    new JacksonFactory())
                    .setAudience(Collections.singletonList(GoogleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(googleAuthRequest.getToken());

            if (idToken == null) {
                return new ResponseEntity<>(new AuthResponse(null, "Invalid Google token"), HttpStatus.UNAUTHORIZED);
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String firstName = (String) payload.get("given_name");
            String lastName = (String) payload.get("family_name");

            User user = userRepository.findByEmail(email);
            if (user == null) {
                user = new User();
                user.setEmail(email);
                user.setFirstName(firstName);
                user.setLastName(lastName);
                user.setPassword(passwordEncoder.encode("GOOGLE_AUTH_USER"));
                user.setCreatedAt(LocalDateTime.now());
                user = userRepository.save(user);
                cartService.createCart(user);
            }

            Authentication authentication = new UsernamePasswordAuthenticationToken(user.getEmail(), null);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            System.out.println("I am here");
            String token = jwtProvider.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponse(token, "Google Sign-In Successful"), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new AuthResponse(null, e.getMessage()),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> initiateSignup(@RequestBody User user) throws UserException {
        String email = user.getEmail();

        if (userRepository.findByEmail(email) != null)
            throw new UserException("Email is already in use with another account");

        authService.sendOtp(email);

        AuthResponse response = new AuthResponse();
        response.setMessage("OTP sent to " + email + ". Please verify to complete registration.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/verify-signup")
    public ResponseEntity<AuthResponse> verifyOtpAndCreateUser(@RequestParam String email, @RequestParam String otp,
            @RequestBody User user) throws UserException {
        boolean isValid = authService.validateOtp(email, otp);

        if (!isValid)
            return new ResponseEntity<>(new AuthResponse(null, "Invalid or expired OTP"), HttpStatus.UNAUTHORIZED);

        if (userRepository.findByEmail(email) != null)
            return new ResponseEntity<>(new AuthResponse(null, "Email is already registered"), HttpStatus.CONFLICT);

        User createdUser = new User();
        createdUser.setEmail(email);
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setFirstName(user.getFirstName());
        createdUser.setLastName(user.getLastName());
        createdUser.setCreatedAt(LocalDateTime.now());

        User savedUser = userRepository.save(createdUser);
        cartService.createCart(savedUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),
                savedUser.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signup successful!");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null)
            return new ResponseEntity<>(new AuthResponse(null, "Email not registered"), HttpStatus.NOT_FOUND);

        if (!passwordEncoder.matches(password, existingUser.getPassword()))
            return new ResponseEntity<>(new AuthResponse(null, "Invalid password"), HttpStatus.UNAUTHORIZED);

        authService.sendOtp(email);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("OTP sent to your email. Please verify.");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/verify-signin")
    public ResponseEntity<AuthResponse> verifyOtpHandler(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = authService.validateOtp(email, otp);

        if (!isValid)
            return new ResponseEntity<>(new AuthResponse(null, "Invalid or expired OTP"), HttpStatus.UNAUTHORIZED);

        UserDetails userDetails = customUserServiceImplementation.loadUserByUsername(email);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse(token, "Signin Success");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }

    @PostMapping("/forgot-password-initiate")
    public ResponseEntity<AuthResponse> initiateForgotPassword(@RequestParam String email) throws UserException {
        User user = userRepository.findByEmail(email);

        if (user == null)
            throw new UserException("Email not registered. Try Logging in.");

        authService.sendOtp(email);

        AuthResponse response = new AuthResponse();
        response.setMessage("OTP sent to " + email + ". Please verify to reset password.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/forgot-password-verify")
    public ResponseEntity<AuthResponse> verifyOtpAndResetPassword(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = authService.validateOtp(email, otp);

        if (!isValid)
            return new ResponseEntity<>(new AuthResponse(null, "Invalid or expired OTP"), HttpStatus.UNAUTHORIZED);

        AuthResponse response = new AuthResponse();
        response.setMessage("Redirecting to password change page.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<AuthResponse> resetPassword(@RequestParam String email, @RequestParam String password) {
        User user = userRepository.findByEmail(email);
        
        if(user == null)
            return new ResponseEntity<>(new AuthResponse(null, "Email not registered"), HttpStatus.NOT_FOUND);

        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        AuthResponse response = new AuthResponse();
        response.setMessage("Password reset successful. Please login with new password.");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
