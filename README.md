# Zawiyahhz

A life transformation tracker that helps you (and your whole family) level up from "Bad" to "Elite++" across every dimension of life.

> **[📸 Add screenshot of your dashboard here]**

## What is this?

Think of it as your personal command center for life improvement. Track your progress across education, fitness, finances, spirituality, career, relationships, and health. Build your family tree, set goals, and watch the data tell you where you're crushing it (and where you need work).

No fluff, no BS - just pure progress tracking with smart insights.

## The Cool Stuff

### Smart Family Connections
Drop in family members with the same last name, and the app automatically suggests who should be connected. One click and boom - your family tree builds itself.

> **[📸 Add screenshot of the suggested connections feature here]**

### Progress Tracking That Actually Makes Sense
Rate yourself 0-10 across seven life categories. The app tracks everything and shows you patterns you wouldn't notice on your own. You'll see exactly which areas need attention and where you're already winning.

### Goals That Don't Die in February
Create goals, track progress, filter by category. Unlike that New Year's resolution spreadsheet you abandoned, this actually keeps you honest.

> **[📸 Add screenshot of goals page here]**

### Family Tree Visualization
See your whole crew at a glance - who's connected to who, everyone's progress levels, and collective family stats. Great for keeping tabs on the squad.

### Real Insights (Not Fake Motivational Quotes)
Statistical analysis of your metrics, category breakdowns, progress distribution - actual useful data. No AI trying to sound profound, just math telling you what's up.

## Tech Stack

Built with the good stuff:

**Frontend**
- React + TypeScript (because we're not savages)
- TailwindCSS + Shadcn UI (looks clean, works everywhere)
- TanStack Query (data fetching that doesn't suck)
- Wouter (routing without the bloat)

**Backend**
- Express.js + TypeScript
- In-memory storage for MVP (fast, simple, gets the job done)
- Zod validation (catch bad data before it breaks things)

**Design**
- Purple primary color (transformation vibes)
- Dark mode default (your eyes will thank you)
- Linear/Notion inspired aesthetic (clean and professional)

## Quick Start

```bash
# Install everything
npm install

# Fire it up
npm run dev
```

App runs on `http://localhost:5000`

> **[📸 Add screenshot of the clean dark mode UI here]**

## How To Use It

1. **Add People** - Start with yourself, then add family members
2. **Track Progress** - Drop in metrics across the 7 life categories (0-10 scale)
3. **Log Milestones** - Graduated? New job? Got married? Track it.
4. **Set Goals** - Pick a category, set a target, track progress
5. **Build Your Tree** - Connect family members (the app suggests matches automatically)
6. **Check Insights** - See where you're trending, what's working, what needs help

## The Progress Levels

We keep it simple:
```
Bad → Poor → Average → Good → Great → Excellent → Elite → Elite+ → Elite++
```

Each level has its own color, so you can see at a glance where you're at.

## Features Breakdown

**Dashboard**
- Quick overview of your whole life situation
- Total people tracked, active goals, completed milestones
- Recent activity feed

**Personal Profiles**
- Individual pages for each person
- Search and filter functionality
- Detailed metrics by category
- Milestone timelines

**Family Tree**
- Network view of all connections
- Smart surname-based suggestions
- Relationship types (Parent, Child, Sibling, Spouse, Extended)
- Family-wide stats

**Goals & Roadmap**
- Create and track objectives
- Filter by category or status
- Progress percentages
- Target dates

**Insights & Analytics**
- Category performance breakdown
- Progress level distribution
- Top performers
- Recent achievements

## What's Next?

Current version uses in-memory storage (data resets on restart). If you want to keep your data, you'll need to hook up a real database. The Drizzle ORM setup is already there, just plug in PostgreSQL and you're good.

## Design Philosophy

We went for a professional, data-dense interface that doesn't overwhelm. Think Linear meets Notion - everything's there when you need it, but it stays out of your way when you don't.

Purple theme because transformation and growth. Dark mode because it's 2025 and light mode burns.

## Credits

Built for people who want to actually improve their lives, not just talk about it.

---

### Want to contribute?

Feel free to fork it, break it, make it better. PRs welcome.

### Questions?

Open an issue or reach out. We're pretty responsive.

---

**License:** MIT (do whatever you want with it)
