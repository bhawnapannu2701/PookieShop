package com.pookieshop.server.coupon;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
public class CouponController {

    // Known demo codes (test-mode)
    // BEAR10   -> 10% off
    // FREESHIP -> free shipping
    // PAW100   -> flat ₹100 off
    @PostMapping("/validate")
    public ResponseEntity<CouponResponse> validate(@RequestBody ValidateCouponRequest body) {
        if (body == null || body.code == null || body.code.trim().isEmpty()) {
            return ResponseEntity.ok(CouponResponse.invalid("EMPTY_CODE"));
        }

        String code = body.code.trim().toUpperCase();

        switch (code) {
            case "BEAR10" -> {
                return ResponseEntity.ok(CouponResponse.percent(code, 10, "10% off (demo)"));
            }
            case "FREESHIP" -> {
                return ResponseEntity.ok(CouponResponse.freeShipping(code, "Free standard shipping (demo)"));
            }
            case "PAW100" -> {
                return ResponseEntity.ok(CouponResponse.flat(code, 100.0, "Flat ₹100 off (demo)"));
            }
            default -> {
                return ResponseEntity.ok(CouponResponse.invalid("INVALID_CODE"));
            }
        }
    }
}
