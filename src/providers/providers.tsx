"use client";

import type { ReactNode } from "react";
import { ModalProvider } from "./modal-provider";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <ModalProvider>{children}</ModalProvider>;
}
