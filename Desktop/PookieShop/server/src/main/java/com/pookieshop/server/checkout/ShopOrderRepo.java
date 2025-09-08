package com.pookieshop.server.checkout;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ShopOrderRepo extends JpaRepository<ShopOrder, Long> {
    Optional<ShopOrder> findByRazorpayOrderId(String razorpayOrderId);
}
