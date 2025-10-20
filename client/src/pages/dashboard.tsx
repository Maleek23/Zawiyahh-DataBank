import { useQuery } from "@tanstack/react-query";
import { Users, Target, TrendingUp, Award } from "lucide-react";
import { MetricCard } from "@/components/metric-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { Person, Goal, Milestone } from "@shared/schema";
import { ProgressBadge } from "@/components/progress-badge";
import { Link } from "wouter";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Dashboard() {
  const { data: people, isLoading: loadingPeople } = useQuery<Person[]>({
    queryKey: ["/api/people"],
  });

  const { data: goals, isLoading: loadingGoals } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const { data: milestones, isLoading: loadingMilestones } = useQuery<Milestone[]>({
    queryKey: ["/api/milestones"],
  });

  const totalPeople = people?.length || 0;
  const activeGoals = goals?.filter(g => g.status === "In Progress").length || 0;
  const completedGoals = goals?.filter(g => g.status === "Completed").length || 0;
  const totalMilestones = milestones?.filter(m => m.completed).length || 0;

  const recentPeople = people?.slice(0, 5) || [];

  if (!loadingPeople && totalPeople === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome to Zawiyahhz</h1>
          <p className="text-muted-foreground text-lg">
            Start your transformational journey by adding your first profile
          </p>
        </div>
        <EmptyState
          icon={Users}
          title="No profiles yet"
          description="Create your first personal profile to start tracking progress, setting goals, and building your family tree."
          actionLabel="Add First Profile"
          onAction={() => window.location.href = '/personal'}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Track your transformational journey across all life dimensions
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total People"
          value={totalPeople}
          icon={Users}
          trend={
            <span className="text-muted-foreground">
              Tracking {totalPeople} {totalPeople === 1 ? 'person' : 'people'}
            </span>
          }
        />
        <MetricCard
          title="Active Goals"
          value={activeGoals}
          icon={Target}
          trend={
            <span className="text-chart-2">
              {completedGoals} completed
            </span>
          }
        />
        <MetricCard
          title="Milestones"
          value={totalMilestones}
          icon={Award}
          trend={
            <span className="text-muted-foreground">
              Achievements unlocked
            </span>
          }
        />
        <MetricCard
          title="Insights"
          value={people?.length || 0}
          icon={TrendingUp}
          trend={
            <Link href="/insights">
              <span className="text-primary hover:underline cursor-pointer">
                View detailed insights →
              </span>
            </Link>
          }
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Recent Profiles</CardTitle>
            <Link href="/personal">
              <Button variant="ghost" size="sm" data-testid="button-view-all-profiles" className="text-primary">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentPeople.length > 0 ? (
              <div className="space-y-2">
                {recentPeople.map((person) => (
                  <Link key={person.id} href={`/personal/${person.id}`}>
                    <div
                      className="flex items-center gap-4 p-4 rounded-xl hover-elevate border border-transparent hover:border-border/50 transition-all cursor-pointer group"
                      data-testid={`card-person-${person.id}`}
                    >
                      <Avatar className="h-14 w-14 ring-2 ring-primary/10 group-hover:ring-primary/30 transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-bold text-base">
                          {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate text-base group-hover:text-primary transition-colors">{person.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {person.role} • {person.age} years
                        </p>
                      </div>
                      <ProgressBadge level={person.progressLevel} />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">No profiles yet</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">Active Goals</CardTitle>
            <Link href="/goals">
              <Button variant="ghost" size="sm" data-testid="button-view-all-goals" className="text-primary">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {goals && goals.length > 0 ? (
              <div className="space-y-3">
                {goals.filter(g => g.status === "In Progress").slice(0, 5).map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl border border-border/50 hover-elevate transition-all group"
                    data-testid={`card-goal-${goal.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <p className="font-semibold group-hover:text-primary transition-colors">{goal.title}</p>
                      <span className="text-sm font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">
                        {goal.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-chart-2 h-2.5 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{goal.category}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No active goals</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
