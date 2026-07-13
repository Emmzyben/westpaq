import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Boxes, ClipboardList, Users, UserCircle2, X } from "lucide-react";
import { C } from "../theme/tokens";
import { Avatar } from "./Avatar";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, group: "Overview", path: "/" },
  { id: "inventory", label: "Inventory", icon: Boxes, group: "Assets", path: "/inventory" },
  { id: "register", label: "Equipment Register", icon: ClipboardList, group: "Assets", path: "/register" },
  { id: "staff", label: "Staff", icon: Users, group: "People", path: "/staff" },
  { id: "profile", label: "Profile", icon: UserCircle2, group: "People", path: "/profile" },
];

export function Sidebar({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeId = () => {
    if (location.pathname === "/") return "dashboard";
    if (location.pathname.startsWith("/inventory")) return "inventory";
    if (location.pathname.startsWith("/register")) return "register";
    if (location.pathname.startsWith("/staff")) return "staff";
    if (location.pathname.startsWith("/profile")) return "profile";
    return "dashboard";
  };
  const activeNav = activeId();

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false); // Close on mobile navigation
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside
        className={`w-60 flex-shrink-0 bg-white border-r flex flex-col p-4 fixed md:sticky top-0 h-screen z-50 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
        style={{ borderColor: C.border }}
      >
        <div
          className="flex items-center justify-between pb-5 mb-4 border-b"
          style={{ borderColor: C.border }}
        >
          <div className="flex items-center gap-2.5">
            <svg width={22} height={19} viewBox="0 0 60 52">
              <polygon points="0,0 34,26 0,52" fill={C.red} />
              <polygon points="24,0 58,26 24,52" fill={C.redDark} />
            </svg>
            <span className="font-extrabold text-sm">
              WEST<span style={{ color: C.red }}>PAQ</span>
            </span>
          </div>
          <button
            className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <X size={16} />
          </button>
        </div>

      {["Overview", "Assets", "People"].map((group) => (
        <div key={group}>
          <div
            className="text-xs uppercase tracking-wider font-bold px-3 mt-3 mb-1.5"
            style={{ color: C.ink3 }}
          >
            {group}
          </div>
          {navItems
            .filter((n) => n.group === group)
            .map((n) => {
              const active = activeNav === n.id;
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  onClick={() => handleNav(n.path)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-semibold cursor-pointer relative"
                  style={
                    active
                      ? { background: `linear-gradient(90deg, ${C.red}1A, ${C.red}05)`, color: C.redDark }
                      : { color: C.ink2 }
                  }
                >
                  {active && (
                    <span
                      className="absolute -left-4 top-2 bottom-2 rounded"
                      style={{ background: C.red, width: 3 }}
                    />
                  )}
                  <Icon size={18} color={active ? C.red : C.ink2} />
                  {n.label}
                </div>
              );
            })}
        </div>
      ))}

      <div className="mt-auto pt-4 border-t" style={{ borderColor: C.border }}>
        <div
          onClick={() => handleNav("/profile")}
          className="flex items-center gap-2.5 p-2 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <Avatar name="Amaka Okoro" size={34} />
          <div>
            <b className="block text-xs">Amaka Okoro</b>
            <span className="text-xs" style={{ color: C.ink3 }}>Administrator</span>
          </div>
        </div>
      </div>
    </aside>
    </>
  );
}
