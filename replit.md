# Zawiyahhz - Life Transformation Tracker

## Overview
A comprehensive life tracking and predictive analytics platform designed to help individuals and families track personal progress, set goals, build family connections, and achieve transformational growth through data-driven insights.

## Purpose
Enable users to track their journey from "Bad" to "Elite++" across multiple life dimensions (Education, Fitness, Finances, Spirituality, Career, Relationships, Health) while visualizing family connections and receiving statistical insights for continuous improvement.

## Current State
**Phase**: MVP Development in Progress
- ✅ Complete data schema defined
- ✅ Design system configured (purple primary, dark mode default)
- ✅ All frontend components built with exceptional visual quality
- 🔄 Backend API implementation in progress
- ⏳ Integration and testing pending

## Architecture

### Tech Stack
- **Frontend**: React, TypeScript, TailwindCSS, Shadcn UI, Wouter routing
- **Backend**: Express.js, TypeScript
- **Data**: In-memory storage (MemStorage) for MVP
- **State Management**: TanStack Query v5
- **Forms**: React Hook Form with Zod validation

### Design System
- **Primary Color**: Purple (260 80% 65% dark, 260 60% 50% light)
- **Typography**: Inter (body), Sora (display), JetBrains Mono (metrics)
- **Theme**: Dark mode as default with light mode support
- **Inspiration**: Linear + Notion aesthetic for professional data organization

### Data Models
1. **Person**: Individual profiles with demographics, role, profession, and progress level
2. **ProgressMetric**: Tracked metrics across 7 categories (Education, Fitness, etc.)
3. **Milestone**: Achievement tracking with completion status
4. **Goal**: Objectives with progress tracking, target dates, and categories
5. **FamilyRelationship**: Parent-child and extended family connections

## Key Features

### Implemented (Frontend)
1. **Dashboard**: Overview with key metrics, recent profiles, and active goals
2. **Personal Profiles**: 
   - Grid view with search functionality
   - Detailed profile pages with progress visualization
   - Metrics tracking by category
   - Goals and milestones timeline
3. **Family Tree**: Network visualization showing relationships and collective progress
4. **Goals & Roadmap**: 
   - Category-based filtering
   - Progress tracking with completion rates
   - Quarterly planning support
5. **Insights & Analytics**: 
   - Progress level distribution
   - Category performance analysis
   - Top performers leaderboard
   - Recent achievements feed
6. **Theme System**: Dark/light mode toggle with persistent storage

### In Progress
- Backend API endpoints for all CRUD operations
- Data persistence layer
- Statistical analysis for insights

### Planned (Next Phase)
- PostgreSQL database integration
- Advanced trend analysis and predictions
- Family-wide comparative analytics
- Notification system for milestones
- Data export functionality

## Recent Changes
- **2025-01-20**: Initial project setup
- Created complete data schema with 5 models
- Built all frontend pages (Dashboard, Personal, Family, Goals, Insights)
- Implemented design system with purple primary color
- Added dark mode support with theme toggle
- Created reusable components (MetricCard, ProgressBadge, EmptyState)
- Built forms for person and goal creation

## API Endpoints (To Be Implemented)
```
GET    /api/people                 - List all people
POST   /api/people                 - Create person
GET    /api/people/:id             - Get person details
PUT    /api/people/:id             - Update person
DELETE /api/people/:id             - Delete person
GET    /api/people/:id/metrics     - Get person metrics
POST   /api/people/:id/metrics     - Add metric
GET    /api/people/:id/milestones  - Get person milestones
POST   /api/people/:id/milestones  - Add milestone
GET    /api/goals                  - List all goals
POST   /api/goals                  - Create goal
PUT    /api/goals/:id              - Update goal
DELETE /api/goals/:id              - Delete goal
GET    /api/family-relationships   - List relationships
POST   /api/family-relationships   - Create relationship
DELETE /api/family-relationships/:id - Delete relationship
GET    /api/insights/:id           - Get person insights
GET    /api/family/:id/stats       - Get family statistics
GET    /api/metrics                - List all metrics
GET    /api/milestones             - List all milestones
```

## Progress Levels
- Bad → Poor → Average → Good → Great → Excellent → Elite → Elite+ → Elite++
- Color-coded: Red → Orange → Yellow → Green → Blue → Purple gradients

## Development Workflow
```bash
npm run dev  # Start both frontend (Vite) and backend (Express)
```

## User Preferences
- Clean, modern design with inspirational feel
- Data-rich visualizations without overwhelming users
- Statistical insights instead of AI predictions (per user request)
- Purple color scheme for transformation/spirituality theme
