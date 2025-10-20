import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { User, Plus, Search } from "lucide-react";
import { Person } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/empty-state";
import { ProgressBadge } from "@/components/progress-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { PersonDialog } from "@/components/person-dialog";
import { Link } from "wouter";

export default function Personal() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: people, isLoading } = useQuery<Person[]>({
    queryKey: ["/api/people"],
  });

  const filteredPeople = people?.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.profession?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Personal Profiles</h1>
          <p className="text-muted-foreground text-lg">
            Manage individual progress and achievements
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          size="lg"
          data-testid="button-add-person"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Profile
        </Button>
      </div>

      {people && people.length > 0 ? (
        <>
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-people"
            />
          </div>

          {/* People Grid */}
          {filteredPeople.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPeople.map((person) => (
                <Link key={person.id} href={`/personal/${person.id}`}>
                  <Card className="hover-elevate transition-all cursor-pointer h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                            {person.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg truncate" data-testid={`text-person-name-${person.id}`}>
                            {person.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {person.role}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Progress Level</span>
                          <ProgressBadge level={person.progressLevel} />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Age</span>
                          <span className="text-sm font-medium">{person.age} years</span>
                        </div>

                        {person.profession && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Profession</span>
                            <span className="text-sm font-medium truncate ml-2">{person.profession}</span>
                          </div>
                        )}

                        {person.location && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Location</span>
                            <span className="text-sm font-medium truncate ml-2">{person.location}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No profiles found matching "{searchQuery}"</p>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={User}
          title="No profiles yet"
          description="Create your first personal profile to start tracking progress, setting goals, and building your family tree."
          actionLabel="Add First Profile"
          onAction={() => setIsDialogOpen(true)}
        />
      )}

      <PersonDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
