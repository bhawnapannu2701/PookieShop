package com.pookieshop.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {

  // Render UI me env var set karoge: CORS_ALLOWED_ORIGINS=https://<your-vercel>.vercel.app
  @Value("${CORS_ALLOWED_ORIGINS:*}")
  private String allowed;

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cfg = new CorsConfiguration();

    // comma-separated origins ko list me convert
    List<String> origins = Arrays.stream(allowed.split(","))
        .map(String::trim).filter(s -> !s.isEmpty()).toList();

    if (origins.size() == 1 && origins.get(0).equals("*")) {
      // wildcard for testing; prod me exact domain do
      cfg.addAllowedOriginPattern("*");
    } else {
      cfg.setAllowedOrigins(origins);
    }

    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("*"));
    cfg.setAllowCredentials(false);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cfg);
    return source;
  }
}
