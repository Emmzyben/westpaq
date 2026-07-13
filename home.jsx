import { useState, useEffect } from "react";
import {
    LayoutDashboard, Boxes, ClipboardList, Users, UserCircle2,
    Search, Bell, Plus, X, ChevronLeft, Wrench, Container, Gauge,
    Weight, Grid3X3, Flame, TrendingUp, Minus, ArrowRight,
} from "lucide-react";

/* ============================================================
   BRAND TOKENS
============================================================ */
const C = {
    red: "#E4241F", redDark: "#C4171A", redDeep: "#5C0C0E", redText: "#C81E1B",
    amber: "#E9A22B", amberText: "#A8720C",
    green: "#22A567", greenText: "#178C57",
    steel: "#4C7FB5", steelText: "#2F5C8A",
    ink: "#171A1F", ink2: "#5B6472", ink3: "#98A1AC",
    border: "#E3E6EA", card: "#FFFFFF", bg: "#F4F5F7", cardHi: "#EEF0F3",
};

const ICONS = { general: Wrench, ccu: Container, instrument: Gauge, lifting: Weight, scaffold: Grid3X3, gas: Flame };
const PAL = {
    general: { from: "#7a1a1a", to: "#2b0707" },
    ccu: { from: "#234161", to: "#0f1c2b" },
    instrument: { from: "#7a531a", to: "#2a1a06" },
    lifting: { from: "#7a1a1a", to: "#2b0707" },
    scaffold: { from: "#1f5c42", to: "#0b201a" },
    gas: { from: "#234161", to: "#0f1c2b" },
};
const ICON_COLOR = { general: C.red, ccu: C.steel, instrument: C.amber, lifting: C.red, scaffold: C.green, gas: C.steel };

/* ============================================================
   REAL DATA (from WestPaq equipment sheets)
============================================================ */
const CATS = [
    { id: "general", name: "General", desc: "Hand tools, spanners, welding sets and workshop consumables." },
    { id: "ccu", name: "CCU", desc: "Cargo carrying units — certified containers, baskets and frames." },
    { id: "instrument", name: "Instrument", desc: "Calibrated gauges, meters and precision measuring tools." },
    { id: "lifting", name: "Lifting Gear", desc: "Slings, shackles and rigging hardware rated by tonnage." },
    { id: "scaffold", name: "Scaffold Materials", desc: "Pipes, boards, clamps and ladders tracked per campaign." },
    { id: "gas", name: "Gas Cylinders", desc: "Onboard, in-use, empty and complete cylinder counts by gas type." },
];

const FIELD_SCHEMAS = {
    general: [["partNo", "Part No"], ["manufacturer", "Manufacturer"], ["uom", "UoM"], ["remarks", "Remarks"]],
    ccu: [["dimension", "Dimension"], ["swl", "S.W.L"], ["tareWeight", "Tare Weight"], ["colorCode", "Color Code"], ["certNumber", "Certification No"], ["certDate", "Certification Date"], ["nextCert", "Next Certification"], ["daysNext", "Days to Next Cert"]],
    instrument: [["partNumber", "Part Number"], ["manufacturer", "Manufacturer"]],
    lifting: [["model", "Model"], ["manufacturer", "Manufacturer"], ["diameter", "Diameter"], ["length", "Length"], ["tonnage", "Tonnage"]],
    scaffold: [["uom", "UoM"], ["remarks", "Remarks"]],
    gas: [["onboard", "Total Onboard"], ["inUse", "In Use"], ["empty", "Empty Cylinders"], ["complete", "Complete Cylinders"]],
};

const STAFF_INIT = [
    { id: 1, name: "Engr. Larry Udoh", role: "Field Engineer", dept: "Operations", sup: false, held: 2, tx: 34 },
    { id: 2, name: "Katie Bassey", role: "Site Technician", dept: "Operations", sup: false, held: 1, tx: 19 },
    { id: 3, name: "Gabby Nwosu", role: "IT Support", dept: "IT & Electronics", sup: false, held: 1, tx: 11 },
    { id: 4, name: "Ken Larry", role: "Wireline Operator", dept: "Instrument", sup: true, held: 1, tx: 47 },
    { id: 5, name: "Josiah Eze", role: "Facilities Tech", dept: "General", sup: false, held: 0, tx: 22 },
    { id: 6, name: "Jovi Obu", role: "Yard Technician", dept: "Operations", sup: false, held: 1, tx: 15 },
    { id: 7, name: "Chiamaka Bello", role: "Rigging Supervisor", dept: "Lifting Gear", sup: true, held: 0, tx: 52 },
    { id: 8, name: "Tari Sokari", role: "Logistics Officer", dept: "CCU", sup: false, held: 1, tx: 9 },
];

