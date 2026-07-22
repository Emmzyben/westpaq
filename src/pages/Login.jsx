import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "../components/Btn";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid md:grid-cols-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
      {/* Left hero panel */}
      <div
        className="hidden md:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{ background: `linear-gradient(165deg, ${C.redDeep} 0%, #2a0607 55%, #0E0F11 100%)` }}
      >
        <div className="flex items-center gap-2.5 relative z-10">
          <img src="/logo.jpeg" alt="WestPaq" className="h-20 w-auto object-contain brightness-200" />
        </div>
        <div className="relative z-10 max-w-md">
          <div
            className="text-xs tracking-widest uppercase font-semibold mb-4"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Equipment Intelligence Platform (EIP)
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            Every piece of kit, tracked the moment it leaves the yard.
          </h1>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Manage equipment movements from the yard to the field
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-1 mb-8">
            <img src="/logo.jpeg" alt="WestPaq" className="h-12 w-auto object-contain" />
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  defaultValue="password123"
                  className="w-full px-3.5 py-3 pr-11 rounded-lg text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                >
                  {showPassword
                    ? <EyeOff size={16} color={C.ink3} />
                    : <Eye size={16} color={C.ink3} />
                  }
                </button>
              </div>
            </div>

            <div className="pt-2">
              <Btn variant="primary" full type="submit">
                Sign in to dashboard <ArrowRight size={15} />
              </Btn>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
