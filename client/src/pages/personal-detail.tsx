import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { ArrowLeft, TrendingUp, Award, Target, Plus } from "lucide-react";
import { Person, ProgressMetric, Milestone, Goal, METRIC_CATEGORIES } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBadge, getProgressPercentage } from "@/components/progress-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "@/components/metric-card";
import { MetricDialog } from "@/components/metric-dialog";
import { MilestoneDialog } from "@/components/milestone-dialog";
import { format } from "date-fns";

export default function PersonalDetail() {
  const [, params] = useRoute("/personal/:id");
  const personId = params?.id;
  const [isMetricDialogOpen, setIsMetricDialogOpen] = useState(false);
  const [isMilestoneDialogOpen, setIsMilestoneDialogOpen] = useState(false);

  const { data: person, isLoading } = useQuery<Person>({
    queryKey: ["/api/people", personId],
    enabled: !!personId,
  });

  const { data: metrics = [] } = useQuery<ProgressMetric[]>({
    queryKey: ["/api/people", personId, "metrics"],
    enabled: !!personId,
  });

  const { data: milestones = [] } = useQuery<Milestone[]>({
    queryKey: ["/api/people", personId, "milestones"],
    enabled: !!personId,
  });

  const { data: goals = [] } = useQuery<Goal[]>({
    queryKey: ["/api/goals"],
  });

  const personGoals = goals.filter(g => g.personId === personId);
  const completedMilestones = milestones.filter(m => m.completed);
  const activeGoals = personGoals.filter(g => g.status === "In Progress");

  // Calculate average metrics by category
  const categoryAverages = METRIC_CATEGORIES.map(category => {
    const categoryMetrics = metrics.filter(m => m.category === category);
    const average = categoryMetrics.length > 0
      ? categoryMetrics.reduce((sum, m) => sum + m.value, 0) / categoryMetrics.length
      : 0;
    return { category, average };
  });

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-64 bg-muted rounded-2xl"></div>
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <p className="text-center text-muted-foreground">Person not found</p>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Back Button */}
      <Link href="/personal">
        <Button variant="ghost" className="mb-6" data-testid="button-back">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Profiles
        </Button>
      </Link>

      {/* Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-person-name">
                {person.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span>{person.role}</span>
                <span>•</span>
                <span>{person.age} years old</span>
                {person.profession && (
                  <>
                    <span>•</span>
                    <span>{person.profession}</span>
                  </>
                )}
              </div>
            </div>
            <ProgressBadge level={person.progressLevel} className="text-base px-6 py-2" />
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Overall Progress</span>
              <span className="text-sm font-medium">{Math.round(getProgressPercentage(person.progressLevel))}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div
                className="bg-gradient-to-r from-primary to-chart-2 h-3 rounded-full transition-all"
                style={{ width: `${getProgressPercentage(person.progressLevel)}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Active Goals"
          value={activeGoals.length}
          icon={Target}
          trend={<span className="text-muted-foreground">{personGoals.length} total goals</span>}
        />
        <MetricCard
          title="Milestones"
          value={completedMilestones.length}
          icon={Award}
          trend={<span className="text-chart-2">Achievements unlocked</span>}
        />
        <MetricCard
          title="Metrics Tracked"
          value={metrics.length}
          icon={TrendingUp}
          trend={<span className="text-muted-foreground">Across all categories</span>}
        />
      </div>

      {/* Detailed Content */}
      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="metrics" data-testid="tab-metrics">Metrics</TabsTrigger>
          <TabsTrigger value="goals" data-testid="tab-goals">Goals</TabsTrigger>
          <TabsTrigger value="milestones" data-testid="tab-milestones">Milestones</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsMetricDialogOpen(true)}
              data-testid="button-add-metric"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Metric
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Progress Metrics by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryAverages.map(({ category, average }) => (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm text-muted-foreground">
                        {average.toFixed(1)}/10
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-2 h-2 rounded-full transition-all"
                        style={{ width: `${(average / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          {personGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {personGoals.map((goal) => (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg mb-1">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Category</span>
                        <span className="text-sm font-medium">{goal.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Target Date</span>
                        <span className="text-sm font-medium">
                          {format(new Date(goal.targetDate), 'MMM d, yyyy')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No goals set yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <div className="flex justify-end">
            <Button
              onClick={() => setIsMilestoneDialogOpen(true)}
              data-testid="button-add-milestone"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Milestone
            </Button>
          </div>
          {milestones.length > 0 ? (
            <Card>
              <CardContent className="p-6">
                <div className="relative space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            milestone.completed
                              ? 'bg-primary border-primary'
                              : 'bg-background border-muted-foreground'
                          }`}
                        />
                        {index < milestones.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-2" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold">{milestone.title}</h4>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(milestone.date), 'MMM d, yyyy')}
                          </span>
                        </div>
                        {milestone.description && (
                          <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No milestones tracked yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {personId && (
        <>
          <MetricDialog
            open={isMetricDialogOpen}
            onOpenChange={setIsMetricDialogOpen}
            personId={personId}
          />
          <MilestoneDialog
            open={isMilestoneDialogOpen}
            onOpenChange={setIsMilestoneDialogOpen}
            personId={personId}
          />
        </>
      )}
    </div>
  );
}
