import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STRINGS } from "../i18n/strings";

const LocaleContext = createContext(null);
const LS_KEY = "pookie_locale_v1";

// Simple static conversion for demo: 1 INR ≈ 0.012 USD
const RATES = { INR: 1, USD: 0.012 };

export function LocaleProvider({ children }) {
  const [language, setLanguage] = useState("en");   // "en" | "hi"
  const [currency, setCurrency] = useState("INR");  // "INR" | "USD"

  // Load saved prefs
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.language) setLanguage(saved.language);
        if (saved.currency) setCurrency(saved.currency);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ language, currency }));
  }, [language, currency]);

  // Translator
  const t = (path) => {
    const parts = path.split(".");
    let obj = STRINGS[language] || STRINGS.en;
    for (const p of parts) obj = obj?.[p];
    return typeof obj === "string" ? obj : path;
  };

  // Currency formatter; input is INR value
  const formatPrice = (inr) => {
    const rate = RATES[currency] ?? 1;
    const value = Number(inr || 0) * rate;
    const locale =
      language === "hi"
        ? (currency === "INR" ? "hi-IN" : "en-US")
        : (currency === "INR" ? "en-IN" : "en-US");
    return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
  };

  const toggleCurrency = () => setCurrency((c) => (c === "INR" ? "USD" : "INR"));
  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "hi" : "en"));

  const value = useMemo(
    () => ({ language, currency, setLanguage, setCurrency, toggleCurrency, toggleLanguage, t, formatPrice }),
    [language, currency]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be inside LocaleProvider");
  return ctx;
}
