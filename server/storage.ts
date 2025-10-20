import {
  type Person,
  type InsertPerson,
  type ProgressMetric,
  type InsertProgressMetric,
  type Milestone,
  type InsertMilestone,
  type Goal,
  type InsertGoal,
  type FamilyRelationship,
  type InsertFamilyRelationship,
  type InsightData,
  type FamilyStats,
  PROGRESS_LEVELS,
  METRIC_CATEGORIES,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Person methods
  getPeople(): Promise<Person[]>;
  getPerson(id: string): Promise<Person | undefined>;
  createPerson(person: InsertPerson): Promise<Person>;
  updatePerson(id: string, person: Partial<InsertPerson>): Promise<Person | undefined>;
  deletePerson(id: string): Promise<boolean>;

  // ProgressMetric methods
  getAllMetrics(): Promise<ProgressMetric[]>;
  getPersonMetrics(personId: string): Promise<ProgressMetric[]>;
  createMetric(metric: InsertProgressMetric): Promise<ProgressMetric>;

  // Milestone methods
  getAllMilestones(): Promise<Milestone[]>;
  getPersonMilestones(personId: string): Promise<Milestone[]>;
  createMilestone(milestone: InsertMilestone): Promise<Milestone>;
  updateMilestone(id: string, milestone: Partial<InsertMilestone>): Promise<Milestone | undefined>;

  // Goal methods
  getGoals(): Promise<Goal[]>;
  getPersonGoals(personId: string): Promise<Goal[]>;
  createGoal(goal: InsertGoal): Promise<Goal>;
  updateGoal(id: string, goal: Partial<InsertGoal>): Promise<Goal | undefined>;
  deleteGoal(id: string): Promise<boolean>;

  // FamilyRelationship methods
  getRelationships(): Promise<FamilyRelationship[]>;
  getPersonRelationships(personId: string): Promise<FamilyRelationship[]>;
  createRelationship(relationship: InsertFamilyRelationship): Promise<FamilyRelationship>;
  deleteRelationship(id: string): Promise<boolean>;

  // Analytics methods
  getPersonInsights(personId: string): Promise<InsightData>;
  getFamilyStats(familyId?: string): Promise<FamilyStats>;
}

export class MemStorage implements IStorage {
  private people: Map<string, Person>;
  private metrics: Map<string, ProgressMetric>;
  private milestones: Map<string, Milestone>;
  private goals: Map<string, Goal>;
  private relationships: Map<string, FamilyRelationship>;

  constructor() {
    this.people = new Map();
    this.metrics = new Map();
    this.milestones = new Map();
    this.goals = new Map();
    this.relationships = new Map();
  }

  // Person methods
  async getPeople(): Promise<Person[]> {
    return Array.from(this.people.values());
  }

  async getPerson(id: string): Promise<Person | undefined> {
    return this.people.get(id);
  }

  async createPerson(insertPerson: InsertPerson): Promise<Person> {
    const id = randomUUID();
    const person: Person = {
      ...insertPerson,
      id,
      createdAt: new Date(),
    };
    this.people.set(id, person);
    return person;
  }

  async updatePerson(id: string, updates: Partial<InsertPerson>): Promise<Person | undefined> {
    const person = this.people.get(id);
    if (!person) return undefined;

    const updated = { ...person, ...updates };
    this.people.set(id, updated);
    return updated;
  }

  async deletePerson(id: string): Promise<boolean> {
    return this.people.delete(id);
  }

  // ProgressMetric methods
  async getAllMetrics(): Promise<ProgressMetric[]> {
    return Array.from(this.metrics.values());
  }

  async getPersonMetrics(personId: string): Promise<ProgressMetric[]> {
    return Array.from(this.metrics.values()).filter(m => m.personId === personId);
  }

  async createMetric(insertMetric: InsertProgressMetric): Promise<ProgressMetric> {
    const id = randomUUID();
    const metric: ProgressMetric = {
      ...insertMetric,
      id,
      date: insertMetric.date || new Date(),
    };
    this.metrics.set(id, metric);
    return metric;
  }

  // Milestone methods
  async getAllMilestones(): Promise<Milestone[]> {
    return Array.from(this.milestones.values());
  }

  async getPersonMilestones(personId: string): Promise<Milestone[]> {
    return Array.from(this.milestones.values()).filter(m => m.personId === personId);
  }

  async createMilestone(insertMilestone: InsertMilestone): Promise<Milestone> {
    const id = randomUUID();
    const milestone: Milestone = {
      ...insertMilestone,
      id,
    };
    this.milestones.set(id, milestone);
    return milestone;
  }

  async updateMilestone(id: string, updates: Partial<InsertMilestone>): Promise<Milestone | undefined> {
    const milestone = this.milestones.get(id);
    if (!milestone) return undefined;

    const updated = { ...milestone, ...updates };
    this.milestones.set(id, updated);
    return updated;
  }

