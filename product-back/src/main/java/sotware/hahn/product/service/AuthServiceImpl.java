package sotware.hahn.product.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import sotware.hahn.product.dto.LoginDto;
import sotware.hahn.product.dto.RegisterDto;
import sotware.hahn.product.dto.JwtAuthResponseDto;
import sotware.hahn.product.entity.Role;
import sotware.hahn.product.entity.User;
import sotware.hahn.product.exception.ResourceNotFoundException;
import sotware.hahn.product.repository.RoleRepository;
import sotware.hahn.product.repository.UserRepository;


import java.util.HashSet;
import java.util.Set;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

  
    @Override
    public JwtAuthResponseDto login(LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getUsernameOrEmail(),
                        loginDto.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);
        // Fetch the User entity to get the username
        sotware.hahn.product.entity.User user = userRepository.findByUsernameOrEmail(
                loginDto.getUsernameOrEmail(), loginDto.getUsernameOrEmail()
        ).orElseThrow(() -> new RuntimeException("User not found"));
        String username = user.getUsername();
        List<String> roles = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return new JwtAuthResponseDto(token, "Bearer", username, roles);
    }

    @Override
    public String register(RegisterDto registerDto) {
        if (userRepository.existsByUsername(registerDto.username())) {
            throw new ResourceNotFoundException("Username is already taken!");
        }

        if (userRepository.existsByEmail(registerDto.email())) {
            throw new ResourceNotFoundException("Email is already taken!");
        }

        User user = new User();
        user.setName(registerDto.name());
        user.setUsername(registerDto.username());
        user.setEmail(registerDto.email());
        user.setPassword(passwordEncoder.encode(registerDto.password()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER").orElseThrow(() -> new ResourceNotFoundException("Role not found!"));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return "User registered successfully!.";
    }
} 