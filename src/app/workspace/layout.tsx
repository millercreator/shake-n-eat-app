import { ReactNode } from "react";

type WorkspaceLayoutProps = { children: ReactNode };

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
  return <section className="bg-workspace-background h-svh">{children}</section>;
}
