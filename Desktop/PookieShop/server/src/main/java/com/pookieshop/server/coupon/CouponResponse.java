package com.pookieshop.server.coupon;

public class CouponResponse {
    public boolean valid;
    public String code;        // upper-cased canonical code
    public String type;        // "flat" | "percent" | "freeShipping"
    public Double amount;      // for flat
    public Integer percent;    // for percent
    public boolean freeShipping;
    public String description; // friendly text
    public String reason;      // when invalid: "INVALID_CODE" | "EMPTY_CODE"

    public static CouponResponse invalid(String reason) {
        CouponResponse r = new CouponResponse();
        r.valid = false;
        r.reason = reason;
        return r;
    }

    public static CouponResponse flat(String code, Double amount, String desc) {
        CouponResponse r = new CouponResponse();
        r.valid = true; r.code = code; r.type = "flat";
        r.amount = amount; r.freeShipping = false; r.description = desc;
        return r;
    }

    public static CouponResponse percent(String code, Integer pct, String desc) {
        CouponResponse r = new CouponResponse();
        r.valid = true; r.code = code; r.type = "percent";
        r.percent = pct; r.freeShipping = false; r.description = desc;
        return r;
    }

    public static CouponResponse freeShipping(String code, String desc) {
        CouponResponse r = new CouponResponse();
        r.valid = true; r.code = code; r.type = "freeShipping";
        r.freeShipping = true; r.description = desc;
        return r;
    }
}
