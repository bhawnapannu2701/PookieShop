package com.pookieshop.server.img;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/proxy")
public class ImageProxyController {

    private static final Set<String> ALLOW = Set.of(
            "images.unsplash.com", "source.unsplash.com",
            "loremflickr.com", "images.weserv.nl", "placehold.co"
    );

    private final HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(5))
            .followRedirects(HttpClient.Redirect.NORMAL)
            .build();

    @GetMapping("/img")
    public ResponseEntity<byte[]> img(@RequestParam("u") String u) {
        if (u == null || u.isBlank()) return ResponseEntity.badRequest().build();
        try {
            URI target = URI.create(u);
            String host = Optional.ofNullable(target.getHost()).orElse("");
            boolean allowed = ALLOW.stream().anyMatch(host::endsWith);
            if (!allowed) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            if (!"http".equalsIgnoreCase(target.getScheme()) && !"https".equalsIgnoreCase(target.getScheme())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }

            HttpRequest req = HttpRequest.newBuilder(target)
                    .timeout(Duration.ofSeconds(8))
                    .header("User-Agent", "PookieShopProxy/1.0")
                    .header("Accept", "image/avif,image/webp,image/apng,image/*,*/*;q=0.8")
                    .build();

            HttpResponse<byte[]> resp = client.send(req, HttpResponse.BodyHandlers.ofByteArray());
            String ct = resp.headers().firstValue("content-type").orElse("image/jpeg");
            if (resp.statusCode() >= 200 && resp.statusCode() < 300 && resp.body() != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(ct))
                        .cacheControl(CacheControl.maxAge(3600, TimeUnit.SECONDS))
                        .body(resp.body());
            }
        } catch (Exception ignore) { }

        String svg = """
            <svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
              <rect width='100%' height='100%' fill='#fff1e9'/>
              <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
                fill='#553c2b' font-family='sans-serif' font-size='24'>Image unavailable</text>
            </svg>
            """;
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf("image/svg+xml"))
                .cacheControl(CacheControl.noCache())
                .body(svg.getBytes());
    }
}
