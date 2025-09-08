package com.pookieshop.server.wishlist;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "wishlist",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"})
)
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="user_id", nullable=false)
    private Long userId;

    @Column(name="product_id", nullable=false)
    private Long productId;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public Wishlist() {}
    public Wishlist(Long userId, Long productId) {
        this.userId = userId;
        this.productId = productId;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public Long getProductId() { return productId; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setUserId(Long userId) { this.userId = userId; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
