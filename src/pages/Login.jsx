import { ArrowRight } from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "../components/Btn";
import { EQUIPMENT_INIT } from "../data/mockData";

export default function Login({ onLogin }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Left hero panel */}
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
          <div
            className="text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Smart Equipment Register
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Every piece of kit, tracked the moment it leaves the yard.
          </h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Check-out, check-in, and manager release — one continuous record from the field to the yard office.
          </p>
          <div className="flex gap-7 mt-8">
            <div>
              <b className="block text-2xl font-bold text-white">{EQUIPMENT_INIT.length}</b>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Assets Tracked</span>
            </div>
            <div>
              <b className="block text-2xl font-bold text-white">38</b>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Active Staff</span>
            </div>
            <div>
              <b className="block text-2xl font-bold text-white">99.2%</b>
              <span className="text-xs uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.5)" }}>Return Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8">
            <svg width={26} height={22} viewBox="0 0 60 52">
              <polygon points="0,0 34,26 0,52" fill={C.red} />
              <polygon points="24,0 58,26 24,52" fill={C.redDark} />
            </svg>
            <span className="font-extrabold text-lg">
              WEST<span style={{ color: C.red }}>PAQ</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm mb-8" style={{ color: C.ink2 }}>
            Sign in as an administrator to manage the equipment register.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Work email</label>
              <input
                defaultValue="admin@westpaq.com"
                className="w-full px-3.5 py-3 rounded-lg text-sm outline-none"
                style={{ border: `1px solid ${C.border}` }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Password</label>
              <input
                type="password"
                defaultValue="password123"
                className="w-full px-3.5 py-3 rounded-lg text-sm outline-none"
                style={{ border: `1px solid ${C.border}` }}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.ink2 }}>Sign in as</label>
              <select
                className="w-full px-3.5 py-3 rounded-lg text-sm outline-none"
                style={{ border: `1px solid ${C.border}` }}
              >
                <option>Administrator</option>
                <option>Manager</option>
                <option>Supervisor</option>
              </select>
            </div>
            <div className="pt-2">
              <Btn variant="primary" full type="submit">
                Sign in to dashboard <ArrowRight size={15} />
              </Btn>
            </div>
          </form>
          <p className="mt-6 text-xs text-center" style={{ color: C.ink3 }}>
            WestPaq Ltd · 1 Sugar Creek Center Blvd, Ste 600, Sugar Land, TX 77478
          </p>
        </div>
      </div>
    </div>
  );
}
