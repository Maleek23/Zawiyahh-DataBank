# Zawiyahhz - Life Transformation Tracker

## Overview
A comprehensive life tracking and predictive analytics platform designed to help individuals and families track personal progress, set goals, build family connections, and achieve transformational growth through data-driven insights.

## Purpose
Enable users to track their journey from "Bad" to "Elite++" across multiple life dimensions (Education, Fitness, Finances, Spirituality, Career, Relationships, Health) while visualizing family connections and receiving statistical insights for continuous improvement.

## Current State
**Phase**: ✅ MVP Complete & Tested
- ✅ Complete data schema defined with 5 models
- ✅ Design system configured (purple primary, dark mode default)
- ✅ All frontend components built with exceptional visual quality
- ✅ Backend API fully implemented with in-memory storage
- ✅ Complete integration with TanStack Query
- ✅ End-to-end testing passed successfully
- ✅ All critical user journeys working (create person → add metrics → set goals → create relationships → view insights)

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
2. **ProgressMetric**: Tracked metrics across 7 categories (Education, Fitness, Finances, Spirituality, Career, Relationships, Health) with 0-10 values
3. **Milestone**: Achievement tracking with title, description, date, and completion status
4. **Goal**: Objectives with progress tracking (0-100%), target dates, categories, and status
5. **FamilyRelationship**: Parent-child, sibling, spouse, and extended family connections

## Key Features

### Fully Implemented
1. **Dashboard**: Overview with key metrics cards, total profiles count, active goals, and recent milestones
2. **Personal Profiles**: 
   - Grid view with search and filter functionality
   - Detailed profile pages with avatar, progress bars
   - Metrics tracking by category with add/view functionality
   - Goals tab showing all goals for the person
   - Milestones timeline with completion tracking
3. **Family Tree**: Network visualization showing all family members, relationships, and collective progress
4. **Goals & Roadmap**: 
   - Create/edit goals with categories
   - Progress tracking with completion rates
   - Category-based filtering
   - Target date tracking
5. **Insights & Analytics**: 
   - Statistical analysis of progress metrics
   - Category performance breakdown
   - Progress level distribution
   - Family-wide comparative analytics
   - Trend tracking and velocity calculations
6. **Theme System**: Dark/light mode toggle with persistent storage

### Dialog Components
- **PersonDialog**: Create/edit personal profiles with all fields
- **MetricDialog**: Add progress metrics with category selector and 0-10 value input
- **MilestoneDialog**: Add milestones with title, description, date, and completion checkbox
- **GoalDialog**: Create/edit goals with full progress tracking
- **RelationshipDialog**: Create family relationships between people

## Recent Changes
- **2025-01-20 (Session 1)**: Initial project setup
  - Created complete data schema with 5 models
  - Built all frontend pages (Dashboard, Personal, Family, Goals, Insights)
  - Implemented design system with purple primary color
  - Added dark mode support with theme toggle
  - Created reusable components (MetricCard, ProgressBadge, EmptyState)

- **2025-01-20 (Session 2)**: Backend implementation and integration
  - Implemented complete backend API with all CRUD endpoints
  - Built in-memory storage interface with all methods
  - Integrated frontend with backend using TanStack Query
  - Added data-testid attributes throughout for testing
  - Created missing dialog components (MetricDialog, MilestoneDialog, RelationshipDialog)
  - Fixed form control issues (Select components using value prop)
  - Fixed date validation (z.coerce.date() for ISO string support)
  - Successfully tested complete user journey end-to-end

## API Endpoints (Fully Implemented)
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
- Percentage mapping: Bad (0%), Poor (11%), Average (22%), Good (44%), Great (56%), Excellent (67%), Elite (78%), Elite+ (89%), Elite++ (100%)

## Development Workflow
```bash
npm run dev  # Start both frontend (Vite) and backend (Express) on port 5000
```

The workflow "Start application" is already configured and runs automatically.

## User Preferences
- Clean, modern design with inspirational feel
- Data-rich visualizations without overwhelming users
- Statistical insights instead of AI predictions (per user request)
- Purple color scheme for transformation/spirituality theme
- Dark mode as default
- Linear/Notion-inspired aesthetic

## Testing
- End-to-end test passed successfully covering:
  - Creating personal profiles
  - Adding progress metrics
  - Adding milestones
  - Creating goals
  - Establishing family relationships
  - Viewing insights dashboard
- All API endpoints returning correct status codes
- UI updating appropriately with data changes

## Next Steps (Future Enhancements)
- PostgreSQL database integration for production
- Advanced trend analysis and predictions
- Data export functionality (CSV/JSON)
- Notification system for milestone achievements
- Multi-user authentication and authorization
- Mobile responsive optimizations
- Print-friendly reports
