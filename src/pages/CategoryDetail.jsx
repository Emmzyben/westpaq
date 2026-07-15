import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { C } from "../theme/tokens";
import { CatIcon } from "../components/CatIcon";
import { EquipCard } from "../components/EquipCard";
export default function CategoryDetail({ equipment, staffById, setViewItem, categories }) {
  const navigate = useNavigate();
  const { catId } = useParams();

  const cat = categories.find((c) => c.id === catId);
  const items = equipment.filter((e) => e.cat === catId);

  if (!cat) return null;

  return (
    <div>
      <div className="flex items-center gap-3.5 mb-6">
        <div
          onClick={() => navigate("/inventory")}
          className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center cursor-pointer flex-shrink-0"
          style={{ borderColor: C.border }}
        >
          <ChevronLeft size={17} color={C.ink2} />
        </div>
        <div
          className="rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${C.red}1A`, width: 52, height: 52 }}
        >
          <CatIcon cat={catId} size={24} color={C.redText} />
        </div>
        <div>
          <h2 className="font-bold text-xl">{cat.name}</h2>
          <p className="text-xs" style={{ color: C.ink3 }}>{items.length} items in this category</p>
        </div>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((e) => (
          <EquipCard
            key={e.id}
            e={e}
            staffById={staffById}
            onView={() => setViewItem(e)}
          />
        ))}
      </div>
    </div>
  );
}
