import { useState } from "react";
import { C } from "../theme/tokens";
import { CATS } from "../data/mockData";
import { Badge } from "../components/Badge";
import { Avatar } from "../components/Avatar";
import { Btn } from "../components/Btn";

export default function Register({ log, setAddOpen }) {
  const [regFilter, setRegFilter] = useState("all");

  const catById = (id) => CATS.find((c) => c.id === id);
  const regRows = regFilter === "all" ? log : log.filter((l) => l.status === regFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {[["all", "All movements"], ["out", "Checked Out"], ["in", "Checked In"], ["return", "Returned"]].map(
            ([f, label]) => (
              <button
                key={f}
                onClick={() => setRegFilter(f)}
                className="px-3.5 py-2 rounded-full text-xs font-semibold border"
                style={
                  regFilter === f
                    ? { background: C.red, borderColor: C.red, color: "#fff" }
                    : { background: "#fff", borderColor: C.border, color: C.ink2 }
                }
              >
                {label}
              </button>
            )
          )}
        </div>
        <div className="flex gap-2.5">
          <Btn variant="primary" small onClick={() => setAddOpen(true)}>+ New Entry</Btn>
          <Btn variant="ghost" small>Export Excel</Btn>
          <Btn variant="dark" small>Export PDF</Btn>
        </div>
      </div>

      {/* Table header (desktop) */}
      <div
        className="hidden lg:grid gap-3.5 px-4 mb-2.5"
        style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 130px 90px" }}
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
            style={{ borderColor: C.border, gridTemplateColumns: "120px 1fr 1fr 1fr 130px 90px" }}
          >
            <div className="font-mono text-xs" style={{ color: C.ink3 }}>{l.date}</div>
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
            <div className="flex justify-end">
              <Btn variant="ghost" small>Details</Btn>
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
              <span>Date out</span><b style={{ color: C.ink }}>{l.date}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
