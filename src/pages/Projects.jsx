import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, MapPin, CalendarDays, Plus } from "lucide-react";
import { C } from "../theme/tokens";
import { Btn } from "../components/Btn";
import { ModalOverlay } from "../components/ModalOverlay";

/* Helper — adds `duration` days to a date string (YYYY-MM-DD) */
function calcCloseDate(startDate, duration) {
  if (!startDate || !duration) return "";
  const d = new Date(startDate + "T00:00:00");
  d.setDate(d.getDate() + parseInt(duration, 10));
  return d.toISOString().slice(0, 10);
}

const TODAY = new Date("2026-07-17");

export default function Projects({ projects, setProjects }) {
  const navigate = useNavigate();

  const emptyForm = { name: "", location: "", description: "", duration: "", startDate: "" };
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function submitAdd(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.startDate || !form.duration) return;
    const newProject = {
      id: "proj" + Date.now(),
      name: form.name.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      duration: parseInt(form.duration, 10),
      startDate: form.startDate,
      closeDate: calcCloseDate(form.startDate, form.duration),
      log: [],
    };
    setProjects([newProject, ...projects]);
    setAddOpen(false);
    setForm(emptyForm);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm mt-1.5 max-w-xl" style={{ color: C.ink2 }}>
            Every campaign and job the yard is supplying, with the equipment checked in and out against it.
          </p>
        </div>
        <Btn variant="primary" small onClick={() => setAddOpen(true)}>
          <Plus size={14} /> New Project
        </Btn>
      </div>

      {/* Project cards grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => {
          const outCount = p.log.filter((l) => l.action === "out").length;
          const inCount  = p.log.filter((l) => l.action === "in").length;
          const isActive = new Date(p.closeDate) >= TODAY;
          return (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="bg-white border rounded-2xl p-5 cursor-pointer transition hover:-translate-y-1"
              style={{ borderColor: C.border }}
            >
              {/* Icon + status pill */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${C.steel}1A` }}>
                  <FolderKanban size={19} color={C.steelText} />
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: isActive ? `${C.green}22` : `${C.ink3}22`,
                    color:      isActive ? C.greenText : C.ink2,
                  }}
                >
                  {isActive ? "Active" : "Closed"}
                </span>
              </div>

              <h4 className="font-bold text-sm">{p.name}</h4>

              <div className="flex items-center gap-1.5 mt-1.5 text-xs" style={{ color: C.ink3 }}>
                <MapPin size={12} /> {p.location}
              </div>

              <p className="text-xs mt-2.5 leading-snug" style={{ color: C.ink2 }}>
                {p.description}
              </p>

              <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: C.ink3 }}>
                <CalendarDays size={12} /> {p.startDate} → {p.closeDate} · {p.duration} days
              </div>

              {/* Movement counts */}
              <div className="flex gap-4 mt-4 pt-4 border-t" style={{ borderColor: C.border }}>
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.amberText }}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M5 11l7-7 7 7"/></svg>
                  {outCount} out
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: C.greenText }}>
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V4M5 13l7 7 7-7"/></svg>
                  {inCount} in
                </div>
              </div>
            </div>
          );
        })}

        {projects.length === 0 && (
          <div className="col-span-3 text-center py-16 text-sm" style={{ color: C.ink3 }}>
            No projects yet. Click <b>New Project</b> to create one.
          </div>
        )}
      </div>

      {/* ── Add Project Modal ─────────────────────────────── */}
      {addOpen && (
        <ModalOverlay onClose={() => { setAddOpen(false); setForm(emptyForm); }}>
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b sticky top-0 bg-white" style={{ borderColor: C.border }}>
            <div>
              <div className="font-bold text-lg">New project</div>
              <div className="text-xs mt-1" style={{ color: C.ink3 }}>
                Close date is calculated automatically from the start date and duration.
              </div>
            </div>
            <button
              onClick={() => { setAddOpen(false); setForm(emptyForm); }}
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: C.cardHi }}
            >
              ✕
            </button>
          </div>

          <form onSubmit={submitAdd}>
            <div className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Project name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Bonga FPSO Scaffold Campaign"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Location</label>
                <input
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Offshore · Bonga Field"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="What this project covers"
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none resize-none"
                  style={{ border: `1px solid ${C.border}` }}
                />
              </div>

              {/* Start date + Duration */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Start date</label>
                  <input
                    required type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: `1px solid ${C.border}` }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: C.ink2 }}>Duration (days)</label>
                  <input
                    required type="number" min="1"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g. 30"
                    className="w-full px-3.5 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: `1px solid ${C.border}` }}
                  />
                </div>
              </div>

              {/* Computed close date preview */}
              <div className="rounded-lg p-3.5 flex items-center gap-2.5" style={{ background: C.cardHi }}>
                <CalendarDays size={16} color={C.ink3} />
                <div className="text-sm">
                  <span style={{ color: C.ink3 }}>Close date: </span>
                  <b>{calcCloseDate(form.startDate, form.duration) || "— set a start date and duration —"}</b>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="p-6 pt-0 flex gap-2.5">
              <Btn variant="ghost" full onClick={() => { setAddOpen(false); setForm(emptyForm); }}>Cancel</Btn>
              <Btn variant="primary" full type="submit">Create project</Btn>
            </div>
          </form>
        </ModalOverlay>
      )}
    </div>
  );
}
