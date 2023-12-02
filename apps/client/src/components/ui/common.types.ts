import { DefaultTheme } from "tailwindcss/types/generated/default-theme";

export type Space = keyof DefaultTheme["spacing"];
export type Direction = "x" | "y" | "";
export type Padding = `p${Direction}-${Space}`;
