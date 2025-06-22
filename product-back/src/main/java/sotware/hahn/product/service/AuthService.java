package sotware.hahn.product.service;


import sotware.hahn.product.dto.JwtAuthResponseDto;
import sotware.hahn.product.dto.LoginDto;
import sotware.hahn.product.dto.RegisterDto;

public interface AuthService {
    String register(RegisterDto registerDto);
    JwtAuthResponseDto login(LoginDto loginDto);
} 