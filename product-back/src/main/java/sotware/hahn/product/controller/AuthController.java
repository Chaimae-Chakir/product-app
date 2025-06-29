package sotware.hahn.product.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sotware.hahn.product.service.AuthService;
import sotware.hahn.product.dto.JwtAuthResponseDto;
import sotware.hahn.product.dto.LoginDto;
import sotware.hahn.product.dto.RegisterDtoRequest;
import sotware.hahn.product.dto.RegisterUserResponse;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> login(@RequestBody LoginDto loginDto) {
        JwtAuthResponseDto jwtAuthResponseDto = authService.login(loginDto);
        return ResponseEntity.ok(jwtAuthResponseDto);
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponse> register(@RequestBody RegisterDtoRequest registerDtoRequest) {
        RegisterUserResponse response = authService.register(registerDtoRequest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
} 