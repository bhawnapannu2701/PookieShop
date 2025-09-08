package com.pookieshop.server.wishlist;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishlistRepo extends JpaRepository<WishlistItem, Long> {
    boolean existsByUserIdAndProductId(Long userId, Long productId);
    void deleteByUserIdAndProductId(Long userId, Long productId);
    List<WishlistItem> findByUserId(Long userId);
}
