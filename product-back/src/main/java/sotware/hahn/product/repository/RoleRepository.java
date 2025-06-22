package sotware.hahn.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sotware.hahn.product.entity.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
} 