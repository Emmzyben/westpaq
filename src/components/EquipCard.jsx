import { C } from "../theme/tokens";
import { Badge } from "./Badge";
import { Avatar } from "./Avatar";
import { CatIcon } from "./CatIcon";

export function EquipCard({ e, staffById, onView }) {
  const holder = e.holder ? staffById(e.holder) : null;
  const previewLine = () => {
    if (e.cat === "general") return `${e.fields.manufacturer && e.fields.manufacturer !== "—" ? e.fields.manufacturer + " · " : ""}${e.fields.uom || ""} · Qty ${e.qty}`;
    if (e.cat === "ccu") return `${e.fields.swl} SWL · ${e.fields.dimension}`;
    if (e.cat === "instrument") return `${e.fields.manufacturer} · Part ${e.fields.partNumber}`;
    if (e.cat === "lifting") return `${e.fields.manufacturer} · ${e.fields.tonnage} · ${e.fields.length}`;
    if (e.cat === "scaffold") return `${e.qty.toLocaleString()} ${e.fields.uom} total`;
    if (e.cat === "gas") return `Onboard ${e.fields.onboard} · Empty ${e.fields.empty}`;
    return "";
  };

  return (
    <div
      className="bg-white border rounded-2xl transition hover:-translate-y-1"
      style={{ borderColor: C.border, padding: 18 }}
    >
      <div className="flex items-start justify-between mb-3.5">
        <div
          className="rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
          style={{ background: `${C.red}1A`, width: 42, height: 42 }}
        >
          {e.img ? (
            <img src={e.img} className="w-full h-full object-cover" alt={e.name} />
          ) : (
            <CatIcon cat={e.cat} size={20} color={C.redText} />
          )}
        </div>
        <Badge status={e.status} />
      </div>
      <div className="font-bold text-sm mt-3">{e.name}</div>
      <div className="font-mono text-xs mt-0.5" style={{ color: C.ink3 }}>
        {e.tag !== "—" ? "TAG · " + e.tag : e.location.toUpperCase()}
      </div>
      <div className="text-xs mt-2" style={{ color: C.ink2 }}>{previewLine()}</div>
      <div className="border-t border-dashed my-3.5" style={{ borderColor: C.border }} />
      {holder ? (
        <div className="flex items-center gap-2.5">
          <Avatar name={holder.name} size={28} />
          <div>
            <b className="block text-xs">{holder.name}</b>
            <span className="text-xs" style={{ color: C.ink3 }}>{holder.role}</span>
          </div>
        </div>
      ) : (
        <div className="text-xs italic" style={{ color: C.ink3 }}>{e.location} · not checked out</div>
      )}
      <div className="flex items-center justify-between mt-3.5">
        <span className="text-xs" style={{ color: C.ink3 }}>Qty {e.qty.toLocaleString()}</span>
        <button onClick={onView} className="text-xs font-bold" style={{ color: C.red }}>
          View full details →
        </button>
      </div>
    </div>
  );
}
