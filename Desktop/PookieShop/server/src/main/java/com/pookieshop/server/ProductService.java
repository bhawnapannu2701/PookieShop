package com.pookieshop.server;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    private final ProductRepo repo;

    public ProductService(ProductRepo repo) { this.repo = repo; }

    public Page<Product> listRaw(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(0,page), Math.max(1,size), Sort.by("id").ascending());
        return repo.findAll(pageable);
    }

    public Page<Product> search(String q, String category, String sort, int page, int size) {
        String qNorm = (q == null || q.isBlank()) ? null : q.trim();
        String catNorm = (category == null || category.isBlank()) ? null : category.trim().toLowerCase();

        Sort s;
        if ("priceAsc".equalsIgnoreCase(sort)) s = Sort.by("price").ascending();
        else if ("priceDesc".equalsIgnoreCase(sort)) s = Sort.by("price").descending();
        else if ("new".equalsIgnoreCase(sort)) s = Sort.by("id").descending();
        else s = Sort.by("name").ascending();

        Pageable pageable = PageRequest.of(Math.max(0,page), Math.max(1,size), s);
        return repo.search(qNorm, catNorm, pageable);
    }

    public Product getOne(long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
    }
}
