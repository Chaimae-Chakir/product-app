package sotware.hahn.product.dto;

import java.time.ZonedDateTime;

public record ProductResponseDto(
        Long id,
        String name,
        Double price,
        String description,
        ZonedDateTime createdAt,
        ZonedDateTime updatedAt
) {
} 