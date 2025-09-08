package com.pookieshop.server.checkout;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

/**
 * Mock-only checkout controller (no Razorpay).
 * Creates a local order and marks it PAID immediately (demo/COD-style).
 */
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private final ShopOrderRepo repo;

    public CheckoutController(ShopOrderRepo repo) {
        this.repo = repo;
    }

    /** Place a mock order (no payment gateway). */
    @PostMapping("/mock-order")
    public ResponseEntity<?> createMockOrder(@RequestBody CreateOrderRequest body) {
        if (body == null || body.amount == null || body.amount <= 0) {
            return ResponseEntity.badRequest().body(Map.of("error", "Amount required"));
        }
        String currency = (body.currency == null || body.currency.isBlank())
                ? "INR" : body.currency.trim().toUpperCase();

        int amountPaise = BigDecimal.valueOf(body.amount)
                .multiply(BigDecimal.valueOf(100))
                .setScale(0, RoundingMode.HALF_UP)
                .intValue();

        ShopOrder o = new ShopOrder();
        o.setAmountPaise(amountPaise);
        o.setCurrency(currency);
        o.setReceipt((body.receipt == null || body.receipt.isBlank())
                ? ("mock_" + System.currentTimeMillis())
                : body.receipt.trim());
        // mark as paid right away (demo flow)
        o.setStatus("PAID");
        o.setPaymentId("MOCK-" + System.currentTimeMillis());
        o.setSignature("MOCK");

        // copy customer/address
        o.setCustomerName(body.name);
        o.setEmail(body.email);
        o.setPhone(body.phone);
        o.setAddress1(body.address1);
        o.setAddress2(body.address2);
        o.setCity(body.city);
        o.setState(body.state);
        o.setPincode(body.pincode);

        o = repo.save(o);

        return ResponseEntity.ok(Map.of(
                "ok", true,
                "provider", "MOCK",
                "localOrderId", o.getId(),
                "amount", amountPaise,
                "currency", currency,
                "paymentId", o.getPaymentId()
        ));
    }

    /** Fetch a stored order by local ID. */
    @GetMapping("/order/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        return repo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
