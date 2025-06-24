package sotware.hahn.product.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import sotware.hahn.product.dto.ProductRequestDto;
import sotware.hahn.product.dto.ProductResponseDto;
import sotware.hahn.product.entity.Product;
import sotware.hahn.product.repository.ProductRepository;
import sotware.hahn.product.service.impl.ProductServiceImpl;
import sotware.hahn.product.mapper.ProductMapper;

import java.util.Optional;
import java.time.ZonedDateTime;

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

        ProductResponseDto productResponseDto = new ProductResponseDto(1L, "Test Product", 100.0, "A test product", ZonedDateTime.now(), ZonedDateTime.now());

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productMapper.toResponseDto(product)).thenReturn(productResponseDto);

        ProductResponseDto result = productService.getProductById(1L);
        assertNotNull(result);
        assertEquals("Test Product", result.name());
        assertEquals(100.0, result.price());
        assertEquals("A test product", result.description());
    }

    @Test
    void testCreateProduct() {
        ProductRequestDto requestDto = new ProductRequestDto("New Product", 200.0, "A new product");
        Product product = new Product();
        product.setName("New Product");
        product.setPrice(200.0);
        product.setDescription("A new product");

        Product savedProduct = new Product();
        savedProduct.setId(2L);
        savedProduct.setName("New Product");
        savedProduct.setPrice(200.0);
        savedProduct.setDescription("A new product");

        ProductResponseDto responseDto = new ProductResponseDto(2L, "New Product", 200.0, "A new product", ZonedDateTime.now(), null);

        when(productMapper.toEntity(requestDto)).thenReturn(product);
        when(productRepository.save(product)).thenReturn(savedProduct);
        when(productMapper.toResponseDto(savedProduct)).thenReturn(responseDto);

        ProductResponseDto result = productService.createProduct(requestDto);

        assertNotNull(result);
        assertEquals(2L, result.id());
        assertEquals("New Product", result.name());
        verify(productRepository, times(1)).save(product);
    }
} 