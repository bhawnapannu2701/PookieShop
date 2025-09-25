import React, { useEffect, useRef, useState } from "react";

const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=";

/**
 * LazyImage with multi-source fallback:
 * 1) tries src
 * 2) tries alts[] in order
 * 3) backend proxy
 * 4) public proxy
 * 5) pretty placeholder
 */
export default function LazyImage({ src, alts = [], alt = "", className = "", style = {}, imgStyle = {} }) {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const altIndexRef = useRef(0);
  const stepRef = useRef(0); // 0: candidates, 1: backend proxy, 2: weserv, 3: placeholder

  const API = (import.meta.env.VITE_API_BASE || "http://localhost:8080").replace(/\/$/, "");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { setInView(true); obs.disconnect(); break; }
    }, { rootMargin: "200px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (inView) {
      altIndexRef.current = 0;
      stepRef.current = 0;
      setCurrentSrc(src);
    }
  }, [inView, src]);

  const onError = () => {
    // 1) try more local candidates
    if (stepRef.current === 0 && altIndexRef.current < alts.length) {
      const next = alts[altIndexRef.current++];
      setCurrentSrc(next);
      return;
    }
    // 2) backend proxy
    if (stepRef.current === 0) { stepRef.current = 1; setCurrentSrc(`${API}/proxy/img?u=${encodeURIComponent(src)}`); return; }
    // 3) public proxy
    if (stepRef.current === 1) { stepRef.current = 2; setCurrentSrc(`https://images.weserv.nl/?url=${encodeURIComponent(src)}&w=800&h=600&fit=cover`); return; }
    // 4) final placeholder
    stepRef.current = 3;
    setCurrentSrc(`https://placehold.co/800x600/fff1e9/553c2b?text=${encodeURIComponent(alt || "PookieShop")}`);
  };

  return (
    <div ref={wrapRef} className={`lazy-wrap ${className}`} style={style}>
      <img
        src={inView ? (currentSrc || PLACEHOLDER) : PLACEHOLDER}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={onError}
        className={`img ${loaded ? "img-ready" : "img-blur"}`}
        style={imgStyle}
      />
    </div>
  );
}
