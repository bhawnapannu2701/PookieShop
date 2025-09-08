package com.pookieshop.server.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/** Simple dev token guard for /api/admin/** */
@Component
public class AdminTokenFilter extends OncePerRequestFilter {

    @Value("${admin.token:pookie-dev-1234}")
    private String adminToken;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String path = req.getRequestURI();
        if (!path.startsWith("/api/admin/")) {
            chain.doFilter(req, res);
            return;
        }

        // let CORS preflight pass through
        if ("OPTIONS".equalsIgnoreCase(req.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        String token = req.getHeader("X-Admin-Token");
        if (token == null || !token.equals(adminToken)) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"unauthorized\"}");
            return;
        }

        chain.doFilter(req, res);
    }
}
