import { useNavigate } from "react-router-dom";
import {
  ClipboardList, Users, TrendingUp, Minus,
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, LineChart, Line,
  PieChart, Pie, Cell,
  RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import { C } from "../theme/tokens";
import { CatIcon } from "../components/CatIcon";
import { MONTHLY, PIE_COLORS } from "../data/mockData";

export default function Dashboard({ equipment, log, staff, categories }) {
  const navigate = useNavigate();

  const stats = {
    total: equipment.length,
    out: equipment.filter((e) => e.status === "out").length,
    in: equipment.filter((e) => e.status === "in" || e.status === "return").length,
    staff: staff.length,
  };

  const top5 = [...equipment].sort((a, b) => b.qty - a.qty).slice(0, 5);
  const catById = (id) => categories.find((c) => c.id === id);

  /* --- chart-specific derived data --- */
  const catTotals = categories.map((c) => ({
    name: c.name,
    value: equipment.filter((e) => e.cat === c.id).reduce((s, e) => s + e.qty, 0),
  }));
  const catTotalSum = catTotals.reduce((s, c) => s + c.value, 0);

  const radialData = top5.map((e, i) => ({
    name: e.name.length > 18 ? e.name.slice(0, 18) + "…" : e.name,
    value: e.qty,
    fill: PIE_COLORS[i % PIE_COLORS.length],
  }));

  return (
    <div>
      {/* ── Stat cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        {[
          { label: "Total equipment entries", val: stats.total, icon: ClipboardList, tint: C.red,   delta: "↑ 4.2% this month",       up: true },
          { label: "Checked out now",         val: stats.out,   icon: TrendingUp,    tint: C.amber,  delta: "— steady vs last week",    up: null },
          { label: "Returned / checked in",   val: stats.in,    icon: TrendingUp,    tint: C.green,  delta: "↑ 12 vs yesterday",        up: true },
          { label: "Active staff",            val: stats.staff, icon: Users,         tint: C.steel,  delta: "↑ 2 new this month",       up: true },
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

      {/* ── CHART 1: Bar — Equipment Checkout Quantity per Month */}
      {/* ── CHART 2: Line — Check-in vs Check-out monthly ───── */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-white border rounded-2xl p-5" style={{ borderColor: C.border }}>
          <h3 className="font-bold text-base mb-4">Equipment Checkout Quantity per Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.ink3 }} axisLine={{ stroke: C.border }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: C.ink3 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="checkout" name="Equipment Checkout" fill="#14B8A6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border rounded-2xl p-5" style={{ borderColor: C.border }}>
          <h3 className="font-bold text-base mb-4">Check-In vs Check-Out — Monthly</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.ink3 }} axisLine={{ stroke: C.border }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: C.ink3 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="checkout" name="Checkout" stroke={C.steel} strokeWidth={3} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="checkin"  name="Check-In" stroke={C.amber} strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── CHART 3: Grouped Bar — Check-In & Checkout per Month ── */}
      <div className="bg-white border rounded-2xl p-5 mb-5" style={{ borderColor: C.border }}>
        <h3 className="font-bold text-base mb-4">Check-In &amp; Checkout Equipment per Month</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={MONTHLY} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: C.ink3 }} axisLine={{ stroke: C.border }} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: C.ink3 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="checkin"  name="Check-In" fill={C.green} radius={[5, 5, 0, 0]} />
            <Bar dataKey="checkout" name="Checkout"  fill={C.amber} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── CHART 4a: Radial — Top Items by Qty  |  4b: Pie — Qty Share by Category ── */}
      <div className="grid lg:grid-cols-2 gap-5 mb-7">
        <div className="bg-white border rounded-2xl p-5" style={{ borderColor: C.border }}>
          <h3 className="font-bold text-base mb-4">Top Items by Quantity</h3>
          <div className="relative">
            <ResponsiveContainer width="100%" height={260}>
              <RadialBarChart innerRadius="22%" outerRadius="95%" data={radialData} startAngle={90} endAngle={-270}>
                <RadialBar minAngle={15} background dataKey="value" cornerRadius={8} />
                <Legend iconSize={8} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div
              className="absolute text-center pointer-events-none"
              style={{ left: "22%", top: "50%", transform: "translate(-50%,-50%)" }}
            >
              <div className="text-xs font-bold" style={{ color: C.steelText }}>Total</div>
              <div className="text-lg font-bold">{top5.reduce((s, e) => s + e.qty, 0).toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-5" style={{ borderColor: C.border }}>
          <h3 className="font-bold text-base mb-4">Quantity Share by Category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={catTotals}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ value }) => `${((value / catTotalSum) * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {catTotals.map((entry, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.border}`, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Bottom grid: Top 5 list + Recent activity ────────── */}
      <div className="grid lg:grid-cols-5 gap-5">
        {/* Top 5 by qty */}
        <div className="lg:col-span-3">
          <div className="flex items-baseline justify-between mb-4">
            <h3 className="font-bold text-base">Top 5 equipment by quantity</h3>
            <button className="text-xs font-bold" style={{ color: C.red }} onClick={() => navigate("/register")}>
              Full register →
            </button>
          </div>
          <div className="space-y-2.5">
            {top5.map((e, i) => (
              <div key={e.id} className="flex bg-white border rounded-xl overflow-hidden" style={{ borderColor: C.border }}>
                <div
                  className="w-11 flex-shrink-0 flex items-center justify-center font-mono font-bold text-sm"
                  style={{ background: C.cardHi, color: C.ink3, borderRight: `1px dashed ${C.border}` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 flex items-center gap-3 px-3.5 py-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.red}1A` }}>
                    <CatIcon cat={e.cat} size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-bold truncate">{e.name}</div>
                    <div className="text-xs font-mono" style={{ color: C.ink3 }}>
                      {e.tag !== "—" ? e.tag + " · " : ""}{catById(e.cat)?.name}
                    </div>
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

        {/* Recent activity */}
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
                  style={{
                    borderColor: l.status === "out" ? C.amber : C.green,
                    color:       l.status === "out" ? C.amberText : C.greenText,
                  }}
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
  );
}
