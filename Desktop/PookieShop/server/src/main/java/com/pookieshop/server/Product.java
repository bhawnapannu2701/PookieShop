package com.pookieshop.server;

import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    // NOTE: schema.sql uses manual IDs (no AUTO). We assign IDs in AdminController.
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(length = 1000)
    private String description;

    // DECIMAL(10,2) in DB, mapped to Double here for simplicity
    private Double price;

    @Column(length = 100)
    private String category;

    @Column(name = "image_url", length = 500)
    private String imageUrl;

    public Product() {}

    // getters & setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public Double getPrice() { return price; }
    public String getCategory() { return category; }
    public String getImageUrl() { return imageUrl; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setPrice(Double price) { this.price = price; }
    public void setCategory(String category) { this.category = category; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
