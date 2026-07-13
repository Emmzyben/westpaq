import { C } from "../theme/tokens";

export const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

export function Avatar({ name, size = 34, gradient }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: gradient || `linear-gradient(135deg, ${C.steel}, #2c4a6e)`,
      }}
    >
      {initials(name)}
    </div>
  );
}
