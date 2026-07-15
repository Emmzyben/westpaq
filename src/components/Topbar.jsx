import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, X } from "lucide-react";
import { C } from "../theme/tokens";
import { Badge } from "./Badge";

const META = {
  "/": { title: "Dashboard", crumb: "Overview of yard activity" },
  "/inventory": { title: "Inventory", crumb: "Browse assets by category" },
  "/register": { title: "Equipment Register", crumb: "Full check-out / check-in log" },
  "/staff": { title: "Staff", crumb: "Manage staff and supervisors" },
  "/profile": { title: "Profile", crumb: "Your account" },
};

export function Topbar({ onNewEntry, onMenuClick, equipment = [], categories = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const base = location.pathname.startsWith("/inventory/") ? "/inventory" : location.pathname;
  const meta = META[base] || { title: "WestPaq", crumb: "" };

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const catById = (id) => categories.find(c => c.id === id);

  const results = query.trim().length > 0
    ? equipment.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        (e.tag && e.tag.toLowerCase().includes(query.toLowerCase())) ||
        (e.equipNo && e.equipNo.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item) => {
    navigate(`/inventory/${item.cat}`);
    setQuery("");
    setOpen(false);
  };

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

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search Bar */}
        <div ref={searchRef} className="relative hidden sm:block">
          <div
            className="flex items-center gap-2 px-3 rounded-xl h-9"
            style={{ border: `1.5px solid ${open ? C.red : C.border}`, background: "#fff", width: open ? 280 : 200, transition: "all 0.2s" }}
          >
            <Search size={15} color={C.ink3} className="flex-shrink-0" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              placeholder="Search equipment..."
              className="flex-1 text-sm outline-none bg-transparent"
              style={{ color: C.ink }}
            />
            {query && (
              <button onClick={() => { setQuery(""); setOpen(false); }}>
                <X size={13} color={C.ink3} />
              </button>
            )}
          </div>

          {open && results.length > 0 && (
            <div
              className="absolute right-0 top-11 rounded-xl shadow-xl overflow-hidden z-50 bg-white"
              style={{ border: `1px solid ${C.border}`, width: 320 }}
            >
              <div className="px-3 py-2 text-xs font-bold uppercase tracking-wide" style={{ color: C.ink3, borderBottom: `1px solid ${C.border}` }}>
                {results.length} result{results.length !== 1 ? "s" : ""}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {results.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: `1px solid ${C.border}` }}
                  >
                    <div className="w-9 h-9 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center" style={{ background: `${C.red}12` }}>
                      {item.img
                        ? <img src={item.img} className="w-full h-full object-cover" alt="" />
                        : <span className="text-xs font-bold" style={{ color: C.red }}>{item.name[0]}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{item.name}</div>
                      <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: C.ink3 }}>
                        {item.equipNo && <span className="font-mono">{item.equipNo}</span>}
                        {item.equipNo && item.tag !== "—" && <span>·</span>}
                        {item.tag !== "—" && <span>{item.tag}</span>}
                        <span>·</span>
                        <span>{catById(item.cat)?.name}</span>
                      </div>
                    </div>
                    <Badge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {open && query.trim().length > 0 && results.length === 0 && (
            <div
              className="absolute right-0 top-11 rounded-xl shadow-xl bg-white z-50 px-5 py-6 text-center"
              style={{ border: `1px solid ${C.border}`, width: 280 }}
            >
              <Search size={24} color={C.ink3} className="mx-auto mb-2" />
              <div className="text-sm font-semibold">No equipment found</div>
              <div className="text-xs mt-1" style={{ color: C.ink3 }}>Try a different name or tag</div>
            </div>
          )}
        </div>

        {/* Notification bell */}
        <div
          className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center relative"
          style={{ borderColor: C.border }}
        >
          <Bell size={16} color={C.ink2} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: C.red }} />
        </div>
      </div>
    </div>
  );
}
