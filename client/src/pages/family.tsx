import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Plus, Network, TrendingUp, Sparkles, Link as LinkIcon } from "lucide-react";
import { Person, FamilyRelationship } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProgressBadge } from "@/components/progress-badge";
import { RelationshipDialog } from "@/components/relationship-dialog";
import { findUnconnectedFamilyMembers, getLastName } from "@/lib/family-utils";
import { Badge } from "@/components/ui/badge";

export default function Family() {
  const [isRelationshipDialogOpen, setIsRelationshipDialogOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<string | undefined>();
  
  const { data: people = [], isLoading } = useQuery<Person[]>({
    queryKey: ["/api/people"],
  });

  const { data: relationships = [] } = useQuery<FamilyRelationship[]>({
    queryKey: ["/api/family-relationships"],
  });

  // Find unconnected people with matching last names
  const suggestedFamilies = findUnconnectedFamilyMembers(people, relationships);

  const getRelatedPeople = (personId: string) => {
    return relationships
      .filter(r => r.personId === personId || r.relatedPersonId === personId)
      .map(r => {
        const relatedId = r.personId === personId ? r.relatedPersonId : r.personId;
        const person = people.find(p => p.id === relatedId);
        return {
          person,
          relationship: r.relationshipType,
        };
      })
      .filter(r => r.person);
  };

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-96 bg-muted rounded-2xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Family Tree</h1>
          <p className="text-muted-foreground text-lg">
            Visualize and manage family connections and collective progress
          </p>
        </div>
        <Button
          onClick={() => setIsRelationshipDialogOpen(true)}
          size="lg"
          disabled={people.length < 2}
          data-testid="button-add-relationship"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Relationship
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Members</p>
                <p className="text-3xl font-mono font-bold">{people.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Connections</p>
                <p className="text-3xl font-mono font-bold">{relationships.length}</p>
              </div>
              <Network className="h-8 w-8 text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Progress</p>
                <p className="text-3xl font-mono font-bold">
                  {people.length > 0 ? Math.round(people.reduce((sum, p) => {
                    const levels = ["Bad", "Poor", "Average", "Good", "Great", "Excellent", "Elite", "Elite+", "Elite++"];
                    return sum + levels.indexOf(p.progressLevel);
                  }, 0) / people.length) : 0}/8
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-chart-3" />
            </div>
          </CardContent>
        </Card>
      </div>

      {people.length > 0 ? (
        <div className="space-y-8">
          {/* Suggested Connections */}
          {suggestedFamilies.size > 0 && (
            <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-chart-2/5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Suggested Family Connections</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      People with matching last names who aren't connected yet
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(suggestedFamilies.entries()).map(([lastName, members]) => (
                    <div key={lastName} className="p-4 rounded-xl border border-border/50 bg-card/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge className="bg-primary/20 text-primary border-primary/30 font-semibold">
                            {lastName} Family
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {members.length} {members.length === 1 ? 'member' : 'members'}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedPerson(members[0].id);
                            setIsRelationshipDialogOpen(true);
                          }}
                          data-testid={`button-connect-${lastName}`}
                        >
                          <LinkIcon className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {members.map(person => (
                          <div key={person.id} className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/5 text-primary font-semibold text-sm">
                                {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{person.name}</p>
                              <p className="text-xs text-muted-foreground truncate">{person.role}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Family Network Visualization */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Family Network</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {people.map((person) => {
                  const relatedPeople = getRelatedPeople(person.id);
                  return (
                    <Card key={person.id} className="hover-elevate transition-all">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-14 w-14">
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                              {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg truncate">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.role}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <ProgressBadge level={person.progressLevel} />
                        </div>

                        {relatedPeople.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Connections:</p>
                            {relatedPeople.map((rel, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm">
                                <span className="text-xs bg-muted px-2 py-1 rounded">
                                  {rel.relationship}
                                </span>
                                <span className="truncate">{rel.person?.name}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {relatedPeople.length === 0 && (
                          <p className="text-sm text-muted-foreground">No connections yet</p>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Add Family Relationships</h3>
                  <p className="text-sm text-muted-foreground">
                    Family relationships can be added through the API to connect family members and visualize your family tree.
                    This feature helps track collective progress and generational achievements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <EmptyState
          icon={Users}
          title="No family members yet"
          description="Add personal profiles to start building your family tree and tracking collective progress."
          actionLabel="Add First Profile"
          onAction={() => window.location.href = '/personal'}
        />
      )}

      <RelationshipDialog
        open={isRelationshipDialogOpen}
        onOpenChange={setIsRelationshipDialogOpen}
        preselectedPersonId={selectedPerson}
      />
    </div>
  );
}
