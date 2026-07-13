import { C } from "../theme/tokens";

export function Btn({ children, onClick, variant = "ghost", small, full, type = "button" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition active:scale-95";
  const size = small ? "px-3.5 py-2 text-xs" : "px-5 py-3 text-sm";
  const styles = {
    primary: { background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`, color: "#fff", boxShadow: `0 8px 18px -8px ${C.red}70` },
    ghost: { background: "#fff", color: C.ink, border: `1px solid ${C.border}` },
    dark: { background: C.ink, color: "#fff" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${size} ${full ? "w-full" : ""}`}
      style={styles[variant]}
    >
      {children}
    </button>
  );
}
