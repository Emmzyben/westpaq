import { useState } from "react";
import { C } from "../theme/tokens";
import { Badge } from "../components/Badge";
import { Avatar } from "../components/Avatar";
import { Btn } from "../components/Btn";

export default function Register({ log, categories, onNewCheckout, onReturn, onDetails }) {
  const [regFilter, setRegFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");

  const catById = (id) => categories.find((c) => c.id === id);
  const regRows = log
    .filter((l) => regFilter === "all" || l.status === regFilter)
    .filter((l) => catFilter === "all" || l.cat === catFilter);

  const selectStyle = {
    border: `1px solid ${C.border}`,
    color: C.ink,
    background: "#fff",
    backgroundImage: "none",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex gap-2.5 flex-wrap items-center">
          <select
            value={regFilter}
            onChange={(e) => setRegFilter(e.target.value)}
            className="px-3.5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={selectStyle}
          >
            <option value="all">All movements</option>
            <option value="out">Checked Out</option>
            <option value="in">Checked In</option>
            <option value="return">Returned</option>
          </select>

          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="px-3.5 py-2 rounded-lg text-sm font-semibold cursor-pointer"
            style={selectStyle}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2.5">
          <Btn variant="primary" small onClick={onNewCheckout}>+ New Checkout</Btn>
          <Btn variant="ghost" small>Export Excel</Btn>
          <Btn variant="dark" small>Export PDF</Btn>
        </div>
      </div>

      {/* Table header (desktop) */}
      <div
        className="hidden lg:grid gap-3.5 px-4 mb-2.5"
        style={{ gridTemplateColumns: "110px 1.5fr 1.5fr 1fr 110px 170px" }}
      >
        {["Date out", "Equipment", "Technician", "Category", "Status", ""].map((h) => (
          <span key={h} className="text-xs uppercase tracking-wide font-bold" style={{ color: C.ink3 }}>{h}</span>
        ))}
      </div>

      <div className="space-y-2.5">
        {/* Desktop rows */}
        {regRows.map((l, i) => (
          <div
            key={i}
            className="hidden lg:grid items-center gap-3.5 bg-white border rounded-xl px-4 py-3.5"
            style={{ borderColor: C.border, gridTemplateColumns: "110px 1.5fr 1.5fr 1fr 110px 170px" }}
          >
            <div className="font-mono text-xs" style={{ color: C.ink3 }}>{l.dateOut?.substring(0, 10)}<br/>{l.dateOut?.substring(11, 16)}</div>
            <div>
              <b className="block text-sm">{l.name}</b>
              <span className="font-mono text-xs" style={{ color: C.ink3 }}>{l.tag}</span>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Avatar name={l.tech} size={26} />
              {l.tech}
            </div>
            <div className="text-sm" style={{ color: C.ink2 }}>{catById(l.cat)?.name}</div>
            <Badge status={l.status} />
            <div className="flex justify-end gap-2">
              {l.status === "out" && (
                <Btn variant="primary" small onClick={() => onReturn(l)}>Return</Btn>
              )}
              <Btn variant="ghost" small onClick={() => onDetails(l)}>Details</Btn>
            </div>
          </div>
        ))}

        {/* Mobile cards */}
        {regRows.map((l, i) => (
          <div key={"m" + i} className="lg:hidden bg-white border rounded-xl p-4" style={{ borderColor: C.border }}>
            <div className="flex justify-between text-sm py-1">
              <span>{l.name}</span>
              <Badge status={l.status} />
            </div>
            <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}>
              <span>Tag</span><b style={{ color: C.ink }}>{l.tag}</b>
            </div>
            <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}>
              <span>Technician</span><b style={{ color: C.ink }}>{l.tech}</b>
            </div>
            <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}>
              <span>Category</span><b style={{ color: C.ink }}>{catById(l.cat)?.name}</b>
            </div>
            <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}>
              <span>Date out</span><b style={{ color: C.ink }}>{l.dateOut}</b>
            </div>
            <div className="flex gap-2 mt-3 pt-3 border-t" style={{ borderColor: C.border }}>
              <Btn variant="ghost" small full onClick={() => onDetails(l)}>Details</Btn>
              {l.status === "out" && (
                <Btn variant="primary" small full onClick={() => onReturn(l)}>Return</Btn>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
