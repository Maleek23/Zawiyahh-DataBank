import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Award, Target, Users, BarChart3, Activity } from "lucide-react";
import { Person, ProgressMetric, Goal, Milestone, METRIC_CATEGORIES } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { MetricCard } from "@/components/metric-card";
import { ProgressBadge } from "@/components/progress-badge";
import { Progress } from "@/components/ui/progress";

export default function Insights() {
  const { data: people = [], isLoading } = useQuery<Person[]>({
    queryKey: ["/api/people"],
  });

  const { data: metrics = [] } = useQuery<ProgressMetric[]>({
    queryKey: ["/api/metrics"],
  });

  const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const { data: milestones = [] } = useQuery<Milestone[]>({
    queryKey: ["/api/milestones"],
  });

  // Calculate insights
  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.status === "Completed").length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;
  const totalMilestones = milestones.filter(m => m.completed).length;

  // Progress distribution
  const progressLevels = ["Bad", "Poor", "Average", "Good", "Great", "Excellent", "Elite", "Elite+", "Elite++"];
  const progressDistribution = progressLevels.map(level => ({
    level,
    count: people.filter(p => p.progressLevel === level).length,
    percentage: people.length > 0 ? (people.filter(p => p.progressLevel === level).length / people.length) * 100 : 0,
  }));

  // Category averages
  const categoryAverages = METRIC_CATEGORIES.map(category => {
    const categoryMetrics = metrics.filter(m => m.category === category);
    const average = categoryMetrics.length > 0
      ? categoryMetrics.reduce((sum, m) => sum + m.value, 0) / categoryMetrics.length
      : 0;
    return { category, average, count: categoryMetrics.length };
  });

  // Top performers
  const topPerformers = [...people]
    .sort((a, b) => progressLevels.indexOf(b.progressLevel) - progressLevels.indexOf(a.progressLevel))
    .slice(0, 5);

  // Recent achievements
  const recentMilestones = [...milestones]
    .filter(m => m.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getPersonName = (personId: string) => {
    return people.find(p => p.id === personId)?.name || "Unknown";
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (people.length === 0) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Insights & Analytics</h1>
          <p className="text-muted-foreground text-lg">
            Data-driven insights for transformational growth
          </p>
        </div>
        <EmptyState
          icon={TrendingUp}
          title="No insights available"
          description="Add personal profiles and track metrics to unlock powerful insights about progress, trends, and achievements."
          actionLabel="Add First Profile"
          onAction={() => window.location.href = '/personal'}
        />
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Insights & Analytics</h1>
        <p className="text-muted-foreground text-lg">
          Data-driven insights for transformational growth
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Profiles"
          value={people.length}
          icon={Users}
          trend={<span className="text-muted-foreground">Active members</span>}
        />
        <MetricCard
          title="Goal Completion"
          value={`${Math.round(completionRate)}%`}
          icon={Target}
          trend={<span className="text-chart-2">{completedGoals} of {totalGoals} goals</span>}
        />
        <MetricCard
          title="Achievements"
          value={totalMilestones}
          icon={Award}
          trend={<span className="text-chart-3">Milestones unlocked</span>}
        />
        <MetricCard
          title="Metrics Tracked"
          value={metrics.length}
          icon={Activity}
          trend={<span className="text-muted-foreground">Data points</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Progress Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Progress Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressDistribution.filter(p => p.count > 0).map(({ level, count, percentage }) => (
              <div key={level}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ProgressBadge level={level} />
                    <span className="text-sm text-muted-foreground">
                      {count} {count === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Category Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryAverages
              .filter(c => c.count > 0)
              .sort((a, b) => b.average - a.average)
              .map(({ category, average, count }) => (
                <div key={category}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category}</span>
                      <span className="text-xs text-muted-foreground">
                        ({count} metrics)
                      </span>
                    </div>
                    <span className="text-sm font-medium">{average.toFixed(1)}/10</span>
                  </div>
                  <Progress value={(average / 10) * 100} className="h-2" />
                </div>
              ))}
            {categoryAverages.filter(c => c.count > 0).length === 0 && (
              <p className="text-center text-muted-foreground py-4">No metrics tracked yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformers.length > 0 ? (
              <div className="space-y-3">
                {topPerformers.map((person, index) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover-elevate transition-all"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{person.name}</p>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>
                    <ProgressBadge level={person.progressLevel} />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentMilestones.length > 0 ? (
              <div className="space-y-3">
                {recentMilestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="p-3 rounded-lg border border-border"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-sm">{milestone.title}</p>
                      <span className="text-xs bg-chart-2/10 text-chart-2 px-2 py-1 rounded-full">
                        ✓
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {getPersonName(milestone.personId)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No achievements yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
