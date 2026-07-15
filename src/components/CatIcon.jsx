import { ICONS, ICON_COLOR, C } from "../theme/tokens";
import { Boxes } from "lucide-react";

export function CatIcon({ cat, size = 22, color }) {
  const Icon = ICONS[cat] || Boxes;
  return <Icon size={size} color={color || ICON_COLOR[cat] || C.ink2} strokeWidth={2.3} />;
}
