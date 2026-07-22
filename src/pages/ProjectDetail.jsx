import { useNavigate, useParams } from "react-router-dom";
import {
  FolderKanban, ChevronLeft, CalendarDays, Clock, ClipboardList,
} from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "../components/Btn";

export default function ProjectDetail({ projects }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const p = projects.find((proj) => proj.id === projectId);

  if (!p) {
    return (
      <div className="text-center py-20" style={{ color: C.ink3 }}>
        <p className="text-sm">Project not found.</p>
        <button 
          className="mt-4 text-sm font-bold"
          style={{ color: C.red }}
          onClick={() => navigate("/projects")}
        >
          ← Back to projects
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Back + title row */}
      <div className="flex items-center gap-3.5 mb-6">
        <button
          onClick={() => navigate("/projects")}
          className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center flex-shrink-0"
          style={{ borderColor: C.border }}
        >
          <ChevronLeft size={17} color={C.ink2} />
        </button>
        <div
          className="rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${C.steel}1A`, width: 52, height: 52 }}
        >
          <FolderKanban size={24} color={C.steelText} />
        </div>
        <div>
          <h2 className="font-bold text-xl">{p.name}</h2>
          <p className="text-xs" style={{ color: C.ink3 }}>{p.location}</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Start date",        val: p.startDate,    icon: CalendarDays },
          { label: "Close date",        val: p.closeDate,    icon: CalendarDays },
          { label: "Duration",          val: `${p.duration} days`, icon: Clock },
          { label: "Movements logged",  val: p.log.length,   icon: ClipboardList },
        ].map((s, i) => (
          <div key={i} className="bg-white border rounded-2xl p-4" style={{ borderColor: C.border }}>
            <s.icon size={16} color={C.ink3} />
            <div className="text-lg font-bold mt-2">{s.val}</div>
            <div className="text-xs mt-0.5" style={{ color: C.ink3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="bg-white border rounded-2xl p-5 mb-6" style={{ borderColor: C.border }}>
        <h4 className="font-bold text-sm mb-3">About this project</h4>
        <p className="text-sm" style={{ color: C.ink2 }}>{p.description}</p>
      </div>

      {/* Equipment log */}
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-bold text-base">Equipment used on this project</h3>
        {/* Log equipment button — wired up through App if needed */}
      </div>

      <div className="space-y-2.5">
        {p.log.length === 0 && (
          <div
            className="text-sm p-5 bg-white border rounded-2xl text-center"
            style={{ borderColor: C.border, color: C.ink3 }}
          >
            No equipment movements logged for this project yet.
          </div>
        )}

        {p.log.map((l, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 bg-white border rounded-xl px-4 py-3.5"
            style={{ borderColor: C.border }}
          >
            {/* Action icon */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: l.action === "out" ? `${C.amber}22` : `${C.green}22` }}
            >
              {l.action === "out" ? (
                /* arrow-up-from-line */
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                  stroke={C.amberText} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 17V3M5 10l7-7 7 7M5 21h14"/>
                </svg>
              ) : (
                /* arrow-down-to-line */
                <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                  stroke={C.greenText} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 7v14M5 14l7 7 7-7M5 3h14"/>
                </svg>
              )}
            </div>

            {/* Item info */}
            <div className="flex-1 min-w-0">
              <b className="block text-sm truncate">{l.item}</b>
              <span className="text-xs font-mono" style={{ color: C.ink3 }}>
                {l.tag !== "—" ? l.tag + " · " : ""}Qty {l.qty}
              </span>
            </div>

            {/* Status + meta */}
            <div className="text-right flex-shrink-0">
              <div
                className="text-xs font-bold"
                style={{ color: l.action === "out" ? C.amberText : C.greenText }}
              >
                {l.action === "out" ? "Checked Out" : "Checked In"}
              </div>
              <div className="text-xs" style={{ color: C.ink3 }}>
                {l.tech} · {l.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
