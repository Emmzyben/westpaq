import { C } from "../theme/tokens";
import { Avatar } from "../components/Avatar";
import { Badge } from "../components/Badge";
import { Btn } from "../components/Btn";

export default function Profile({ log }) {
  return (
    <div className="grid lg:grid-cols-4 gap-5 items-start">
      {/* Profile card */}
      <div className="lg:col-span-1 bg-white border rounded-3xl p-7 text-center" style={{ borderColor: C.border }}>
        <div className="flex justify-center mb-3">
          <Avatar name="Amaka Okoro" size={84} />
        </div>
        <h3 className="font-bold text-lg">Amaka Okoro</h3>
        <div className="text-sm" style={{ color: C.ink3 }}>Administrator · Yard Office</div>
        <div className="flex justify-center gap-2 mt-3.5">
          <Badge status="in" /><Badge status="return" />
        </div>
        <div className="mt-5 border-t pt-1 text-left" style={{ borderColor: C.border }}>
          {[
            ["Email", "amaka.okoro@westpaq.com"],
            ["Phone", "+1 (281) 555-0148"],
            ["Location", "Sugar Land, TX"],
            ["Joined", "Mar 2023"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-3 border-b text-sm" style={{ borderColor: C.border }}>
              <span style={{ color: C.ink3 }}>{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="mt-5"><Btn variant="ghost" full>Edit profile</Btn></div>
      </div>

      {/* Settings + Recent */}
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
              <span>Two-factor authentication</span>
              <Badge status="in" />
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl" style={{ borderColor: C.border, padding: 22 }}>
          <h4 className="font-bold text-sm mb-4">My recent releases</h4>
          {log.slice(0, 4).map((l, i) => (
            <div key={i} className="flex gap-3 py-3 border-b last:border-0" style={{ borderColor: C.border }}>
              <div
                className="w-11 h-11 rounded-lg border-2 flex items-center justify-center flex-shrink-0 font-extrabold text-xs -rotate-6"
                style={{
                  borderColor: l.status === "out" ? C.amber : C.green,
                  color: l.status === "out" ? C.amberText : C.greenText,
                }}
              >
                {l.status === "out" ? "OUT" : "IN"}
              </div>
              <div>
                <b className="block text-sm">{l.name}</b>
                <span className="text-xs" style={{ color: C.ink3 }}>Released to {l.tech} · {l.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
