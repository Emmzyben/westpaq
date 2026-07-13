import { ICONS, ICON_COLOR } from "../theme/tokens";

export function CatIcon({ cat, size = 22, color }) {
  const Icon = ICONS[cat];
  if (!Icon) return null;
  return <Icon size={size} color={color || ICON_COLOR[cat]} strokeWidth={2.3} />;
}
