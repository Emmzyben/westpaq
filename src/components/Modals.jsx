import { useState } from "react";
import { X } from "lucide-react";
import { C } from "../theme/tokens";
import { CATS } from "../data/mockData";
import { Btn } from "./Btn";
import { CatIcon } from "./CatIcon";
import { Badge } from "./Badge";
import { ModalOverlay } from "./ModalOverlay";
import { SignaturePad } from "./SignaturePad";

export function ViewItemModal({ item, staffById, catById, fieldSchemas, onClose, onCheckIn, onCheckOut }) {
  return (
    <ModalOverlay onClose={onClose}>
      <div
        className="flex items-start justify-between p-6 border-b sticky top-0 bg-white"
        style={{ borderColor: C.border }}
      >
        <div className="flex gap-4 items-center">
          <div className={`${item.img ? 'w-24 h-24 rounded-2xl' : 'w-12 h-12 rounded-xl'} flex items-center justify-center overflow-hidden flex-shrink-0`} style={{ background: `${C.red}1A` }}>
            {item.img ? (
              <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
            ) : (
              <CatIcon cat={item.cat} size={22} color={C.redText} />
            )}
          </div>
          <div>
            <div className="font-bold text-lg">{item.name}</div>
            <div className="text-xs font-mono font-semibold text-gray-500 mb-1">{item.equipNo}</div>
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
          ...(fieldSchemas[item.cat] || []).map(([k, label]) => [label, item.fields[k] || "—"]),
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

      </div>
    </ModalOverlay>
  );
}

