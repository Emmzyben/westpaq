import { X } from "lucide-react";
import { C } from "../theme/tokens";
import { CATS, FIELD_SCHEMAS } from "../data/mockData";
import { Btn } from "./Btn";
import { CatIcon } from "./CatIcon";
import { Badge } from "./Badge";
import { ModalOverlay } from "./ModalOverlay";

export function ViewItemModal({ item, staffById, catById, onClose, onCheckIn, onCheckOut }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="flex items-start justify-between p-6 border-b sticky top-0 bg-white"
        style={{ borderColor: C.border }}
      >
        <div className="flex gap-3.5 items-center">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${C.red}1A` }}>
            <CatIcon cat={item.cat} size={22} color={C.redText} />
          </div>
          <div>
            <div className="font-bold text-lg">{item.name}</div>
            <div className="mt-1"><Badge status={item.status} /></div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: C.cardHi }}
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6">
        {[
          ["Category", catById(item.cat)?.name],
          ["Location", item.location],
          ["Tag / Part No", item.tag],
          ["Quantity", item.qty.toLocaleString()],
          ...FIELD_SCHEMAS[item.cat].map(([k, label]) => [label, item.fields[k] || "—"]),
          ...(item.holder
            ? [["Held by", `${staffById(item.holder)?.name} · ${staffById(item.holder)?.role}`]]
            : []),
        ].map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between gap-4 py-2.5 border-b last:border-0 text-sm"
            style={{ borderColor: C.border }}
          >
            <span style={{ color: C.ink3 }}>{k}</span>
            <span className="font-semibold text-right">{v}</span>
          </div>
        ))}
      </div>

      <div className="p-6 pt-0 flex gap-2.5">
        <Btn variant="ghost" full onClick={onClose}>Close</Btn>
        {item.status === "out" ? (
          <Btn variant="primary" full onClick={() => onCheckIn(item.id)}>Mark as checked in</Btn>
        ) : (
          <Btn variant="primary" full onClick={() => onCheckOut(item.id)}>Check out this item</Btn>
        )}
      </div>
    </ModalOverlay>
  );
}

export function AddEquipmentModal({ staff, form, setForm, onSubmit, onClose }) {
  const emptyForm = { cat: "general", location: "Offshore", qty: 1, name: "", tag: "", status: "available", staffId: "", fields: {} };
  const catById = (id) => CATS.find((c) => c.id === id);

  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="flex items-start justify-between p-6 border-b sticky top-0 bg-white"
        style={{ borderColor: C.border }}
      >
        <div>
          <div className="font-bold text-lg">Register new equipment</div>
          <div className="text-xs mt-1" style={{ color: C.ink3 }}>Fields match what appears on the equipment card</div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: C.cardHi }}
        >
          <X size={16} />
        </button>
      </div>

      <form onSubmit={onSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Category</label>
            <select
              value={form.cat}
              onChange={(e) => setForm({ ...form, cat: e.target.value, fields: {} })}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm"
              style={{ border: `1px solid ${C.border}` }}
            >
              {CATS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Location</label>
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${C.border}` }}
              >
                <option>Offshore</option><option>Aveon</option><option>Onshore</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Quantity</label>
              <input
                type="number" min="0"
                value={form.qty}
                onChange={(e) => setForm({ ...form, qty: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${C.border}` }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Material description</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder='e.g. Ring Spanner 75"'
              className="w-full px-3.5 py-2.5 rounded-lg text-sm"
              style={{ border: `1px solid ${C.border}` }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Tag / part number</label>
            <input
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
              placeholder="e.g. WEL/RL/003"
              className="w-full px-3.5 py-2.5 rounded-lg text-sm"
              style={{ border: `1px solid ${C.border}` }}
            />
          </div>

          <div className="text-xs font-extrabold uppercase tracking-wide pt-2" style={{ color: C.ink3 }}>
            {catById(form.cat)?.name} details
          </div>
          <div className="space-y-3.5">
            {FIELD_SCHEMAS[form.cat].map(([k, label]) => (
              <div key={k}>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>{label}</label>
                <input
                  value={form.fields[k] || ""}
                  onChange={(e) => setForm({ ...form, fields: { ...form.fields, [k]: e.target.value } })}
                  placeholder={label}
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>
            ))}
          </div>

          <div className="text-xs font-extrabold uppercase tracking-wide pt-2" style={{ color: C.ink3 }}>Checkout status</div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${C.border}` }}
              >
                <option value="available">Available</option>
                <option value="out">Checked Out</option>
                <option value="in">Checked In</option>
                <option value="return">Returned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Technician</label>
              <select
                value={form.staffId}
                onChange={(e) => setForm({ ...form, staffId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${C.border}` }}
              >
                <option value="">— Unassigned —</option>
                {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 pt-0 flex gap-2.5">
          <Btn variant="ghost" full onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" full type="submit">Add to register</Btn>
        </div>
      </form>
    </ModalOverlay>
  );
}
