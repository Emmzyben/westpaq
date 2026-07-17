import { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { C } from "./theme/tokens";
import { CATS, FIELD_SCHEMAS, STAFF_INIT, EQUIPMENT_INIT, LOG_INIT, PROJECTS_INIT } from "./data/mockData";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { ViewItemModal, AddEquipmentModal, CheckoutModal, ReturnModal, RecordDetailsModal } from "./components/Modals";
import { useDialog } from "./context/DialogContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import CategoryDetail from "./pages/CategoryDetail";
import Register from "./pages/Register";
import Staff from "./pages/Staff";
import Profile from "./pages/Profile";
import ManageInventory from "./pages/ManageInventory";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

const emptyForm = {
  cat: "general", location: "Offshore", qty: 1,
  name: "", tag: "", img: "", status: "available", staffId: "", fields: {},
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [categories, setCategories] = useState(CATS);
  const [fieldSchemas, setFieldSchemas] = useState(FIELD_SCHEMAS);
  const [staff, setStaff] = useState(STAFF_INIT);
  const [equipment, setEquipment] = useState(EQUIPMENT_INIT);
  const [log, setLog] = useState(LOG_INIT);
  const [projects, setProjects] = useState(PROJECTS_INIT);
  const [viewItem, setViewItem] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [returnRecord, setReturnRecord] = useState(null);
  const [detailsRecord, setDetailsRecord] = useState(null);
  const [fixedCategory, setFixedCategory] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { toast, showAlert } = useDialog();
  const isInitialMount = useRef(true);

  // Sync state changes back to mockData.js
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      fetch('/api/saveData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ equipment, log, staff, categories, fieldSchemas, projects })
      }).catch(err => console.error("Failed to persist data:", err));
    }, 500); // Small debounce to batch rapid state updates

    return () => clearTimeout(timeout);
  }, [equipment, log, staff, categories, fieldSchemas, projects]);

  const catById = (id) => categories.find((c) => c.id === id);
  const staffById = (id) => staff.find((s) => s.id === id);

  function toggleSupervisor(id) {
    const s = staff.find((s) => s.id === id);
    setStaff(staff.map((st) => (st.id === id ? { ...st, sup: !st.sup } : st)));
    setToast(s.sup ? `${s.name} removed as Supervisor` : `${s.name} assigned as Supervisor`);
  }

  function quickCheckIn(id) {
    setEquipment(equipment.map((e) => (e.id === id ? { ...e, status: "in", holder: null } : e)));
    setViewItem(null);
    toast("Marked as checked in", { type: "success" });
  }

  function quickCheckOut(id) {
    setEquipment(equipment.map((e) => (e.id === id ? { ...e, status: "out", holder: staff[0].id } : e)));
    setViewItem(null);
    toast(`Checked out to ${staff[0].name}`, { type: "info" });
  }

  function handleCheckout(formData) {
    const equip = equipment.find(e => e.id === formData.equipmentId);
    const tech = staffById(parseInt(formData.staffId, 10));
    const now = new Date();
    
    // Update equipment status
    setEquipment(equipment.map(e => (e.id === formData.equipmentId ? { ...e, status: "out", holder: tech.id } : e)));
    
    // Create new transaction log
    const newTx = {
      id: "tx" + Date.now(),
      dateOut: now.toISOString().slice(0, 19).replace('T', ' '),
      dateIn: null,
      managerDate: null,
      tag: equip.tag,
      equipNo: equip.equipNo,
      name: equip.name,
      cat: equip.cat,
      project: formData.project,
      location: formData.location,
      tech: tech.name,
      status: "out",
      techSigOut: formData.sig,
      techSigIn: null,
      managerSig: null,
      equipmentId: equip.id
    };
    
    setLog([newTx, ...log]);
    
    if (formData.projectId) {
      setProjects(projects.map(p => 
        p.id === formData.projectId
          ? { ...p, log: [{ date: newTx.dateOut, item: newTx.name, tag: newTx.tag, action: "out", qty: 1, tech: newTx.tech }, ...p.log] }
          : p
      ));
    }
    
    setCheckoutOpen(false);
    toast(`${equip.name} checked out to ${tech.name}`, { type: "success", title: "Checkout Successful" });
  }

  function handleReturn(formData) {
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    // Update log
    setLog(log.map(l => {
      if (l.id === returnRecord.id) {
        return {
          ...l,
          status: "return",
          dateIn: now,
          managerDate: now,
          techSigIn: formData.sigIn,
          managerSig: formData.mgrSig
        };
      }
      return l;
    }));
    
    // Free the equipment
    if (returnRecord.equipmentId) {
      setEquipment(equipment.map(e => e.id === returnRecord.equipmentId ? { ...e, status: "available", holder: null } : e));
    } else {
      // For mock data fallback (matching by tag and name)
      setEquipment(equipment.map(e => (e.tag === returnRecord.tag && e.name === returnRecord.name) ? { ...e, status: "available", holder: null } : e));
    }
    
    toast(`Equipment returned successfully.`, { type: "success", title: "Manager Approved" });
    setReturnRecord(null);
  }

  function handleOpenAddEquipment(catId) {
    if (typeof catId === "string") {
      setForm({ ...emptyForm, cat: catId });
      setFixedCategory(true);
    } else {
      setForm(emptyForm);
      setFixedCategory(false);
    }
    setAddOpen(true);
  }

  function submitAdd(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const newItem = {
      id: "n" + Date.now(),
      equipNo: "EQ-" + String(Math.floor(1000 + Math.random() * 9000)),
      cat: form.cat,
      name: form.name.trim(),
      tag: form.tag.trim() || "—",
      img: form.img ? form.img.trim() : "",
      location: form.location,
      qty: parseInt(form.qty, 10) || 1,
      status: form.status,
      holder: form.staffId ? parseInt(form.staffId, 10) : null,
      fields: { ...form.fields },
    };
    setEquipment([newItem, ...equipment]);
    setLog([
      {
        id: "tx" + Date.now(),
        dateOut: "2026-07-10 " + new Date().toTimeString().slice(0, 5) + ":00",
        dateIn: form.status === "available" ? "2026-07-10 " + new Date().toTimeString().slice(0, 5) + ":00" : null,
        tag: newItem.tag,
        equipNo: newItem.equipNo,
        name: newItem.name,
        cat: form.cat,
        tech: form.staffId ? staffById(parseInt(form.staffId, 10)).name : "Unassigned",
        status: form.status === "available" ? "in" : form.status,
      },
      ...log,
    ]);
    setAddOpen(false);
    setForm(emptyForm);
    toast(`${newItem.name} added to the register`, { type: "success" });
  }

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen flex" style={{ background: C.bg, color: C.ink, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={() => setLoggedIn(false)} />
      <div className="flex-1 min-w-0">
        <Topbar onNewEntry={handleOpenAddEquipment} onMenuClick={() => setSidebarOpen(true)} equipment={equipment} categories={categories} />
        <div className="p-4 md:p-7">
          <Routes>
            <Route path="/" element={
              <Dashboard equipment={equipment} log={log} staff={staff} categories={categories} />
            } />
            <Route path="/inventory" element={<Inventory equipment={equipment} categories={categories} />} />
            <Route path="/inventory/:catId" element={
              <CategoryDetail
                equipment={equipment}
                staffById={staffById}
                setViewItem={setViewItem}
                categories={categories}
                openAddEquipment={handleOpenAddEquipment}
              />
            } />
            <Route path="/register" element={
              <Register 
                log={log} 
                categories={categories} 
                onNewCheckout={() => setCheckoutOpen(true)}
                onReturn={(record) => setReturnRecord(record)}
                onDetails={(record) => setDetailsRecord(record)}
              />
            } />
            <Route path="/manage-inventory" element={
              <ManageInventory
                categories={categories}
                setCategories={setCategories}
                fieldSchemas={fieldSchemas}
                setFieldSchemas={setFieldSchemas}
                equipment={equipment}
                openAddEquipment={handleOpenAddEquipment}
              />
            } />
            <Route path="/staff" element={
              <Staff staff={staff} setStaff={setStaff} equipment={equipment} toggleSupervisor={toggleSupervisor} log={log} />
            } />
            <Route path="/projects" element={<Projects projects={projects} setProjects={setProjects} />} />
            <Route path="/projects/:projectId" element={<ProjectDetail projects={projects} />} />
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
          fieldSchemas={fieldSchemas}
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
          categories={categories}
          fieldSchemas={fieldSchemas}
          fixedCategory={fixedCategory}
          onSubmit={submitAdd}
          onClose={() => { setAddOpen(false); setForm(emptyForm); setFixedCategory(false); }}
        />
      )}

      {/* Checkout Modal */}
      {checkoutOpen && (
        <CheckoutModal
          equipmentList={equipment}
          staffList={staff}
          projectsList={projects}
          onSubmit={handleCheckout}
          onClose={() => setCheckoutOpen(false)}
        />
      )}

      {/* Return Modal */}
      {returnRecord && (
        <ReturnModal
          record={returnRecord}
          onSubmit={handleReturn}
          onClose={() => setReturnRecord(null)}
        />
      )}

      {/* Record Details Modal */}
      {detailsRecord && (
        <RecordDetailsModal
          record={detailsRecord}
          onClose={() => setDetailsRecord(null)}
        />
      )}
    </div>
  );
}
