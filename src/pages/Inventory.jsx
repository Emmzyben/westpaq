import { useNavigate } from "react-router-dom";
import { C, PAL, ICON_COLOR } from "../theme/tokens";
import { CATS } from "../data/mockData";
import { CatIcon } from "../components/CatIcon";

export default function Inventory({ equipment }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Inventory by category</h1>
        <p className="text-sm mt-1.5 max-w-xl" style={{ color: C.ink2 }}>
          Every asset class on record, grouped the way the yard actually sees it. Open a category to see what's on the shelf, what's out, and who's got it.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATS.map((c) => {
          const count = equipment.filter((e) => e.cat === c.id).length;
          return (
            <div
              key={c.id}
              onClick={() => navigate(`/inventory/${c.id}`)}
              className="relative rounded-3xl overflow-hidden cursor-pointer h-60 flex flex-col justify-end border transition hover:-translate-y-1.5"
              style={{
                borderColor: C.border,
                background: `radial-gradient(120% 120% at 20% 15%, ${PAL[c.id].from}, ${PAL[c.id].to} 65%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <CatIcon cat={c.id} size={92} color={ICON_COLOR[c.id]} />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 28%, rgba(0,0,0,0.8) 100%)" }}
              />
              <div
                className="absolute top-3.5 right-3.5 backdrop-blur rounded-full px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                {count} items
              </div>
              <div className="relative z-10" style={{ padding: 18 }}>
                <h4 className="font-bold text-white text-lg">{c.name}</h4>
                <p className="text-xs mt-1 leading-snug" style={{ color: "rgba(255,255,255,0.74)" }}>{c.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
