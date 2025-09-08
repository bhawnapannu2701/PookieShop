package com.pookieshop.server;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService service;

    public ProductController(ProductService service) { this.service = service; }

    @GetMapping("/raw")
    public List<Product> raw(@RequestParam(defaultValue = "0") int page,
                             @RequestParam(defaultValue = "12") int size) {
        return service.listRaw(page, size).getContent();
    }

    @GetMapping
    public Map<String,Object> search(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "reco") String sort,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ){
        Page<Product> p = service.search(q, category, sort, page, size);
        Map<String,Object> resp = new LinkedHashMap<>();
        resp.put("items", p.getContent());
        resp.put("page", p.getNumber());
        resp.put("size", p.getSize());
        resp.put("totalElements", p.getTotalElements());
        resp.put("totalPages", p.getTotalPages());
        return resp;
    }

    @GetMapping("/{id}")
    public Product one(@PathVariable long id) {
        return service.getOne(id);
    }
}
