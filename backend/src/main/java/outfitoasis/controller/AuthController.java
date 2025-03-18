package outfitoasis.controller;

import java.time.LocalDateTime;

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

import outfitoasis.config.JwtProvider;
import outfitoasis.exception.UserException;
import outfitoasis.model.User;
import outfitoasis.repository.UserRepository;
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

}
