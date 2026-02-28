import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

const SidebarContext = React.createContext<{
 collapsed: boolean;
 setCollapsed: (collapsed: boolean) => void;
} | null>(null);

export function useSidebar() {
 const context = React.useContext(SidebarContext);
 if (!context) {
  throw new Error("useSidebar must be used within a SidebarProvider");
 }
 return context;
}

interface SidebarProviderProps {
 children: React.ReactNode;
 defaultCollapsed?: boolean;
}

export function SidebarProvider({
 children,
 defaultCollapsed = false,
}: SidebarProviderProps) {
 const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

 return (
  <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
   {children}
  </SidebarContext.Provider>
 );
}

const Sidebar = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn(className)}
   style={{
    display: "flex",
    height: "100%",
    width: "var(--sidebar-w)",
    minHeight: "100vh",
    flexDirection: "column",
    borderRight: "1px solid var(--sidebar-border)",
    background: "var(--sidebar)",
    color: "var(--sidebar-foreground)",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 50,
    flexShrink: 0,
    boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
    ...style,
   }}
   {...props}
  />
 );
});
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn(className)}
   style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    padding: "28px 20px 20px",
    borderBottom: "1px solid var(--sidebar-border)",
    ...style,
   }}
   {...props}
  />
 );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn(className)}
   style={{
    display: "flex",
    flex: 1,
    flexDirection: "column",
    gap: "0.5rem",
    padding: "16px 12px",
    ...style,
   }}
   {...props}
  />
 );
});
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn(className)}
   style={{
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    borderTop: "1px solid var(--sidebar-border)",
    padding: "16px 20px",
    ...style,
   }}
   {...props}
  />
 );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarGroup = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div ref={ref} className={cn(className)} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", ...style }} {...props} />
 );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn(className)}
   style={{
    padding: "0.5rem 0.75rem",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "rgba(255,255,255,0.7)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    ...style,
   }}
   {...props}
  />
 );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarGroupContent = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div ref={ref} className={cn(className)} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", ...style }} {...props} />
 );
});
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div ref={ref} className={cn(className)} style={{ display: "flex", flexDirection: "column", gap: "0.25rem", ...style }} {...props} />
 );
});
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return <div ref={ref} className={cn(className)} style={{ position: "relative", ...style }} {...props} />;
});
SidebarMenuItem.displayName = "SidebarMenuItem";

export interface SidebarMenuButtonProps
 extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 asChild?: boolean;
 variant?: "default" | "active";
}

const SidebarMenuButton = React.forwardRef<
 HTMLButtonElement,
 SidebarMenuButtonProps
>(({ className, style, variant = "default", asChild = false, ...props }, ref) => {
 const Comp = asChild ? Slot : "button";

 const baseStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  alignItems: "center",
  gap: "10px",
  borderRadius: 10,
  padding: "10px 12px",
  fontSize: 13,
  fontWeight: variant === "active" ? 600 : 400,
  background: variant === "active" ? "rgba(255,255,255,0.12)" : "transparent",
  border: "none",
  cursor: "pointer",
  textAlign: "left",
  color: variant === "active" ? "#fff" : "rgba(255,255,255,0.55)",
  transition: "background 0.18s, color 0.18s",
  textDecoration: "none",
  marginBottom: 2,
 };

 return (
  <Comp
   ref={ref}
   className={cn(className)}
   style={{ ...baseStyle, ...style }}
   onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== "active") {
     e.currentTarget.style.background = "rgba(255,255,255,0.07)";
    }
   }}
   onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== "active") {
     e.currentTarget.style.background = "transparent";
    }
   }}
   {...props}
  />
 );
});
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuBadge = React.forwardRef<
 HTMLDivElement,
 React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
 return (
  <div
   ref={ref}
   className={cn("f-mono", className)}
   style={{
    fontSize: 9,
    padding: "2px 6px",
    borderRadius: 10,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginLeft: "auto",
    ...style,
   }}
   {...props}
  />
 );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

export {
 Sidebar,
 SidebarHeader,
 SidebarContent,
 SidebarFooter,
 SidebarGroup,
 SidebarGroupLabel,
 SidebarGroupContent,
 SidebarMenu,
 SidebarMenuItem,
 SidebarMenuButton,
 SidebarMenuBadge,
};
