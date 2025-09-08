package com.pookieshop.server.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

  // Render → Settings → Environment: CORS_ALLOWED_ORIGINS=https://<your-vercel>.vercel.app
  @Value("${CORS_ALLOWED_ORIGINS:*}")
  private String allowed;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    var reg = registry.addMapping("/**")
        .allowedMethods("*")
        .allowedHeaders("*");

    String trimmed = allowed == null ? "*" : allowed.trim();
    if ("*".equals(trimmed)) {
      // allow all (testing); tighten later to your exact domain
      reg.allowedOriginPatterns("*");
    } else {
      String[] origins = Arrays.stream(trimmed.split(","))
          .map(String::trim).filter(s -> !s.isEmpty()).toArray(String[]::new);
      reg.allowedOrigins(origins);
    }
  }
}
