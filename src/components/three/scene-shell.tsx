"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import type { ReactNode } from "react";

type SceneShellProps = CanvasProps & {
  children: ReactNode;
};

export function SceneShell({ children, ...props }: SceneShellProps) {
  return <Canvas {...props}>{children}</Canvas>;
}
