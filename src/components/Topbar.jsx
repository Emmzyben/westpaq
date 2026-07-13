import { useLocation } from "react-router-dom";
import { Search, Bell, Plus } from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "./Btn";

const META = {
  "/": { title: "Dashboard", crumb: "Overview of yard activity" },
  "/inventory": { title: "Inventory", crumb: "Browse assets by category" },
  "/register": { title: "Equipment Register", crumb: "Full check-out / check-in log" },
  "/staff": { title: "Staff", crumb: "Manage staff and supervisors" },
  "/profile": { title: "Profile", crumb: "Your account" },
};

export function Topbar({ onNewEntry, onMenuClick }) {
  const location = useLocation();
  const base = location.pathname.startsWith("/inventory/") ? "/inventory" : location.pathname;
  const meta = META[base] || { title: "WestPaq", crumb: "" };

  return (
    <div
      className="border-b flex items-center justify-between px-4 md:px-7 sticky top-0 backdrop-blur z-10"
      style={{ borderColor: C.border, height: 68, background: "rgba(255,255,255,0.9)" }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center bg-gray-100"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div>
          <h2 className="font-bold text-lg leading-tight">{meta.title}</h2>
          <div className="text-xs hidden sm:block" style={{ color: C.ink3 }}>{meta.crumb}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-3.5">
        <div
          className="hidden md:flex items-center gap-2 rounded-lg px-3.5 py-2 w-64"
          style={{ background: C.cardHi, border: `1px solid ${C.border}` }}
        >
          <Search size={15} color={C.ink3} />
          <input
            placeholder="Search equipment, staff, tag..."
            className="bg-transparent outline-none text-sm w-full"
          />
        </div>
        <div
          className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center relative"
          style={{ borderColor: C.border }}
        >
          <Bell size={16} color={C.ink2} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
        </div>
        <Btn variant="primary" small onClick={onNewEntry}>
          <Plus size={14} /> New Entry
        </Btn>
      </div>
    </div>
  );
}
