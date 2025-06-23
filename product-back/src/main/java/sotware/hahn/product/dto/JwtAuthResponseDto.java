package sotware.hahn.product.dto;

import java.util.List;

public record JwtAuthResponseDto(
        String accessToken,
        String tokenType,
        String username,
        List<String> roles
) {
    public JwtAuthResponseDto(String accessToken, String username, List<String> roles) {
        this(accessToken, "Bearer", username, roles);
    }
}