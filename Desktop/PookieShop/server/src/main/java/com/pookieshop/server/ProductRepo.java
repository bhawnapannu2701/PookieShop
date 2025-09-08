package com.pookieshop.server;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

    @Query("""
        SELECT p FROM Product p
        WHERE
          (:q IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :q, '%'))
                        OR LOWER(p.description) LIKE LOWER(CONCAT('%', :q, '%')))
          AND (:category IS NULL OR LOWER(p.category) = LOWER(:category))
    """)
    Page<Product> search(@Param("q") String q,
                         @Param("category") String category,
                         Pageable pageable);

    Optional<Product> findTopByOrderByIdDesc();
}
