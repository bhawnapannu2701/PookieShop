package com.pookieshop.server.admin;

import com.pookieshop.server.Product;
import com.pookieshop.server.ProductRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
public class AdminController {

    private final ProductRepo repo;
    public AdminController(ProductRepo repo) { this.repo = repo; }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody AdminProductRequest body) {
        if (body == null || body.name == null || body.name.isBlank() || body.price == null) {
            return ResponseEntity.badRequest().body(Map.of("error","name and price required"));
        }
        long nextId = repo.findTopByOrderByIdDesc()
                .map(p -> p.getId() + 1L)
                .orElse(1L);

        Product p = new Product();
        p.setId(nextId);
        p.setName(body.name.trim());
        p.setDescription(body.description);
        p.setPrice(body.price);
        p.setCategory(body.category);
        p.setImageUrl(body.imageUrl);
        return ResponseEntity.ok(repo.save(p));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable long id, @RequestBody AdminProductRequest body) {
        var pOpt = repo.findById(id);
        if (pOpt.isEmpty()) return ResponseEntity.notFound().build();
        Product p = pOpt.get();
        if (body.name != null) p.setName(body.name);
        if (body.description != null) p.setDescription(body.description);
        if (body.price != null) p.setPrice(body.price);
        if (body.category != null) p.setCategory(body.category);
        if (body.imageUrl != null) p.setImageUrl(body.imageUrl);
        return ResponseEntity.ok(repo.save(p));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.ok(Map.of("ok", true));
    }
}