export function AddEquipmentModal({ staff, form, setForm, categories, fieldSchemas, fixedCategory, onSubmit, onClose }) {
  const emptyForm = { cat: "general", location: "Offshore", qty: 1, name: "", tag: "", img: "", status: "available", staffId: "", fields: {} };
  const catById = (id) => categories.find((c) => c.id === id);

  const handleEquipImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
              disabled={fixedCategory}
              value={form.cat}
              onChange={(e) => setForm({ ...form, cat: e.target.value, fields: {} })}
              className={`w-full px-3.5 py-2.5 rounded-lg text-sm ${fixedCategory ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
              style={{ border: `1px solid ${C.border}` }}
            >
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Equipment Image (Optional)</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleEquipImageUpload}
                className="flex-1 px-3.5 py-2.5 rounded-lg text-sm"
                style={{ border: `1px solid ${C.border}` }}
              />
              {form.img && (
                <img src={form.img} alt="Preview" className="h-10 w-10 object-cover rounded-lg border" style={{ borderColor: C.border }} />
              )}
            </div>
          </div>

          <div className="text-xs font-extrabold uppercase tracking-wide pt-2" style={{ color: C.ink3 }}>
            {catById(form.cat)?.name} details
          </div>
          <div className="space-y-3.5">
            {(fieldSchemas[form.cat] || []).map(([k, label]) => (
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


        </div>
        <div className="p-6 pt-0 flex gap-2.5">
          <Btn variant="ghost" full onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" full type="submit">Add to register</Btn>
        </div>
      </form>
    </ModalOverlay>
  );
}

export function StaffModal({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(initialData || { name: "", role: "", dept: "", img: "", sup: false });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      role: form.role.trim() || "Staff",
      dept: form.dept.trim() || "General",
    });
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
        <div>
          <div className="font-bold text-lg">{initialData ? "Edit Staff Profile" : "Add New Staff"}</div>
        </div>
        <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}>
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Full Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Jane Doe" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Role</label>
              <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Technician" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Department</label>
              <input value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} placeholder="e.g. Maintenance" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Profile Image (Optional)</label>
            <div className="flex items-center gap-3">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="flex-1 px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
              {form.img && <img src={form.img} alt="Preview" className="h-10 w-10 object-cover rounded-full border" style={{ borderColor: C.border }} />}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer mt-2 w-max">
            <input type="checkbox" checked={form.sup} onChange={(e) => setForm({ ...form, sup: e.target.checked })} className="w-4 h-4 rounded" style={{ accentColor: C.red }} />
            <span className="text-sm font-semibold">Assign as Supervisor</span>
          </label>
        </div>
        <div className="p-6 pt-0 flex gap-2.5">
          <Btn variant="ghost" full type="button" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" full type="submit">{initialData ? "Save Changes" : "Add Staff"}</Btn>
        </div>
      </form>
    </ModalOverlay>
  );
}

export function CheckoutModal({ equipmentList, staffList, onSubmit, onClose }) {
  const [form, setForm] = useState({
    tag: "", equipmentId: "", project: "", location: "", staffId: "", sig: ""
  });

  const selectedItem = form.equipmentId ? equipmentList.find(e => e.id === form.equipmentId) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.equipmentId || !form.staffId || !form.sig) {
      alert("Please fill all fields and provide a signature.");
      return;
    }
    onSubmit(form);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border, zIndex: 10 }}>
        <div>
          <div className="font-bold text-lg">Equipment Checkout</div>
          <div className="text-xs mt-1" style={{ color: C.ink3 }}>Sign out equipment to a technician</div>
        </div>
        <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}>
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Equipment</label>
            <select required value={form.equipmentId} onChange={(e) => setForm({ ...form, equipmentId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white" style={{ border: `1px solid ${C.border}` }}>
              <option value="">Select Equipment</option>
              {equipmentList.filter(e => e.status !== "out").map(e => (
                <option key={e.id} value={e.id}>{e.equipNo} - {e.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Project Description</label>
              <input required value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} placeholder="e.g. NLNG Contract" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Project Location</label>
              <input required value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Nembe" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Technician / Staff Name</label>
            <select required value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-white" style={{ border: `1px solid ${C.border}` }}>
              <option value="">Select Staff</option>
              {staffList.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
              ))}
            </select>
          </div>

          <div className="pt-2">
            <SignaturePad label="Technician Signature" onSign={(sig) => setForm({ ...form, sig })} />
          </div>
        </div>

        <div className="p-6 pt-3 flex gap-2.5 border-t" style={{ borderColor: C.border }}>
          <Btn variant="ghost" full type="button" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" full type="submit">Complete Checkout</Btn>
        </div>
      </form>
    </ModalOverlay>
  );
}

export function ReturnModal({ record, onSubmit, onClose }) {
  const [form, setForm] = useState({ sigIn: "", pwd: "", mgrSig: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.pwd !== "password123") {
      alert("Invalid manager password.");
      return;
    }
    if (!form.sigIn || !form.mgrSig) {
      alert("Both technician and manager signatures are required.");
      return;
    }
    onSubmit(form);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border, zIndex: 10 }}>
        <div>
          <div className="font-bold text-lg">Equipment Return (Manager Approval)</div>
          <div className="text-xs mt-1" style={{ color: C.ink3 }}>Sign in equipment from {record.tech}</div>
        </div>
        <button type="button" onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}>
          <X size={16} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1" style={{ border: `1px solid ${C.border}` }}>
            <div><span style={{ color: C.ink2 }}>Equipment: </span><b>{record.name}</b></div>
            <div><span style={{ color: C.ink2 }}>Item No: </span><b>{record.tag}</b></div>
            <div><span style={{ color: C.ink2 }}>Technician: </span><b>{record.tech}</b></div>
            <div><span style={{ color: C.ink2 }}>Date Out: </span><b>{record.dateOut}</b></div>
          </div>

          <SignaturePad label="Technician Signature (In)" onSign={(sig) => setForm({ ...form, sigIn: sig })} />

          <div className="pt-4 border-t" style={{ borderColor: C.border }}>
            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Manager Password</label>
            <input required type="password" value={form.pwd} onChange={(e) => setForm({ ...form, pwd: e.target.value })} placeholder="Enter your password to authorize" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
          </div>

          <SignaturePad label="Manager Signature" onSign={(sig) => setForm({ ...form, mgrSig: sig })} />
        </div>

        <div className="p-6 pt-3 flex gap-2.5 border-t" style={{ borderColor: C.border }}>
          <Btn variant="ghost" full type="button" onClick={onClose}>Cancel</Btn>
          <Btn variant="primary" full type="submit">Approve Return</Btn>
        </div>
      </form>
    </ModalOverlay>
  );
}

export function RecordDetailsModal({ record, onClose }) {
  const isReturned = record.status === "return" || record.status === "in";
  
  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
        <div>
          <div className="font-bold text-lg">Equipment Record Details</div>
          <div className="mt-1"><Badge status={isReturned ? "in" : "out"} /></div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}>
          <X size={16} />
        </button>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Equip No</div><div className="font-semibold">{record.equipNo || record.tag}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Item Tag</div><div className="font-semibold">{record.tag}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Equipment</div><div className="font-semibold">{record.name}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Project</div><div className="font-semibold">{record.project || "—"}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Location</div><div className="font-semibold">{record.location || "—"}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Technician</div><div className="font-semibold">{record.tech}</div></div>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Status</div><div className="font-semibold">{isReturned ? "Equipment Return" : "Checked Out"}</div></div>
          </div>

          <div className="border-t pt-4 grid grid-cols-2 gap-4" style={{ borderColor: C.border }}>
            <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Date Out</div><div className="font-mono text-sm mt-1">{record.dateOut}</div></div>
            {isReturned && <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Date In</div><div className="font-mono text-sm mt-1">{record.dateIn}</div></div>}
            {isReturned && <div><div className="text-xs uppercase font-bold" style={{ color: C.ink3 }}>Manager Date</div><div className="font-mono text-sm mt-1">{record.managerDate}</div></div>}
          </div>

          <div className="border-t pt-4 space-y-4" style={{ borderColor: C.border }}>
            <div>
              <div className="text-xs uppercase font-bold mb-2" style={{ color: C.ink3 }}>Technician Signature Out</div>
              <div className="h-20 bg-gray-50 rounded border flex items-center justify-center overflow-hidden" style={{ borderColor: C.border }}>
                {record.techSigOut ? (record.techSigOut === "signed" ? <span className="italic opacity-50">Signed on device</span> : <img src={record.techSigOut} className="h-full object-contain" />) : <span className="text-xs text-gray-400">No signature</span>}
              </div>
            </div>
            
            {isReturned && (
              <>
                <div>
                  <div className="text-xs uppercase font-bold mb-2" style={{ color: C.ink3 }}>Technician Signature In</div>
                  <div className="h-20 bg-gray-50 rounded border flex items-center justify-center overflow-hidden" style={{ borderColor: C.border }}>
                    {record.techSigIn ? (record.techSigIn === "signed" ? <span className="italic opacity-50">Signed on device</span> : <img src={record.techSigIn} className="h-full object-contain" />) : <span className="text-xs text-gray-400">No signature</span>}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase font-bold mb-2" style={{ color: C.ink3 }}>Manager Signature</div>
                  <div className="h-20 bg-gray-50 rounded border flex items-center justify-center overflow-hidden" style={{ borderColor: C.border }}>
                    {record.managerSig ? (record.managerSig === "signed" ? <span className="italic opacity-50">Signed on device</span> : <img src={record.managerSig} className="h-full object-contain" />) : <span className="text-xs text-gray-400">No signature</span>}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 pt-0 border-t mt-4 flex" style={{ borderColor: C.border }}>
        <Btn variant="ghost" full onClick={onClose} style={{ marginTop: 16 }}>Close</Btn>
      </div>
    </ModalOverlay>
  );
}

export function StaffActivityModal({ staff, log, onClose }) {
  const activities = log.filter(l => l.tech === staff.name);

  return (
    <ModalOverlay onClose={onClose}>
      <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${C.red}, ${C.redDeep})` }}>
            {staff.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div className="font-bold text-base">{staff.name}</div>
            <div className="text-xs" style={{ color: C.ink3 }}>{staff.role} · {staff.dept}</div>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}>
          <X size={16} />
        </button>
      </div>

      <div className="px-6 py-4 flex gap-6 border-b" style={{ borderColor: C.border, background: "#fafafa" }}>
        <div className="text-center">
          <div className="text-xl font-bold">{activities.length}</div>
          <div className="text-xs uppercase tracking-wide mt-0.5" style={{ color: C.ink3 }}>Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{activities.filter(a => a.status === "out").length}</div>
          <div className="text-xs uppercase tracking-wide mt-0.5" style={{ color: C.ink3 }}>Out</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{activities.filter(a => a.status === "return").length}</div>
          <div className="text-xs uppercase tracking-wide mt-0.5" style={{ color: C.ink3 }}>Returned</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold">{activities.filter(a => a.status === "in").length}</div>
          <div className="text-xs uppercase tracking-wide mt-0.5" style={{ color: C.ink3 }}>Checked In</div>
        </div>
      </div>

      <div className="max-h-[55vh] overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-10 text-center" style={{ color: C.ink3 }}>No activity found for this staff member.</div>
        ) : (
          <div className="divide-y" style={{ borderColor: C.border }}>
            {activities.map((a) => (
              <div key={a.id} className="px-6 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm">{a.name}</span>
                    {a.equipNo && <span className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: C.cardHi, color: C.ink3 }}>{a.equipNo}</span>}
                    <Badge status={a.status} />
                  </div>
                  {a.project && (
                    <div className="text-xs mt-1" style={{ color: C.ink2 }}>
                      <span className="font-medium">Project:</span> {a.project}
                      {a.location && <> · <span className="font-medium">Location:</span> {a.location}</>}
                    </div>
                  )}
                  <div className="flex gap-4 mt-1.5 text-xs" style={{ color: C.ink3 }}>
                    <span>Out: <b className="font-mono">{a.dateOut?.substring(0, 16) || "—"}</b></span>
                    {a.dateIn && <span>In: <b className="font-mono">{a.dateIn?.substring(0, 16)}</b></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 border-t" style={{ borderColor: C.border }}>
        <Btn variant="ghost" full onClick={onClose}>Close</Btn>
      </div>
    </ModalOverlay>
  );
}
