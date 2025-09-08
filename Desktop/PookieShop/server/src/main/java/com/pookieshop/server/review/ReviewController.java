package com.pookieshop.server.review;

import com.pookieshop.server.Product;
import com.pookieshop.server.ProductRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewRepo reviewRepo;
    private final ProductRepo productRepo;

    public ReviewController(ReviewRepo reviewRepo, ProductRepo productRepo) {
        this.reviewRepo = reviewRepo;
        this.productRepo = productRepo;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody NewReviewRequest body) {
        if (body == null || body.productId == null || body.rating == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "productId and rating required"));
        }
        if (body.rating < 1 || body.rating > 5) {
            return ResponseEntity.badRequest().body(Map.of("error", "rating must be 1..5"));
        }
        // ensure product exists
        Optional<Product> p = productRepo.findById(body.productId);
        if (p.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error", "product not found"));

        Review r = new Review();
        r.setProductId(body.productId);
        r.setRating(body.rating);
        r.setText(body.text);
        r = reviewRepo.save(r);
        return ResponseEntity.ok(r);
    }

    // (Optional) list reviews for a product (handy for debugging)
    @GetMapping("/product/{productId}")
    public List<Review> list(@PathVariable Long productId) {
        return reviewRepo.findByProductIdOrderByCreatedAtDesc(productId);
    }
}
