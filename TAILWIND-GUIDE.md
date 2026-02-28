# Tailwind CSS + Custom Utilities Guide

This guide shows you how to use Tailwind CSS along with our custom utility classes in ExamCraft.

## Table of Contents

1. [Setup](#setup)
2. [Design Tokens (CSS Variables)](#design-tokens-css-variables)
3. [Custom Component Classes](#custom-component-classes)
4. [Custom Utility Classes](#custom-utility-classes)
5. [Tailwind Classes](#tailwind-classes)
6. [Examples](#examples)

## Setup

Tailwind CSS is already configured with PostCSS. All classes are available throughout the app.

**Configuration files:**
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.js` - PostCSS configuration
- `src/styles.css` - Global styles + Tailwind directives
- `src/components/ui/utils.css` - Custom utility classes

## Design Tokens (CSS Variables)

Our design system uses CSS variables that are mapped to Tailwind classes:

### Colors

```css
--forest: #1B4D35     /* Primary green */
--forest2: #246344    /* Hover green */
--leaf: #3A8C5C       /* Light green */
--mint: #D6EDE2       /* Very light green */
--sienna: #C4622D     /* Secondary orange */
--sienna2: #E07040    /* Hover orange */
--amber: #E8A020      /* Accent yellow */
--paper: #F9F4EA      /* Background beige */
--paper2: #F2EBD9     /* Light beige */
--ink: #1A1710        /* Text dark */
--ink2: #3D3830       /* Text medium */
--muted: #8A8070      /* Text light */
--white: #FFFFFF      /* White */
--blue: #2563A8       /* Info blue */
--red: #C0392B        /* Error red */
```

### Tailwind Color Mapping

Use Tailwind color classes that map to our design tokens:

```tsx
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
<div className="bg-sidebar text-sidebar-foreground">Sidebar</div>
<div className="bg-accent text-accent-foreground">Accent</div>
<div className="text-muted-foreground">Muted text</div>
```

## Custom Component Classes

### Cards

```tsx
// Basic card
<div className="card-base">
  Content
</div>

// Hoverable card
<div className="card-base card-hover">
  Hover me
</div>
```

### Buttons

```tsx
// Base button (then add your own colors)
<button className="btn-base bg-primary text-primary-foreground">
  Click me
</button>

// With icon
<button className="btn-base bg-primary text-primary-foreground">
  <Icon size={16} />
  Click me
</button>
```

### Badges/Tags

```tsx
<span className="badge-base badge-forest">Forest</span>
<span className="badge-base badge-sienna">Sienna</span>
<span className="badge-base badge-amber">Amber</span>
```

### Form Elements

```tsx
// Input
<input className="input-base" type="text" placeholder="Enter text" />

// Select
<select className="select-base">
  <option>Choose one</option>
</select>
```

### Sidebar Items

```tsx
// Normal state
<div className="sidebar-item">
  <Icon size={16} />
  <span>Item</span>
</div>

// Active state
<div className="sidebar-item sidebar-item-active">
  <Icon size={16} />
  <span>Active Item</span>
</div>
```

## Custom Utility Classes

### Font Families

```tsx
<h1 className="f-display">Display Heading</h1>
<p className="f-body">Body text</p>
<code className="f-mono">Monospace code</code>
```

### Text Gradients

```tsx
<h1 className="text-gradient-forest">Gradient Text</h1>
<h1 className="text-gradient-sienna">Sienna Gradient</h1>
```

### Containers

```tsx
<div className="container-centered">Centered max-width container</div>
<div className="container-narrow">Narrow centered container</div>
```

### Spacing

```tsx
<div className="space-y-page">Page-level spacing</div>
<div className="space-y-section">Section spacing</div>
<div className="space-y-content">Content spacing</div>
```

### Responsive Grids

```tsx
<div className="grid-auto-fit-xs gap-4">
  {/* Auto-fitting grid with 150px min */}
</div>

<div className="grid-auto-fit-sm gap-4">
  {/* Auto-fitting grid with 200px min */}
</div>

<div className="grid-auto-fit-md gap-4">
  {/* Auto-fitting grid with 250px min */}
</div>

<div className="grid-auto-fit-lg gap-4">
  {/* Auto-fitting grid with 300px min */}
</div>
```

### Backgrounds

```tsx
<div className="bg-gradient-forest">Forest gradient</div>
<div className="bg-gradient-sienna">Sienna gradient</div>
<div className="bg-noise opacity-25">Noise texture</div>
```

### Shadows

```tsx
<div className="shadow-custom">Custom shadow</div>
<div className="shadow-custom-lg">Large custom shadow</div>
```

### Borders & Separators

```tsx
<div className="border-dashed-custom">Dashed border</div>
<hr className="separator-horizontal" />
<div className="separator-vertical" />
```

### Layout

```tsx
<div className="main-layout">
  <aside>Sidebar</aside>
  <div className="content-area">
    {/* Main content */}
  </div>
</div>
```

### Animations

```tsx
<div className="animate-in">Fade in from bottom</div>
<div className="animate-out">Fade out to bottom</div>
```

### Focus

```tsx
<button className="focus-ring">Accessible focus ring</button>
```

## Tailwind Classes

All standard Tailwind utilities are available. Here are commonly used ones:

### Flexbox & Grid

```tsx
<div className="flex items-center justify-between gap-4">
<div className="grid grid-cols-3 gap-4">
<div className="flex-1">
```

### Spacing

```tsx
<div className="p-4">Padding 1rem</div>
<div className="px-6 py-4">Padding x: 1.5rem, y: 1rem</div>
<div className="m-4">Margin 1rem</div>
<div className="space-y-4">Vertical spacing between children</div>
<div className="gap-4">Gap in flex/grid</div>
```

### Sizing

```tsx
<div className="w-full">Width 100%</div>
<div className="h-screen">Height 100vh</div>
<div className="max-w-4xl">Max width 56rem</div>
<div className="min-h-screen">Min height 100vh</div>
```

### Typography

```tsx
<h1 className="text-2xl font-bold">Heading</h1>
<p className="text-sm text-muted-foreground">Muted text</p>
<p className="font-semibold">Semi-bold</p>
<p className="tracking-wide">Wide letter spacing</p>
<p className="leading-relaxed">Relaxed line height</p>
```

### Colors

```tsx
<div className="bg-primary text-white">
<div className="bg-sidebar text-sidebar-foreground">
<div className="border-border">
<div className="text-foreground">
```

### Borders & Radius

```tsx
<div className="border border-border">
<div className="rounded-lg">Large radius (14px)</div>
<div className="rounded-md">Medium radius (12px)</div>
<div className="rounded-sm">Small radius (10px)</div>
<div className="rounded-full">Full circle</div>
```

### Shadows

```tsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow">Default shadow</div>
<div className="shadow-lg">Large shadow</div>
```

### Transitions

```tsx
<button className="transition-all duration-200 hover:scale-105">
<div className="transition-colors hover:bg-accent">
```

### Responsive Design

```tsx
<div className="block md:flex">
  {/* Block on mobile, flex on md+ */}
</div>

<div className="text-sm md:text-base lg:text-lg">
  {/* Responsive text size */}
</div>

<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid columns */}
</div>
```

## Examples

### Example 1: Card with Hover Effect

```tsx
<div className="card-base card-hover">
  <div className="flex items-center gap-4">
    <Camera className="h-8 w-8 text-primary" />
    <div>
      <h3 className="f-display text-lg font-bold">Upload Exam</h3>
      <p className="text-sm text-muted-foreground">Scan and polish your handwritten exam</p>
    </div>
  </div>
</div>
```

### Example 2: Button with Icon

```tsx
<button className="btn-base bg-primary text-primary-foreground hover:bg-primary/90">
  <ScanLine size={16} />
  Scan & Polish
</button>
```

### Example 3: Stat Cards Grid

```tsx
<div className="grid-auto-fit-sm gap-4">
  {stats.map((stat) => (
    <div key={stat.label} className="card-base text-center">
      <stat.Icon className="h-7 w-7 mx-auto mb-2 text-primary" />
      <div className="f-display text-3xl font-bold text-primary">{stat.value}</div>
      <div className="text-xs text-muted-foreground">{stat.label}</div>
    </div>
  ))}
</div>
```

### Example 4: Form Layout

```tsx
<div className="space-y-content">
  <div>
    <label className="text-sm font-medium">Name</label>
    <input className="input-base mt-1" type="text" placeholder="Enter name" />
  </div>

  <div>
    <label className="text-sm font-medium">Grade</label>
    <select className="select-base mt-1">
      <option>PP1</option>
      <option>PP2</option>
      <option>PP3</option>
    </select>
  </div>

  <button className="btn-base bg-primary text-primary-foreground w-full">
    Submit
  </button>
</div>
```

### Example 5: Hero Section

```tsx
<div className="bg-gradient-forest rounded-lg p-10 relative overflow-hidden">
  <div className="absolute right-5 top-5 opacity-10">
    <BookOpen size={140} strokeWidth={1} />
  </div>

  <h1 className="f-display text-4xl font-bold text-white mb-4">
    Build perfect CBC exams
    <br />
    <span className="text-[var(--amber)]">in minutes, not hours.</span>
  </h1>

  <p className="text-white/80 max-w-md mb-6">
    Upload your handwritten exam or build from our CBC question bank.
  </p>

  <div className="flex gap-3">
    <button className="btn-base bg-[var(--amber)] text-[var(--ink)]">
      Get Started
    </button>
    <button className="btn-base bg-white/10 text-white border border-white/20">
      Learn More
    </button>
  </div>
</div>
```

### Example 6: Sidebar Navigation

```tsx
<nav className="space-y-1">
  {navItems.map((item) => (
    <Link
      key={item.id}
      to={item.to}
      className={cn(
        "sidebar-item",
        isActive && "sidebar-item-active"
      )}
    >
      <item.Icon className="h-4 w-4" />
      <span>{item.label}</span>
      {item.badge && (
        <span className="badge-base badge-amber ml-auto">
          {item.badge}
        </span>
      )}
    </Link>
  ))}
</nav>
```

## Tips

1. **Use the `cn()` utility** from `lib/utils.ts` to conditionally combine classes:
   ```tsx
   import { cn } from "@/lib/utils"

   <div className={cn("base-class", isActive && "active-class")} />
   ```

2. **Prefer Tailwind classes** for layout, spacing, and responsive design

3. **Use custom component classes** for consistent styled components

4. **Use CSS variables** for colors to maintain design system

5. **Combine classes** for maximum flexibility:
   ```tsx
   <div className="card-base flex items-center gap-4 p-6">
   ```

6. **Use responsive modifiers**:
   ```tsx
   <div className="flex-col md:flex-row">
   ```

## VS Code IntelliSense

For better autocomplete, install the "Tailwind CSS IntelliSense" extension.
