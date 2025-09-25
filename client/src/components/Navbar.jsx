import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

export default function Navbar() {
  const { items } = useCart();
  const { currency, setCurrency, lang, setLang } = useLocale();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  // total quantity in cart
  const count = (items || []).reduce((s, it) => s + (it.qty || 0), 0);

  // close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  const NavBtn = ({ to, children, active }) => (
    <Link
      to={to}
      className="navlink"
      style={{
        background: active ? "#fff" : undefined,
        boxShadow: active ? "0 8px 22px rgba(0,0,0,.06)" : "none",
        textDecoration: "none",
      }}
    >
      {children}
    </Link>
  );

  return (
    <div className="navbar">
      {/* MOBILE top bar */}
      <div className="nav-mobile">
        <button
          className="hamburger"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span/><span/><span/>
        </button>

        <div className="brand">PookieShop – The Cozy Bear’s Workshop</div>

        <div style={{ position: "relative" }}>
          <NavBtn to="/basket" active={pathname === "/basket"}>🧺</NavBtn>
          {count > 0 && (
            <span
              style={{
                position: "absolute", right: -6, top: -6, minWidth: 22, height: 22,
                padding: "0 6px", borderRadius: 999, background: "#ff7f5f", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, boxShadow: "0 8px 18px rgba(255,127,95,.45)",
                border: "2px solid #fff",
              }}
            >
              {count}
            </span>
          )}
        </div>
      </div>

      {/* DESKTOP bar */}
      <div className="nav-desktop">
        <div className="brand">PookieShop – The Cozy Bear’s Workshop</div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <NavBtn to="/" active={pathname === "/"}>🍯 Shop All</NavBtn>
          <NavBtn to="/new" active={pathname === "/new"}>✨ New</NavBtn>
          <NavBtn to="/account" active={pathname === "/account"}>🐻 Account</NavBtn>

          <div style={{ position: "relative", display: "inline-block" }}>
            <NavBtn to="/basket" active={pathname === "/basket"}>🧺 Basket</NavBtn>
            {count > 0 && (
              <span
                title={`${count} item${count > 1 ? "s" : ""}`}
                style={{
                  position: "absolute", right: -6, top: -6, minWidth: 22, height: 22,
                  padding: "0 6px", borderRadius: 999, background: "#ff7f5f", color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, boxShadow: "0 8px 18px rgba(255,127,95,.45)",
                  border: "2px solid #fff",
                }}
              >
                {count}
              </span>
            )}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="navlink" onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")} title="Toggle currency">
            {currency === "INR" ? "₹ INR" : "$ USD"}
          </button>
          <button className="navlink" onClick={() => setLang(lang === "en" ? "hi" : "en")} title="Toggle language">
            {lang === "en" ? "EN" : "हिं"}
          </button>
        </div>
      </div>

      {/* MOBILE drawer */}
      <div className={`mobile-drawer ${open ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <strong style={{ fontSize: 16 }}>Menu</strong>
          <button className="navlink" onClick={() => setOpen(false)}>✕ Close</button>
        </div>

        <div className="drawer-links">
          <NavBtn to="/" active={pathname === "/"}>🍯 Shop All</NavBtn>
          <NavBtn to="/new" active={pathname === "/new"}>✨ New</NavBtn>
          <NavBtn to="/account" active={pathname === "/account"}>🐻 Account</NavBtn>
          <NavBtn to="/basket" active={pathname === "/basket"}>🧺 Basket {count > 0 ? `(${count})` : ""}</NavBtn>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button className="navlink" style={{ flex: 1 }} onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}>
            {currency === "INR" ? "₹ INR" : "$ USD"}
          </button>
          <button className="navlink" style={{ flex: 1 }} onClick={() => setLang(lang === "en" ? "hi" : "en")}>
            {lang === "en" ? "EN" : "हिं"}
          </button>
        </div>
      </div>
    </div>
  );
}
