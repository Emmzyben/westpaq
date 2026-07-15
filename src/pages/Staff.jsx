import { useState } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { C } from "../theme/tokens";
import { Avatar } from "../components/Avatar";
import { Btn } from "../components/Btn";
import { StaffModal, StaffActivityModal } from "../components/Modals";
import { useDialog } from "../context/DialogContext";

export default function Staff({ staff, setStaff, equipment, toggleSupervisor, log }) {
  const { toast, showAlert, showConfirm } = useDialog();
  const [tab, setTab] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [activityStaff, setActivityStaff] = useState(null);

  const displayedStaff = staff.filter(s => tab === "all" || s.sup);

  const handleOpenAdd = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (s) => {
    setEditingStaff(s);
    setIsModalOpen(true);
  };

  const handleSaveStaff = (data) => {
    if (editingStaff) {
      setStaff(staff.map(s => s.id === editingStaff.id ? { ...s, ...data } : s));
      toast("Staff profile updated.", { type: "success", title: "Saved" });
    } else {
      const newStaff = {
        ...data,
        id: Date.now(),
        held: 0,
        tx: 0
      };
      setStaff([...staff, newStaff]);
      toast(`${data.name} has been added to staff.`, { type: "success", title: "Staff Added" });
    }
    setIsModalOpen(false);
    setEditingStaff(null);
  };

  const handleDelete = async (id) => {
    const hasEquipment = equipment.some(e => e.holder === id);
    if (hasEquipment) {
      await showAlert("Cannot delete this staff member because they currently hold checked-out equipment. Please check in the equipment first.");
      return;
    }
    const confirmed = await showConfirm("Are you sure you want to delete this staff member? This action cannot be undone.", { danger: true });
    if (confirmed) {
      setStaff(staff.filter(s => s.id !== id));
      toast("Staff member removed.", { type: "success", title: "Deleted" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("all")}
            className="px-3.5 py-2 rounded-full text-xs font-semibold"
            style={tab === "all" ? { background: C.red, color: "white" } : { background: "white", borderColor: C.border, color: C.ink2, border: "1px solid" }}
          >
            All staff
          </button>
          <button
            onClick={() => setTab("supervisors")}
            className="px-3.5 py-2 rounded-full text-xs font-semibold"
            style={tab === "supervisors" ? { background: C.red, color: "white" } : { background: "white", borderColor: C.border, color: C.ink2, border: "1px solid" }}
          >
            Supervisors
          </button>
        </div>
        <Btn variant="ghost" small onClick={handleOpenAdd}>+ Add staff</Btn>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedStaff.map((s) => (
          <div
            key={s.id}
            className="relative bg-white border rounded-2xl p-5 text-center"
            style={{ borderColor: C.border }}
          >
            {s.sup && (
              <div
                className="absolute top-3.5 left-3.5 rounded-full px-2 py-1 text-xs font-extrabold uppercase"
                style={{ background: `${C.amber}28`, color: C.amberText }}
              >
                Supervisor
              </div>
            )}
            <div className="absolute top-3.5 right-3.5 flex gap-1">
              <button onClick={() => handleOpenEdit(s)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100">
                <Edit2 size={14} color={C.ink2} />
              </button>
              <button onClick={() => handleDelete(s.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-50 hover:bg-red-50">
                <Trash2 size={14} color={C.red} />
              </button>
            </div>
            <div className="flex justify-center mb-3 mt-4">
              <Avatar name={s.name} img={s.img} size={64} gradient={`linear-gradient(135deg, ${C.red}, ${C.redDeep})`} />
            </div>
            <h4 className="font-bold text-sm">{s.name}</h4>
            <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{s.role} · {s.dept}</div>
            <div className="flex justify-center gap-5 my-4">
              <div>
                <b className="block text-lg font-bold">{s.held}</b>
                <span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>CheckIn</span>
              </div>
              <div>
                <b className="block text-lg font-bold">{s.tx}</b>
                <span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>CheckOut</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Btn
                variant={s.sup ? "dark" : "ghost"}
                small
                full
                onClick={() => toggleSupervisor(s.id)}
              >
                {s.sup ? "✓ Supervisor" : "Assign as Supervisor"}
              </Btn>
              <Btn variant="ghost" small onClick={() => setActivityStaff(s)} title="View activity">
                Activity
              </Btn>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <StaffModal
          initialData={editingStaff}
          onSave={handleSaveStaff}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {activityStaff && (
        <StaffActivityModal
          staff={activityStaff}
          log={log}
          onClose={() => setActivityStaff(null)}
        />
      )}
    </div>
  );
}
