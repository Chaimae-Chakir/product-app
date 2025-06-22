package sotware.hahn.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record ProductDto(
        Long id,
        @NotBlank(message = "Name is mandatory")
        String name,
        @NotNull(message = "Price is mandatory")
        @PositiveOrZero(message = "Price must be positive or zero")
        Double price,
        String description
) {
} 