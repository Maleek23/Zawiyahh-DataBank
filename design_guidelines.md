# Design Guidelines: Zawiyahhz Life Tracking Platform

## Design Approach
**Selected Approach**: Design System with Reference Inspiration
- **Primary Reference**: Linear (clean, modern productivity aesthetic) + Notion (warm, approachable data organization)
- **Design System Foundation**: Material Design for data visualization components
- **Justification**: This platform is utility-focused with complex data relationships, requiring consistency, excellent information hierarchy, and scalability while maintaining an inspiring, transformational feel.

## Core Design Principles
1. **Clarity Through Simplicity**: Remove visual noise to let data and progress shine
2. **Inspirational Functionality**: Professional tools that motivate personal transformation
3. **Hierarchical Depth**: Support complex family relationships and multi-layered data
4. **Purposeful Animation**: Minimal, meaningful transitions that guide attention

## Color Palette

### Dark Mode (Primary)
- **Background Layers**: 
  - Primary: 240 8% 8%
  - Secondary: 240 8% 12%
  - Tertiary: 240 8% 16%
- **Primary Brand**: 260 80% 65% (warm purple - transformation, spirituality)
- **Success/Progress**: 142 70% 55% (growth green)
- **Warning/Attention**: 35 95% 60% (warm orange)
- **Error**: 0 75% 60%
- **Text**:
  - Primary: 0 0% 95%
  - Secondary: 0 0% 70%
  - Tertiary: 0 0% 50%

### Light Mode
- **Background Layers**:
  - Primary: 0 0% 100%
  - Secondary: 240 20% 98%
  - Tertiary: 240 15% 95%
- **Primary Brand**: 260 60% 50%
- **Success/Progress**: 142 60% 45%
- **Text**:
  - Primary: 240 10% 10%
  - Secondary: 240 8% 35%
  - Tertiary: 240 6% 55%

## Typography
- **Font Families**:
  - Primary: 'Inter' (body, UI elements) - clean, highly legible
  - Display: 'Cal Sans' or 'Sora' (headings, hero) - modern, inspiring
  - Monospace: 'JetBrains Mono' (data, metrics)

- **Type Scale**:
  - Hero: text-5xl md:text-6xl lg:text-7xl, font-bold
  - H1: text-4xl md:text-5xl, font-bold
  - H2: text-3xl md:text-4xl, font-semibold
  - H3: text-2xl md:text-3xl, font-semibold
  - H4: text-xl md:text-2xl, font-medium
  - Body: text-base md:text-lg
  - Small: text-sm
  - Metrics/Data: text-2xl md:text-3xl, font-mono, font-bold

## Layout System
- **Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 24 for consistent rhythm
- **Container Widths**:
  - Dashboard: max-w-7xl (wide for data)
  - Content: max-w-4xl
  - Forms: max-w-2xl
- **Grid System**: 12-column grid with 4-6 column cards for dashboard widgets
- **Responsive Breakpoints**: Follow Tailwind defaults (sm, md, lg, xl, 2xl)

## Component Library

### Navigation
- **Top Navigation Bar**: Fixed, glass-morphism effect (backdrop-blur-lg bg-background/80)
  - Logo left, main nav center, user profile/settings right
  - Height: h-16, subtle bottom border
  
### Dashboard Cards
- **Progress Cards**: Rounded-2xl, p-6, bg-secondary layer
  - Header with icon + title
  - Large metric display (font-mono, text-3xl)
  - Mini sparkline chart or progress bar
  - Subtle hover: translate-y-[-2px] transition

### Data Visualization
- **Charts**: Use Chart.js or Recharts with custom theming
  - Line charts: smooth curves, gradient fills below line
  - Bar charts: rounded tops, subtle shadows
  - Progress rings: thick strokes (stroke-width-8), animated fills
  
### Family Tree Visualization
- **Node Style**: Rounded-xl cards with avatar, name, progress badge
- **Connections**: Smooth bezier curves, 2px solid lines
- **Interactive**: Zoom controls, pan, expandable/collapsible branches
- **Layout**: Horizontal tree for wider screens, vertical for mobile

### Forms & Inputs
- **Input Fields**: 
  - Rounded-lg, p-3, bg-tertiary layer
  - Focus: ring-2 ring-primary, no outline
  - Labels: text-sm, font-medium, mb-2, text-secondary
- **Buttons**:
  - Primary: bg-primary, rounded-lg, px-6 py-3, font-medium, hover:opacity-90
  - Secondary: bg-secondary, border border-tertiary
  - Ghost: hover:bg-secondary/50

### Progress Tracking Components
- **Progress Levels**: Visual badges (Bad → Elite++)
  - Color-coded: Red → Orange → Yellow → Green → Blue → Purple
  - Pill shape: rounded-full, px-4 py-1, text-xs font-semibold
  
- **Milestone Timeline**: Vertical timeline with connecting line
  - Checkpoints: circular nodes, completed ones filled with primary color
  - Date labels, achievement descriptions

### Modal/Dialog
- **Overlay**: backdrop-blur-sm bg-black/40
- **Content**: max-w-2xl, rounded-2xl, p-8, shadow-2xl
- **Close**: Top-right, subtle hover effect

## Images

### Hero Section
- **Main Landing**: Abstract geometric pattern representing interconnected family/growth
  - Placement: Full-width hero section with gradient overlay
  - Style: Subtle, modern, non-distracting (opacity-20 behind content)
  - Alternative: Animated abstract particles forming tree/network pattern

### Dashboard
- **Empty States**: Friendly illustrations for "no data yet" scenarios
  - Style: Line art, single color (primary), encouraging tone
  
### Profile Avatars
- **User Photos**: rounded-full, ring-2 ring-primary (for active users)
- **Fallback**: Gradient backgrounds with initials

## Animations
**Use Extremely Sparingly**:
- Page transitions: Simple fade (opacity) only
- Card hovers: Subtle lift (translate-y-[-2px])
- Chart rendering: Progressive reveal on load (once)
- NO scroll-triggered animations
- NO parallax effects
- NO loading spinners except for data fetching

## Layout Patterns

### Dashboard Layout
- **Sidebar**: w-64, fixed, left-aligned with main nav categories
  - Personal, Family, Goals, Insights, Settings
- **Main Content**: Three-column grid for metrics cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Section Spacing**: py-8 between major sections

### Profile Pages
- **Two-Column**: 
  - Left: Fixed sidebar with avatar, key stats, progress ring (w-80)
  - Right: Scrollable content with tabs (Timeline, Metrics, Goals)

### Family Tree View
- **Full-Width Canvas**: Dedicated page, minimal chrome, interactive SVG/Canvas
- **Controls Panel**: Floating bottom-right (zoom, filter, layout options)

### Annual Roadmap
- **Kanban-Style Board**: Quarterly columns, draggable cards
- **Card Design**: Compact, color-coded by category, quick-add buttons

## Key Screens Structure

1. **Landing/Hero**: Full-height hero with value prop, animated abstract visual, CTA buttons, feature highlights (3-4 cards), social proof section

2. **Dashboard Home**: Welcome header, quick stats (4 metrics), recent activity feed, progress overview chart, upcoming milestones

3. **Personal Profile**: Avatar header, progress level badge, key metrics grid, detailed charts, goal tracker, achievement timeline

4. **Family Tree**: Interactive canvas, add member controls, relationship indicators, collective progress summary panel

5. **Insights & Predictions**: AI-generated insights cards, prediction timeline, recommendation list, action items

This design creates a professional, data-rich platform that feels inspiring rather than overwhelming, supporting complex information while maintaining clarity and user confidence in their transformational journey.