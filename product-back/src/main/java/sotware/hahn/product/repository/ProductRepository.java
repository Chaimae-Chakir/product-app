package sotware.hahn.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sotware.hahn.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
} 