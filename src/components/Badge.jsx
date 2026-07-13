import { C } from "../theme/tokens";

export function Badge({ status }) {
  const map = {
    out: [C.amber, C.amberText, "Checked Out"],
    in: [C.green, C.greenText, "Checked In"],
    return: [C.steel, C.steelText, "Returned"],
    available: [C.green, C.greenText, "Available"],
  };
  const [dot, text, label] = map[status] || [C.steel, C.steelText, status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap"
      style={{ background: `${text}22`, color: text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
      {label}
    </span>
  );
}
