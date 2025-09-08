import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useLocale } from "../context/LocaleContext.jsx";

export default function Navbar() {
  const { items } = useCart();
  const { currency, setCurrency, lang, setLang } = useLocale();
  const { pathname } = useLocation();

  // total quantity in cart
  const count = (items || []).reduce((s, it) => s + (it.qty || 0), 0);

  const NavButton = ({ to, children, active }) => (
    <Link
      to={to}
      className="navlink"
      style={{
        padding: "10px 16px",
        borderRadius: 14,
        background: active ? "#fff" : "#ffe9df",
        boxShadow: active ? "0 8px 22px rgba(0,0,0,.06)" : "none",
        border: "1px solid #f2efe9",
        textDecoration: "none",
        color: "#553c2b",
        fontWeight: 700,
      }}
    >
      {children}
    </Link>
  );

  return (
    <div
      className="navbar"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(180deg,#fff7f0,#fff7f0ee 70%,transparent)",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: "space-between",
        borderBottom: "1px solid #f3ece6",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#ffd9c9",
          border: "1px solid #f2efe9",
          padding: "8px 14px",
          borderRadius: 16,
          fontWeight: 800,
          color: "#553c2b",
          whiteSpace: "nowrap",
        }}
      >
        PookieShop – The Cozy Bear’s Workshop
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <NavButton to="/" active={pathname === "/"}>
          🍯 Shop All
        </NavButton>
        <NavButton to="/new" active={pathname === "/new"}>
          ✨ New
        </NavButton>
        <NavButton to="/account" active={pathname === "/account"}>
          🐻 Account
        </NavButton>

        {/* Basket with live count badge */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <NavButton to="/basket" active={pathname === "/basket"}>
            🧺 Basket
          </NavButton>
          {count > 0 && (
            <span
              title={`${count} item${count > 1 ? "s" : ""}`}
              style={{
                position: "absolute",
                right: -6,
                top: -6,
                minWidth: 22,
                height: 22,
                padding: "0 6px",
                borderRadius: 999,
                background: "#ff7f5f",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 800,
                boxShadow: "0 8px 18px rgba(255,127,95,.45)",
                border: "2px solid #fff",
              }}
            >
              {count}
            </span>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          className="navlink"
          onClick={() => setCurrency(currency === "INR" ? "USD" : "INR")}
          style={{ borderRadius: 14, padding: "8px 12px" }}
          title="Toggle currency INR↔USD"
        >
          {currency === "INR" ? "₹ INR" : "$ USD"}
        </button>
        <button
          className="navlink"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          style={{ borderRadius: 14, padding: "8px 12px" }}
          title="Toggle language English↔Hindi"
        >
          {lang === "en" ? "EN" : "हिं"}
        </button>
      </div>
    </div>
  );
}
