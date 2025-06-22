package sotware.hahn.product.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import sotware.hahn.product.dto.ProductDto;
import sotware.hahn.product.entity.Product;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto toDto(Product product);

    @Mapping(target = "id", ignore = true)
    Product toEntity(ProductDto productDto);
} 