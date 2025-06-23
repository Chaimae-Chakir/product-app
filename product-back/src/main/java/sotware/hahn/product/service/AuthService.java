package sotware.hahn.product.service;


import sotware.hahn.product.dto.JwtAuthResponseDto;
import sotware.hahn.product.dto.LoginDto;
import sotware.hahn.product.dto.RegisterDtoRequest;
import sotware.hahn.product.dto.RegisterUserResponse;

public interface AuthService {
    JwtAuthResponseDto login(LoginDto loginDto);
    RegisterUserResponse register(RegisterDtoRequest registerDtoRequest);
} 