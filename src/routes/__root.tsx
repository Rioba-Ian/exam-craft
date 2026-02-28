import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AppSidebar } from "../components/AppSidebar";
import { SidebarProvider } from "../components/ui/sidebar";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <SidebarProvider>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <AppSidebar />

        <div
          style={{
            flex: 1,
            marginLeft: "var(--sidebar-w)",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
