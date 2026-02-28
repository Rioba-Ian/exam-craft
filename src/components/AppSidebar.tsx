import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ScanLine,
  LayoutTemplate,
  Library,
  FolderOpen,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const v = (name: string): string => `var(--${name})`;

const NAV_ITEMS = [
  { id: "home" as const, icon: LayoutDashboard, label: "Dashboard", to: "/" },
  { id: "polish" as const, icon: ScanLine, label: "Scan & Polish", badge: "Dim 1", to: "/polish" },
  { id: "builder" as const, icon: LayoutTemplate, label: "Exam Builder", badge: "Dim 2", to: "/builder" },
  { id: "bank" as const, icon: Library, label: "Question Bank", to: "/bank" },
  { id: "exams" as const, icon: FolderOpen, label: "My Exams", to: "/exams" },
];

export function AppSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const getPageFromPath = (path: string) => {
    if (path === "/") return "home";
    return path.substring(1);
  };

  const currentPage = getPageFromPath(currentPath);

  return (
    <Sidebar>
      <SidebarHeader>
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 3,
            marginBottom: 6,
          }}
        >
          EXAMCRAFT
        </div>
        <div
          className="f-display"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          CBC Exam
          <br />
          <span style={{ color: v("amber") }}>Studio</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => {
                const active = currentPage === item.id;
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton variant={active ? "active" : "default"} asChild>
                      <Link to={item.to}>
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        {item.badge && (
                          <SidebarMenuBadge
                            style={{
                              background: active ? v("amber") : "rgba(255,255,255,0.12)",
                              color: active ? v("ink") : "rgba(255,255,255,0.5)",
                            }}
                          >
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: v("amber"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <User className="h-5 w-5" style={{ color: v("ink") }} />
          </div>
          <div>
            <div className="f-body" style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
              Teacher Account
            </div>
            <div className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
              Free Plan
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
