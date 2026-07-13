import { Wrench, Container, Gauge, Weight, Grid3X3, Flame } from "lucide-react";

export const C = {
  red: "#E4241F", redDark: "#C4171A", redDeep: "#5C0C0E", redText: "#C81E1B",
  amber: "#E9A22B", amberText: "#A8720C",
  green: "#22A567", greenText: "#178C57",
  steel: "#4C7FB5", steelText: "#2F5C8A",
  ink: "#171A1F", ink2: "#5B6472", ink3: "#98A1AC",
  border: "#E3E6EA", card: "#FFFFFF", bg: "#F4F5F7", cardHi: "#EEF0F3",
};

export const ICONS = {
  general: Wrench, ccu: Container, instrument: Gauge,
  lifting: Weight, scaffold: Grid3X3, gas: Flame,
};

export const PAL = {
  general: { from: "#7a1a1a", to: "#2b0707" },
  ccu: { from: "#234161", to: "#0f1c2b" },
  instrument: { from: "#7a531a", to: "#2a1a06" },
  lifting: { from: "#7a1a1a", to: "#2b0707" },
  scaffold: { from: "#1f5c42", to: "#0b201a" },
  gas: { from: "#234161", to: "#0f1c2b" },
};

export const ICON_COLOR = {
  general: C.red, ccu: C.steel, instrument: C.amber,
  lifting: C.red, scaffold: C.green, gas: C.steel,
};
