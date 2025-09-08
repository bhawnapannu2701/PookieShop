package com.pookieshop.server.wishlist;

import com.pookieshop.server.Product;
import com.pookieshop.server.ProductRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistRepo wishlistRepo;
    private final ProductRepo productRepo;

    // single demo user
    private static final Long DEMO_USER_ID = 1L;

    public WishlistController(WishlistRepo wishlistRepo, ProductRepo productRepo) {
        this.wishlistRepo = wishlistRepo;
        this.productRepo = productRepo;
    }

    /** GET list of product IDs in wishlist */
    @GetMapping
    public List<Long> ids() {
        return wishlistRepo.findByUserId(DEMO_USER_ID).stream()
                .map(WishlistItem::getProductId)
                .collect(Collectors.toList());
    }

    /** GET full product objects for wishlist */
    @GetMapping("/products")
    public List<Product> products() {
        List<Long> ids = wishlistRepo.findByUserId(DEMO_USER_ID).stream()
                .map(WishlistItem::getProductId).toList();
        if (ids.isEmpty()) return List.of();
        return productRepo.findAllById(ids);
    }

    /** POST add product to wishlist */
    @PostMapping("/{productId}")
    public ResponseEntity<?> add(@PathVariable Long productId) {
        if (!productRepo.existsById(productId)) {
            return ResponseEntity.badRequest().body(Map.of("error", "product not found"));
        }
        if (!wishlistRepo.existsByUserIdAndProductId(DEMO_USER_ID, productId)) {
            WishlistItem w = new WishlistItem();
            w.setUserId(DEMO_USER_ID);
            w.setProductId(productId);
            wishlistRepo.save(w);
        }
        return ResponseEntity.ok(Map.of("ok", true));
    }

    /** DELETE remove a product from wishlist */
    @DeleteMapping("/{productId}")
    public ResponseEntity<?> remove(@PathVariable Long productId) {
        wishlistRepo.deleteByUserIdAndProductId(DEMO_USER_ID, productId);
        return ResponseEntity.ok(Map.of("ok", true));
    }

    /** DELETE clear all */
    @DeleteMapping
    public ResponseEntity<?> clearAll() {
        var all = wishlistRepo.findByUserId(DEMO_USER_ID);
        wishlistRepo.deleteAll(all);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
