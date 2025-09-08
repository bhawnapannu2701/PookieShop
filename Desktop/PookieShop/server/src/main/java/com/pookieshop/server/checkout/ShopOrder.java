package com.pookieshop.server.checkout;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "shop_order")
public class ShopOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="razorpay_order_id", unique = false)
    private String razorpayOrderId;

    @Column(name="amount_paise", nullable = false)
    private Integer amountPaise;

    private String currency;
    private String receipt;
    private String status;      // CREATED | PAID | FAILED
    @Column(name="payment_id")
    private String paymentId;
    private String signature;

    @Column(name="customer_name")
    private String customerName;
    private String email;
    private String phone;

    private String address1;
    private String address2;
    private String city;
    private String state;
    private String pincode;

    @Column(name="created_at")
    private LocalDateTime createdAt;

    @PrePersist
    public void prePersist() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = "CREATED";
    }

    public ShopOrder() {}

    public Long getId() { return id; }
    public String getRazorpayOrderId() { return razorpayOrderId; }
    public Integer getAmountPaise() { return amountPaise; }
    public String getCurrency() { return currency; }
    public String getReceipt() { return receipt; }
    public String getStatus() { return status; }
    public String getPaymentId() { return paymentId; }
    public String getSignature() { return signature; }
    public String getCustomerName() { return customerName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getAddress1() { return address1; }
    public String getAddress2() { return address2; }
    public String getCity() { return city; }
    public String getState() { return state; }
    public String getPincode() { return pincode; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setId(Long id) { this.id = id; }
    public void setRazorpayOrderId(String razorpayOrderId) { this.razorpayOrderId = razorpayOrderId; }
    public void setAmountPaise(Integer amountPaise) { this.amountPaise = amountPaise; }
    public void setCurrency(String currency) { this.currency = currency; }
    public void setReceipt(String receipt) { this.receipt = receipt; }
    public void setStatus(String status) { this.status = status; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public void setSignature(String signature) { this.signature = signature; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setAddress1(String address1) { this.address1 = address1; }
    public void setAddress2(String address2) { this.address2 = address2; }
    public void setCity(String city) { this.city = city; }
    public void setState(String state) { this.state = state; }
    public void setPincode(String pincode) { this.pincode = pincode; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
