package sotware.hahn.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record ProductDto(
        Long id,
        @NotBlank(message = "Name is mandatory")
        String name,
        @NotNull(message = "Price is mandatory")
        @Positive(message = "Price must be strictly positive")
        Double price,
        String description,
        java.time.ZonedDateTime createdAt,
        java.time.ZonedDateTime updatedAt
) {
} 