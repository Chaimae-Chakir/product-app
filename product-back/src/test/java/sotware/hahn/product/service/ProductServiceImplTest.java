package sotware.hahn.product.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import sotware.hahn.product.entity.Product;
import sotware.hahn.product.repository.ProductRepository;
import sotware.hahn.product.service.impl.ProductServiceImpl;
import sotware.hahn.product.dto.ProductDto;
import sotware.hahn.product.mapper.ProductMapper;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductMapper productMapper;

    @InjectMocks
    private ProductServiceImpl productService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetProductById() {
        Product product = new Product();
        product.setId(1L);
        product.setName("Test Product");
        product.setPrice(100.0);
        product.setDescription("A test product");

        ProductDto productDto = new ProductDto(1L, "Test Product", 100.0, "A test product");

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productMapper.toDto(product)).thenReturn(productDto);

        ProductDto result = productService.getProductById(1L);
        assertNotNull(result);
        assertEquals("Test Product", result.name());
        assertEquals(100.0, result.price());
        assertEquals("A test product", result.description());
    }
} 