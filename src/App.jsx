import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { C } from "./theme/tokens";
import { CATS, STAFF_INIT, EQUIPMENT_INIT, LOG_INIT } from "./data/mockData";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ViewItemModal, AddEquipmentModal } from "./components/Modals";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import CategoryDetail from "./pages/CategoryDetail";
import Register from "./pages/Register";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";

const emptyForm = {
  cat: "general", location: "Offshore", qty: 1,
  name: "", tag: "", status: "available", staffId: "", fields: {},
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [staff, setStaff] = useState(STAFF_INIT);
  const [equipment, setEquipment] = useState(EQUIPMENT_INIT);
  const [log, setLog] = useState(LOG_INIT);
  const [viewItem, setViewItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const catById = (id) => CATS.find((c) => c.id === id);
  const staffById = (id) => staff.find((s) => s.id === id);

  function toggleSupervisor(id) {
    const s = staff.find((s) => s.id === id);
    setStaff(staff.map((st) => (st.id === id ? { ...st, sup: !st.sup } : st)));
    setToast(s.sup ? `${s.name} removed as Supervisor` : `${s.name} assigned as Supervisor`);
  }

  function quickCheckIn(id) {
    setEquipment(equipment.map((e) => (e.id === id ? { ...e, status: "in", holder: null } : e)));
    setViewItem(null);
    setToast("Marked as checked in");
  }

  function quickCheckOut(id) {
    setEquipment(equipment.map((e) => (e.id === id ? { ...e, status: "out", holder: staff[0].id } : e)));
    setViewItem(null);
    setToast(`Checked out to ${staff[0].name}`);
  }

  function submitAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newItem = {
      id: "n" + Date.now(),
      cat: form.cat,
      name: form.name.trim(),
      tag: form.tag.trim() || "—",
      location: form.location,
      qty: parseInt(form.qty, 10) || 1,
      status: form.status,
      holder: form.staffId ? parseInt(form.staffId, 10) : null,
      fields: { ...form.fields },
    };
    setEquipment([newItem, ...equipment]);
    setLog([
      {
        date: "2026-07-10 " + new Date().toTimeString().slice(0, 5),
        tag: newItem.tag,
        name: newItem.name,
        cat: form.cat,
        tech: form.staffId ? staffById(parseInt(form.staffId, 10)).name : "Unassigned",
        status: form.status === "available" ? "in" : form.status,
      },
      ...log,
    ]);
    setAddOpen(false);
    setForm(emptyForm);
    setToast(`${newItem.name} added to the register`);
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: C.bg, color: C.ink, fontFamily: "Inter, sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 min-w-0">
        <Topbar onNewEntry={() => setAddOpen(true)} onMenuClick={() => setSidebarOpen(true)} />
        <div className="p-4 md:p-7">
          <Routes>
            <Route path="/" element={
              <Dashboard equipment={equipment} log={log} staff={staff} />
            } />
            <Route path="/inventory" element={<Inventory equipment={equipment} />} />
            <Route path="/inventory/:catId" element={
              <CategoryDetail
                equipment={equipment}
                staffById={staffById}
                setViewItem={setViewItem}
              />
            } />
            <Route path="/register" element={
              <Register log={log} setAddOpen={setAddOpen} />
            } />
            <Route path="/staff" element={
              <Staff staff={staff} toggleSupervisor={toggleSupervisor} />
            } />
            <Route path="/profile" element={<Profile log={log} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>

      {/* Equipment Detail Modal */}
      {viewItem && (
        <ViewItemModal
          item={viewItem}
          staffById={staffById}
          catById={catById}
          onClose={() => setViewItem(null)}
          onCheckIn={quickCheckIn}
          onCheckOut={quickCheckOut}
        />
      )}

      {/* Add Equipment Modal */}
      {addOpen && (
        <AddEquipmentModal
          staff={staff}
          form={form}
          setForm={setForm}
          onSubmit={submitAdd}
          onClose={() => { setAddOpen(false); setForm(emptyForm); }}
        />
      )}

      {/* Toast notification */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white flex items-center gap-2.5 z-50"
          style={{ background: C.ink }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: C.green }} />
          {toast}
        </div>
      )}
    </div>
  );
}