const EQUIPMENT_INIT = [
    { id: "g1", cat: "general", name: 'Ring Spanner 75"', tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g2", cat: "general", name: 'Ring Spanner 60"', tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g3", cat: "general", name: 'Ring Spanner 50"', tag: "—", location: "Offshore", qty: 3, status: "available", holder: null, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g4", cat: "general", name: 'Ring Spanner 55"', tag: "—", location: "Offshore", qty: 4, status: "out", holder: 5, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g5", cat: "general", name: "Allen Key 5mm", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g6", cat: "general", name: "Grinding Machine Key", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { partNo: "—", manufacturer: "—", uom: "EA", remarks: "" } },
    { id: "g7", cat: "general", name: "Miller Welding Machine 907810", tag: "907810", location: "Offshore", qty: 9, status: "out", holder: 6, fields: { partNo: "907810", manufacturer: "Miller", uom: "EA", remarks: "NF310693C · WPQ01 · WPQ02 · WPQ03" } },
    { id: "g8", cat: "general", name: '12" Combination Square', tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { partNo: "—", manufacturer: "Ring & Flat", uom: "EA", remarks: "" } },

    { id: "c1", cat: "ccu", name: "20FT Cargo Container", tag: "WEL/RL/001", location: "Offshore", qty: 1, status: "available", holder: null, fields: { dimension: "2.59M x 2.44M x 6.05M", swl: "4000Kgs", tareWeight: "2950Kgs", colorCode: "Green", certNumber: "WEL/P/26/001", certDate: "5/8/2026", nextCert: "11/7/2026", daysNext: "141 days" } },
    { id: "c2", cat: "ccu", name: "20FT Cargo Container", tag: "WEL/RL/002", location: "Offshore", qty: 1, status: "out", holder: 8, fields: { dimension: "2.59M x 2.44M x 6.05M", swl: "4000Kgs", tareWeight: "2950Kgs", colorCode: "Green", certNumber: "WEL/P/26/002", certDate: "5/8/2026", nextCert: "11/7/2026", daysNext: "141 days" } },

    { id: "i1", cat: "instrument", name: "Welding Gauge", tag: "42928", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "3112090681", manufacturer: "Insize" } },
    { id: "i2", cat: "instrument", name: "Protractor", tag: "3435", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "19", manufacturer: "Starrett" } },
    { id: "i3", cat: "instrument", name: "Welding Gauge", tag: "30635", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "1MM", manufacturer: "—" } },
    { id: "i4", cat: "instrument", name: "Vernier Caliper", tag: "58678", location: "Offshore", qty: 1, status: "out", holder: 4, fields: { partNumber: "1707121171", manufacturer: "Insize" } },
    { id: "i5", cat: "instrument", name: "Feeler Gauge", tag: "27689", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "—", manufacturer: "Marberg" } },
    { id: "i6", cat: "instrument", name: "Digital Clamp Meter", tag: "66880366", location: "Offshore", qty: 1, status: "in", holder: 3, fields: { partNumber: "66880366", manufacturer: "Fluke" } },
    { id: "i7", cat: "instrument", name: "Infrared Thermometer", tag: "WEL/IT/01", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "TA601C", manufacturer: "TASI" } },
    { id: "i8", cat: "instrument", name: "MIT525 Insulation Tester", tag: "MIT525/2-EU", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "1016085", manufacturer: "Megger" } },
    { id: "i9", cat: "instrument", name: "Harness Tester Equipment", tag: "—", location: "Offshore", qty: 1, status: "available", holder: null, fields: { partNumber: "—", manufacturer: "OEM · Mitutoyo" } },

    { id: "l1", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { model: "—", manufacturer: "Cleftec", diameter: "90mm", length: "3m", tonnage: "3T" } },
    { id: "l2", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { model: "—", manufacturer: "Cleftec", diameter: "60mm", length: "1m", tonnage: "2T" } },
    { id: "l3", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "out", holder: 7, fields: { model: "—", manufacturer: "Cleftec", diameter: "130mm", length: "5m", tonnage: "5T" } },
    { id: "l4", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 4, status: "available", holder: null, fields: { model: "—", manufacturer: "Cleftec", diameter: "90mm", length: "6m", tonnage: "3T" } },
    { id: "l5", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { model: "—", manufacturer: "Cleftec", diameter: "130mm", length: "4m", tonnage: "5T" } },
    { id: "l6", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { model: "—", manufacturer: "Anchor Power Lift", diameter: "130mm", length: "5m", tonnage: "5T" } },
    { id: "l7", cat: "lifting", name: "Flat Polyester Webbing Sling", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { model: "—", manufacturer: "Anchor Power Lift", diameter: "130mm", length: "4m", tonnage: "5T" } },

    { id: "s1", cat: "scaffold", name: "6M Pipe", tag: "—", location: "Offshore", qty: 2170, status: "available", holder: null, fields: { uom: "PCS", remarks: "Main campaign stock" } },
    { id: "s2", cat: "scaffold", name: "2M Board", tag: "—", location: "Offshore", qty: 480, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s3", cat: "scaffold", name: "3M Board", tag: "—", location: "Offshore", qty: 410, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s4", cat: "scaffold", name: "4M Board", tag: "—", location: "Offshore", qty: 545, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s5", cat: "scaffold", name: "Base Plate", tag: "—", location: "Offshore", qty: 345, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s6", cat: "scaffold", name: "Board Clamp", tag: "—", location: "Offshore", qty: 2366, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s7", cat: "scaffold", name: "Beam Clamp", tag: "—", location: "Offshore", qty: 1462, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s8", cat: "scaffold", name: "Single Clamp", tag: "—", location: "Offshore", qty: 2550, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s9", cat: "scaffold", name: "Double Clamp", tag: "—", location: "Offshore", qty: 6810, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s10", cat: "scaffold", name: "Swivel Clamp", tag: "—", location: "Offshore", qty: 1650, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s11", cat: "scaffold", name: "Sleeve", tag: "—", location: "Offshore", qty: 630, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s12", cat: "scaffold", name: "3M Aluminium Ladder", tag: "—", location: "Offshore", qty: 19, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s13", cat: "scaffold", name: "4M Aluminium Ladder", tag: "—", location: "Offshore", qty: 38, status: "out", holder: 2, fields: { uom: "PCS", remarks: "" } },
    { id: "s14", cat: "scaffold", name: "6M Aluminium Ladder", tag: "—", location: "Offshore", qty: 8, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s15", cat: "scaffold", name: "Safety Cage Ring", tag: "—", location: "Offshore", qty: 3, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s16", cat: "scaffold", name: "Sole Pad", tag: "—", location: "Offshore", qty: 225, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s17", cat: "scaffold", name: "6M Steel Ladder", tag: "—", location: "Offshore", qty: 3, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s18", cat: "scaffold", name: "4M Steel Ladder", tag: "—", location: "Offshore", qty: 6, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s19", cat: "scaffold", name: "2M Steel Ladder", tag: "—", location: "Offshore", qty: 7, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s20", cat: "scaffold", name: "Double Sided Ladder", tag: "—", location: "Offshore", qty: 165, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },
    { id: "s21", cat: "scaffold", name: "Bind & Plate", tag: "—", location: "Offshore", qty: 150, status: "available", holder: null, fields: { uom: "PCS", remarks: "" } },

    { id: "ga1", cat: "gas", name: "Industrial Oxygen (O₂)", tag: "—", location: "Offshore", qty: 6, status: "available", holder: null, fields: { onboard: "6", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga2", cat: "gas", name: "Acetylene (C₂H₂)", tag: "—", location: "Offshore", qty: 4, status: "available", holder: null, fields: { onboard: "4", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga3", cat: "gas", name: "Argon (Ar)", tag: "—", location: "Offshore", qty: 0, status: "available", holder: null, fields: { onboard: "—", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga4", cat: "gas", name: "Soldering Mixture (Ar/CO₂)", tag: "—", location: "Offshore", qty: 0, status: "available", holder: null, fields: { onboard: "—", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga5", cat: "gas", name: "Nitrogen (N₂)", tag: "—", location: "Offshore", qty: 0, status: "available", holder: null, fields: { onboard: "—", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga6", cat: "gas", name: "Carbon Dioxide (CO₂)", tag: "—", location: "Offshore", qty: 0, status: "available", holder: null, fields: { onboard: "—", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga7", cat: "gas", name: "Propane (C₃H₈)", tag: "—", location: "Offshore", qty: 2, status: "available", holder: null, fields: { onboard: "2", inUse: "—", empty: "—", complete: "—" } },
    { id: "ga8", cat: "gas", name: "Propane Cylinder", tag: "—", location: "Aveon", qty: 3, status: "return", holder: null, fields: { onboard: "—", inUse: "—", empty: "3", complete: "—" } },
    { id: "ga9", cat: "gas", name: "Acetylene Cylinder", tag: "—", location: "Aveon", qty: 3, status: "return", holder: null, fields: { onboard: "—", inUse: "—", empty: "3", complete: "—" } },
    { id: "ga10", cat: "gas", name: "Oxygen Cylinder", tag: "—", location: "Aveon", qty: 1, status: "return", holder: null, fields: { onboard: "—", inUse: "—", empty: "1", complete: "—" } },
];

const LOG_INIT = [
    { date: "2026-07-10 12:45", tag: "WEL/RL/002", name: "20FT Cargo Container", cat: "ccu", tech: "Tari Sokari", status: "out" },
    { date: "2026-06-11 09:20", tag: "—", name: "4M Aluminium Ladder", cat: "scaffold", tech: "Katie Bassey", status: "out" },
    { date: "2026-06-06 15:40", tag: "—", name: 'Ring Spanner 55"', cat: "general", tech: "Josiah Eze", status: "out" },
    { date: "2026-04-18 11:05", tag: "58678", name: "Vernier Caliper", cat: "instrument", tech: "Ken Larry", status: "out" },
    { date: "2026-04-04 14:22", tag: "66880366", name: "Digital Clamp Meter", cat: "instrument", tech: "Gabby Nwosu", status: "in" },
    { date: "2026-03-14 08:10", tag: "907810", name: "Miller Welding Machine 907810", cat: "general", tech: "Jovi Obu", status: "out" },
    { date: "2026-02-26 16:47", tag: "—", name: "Flat Polyester Webbing Sling", cat: "lifting", tech: "Chiamaka Bello", status: "out" },
    { date: "2026-01-30 10:00", tag: "—", name: "Propane Cylinder", cat: "gas", tech: "Engr. Larry Udoh", status: "return" },
];

const initials = (n) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* ============================================================
   SMALL UI PRIMITIVES
============================================================ */
function Badge({ status }) {
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

function Btn({ children, onClick, variant = "ghost", small, full, type = "button" }) {
    const base = "inline-flex items-center justify-center gap-2 rounded-lg font-bold transition active:scale-95";
    const size = small ? "px-3.5 py-2 text-xs" : "px-5 py-3 text-sm";
    const styles = {
        primary: { background: `linear-gradient(135deg, ${C.red}, ${C.redDark})`, color: "#fff", boxShadow: `0 8px 18px -8px ${C.red}70` },
        ghost: { background: "#fff", color: C.ink, border: `1px solid ${C.border}` },
        dark: { background: C.ink, color: "#fff" },
    };
    return (
        <button type={type} onClick={onClick} className={`${base} ${size} ${full ? "w-full" : ""}`} style={styles[variant]}>
            {children}
        </button>
    );
}

function Avatar({ name, size = 34, gradient }) {
    return (
        <div
            className="rounded-full flex items-center justify-center flex-shrink-0 font-extrabold text-white"
            style={{ width: size, height: size, fontSize: size * 0.34, background: gradient || `linear-gradient(135deg, ${C.steel}, #2c4a6e)` }}
        >
            {initials(name)}
        </div>
    );
}

function CatIcon({ cat, size = 22, color }) {
    const Icon = ICONS[cat];
    return <Icon size={size} color={color || ICON_COLOR[cat]} strokeWidth={2.3} />;
}

/* ============================================================
   MAIN APP
============================================================ */
export default function WestPaqRegister() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [page, setPage] = useState("dashboard");
    const [selectedCat, setSelectedCat] = useState(null);
    const [staff, setStaff] = useState(STAFF_INIT);
    const [equipment, setEquipment] = useState(EQUIPMENT_INIT);
    const [log, setLog] = useState(LOG_INIT);
    const [regFilter, setRegFilter] = useState("all");
    const [viewItem, setViewItem] = useState(null);
    const [addOpen, setAddOpen] = useState(false);
    const [toast, setToast] = useState("");

    const emptyForm = { cat: "general", location: "Offshore", qty: 1, name: "", tag: "", status: "available", staffId: "", fields: {} };
    const [form, setForm] = useState(emptyForm);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(""), 2600);
        return () => clearTimeout(t);
    }, [toast]);

    const catById = (id) => CATS.find((c) => c.id === id);
    const staffById = (id) => staff.find((s) => s.id === id);

    function go(p, cat) {
        if (cat) setSelectedCat(cat);
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleSupervisor(id) {
        setStaff(staff.map((s) => (s.id === id ? { ...s, sup: !s.sup } : s)));
        const s = staff.find((s) => s.id === id);
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

    const stats = {
        total: equipment.length,
        out: equipment.filter((e) => e.status === "out").length,
        in: equipment.filter((e) => e.status === "in" || e.status === "return").length,
        staff: staff.length,
    };
    const top5 = [...equipment].sort((a, b) => b.qty - a.qty).slice(0, 5);
    const regRows = regFilter === "all" ? log : log.filter((l) => l.status === regFilter);

    /* ---------- LOGIN SCREEN ---------- */
    if (!loggedIn) {
        return (
            <div className="min-h-screen grid md:grid-cols-2" style={{ fontFamily: "Inter, sans-serif" }}>
                <div
                    className="hidden md:flex flex-col justify-between p-14 relative overflow-hidden"
                    style={{ background: `linear-gradient(165deg, ${C.redDeep} 0%, #2a0607 55%, #0E0F11 100%)` }}
                >
                    <div className="flex items-center gap-2.5 relative z-10">
                        <svg width={30} height={26} viewBox="0 0 60 52">
                            <polygon points="0,0 34,26 0,52" fill="#fff" />
                            <polygon points="24,0 58,26 24,52" fill="#fff" opacity="0.55" />
                        </svg>
                        <span className="font-extrabold text-lg text-white tracking-wide">
                            WEST<span style={{ color: "#FF6B57" }}>PAQ</span>
                        </span>
                    </div>
                    <div className="relative z-10 max-w-md">
                        <div className="text-xs tracking-widest uppercase font-semibold mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>Smart Equipment Register</div>
                        <h1 className="text-4xl font-bold text-white leading-tight">
                            Every piece of kit, tracked the moment it leaves the yard.
                        </h1>
                        <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                            Check-out, check-in, and manager release — one continuous record from the field to the yard office.
                        </p>
                        <div className="flex gap-7 mt-8">
                            <div><b className="block text-2xl font-bold text-white">{EQUIPMENT_INIT.length}</b><span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Assets Tracked</span></div>
                            <div><b className="block text-2xl font-bold text-white">38</b><span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Active Staff</span></div>
                            <div><b className="block text-2xl font-bold text-white">99.2%</b><span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Return Rate</span></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-10 bg-white">
                    <div className="w-full max-w-sm">
                        <div className="flex items-center gap-2.5 mb-8">
                            <svg width={26} height={22} viewBox="0 0 60 52">
                                <polygon points="0,0 34,26 0,52" fill={C.red} />
                                <polygon points="24,0 58,26 24,52" fill={C.redDark} />
                            </svg>
                            <span className="font-extrabold text-lg">WEST<span style={{ color: C.red }}>PAQ</span></span>
                        </div>
                        <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
                        <p className="text-sm mb-8" style={{ color: C.ink2 }}>Sign in as an administrator to manage the equipment register.</p>
                        <form onSubmit={(e) => { e.preventDefault(); setLoggedIn(true); }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Work email</label>
                                <input defaultValue="admin@westpaq.com" className="w-full px-3.5 py-3 rounded-lg text-sm outline-none" style={{ border: `1px solid ${C.border}` }} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Password</label>
                                <input type="password" defaultValue="password123" className="w-full px-3.5 py-3 rounded-lg text-sm outline-none" style={{ border: `1px solid ${C.border}` }} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Sign in as</label>
                                <select className="w-full px-3.5 py-3 rounded-lg text-sm outline-none" style={{ border: `1px solid ${C.border}` }}>
                                    <option>Administrator</option><option>Manager</option><option>Supervisor</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <Btn variant="primary" full type="submit">Sign in to dashboard <ArrowRight size={15} /></Btn>
                            </div>
                        </form>
                        <p className="mt-6 text-xs text-center" style={{ color: C.ink3 }}>WestPaq Ltd · 1 Sugar Creek Center Blvd, Ste 600, Sugar Land, TX 77478</p>
                    </div>
                </div>
            </div>
        );
    }

    /* ---------- APP SHELL ---------- */
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
        { id: "inventory", label: "Inventory", icon: Boxes, group: "Assets" },
        { id: "register", label: "Equipment Register", icon: ClipboardList, group: "Assets" },
        { id: "staff", label: "Staff", icon: Users, group: "People" },
        { id: "profile", label: "Profile", icon: UserCircle2, group: "People" },
    ];
    const titles = { dashboard: "Dashboard", inventory: "Inventory", "cat-detail": selectedCat ? catById(selectedCat).name : "Category", register: "Equipment Register", staff: "Staff", profile: "Profile" };
    const crumbs = { dashboard: "Overview of yard activity", inventory: "Browse assets by category", "cat-detail": "Category detail", register: "Full check-out / check-in log", staff: "Manage staff and supervisors", profile: "Your account" };
    const activeNav = page === "cat-detail" ? "inventory" : page;

    return (
        <div className="min-h-screen flex" style={{ background: C.bg, color: C.ink, fontFamily: "Inter, sans-serif" }}>
            {/* SIDEBAR */}
            <aside className="w-60 flex-shrink-0 bg-white border-r flex flex-col p-4 sticky top-0 h-screen" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-2.5 pb-5 mb-4 border-b" style={{ borderColor: C.border }}>
                    <svg width={22} height={19} viewBox="0 0 60 52">
                        <polygon points="0,0 34,26 0,52" fill={C.red} />
                        <polygon points="24,0 58,26 24,52" fill={C.redDark} />
                    </svg>
                    <span className="font-extrabold text-sm">WEST<span style={{ color: C.red }}>PAQ</span></span>
                </div>
                {["Overview", "Assets", "People"].map((group) => (
                    <div key={group}>
                        <div className="text-xs uppercase tracking-wider font-bold px-3 mt-3 mb-1.5" style={{ color: C.ink3 }}>{group}</div>
                        {navItems.filter((n) => n.group === group).map((n) => {
                            const active = activeNav === n.id;
                            const Icon = n.icon;
                            return (
                                <div
                                    key={n.id}
                                    onClick={() => go(n.id)}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-semibold cursor-pointer relative"
                                    style={active ? { background: `linear-gradient(90deg, ${C.red}1A, ${C.red}05)`, color: C.redDark } : { color: C.ink2 }}
                                >
                                    {active && <span className="absolute -left-4 top-2 bottom-2 rounded" style={{ background: C.red, width: 3 }} />}
                                    <Icon size={18} color={active ? C.red : C.ink2} />
                                    {n.label}
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div className="mt-auto pt-4 border-t" style={{ borderColor: C.border }}>
                    <div onClick={() => go("profile")} className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-gray-50">
                        <Avatar name="Amaka Okoro" size={34} />
                        <div><b className="block text-xs">Amaka Okoro</b><span className="text-xs" style={{ color: C.ink3 }}>Administrator</span></div>
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 min-w-0">
                <div className="border-b flex items-center justify-between px-7 sticky top-0 backdrop-blur z-10" style={{ borderColor: C.border, height: 68, background: "rgba(255,255,255,0.9)" }}>
                    <div>
                        <h2 className="font-bold text-lg">{titles[page]}</h2>
                        <div className="text-xs" style={{ color: C.ink3 }}>{crumbs[page]}</div>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <div className="hidden md:flex items-center gap-2 rounded-lg px-3.5 py-2 w-64" style={{ background: C.cardHi, border: `1px solid ${C.border}` }}>
                            <Search size={15} color={C.ink3} />
                            <input placeholder="Search equipment, staff, tag..." className="bg-transparent outline-none text-sm w-full" />
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center relative" style={{ borderColor: C.border }}>
                            <Bell size={16} color={C.ink2} />
                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
                        </div>
                        <Btn variant="primary" small onClick={() => setAddOpen(true)}><Plus size={14} /> New Entry</Btn>
                    </div>
                </div>

                <div className="p-7">
                    {/* DASHBOARD */}
                    {page === "dashboard" && (
                        <div>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                                {[
                                    { label: "Total equipment entries", val: stats.total, icon: ClipboardList, tint: C.red, delta: "↑ 4.2% this month", up: true },
                                    { label: "Checked out now", val: stats.out, icon: TrendingUp, tint: C.amber, delta: "— steady vs last week", up: null },
                                    { label: "Returned / checked in", val: stats.in, icon: TrendingUp, tint: C.green, delta: "↑ 12 vs yesterday", up: true },
                                    { label: "Active staff", val: stats.staff, icon: Users, tint: C.steel, delta: "↑ 2 new this month", up: true },
                                ].map((s, i) => (
                                    <div key={i} className="rounded-2xl p-5 bg-white border" style={{ borderColor: C.border }}>
                                        <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: `${s.tint}22` }}>
                                            <s.icon size={17} color={s.tint} />
                                        </div>
                                        <div className="text-3xl font-bold leading-none">{s.val.toLocaleString()}</div>
                                        <div className="text-xs mt-2" style={{ color: C.ink2 }}>{s.label}</div>
                                        <div className="text-xs mt-2.5 font-bold flex items-center gap-1" style={{ color: s.up === null ? C.ink3 : C.greenText }}>
                                            {s.up === null ? <Minus size={11} /> : <TrendingUp size={11} />} {s.delta}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="grid lg:grid-cols-5 gap-5">
                                <div className="lg:col-span-3">
                                    <div className="flex items-baseline justify-between mb-4">
                                        <h3 className="font-bold text-base">Top 5 equipment by quantity</h3>
                                        <button className="text-xs font-bold" style={{ color: C.red }} onClick={() => go("register")}>Full register →</button>
                                    </div>
                                    <div className="space-y-2.5">
                                        {top5.map((e, i) => (
                                            <div key={e.id} className="flex bg-white border rounded-xl overflow-hidden" style={{ borderColor: C.border }}>
                                                <div className="w-11 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm" style={{ background: C.cardHi, color: C.ink3, borderRight: `1px dashed ${C.border}` }}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </div>
                                                <div className="flex-1 flex items-center gap-3 px-3.5 py-3 min-w-0">
                                                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.red}1A` }}>
                                                        <CatIcon cat={e.cat} size={18} />
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <div className="text-sm font-bold truncate">{e.name}</div>
                                                        <div className="text-xs font-mono" style={{ color: C.ink3 }}>{e.tag !== "—" ? e.tag + " · " : ""}{catById(e.cat).name}</div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <b className="block text-base">{e.qty.toLocaleString()}</b>
                                                        <span className="block text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>qty</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <div className="flex items-baseline justify-between mb-4">
                                        <h3 className="font-bold text-base">Recent activity</h3>
                                        <span className="text-xs font-bold" style={{ color: C.red }}>Live</span>
                                    </div>
                                    <div className="bg-white border rounded-2xl p-5" style={{ borderColor: C.border }}>
                                        {log.slice(0, 5).map((l, i) => (
                                            <div key={i} className="flex gap-3 py-3 border-b last:border-0 last:pb-0 first:pt-0" style={{ borderColor: C.border }}>
                                                <div
                                                    className="w-11 h-11 rounded-lg border-2 flex items-center justify-center flex-shrink-0 font-extrabold text-xs -rotate-6"
                                                    style={{ borderColor: l.status === "out" ? C.amber : C.green, color: l.status === "out" ? C.amberText : C.greenText }}
                                                >
                                                    {l.status === "out" ? "OUT" : "IN"}
                                                </div>
                                                <div>
                                                    <b className="block text-sm">{l.name}</b>
                                                    <span className="text-xs" style={{ color: C.ink3 }}>{l.tech} · {l.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INVENTORY = CATEGORY GRID */}
                    {page === "inventory" && (
                        <div>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">Inventory by category</h1>
                                <p className="text-sm mt-1.5 max-w-xl" style={{ color: C.ink2 }}>Every asset class on record, grouped the way the yard actually sees it. Open a category to see what's on the shelf, what's out, and who's got it.</p>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {CATS.map((c) => {
                                    const count = equipment.filter((e) => e.cat === c.id).length;
                                    return (
                                        <div
                                            key={c.id}
                                            onClick={() => go("cat-detail", c.id)}
                                            className="relative rounded-3xl overflow-hidden cursor-pointer h-60 flex flex-col justify-end border transition hover:-translate-y-1.5"
                                            style={{ borderColor: C.border, background: `radial-gradient(120% 120% at 20% 15%, ${PAL[c.id].from}, ${PAL[c.id].to} 65%)` }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <CatIcon cat={c.id} size={92} color={ICON_COLOR[c.id]} />
                                            </div>
                                            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 28%, rgba(0,0,0,0.8) 100%)" }} />
                                            <div className="absolute top-3.5 right-3.5 backdrop-blur rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.18)" }}>
                                                {count} items
                                            </div>
                                            <div className="relative z-10" style={{ padding: 18 }}>
                                                <h4 className="font-bold text-white text-lg">{c.name}</h4>
                                                <p className="text-xs mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.74)" }}>{c.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* CATEGORY DETAIL */}
                    {page === "cat-detail" && selectedCat && (
                        <div>
                            <div className="flex items-center gap-3.5 mb-6">
                                <div onClick={() => go("inventory")} className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center cursor-pointer flex-shrink-0" style={{ borderColor: C.border }}>
                                    <ChevronLeft size={17} color={C.ink2} />
                                </div>
                                <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${C.red}1A`, width: 52, height: 52 }}>
                                    <CatIcon cat={selectedCat} size={24} color={C.redText} />
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl">{catById(selectedCat).name}</h2>
                                    <p className="text-xs" style={{ color: C.ink3 }}>{equipment.filter((e) => e.cat === selectedCat).length} items in this category</p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {equipment.filter((e) => e.cat === selectedCat).map((e) => (
                                    <EquipCard key={e.id} e={e} staffById={staffById} onView={() => setViewItem(e)} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* EQUIPMENT REGISTER */}
                    {page === "register" && (
                        <div>
                            <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
                                <div className="flex gap-2 flex-wrap">
                                    {[["all", "All movements"], ["out", "Checked Out"], ["in", "Checked In"], ["return", "Returned"]].map(([f, label]) => (
                                        <button
                                            key={f}
                                            onClick={() => setRegFilter(f)}
                                            className="px-3.5 py-2 rounded-full text-xs font-semibold border"
                                            style={regFilter === f ? { background: C.red, borderColor: C.red, color: "#fff" } : { background: "#fff", borderColor: C.border, color: C.ink2 }}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-2.5">
                                    <Btn variant="primary" small onClick={() => setAddOpen(true)}><Plus size={14} /> New Entry</Btn>
                                    <Btn variant="ghost" small>Export Excel</Btn>
                                    <Btn variant="dark" small>Export PDF</Btn>
                                </div>
                            </div>

                            <div className="hidden lg:grid gap-3.5 px-4 mb-2.5" style={{ gridTemplateColumns: "120px 1fr 1fr 1fr 130px 90px" }}>
                                {["Date out", "Equipment", "Technician", "Category", "Status", ""].map((h) => (
                                    <span key={h} className="text-xs uppercase tracking-wide font-bold" style={{ color: C.ink3 }}>{h}</span>
                                ))}
                            </div>

                            <div className="space-y-2.5">
                                {regRows.map((l, i) => (
                                    <div key={i} className="hidden lg:grid items-center gap-3.5 bg-white border rounded-xl px-4 py-3.5" style={{ borderColor: C.border, gridTemplateColumns: "120px 1fr 1fr 1fr 130px 90px" }}>
                                        <div className="font-mono text-xs" style={{ color: C.ink3 }}>{l.date}</div>
                                        <div><b className="block text-sm">{l.name}</b><span className="font-mono text-xs" style={{ color: C.ink3 }}>{l.tag}</span></div>
                                        <div className="flex items-center gap-2 text-sm font-semibold"><Avatar name={l.tech} size={26} />{l.tech}</div>
                                        <div className="text-sm" style={{ color: C.ink2 }}>{catById(l.cat).name}</div>
                                        <Badge status={l.status} />
                                        <div className="flex justify-end"><Btn variant="ghost" small>Details</Btn></div>
                                    </div>
                                ))}
                                {/* mobile cards */}
                                {regRows.map((l, i) => (
                                    <div key={"m" + i} className="lg:hidden bg-white border rounded-xl p-4" style={{ borderColor: C.border }}>
                                        <div className="flex justify-between text-sm py-1"><span>{l.name}</span><Badge status={l.status} /></div>
                                        <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}><span>Tag</span><b style={{ color: C.ink }}>{l.tag}</b></div>
                                        <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}><span>Technician</span><b style={{ color: C.ink }}>{l.tech}</b></div>
                                        <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}><span>Category</span><b style={{ color: C.ink }}>{catById(l.cat).name}</b></div>
                                        <div className="flex justify-between text-sm py-1" style={{ color: C.ink2 }}><span>Date out</span><b style={{ color: C.ink }}>{l.date}</b></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STAFF */}
                    {page === "staff" && (
                        <div>
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex gap-2">
                                    <button className="px-3.5 py-2 rounded-full text-xs font-semibold text-white" style={{ background: C.red }}>All staff</button>
                                    <button className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border" style={{ borderColor: C.border, color: C.ink2 }}>Supervisors</button>
                                </div>
                                <Btn variant="ghost" small>+ Add staff</Btn>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {staff.map((s) => (
                                    <div key={s.id} className="relative bg-white border rounded-2xl p-5 text-center" style={{ borderColor: C.border }}>
                                        {s.sup && (
                                            <div className="absolute top-3.5 left-3.5 rounded-full px-2 py-1 text-xs font-extrabold uppercase" style={{ background: `${C.amber}28`, color: C.amberText }}>
                                                Supervisor
                                            </div>
                                        )}
                                        <div className="flex justify-center mb-3"><Avatar name={s.name} size={64} gradient={`linear-gradient(135deg, ${C.red}, ${C.redDeep})`} /></div>
                                        <h4 className="font-bold text-sm">{s.name}</h4>
                                        <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{s.role} · {s.dept}</div>
                                        <div className="flex justify-center gap-5 my-4">
                                            <div><b className="block text-lg font-bold">{s.held}</b><span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>Holding</span></div>
                                            <div><b className="block text-lg font-bold">{s.tx}</b><span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>Transactions</span></div>
                                        </div>
                                        <Btn variant={s.sup ? "dark" : "ghost"} small full onClick={() => toggleSupervisor(s.id)}>
                                            {s.sup ? "✓ Supervisor" : "Assign as Supervisor"}
                                        </Btn>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* PROFILE */}
                    {page === "profile" && (
                        <div className="grid lg:grid-cols-4 gap-5 items-start">
                            <div className="lg:col-span-1 bg-white border rounded-3xl p-7 text-center" style={{ borderColor: C.border }}>
                                <div className="flex justify-center mb-3"><Avatar name="Amaka Okoro" size={84} /></div>
                                <h3 className="font-bold text-lg">Amaka Okoro</h3>
                                <div className="text-sm" style={{ color: C.ink3 }}>Administrator · Yard Office</div>
                                <div className="flex justify-center gap-2 mt-3.5">
                                    <Badge status="in" /><Badge status="return" />
                                </div>
                                <div className="mt-5 border-t pt-1 text-left" style={{ borderColor: C.border }}>
                                    {[["Email", "amaka.okoro@westpaq.com"], ["Phone", "+1 (281) 555-0148"], ["Location", "Sugar Land, TX"], ["Joined", "Mar 2023"]].map(([k, v]) => (
                                        <div key={k} className="flex justify-between py-3 border-b text-sm" style={{ borderColor: C.border }}>
                                            <span style={{ color: C.ink3 }}>{k}</span><span className="font-semibold">{v}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-5"><Btn variant="ghost" full>Edit profile</Btn></div>
                            </div>
                            <div className="lg:col-span-3">
                                <div className="bg-white border rounded-2xl mb-4" style={{ borderColor: C.border, padding: 22 }}>
                                    <h4 className="font-bold text-sm mb-4">Account settings</h4>
                                    <div className="space-y-3.5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Full name</label>
                                            <input defaultValue="Amaka Okoro" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Notification email</label>
                                            <input defaultValue="amaka.okoro@westpaq.com" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span>Two-factor authentication</span><Badge status="in" />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border rounded-2xl" style={{ borderColor: C.border, padding: 22 }}>
                                    <h4 className="font-bold text-sm mb-4">My recent releases</h4>
                                    {log.slice(0, 4).map((l, i) => (
                                        <div key={i} className="flex gap-3 py-3 border-b last:border-0" style={{ borderColor: C.border }}>
                                            <div className="w-11 h-11 rounded-lg border-2 flex items-center justify-center flex-shrink-0 font-extrabold text-xs -rotate-6" style={{ borderColor: l.status === "out" ? C.amber : C.green, color: l.status === "out" ? C.amberText : C.greenText }}>
                                                {l.status === "out" ? "OUT" : "IN"}
                                            </div>
                                            <div><b className="block text-sm">{l.name}</b><span className="text-xs" style={{ color: C.ink3 }}>Released to {l.tech} · {l.date}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* EQUIPMENT DETAIL MODAL */}
            {viewItem && (
                <ModalOverlay onClose={() => setViewItem(null)}>
                    <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
                        <div className="flex gap-3.5 items-center">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${C.red}1A` }}>
                                <CatIcon cat={viewItem.cat} size={22} color={C.redText} />
                            </div>
                            <div>
                                <div className="font-bold text-lg">{viewItem.name}</div>
                                <div className="mt-1"><Badge status={viewItem.status} /></div>
                            </div>
                        </div>
                        <button onClick={() => setViewItem(null)} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}><X size={16} /></button>
                    </div>
                    <div className="p-6">
                        {[
                            ["Category", catById(viewItem.cat).name],
                            ["Location", viewItem.location],
                            ["Tag / Part No", viewItem.tag],
                            ["Quantity", viewItem.qty.toLocaleString()],
                            ...FIELD_SCHEMAS[viewItem.cat].map(([k, label]) => [label, viewItem.fields[k] || "—"]),
                            ...(viewItem.holder ? [["Held by", `${staffById(viewItem.holder).name} · ${staffById(viewItem.holder).role}`]] : []),
                        ].map(([k, v]) => (
                            <div key={k} className="flex justify-between gap-4 py-2.5 border-b last:border-0 text-sm" style={{ borderColor: C.border }}>
                                <span style={{ color: C.ink3 }}>{k}</span><span className="font-semibold text-right">{v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="p-6 pt-0 flex gap-2.5">
                        <Btn variant="ghost" full onClick={() => setViewItem(null)}>Close</Btn>
                        {viewItem.status === "out" ? (
                            <Btn variant="primary" full onClick={() => quickCheckIn(viewItem.id)}>Mark as checked in</Btn>
                        ) : (
                            <Btn variant="primary" full onClick={() => quickCheckOut(viewItem.id)}>Check out this item</Btn>
                        )}
                    </div>
                </ModalOverlay>
            )}

            {/* ADD EQUIPMENT MODAL */}
            {addOpen && (
                <ModalOverlay onClose={() => { setAddOpen(false); setForm(emptyForm); }}>
                    <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
                        <div>
                            <div className="font-bold text-lg">Register new equipment</div>
                            <div className="text-xs mt-1" style={{ color: C.ink3 }}>Fields match what appears on the equipment card</div>
                        </div>
                        <button onClick={() => { setAddOpen(false); setForm(emptyForm); }} className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: C.cardHi }}><X size={16} /></button>
                    </div>
                    <form onSubmit={submitAdd}>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Category</label>
                                <select
                                    value={form.cat}
                                    onChange={(e) => setForm({ ...form, cat: e.target.value, fields: {} })}
                                    className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }}
                                >
                                    {CATS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Location</label>
                                    <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }}>
                                        <option>Offshore</option><option>Aveon</option><option>Onshore</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Quantity</label>
                                    <input type="number" min="0" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Material description</label>
                                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder='e.g. Ring Spanner 75"' className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Tag / part number</label>
                                <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} placeholder="e.g. WEL/RL/003" className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }} />
                            </div>

                            <div className="text-xs font-extrabold uppercase tracking-wide pt-2" style={{ color: C.ink3 }}>{catById(form.cat).name} details</div>
                            <div className="space-y-3.5">
                                {FIELD_SCHEMAS[form.cat].map(([k, label]) => (
                                    <div key={k}>
                                        <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>{label}</label>
                                        <input
                                            value={form.fields[k] || ""}
                                            onChange={(e) => setForm({ ...form, fields: { ...form.fields, [k]: e.target.value } })}
                                            placeholder={label}
                                            className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="text-xs font-extrabold uppercase tracking-wide pt-2" style={{ color: C.ink3 }}>Checkout status</div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Status</label>
                                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }}>
                                        <option value="available">Available</option><option value="out">Checked Out</option><option value="in">Checked In</option><option value="return">Returned</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Technician</label>
                                    <select value={form.staffId} onChange={(e) => setForm({ ...form, staffId: e.target.value })} className="w-full px-3.5 py-2.5 rounded-lg text-sm" style={{ border: `1px solid ${C.border}` }}>
                                        <option value="">— Unassigned —</option>
                                        {staff.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 pt-0 flex gap-2.5">
                            <Btn variant="ghost" full onClick={() => { setAddOpen(false); setForm(emptyForm); }}>Cancel</Btn>
                            <Btn variant="primary" full type="submit">Add to register</Btn>
                        </div>
                    </form>
                </ModalOverlay>
            )}

            {/* TOAST */}
            {toast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white flex items-center gap-2.5 z-50" style={{ background: C.ink }}>
                    <span className="w-2 h-2 rounded-full" style={{ background: C.green }} />
                    {toast}
                </div>
            )}
        </div>
    );
}

function ModalOverlay({ children, onClose }) {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-5" style={{ background: "rgba(15,18,22,0.5)" }} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="bg-white rounded-3xl w-full max-w-lg overflow-y-auto shadow-2xl" style={{ maxHeight: "88vh" }}>
                {children}
            </div>
        </div>
    );
}

function EquipCard({ e, staffById, onView }) {
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
        <div className="bg-white border rounded-2xl transition hover:-translate-y-1" style={{ borderColor: C.border, padding: 18 }}>
            <div className="flex items-start justify-between mb-3.5">
                <div className="rounded-lg flex items-center justify-center" style={{ background: `${C.red}1A`, width: 42, height: 42 }}>
                    <CatIcon cat={e.cat} size={20} color={C.redText} />
                </div>
                <Badge status={e.status} />
            </div>
            <div className="font-bold text-sm mt-3">{e.name}</div>
            <div className="font-mono text-xs mt-0.5" style={{ color: C.ink3 }}>{e.tag !== "—" ? "TAG · " + e.tag : e.location.toUpperCase()}</div>
            <div className="text-xs mt-2" style={{ color: C.ink2 }}>{previewLine()}</div>
            <div className="border-t border-dashed my-3.5" style={{ borderColor: C.border }} />
            {holder ? (
                <div className="flex items-center gap-2.5">
                    <Avatar name={holder.name} size={28} />
                    <div><b className="block text-xs">{holder.name}</b><span className="text-xs" style={{ color: C.ink3 }}>{holder.role}</span></div>
                </div>
            ) : (
                <div className="text-xs italic" style={{ color: C.ink3 }}>{e.location} · not checked out</div>
            )}
            <div className="flex items-center justify-between mt-3.5">
                <span className="text-xs" style={{ color: C.ink3 }}>Qty {e.qty.toLocaleString()}</span>
                <button onClick={onView} className="text-xs font-bold" style={{ color: C.red }}>View full details →</button>
            </div>
        </div>
    );
}
