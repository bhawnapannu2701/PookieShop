package com.pookieshop.server.checkout;

public class CreateOrderRequest {
    public Double amount;      // INR rupees (e.g., 999.00)
    public String currency;    // "INR" default
    public String receipt;     // optional

    // customer + delivery
    public String name;
    public String email;
    public String phone;
    public String address1;
    public String address2;
    public String city;
    public String state;
    public String pincode;
}
