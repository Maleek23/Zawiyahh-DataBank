import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Progress levels: Bad, Poor, Average, Good, Great, Excellent, Elite, Elite+, Elite++
export const PROGRESS_LEVELS = [
  "Bad",
  "Poor", 
  "Average",
  "Good",
  "Great",
  "Excellent",
  "Elite",
  "Elite+",
  "Elite++"
] as const;

export const METRIC_CATEGORIES = [
  "Education",
  "Fitness",
  "Finances",
  "Spirituality",
  "Career",
  "Relationships",
  "Health"
] as const;

export const RELATIONSHIP_TYPES = [
  "Parent",
  "Child",
  "Spouse",
  "Sibling",
  "Grandparent",
  "Grandchild",
  "Extended Family"
] as const;

export const people = pgTable("people", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  role: text("role").notNull(),
  profession: text("profession"),
  location: text("location"),
  progressLevel: text("progress_level").notNull().default("Average"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const progressMetrics = pgTable("progress_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  value: real("value").notNull(),
  date: timestamp("date").notNull().defaultNow(),
  notes: text("notes"),
});

export const milestones = pgTable("milestones", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  completed: boolean("completed").notNull().default(false),
});

export const goals = pgTable("goals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  targetDate: timestamp("target_date").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("In Progress"),
  progress: integer("progress").notNull().default(0),
});

export const familyRelationships = pgTable("family_relationships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  personId: varchar("person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
  relatedPersonId: varchar("related_person_id").notNull().references(() => people.id, { onDelete: "cascade" }),
  relationshipType: text("relationship_type").notNull(),
});

// Insert schemas
export const insertPersonSchema = createInsertSchema(people).omit({
  id: true,
  createdAt: true,
});

export const insertProgressMetricSchema = createInsertSchema(progressMetrics).omit({
  id: true,
}).extend({
  date: z.coerce.date(),
});

export const insertMilestoneSchema = createInsertSchema(milestones).omit({
  id: true,
}).extend({
  date: z.coerce.date(),
});

export const insertGoalSchema = createInsertSchema(goals).omit({
  id: true,
}).extend({
  targetDate: z.coerce.date(),
});

export const insertFamilyRelationshipSchema = createInsertSchema(familyRelationships).omit({
  id: true,
});

// Types
export type Person = typeof people.$inferSelect;
export type InsertPerson = z.infer<typeof insertPersonSchema>;

export type ProgressMetric = typeof progressMetrics.$inferSelect;
export type InsertProgressMetric = z.infer<typeof insertProgressMetricSchema>;

export type Milestone = typeof milestones.$inferSelect;
export type InsertMilestone = z.infer<typeof insertMilestoneSchema>;

export type Goal = typeof goals.$inferSelect;
export type InsertGoal = z.infer<typeof insertGoalSchema>;

export type FamilyRelationship = typeof familyRelationships.$inferSelect;
export type InsertFamilyRelationship = z.infer<typeof insertFamilyRelationshipSchema>;

// Additional types for insights
export type InsightData = {
  personId: string;
  progressVelocity: number;
  trend: "improving" | "stable" | "declining";
  completionRate: number;
  recommendations: string[];
  achievements: number;
  comparisonToFamily: number;
};

export type FamilyStats = {
  totalMembers: number;
  averageProgressLevel: number;
  totalGoalsCompleted: number;
  totalMilestones: number;
  categoryAverages: Record<string, number>;
};