  // Goal methods
  async getGoals(): Promise<Goal[]> {
    return Array.from(this.goals.values());
  }

  async getPersonGoals(personId: string): Promise<Goal[]> {
    return Array.from(this.goals.values()).filter(g => g.personId === personId);
  }

  async createGoal(insertGoal: InsertGoal): Promise<Goal> {
    const id = randomUUID();
    const goal: Goal = {
      ...insertGoal,
      id,
    };
    this.goals.set(id, goal);
    return goal;
  }

  async updateGoal(id: string, updates: Partial<InsertGoal>): Promise<Goal | undefined> {
    const goal = this.goals.get(id);
    if (!goal) return undefined;

    const updated = { ...goal, ...updates };
    this.goals.set(id, updated);
    return updated;
  }

  async deleteGoal(id: string): Promise<boolean> {
    return this.goals.delete(id);
  }

  // FamilyRelationship methods
  async getRelationships(): Promise<FamilyRelationship[]> {
    return Array.from(this.relationships.values());
  }

  async getPersonRelationships(personId: string): Promise<FamilyRelationship[]> {
    return Array.from(this.relationships.values()).filter(
      r => r.personId === personId || r.relatedPersonId === personId
    );
  }

  async createRelationship(insertRelationship: InsertFamilyRelationship): Promise<FamilyRelationship> {
    const id = randomUUID();
    const relationship: FamilyRelationship = {
      ...insertRelationship,
      id,
    };
    this.relationships.set(id, relationship);
    return relationship;
  }

  async deleteRelationship(id: string): Promise<boolean> {
    return this.relationships.delete(id);
  }

  // Analytics methods
  async getPersonInsights(personId: string): Promise<InsightData> {
    const person = this.people.get(personId);
    if (!person) {
      throw new Error("Person not found");
    }

    const metrics = await this.getPersonMetrics(personId);
    const goals = await this.getPersonGoals(personId);
    const milestones = await this.getPersonMilestones(personId);
    const allPeople = await this.getPeople();

    // Calculate progress velocity (rate of improvement over time)
    const recentMetrics = metrics
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
    const progressVelocity = recentMetrics.length > 1
      ? (recentMetrics[0].value - recentMetrics[recentMetrics.length - 1].value) / recentMetrics.length
      : 0;

    // Determine trend
    let trend: "improving" | "stable" | "declining" = "stable";
    if (progressVelocity > 0.2) trend = "improving";
    else if (progressVelocity < -0.2) trend = "declining";

    // Calculate completion rate
    const totalGoals = goals.length;
    const completedGoals = goals.filter(g => g.status === "Completed").length;
    const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

    // Count achievements
    const achievements = milestones.filter(m => m.completed).length;

    // Compare to family average
    const progressLevelIndex = PROGRESS_LEVELS.indexOf(person.progressLevel as any);
    const familyAvgIndex = allPeople.reduce(
      (sum, p) => sum + PROGRESS_LEVELS.indexOf(p.progressLevel as any),
      0
    ) / (allPeople.length || 1);
    const comparisonToFamily = ((progressLevelIndex - familyAvgIndex) / (PROGRESS_LEVELS.length || 1)) * 100;

    // Generate recommendations
    const recommendations: string[] = [];
    if (completionRate < 50) {
      recommendations.push("Focus on completing existing goals before adding new ones");
    }
    if (trend === "declining") {
      recommendations.push("Recent metrics show declining trend - consider reviewing your strategy");
    }
    if (achievements === 0) {
      recommendations.push("Set some milestone markers to celebrate your progress");
    }
    if (metrics.length < 5) {
      recommendations.push("Track more metrics across different categories for better insights");
    }

    return {
      personId,
      progressVelocity,
      trend,
      completionRate,
      recommendations,
      achievements,
      comparisonToFamily,
    };
  }

  async getFamilyStats(familyId?: string): Promise<FamilyStats> {
    const allPeople = await this.getPeople();
    const allGoals = await this.getGoals();
    const allMilestones = await this.getAllMilestones();
    const allMetrics = await this.getAllMetrics();

    // Calculate average progress level
    const avgProgressLevel = allPeople.reduce(
      (sum, p) => sum + PROGRESS_LEVELS.indexOf(p.progressLevel as any),
      0
    ) / (allPeople.length || 1);

    // Calculate category averages
    const categoryAverages: Record<string, number> = {};
    METRIC_CATEGORIES.forEach(category => {
      const categoryMetrics = allMetrics.filter(m => m.category === category);
      if (categoryMetrics.length > 0) {
        categoryAverages[category] = categoryMetrics.reduce((sum, m) => sum + m.value, 0) / categoryMetrics.length;
      }
    });

    return {
      totalMembers: allPeople.length,
      averageProgressLevel: avgProgressLevel,
      totalGoalsCompleted: allGoals.filter(g => g.status === "Completed").length,
      totalMilestones: allMilestones.filter(m => m.completed).length,
      categoryAverages,
    };
  }
}

export const storage = new MemStorage();
