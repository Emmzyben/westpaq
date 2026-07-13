import { C } from "../theme/tokens";
import { Avatar } from "../components/Avatar";
import { Btn } from "../components/Btn";

export default function Staff({ staff, toggleSupervisor }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-2">
          <button
            className="px-3.5 py-2 rounded-full text-xs font-semibold text-white"
            style={{ background: C.red }}
          >
            All staff
          </button>
          <button
            className="px-3.5 py-2 rounded-full text-xs font-semibold bg-white border"
            style={{ borderColor: C.border, color: C.ink2 }}
          >
            Supervisors
          </button>
        </div>
        <Btn variant="ghost" small>+ Add staff</Btn>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((s) => (
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
            <div className="flex justify-center mb-3">
              <Avatar name={s.name} size={64} gradient={`linear-gradient(135deg, ${C.red}, ${C.redDeep})`} />
            </div>
            <h4 className="font-bold text-sm">{s.name}</h4>
            <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{s.role} · {s.dept}</div>
            <div className="flex justify-center gap-5 my-4">
              <div>
                <b className="block text-lg font-bold">{s.held}</b>
                <span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>Holding</span>
              </div>
              <div>
                <b className="block text-lg font-bold">{s.tx}</b>
                <span className="text-xs uppercase tracking-wide" style={{ color: C.ink3 }}>Transactions</span>
              </div>
            </div>
            <Btn
              variant={s.sup ? "dark" : "ghost"}
              small
              full
              onClick={() => toggleSupervisor(s.id)}
            >
              {s.sup ? "✓ Supervisor" : "Assign as Supervisor"}
            </Btn>
          </div>
        ))}
      </div>
    </div>
  );
}
