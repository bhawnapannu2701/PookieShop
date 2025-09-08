package com.pookieshop.server.review;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_id", nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Integer rating; // 1..5

    @Column(length = 1000)
    private String text;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
    }

    public Review() {}

    public Long getId() { return id; }
    public Long getProductId() { return productId; }
    public Integer getRating() { return rating; }
    public String getText() { return text; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setProductId(Long productId) { this.productId = productId; }
    public void setRating(Integer rating) { this.rating = rating; }
    public void setText(String text) { this.text = text; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
