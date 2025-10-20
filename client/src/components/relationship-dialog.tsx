import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { insertFamilyRelationshipSchema, RELATIONSHIP_TYPES, Person, FamilyRelationship } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getLastName, getSuggestedConnections } from "@/lib/family-utils";

const formSchema = insertFamilyRelationshipSchema;

type FormData = z.infer<typeof formSchema>;

interface RelationshipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preselectedPersonId?: string;
}

export function RelationshipDialog({ open, onOpenChange, preselectedPersonId }: RelationshipDialogProps) {
  const { toast } = useToast();

  const { data: people = [] } = useQuery<Person[]>({
    queryKey: ["/api/people"],
  });

  const { data: relationships = [] } = useQuery<FamilyRelationship[]>({
    queryKey: ["/api/family-relationships"],
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personId: "",
      relatedPersonId: "",
      relationshipType: "Parent",
    },
  });

  // Pre-select person if provided
  useEffect(() => {
    if (preselectedPersonId && open) {
      form.setValue("personId", preselectedPersonId);
    }
  }, [preselectedPersonId, open, form]);

  const selectedPersonId = form.watch("personId");
  const selectedPerson = people.find(p => p.id === selectedPersonId);
  
  // Get suggested connections for the selected person
  const suggestedConnections = selectedPerson 
    ? getSuggestedConnections(selectedPerson, people, relationships)
    : [];

  const createMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("POST", "/api/family-relationships", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/family-relationships"] });
      toast({
        title: "Success",
        description: "Family relationship created successfully",
      });
      onOpenChange(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.personId === data.relatedPersonId) {
      toast({
        title: "Error",
        description: "Cannot create relationship with the same person",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Family Relationship</DialogTitle>
          <DialogDescription>
            Connect family members to build your family tree
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="personId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-relationship-person">
                        <SelectValue placeholder="Select person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {people.map((person) => (
                        <SelectItem key={person.id} value={person.id}>
                          {person.name} ({person.role})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relationshipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship Type *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-relationship-type">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {RELATIONSHIP_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="relatedPersonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Related To *</FormLabel>
                  {suggestedConnections.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 text-xs text-primary">
                      <Sparkles className="h-3 w-3" />
                      <span>
                        {suggestedConnections.length} suggested {suggestedConnections.length === 1 ? 'match' : 'matches'} with matching last name
                      </span>
                    </div>
                  )}
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger data-testid="select-relationship-related-person">
                        <SelectValue placeholder="Select related person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedPersonId && suggestedConnections.length > 0 && (
                        <>
                          {suggestedConnections.map((person) => (
                            <SelectItem 
                              key={person.id} 
                              value={person.id}
                              className="bg-primary/5"
                            >
                              <div className="flex items-center gap-2">
                                {person.name} ({person.role})
                                <Badge className="ml-auto bg-primary/20 text-primary border-primary/30 text-xs">
                                  {getLastName(person.name)}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                          <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                            Other People
                          </div>
                        </>
                      )}
                      {people
                        .filter(p => p.id !== selectedPersonId && !suggestedConnections.find(s => s.id === p.id))
                        .map((person) => (
                          <SelectItem key={person.id} value={person.id}>
                            {person.name} ({person.role})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-relationship-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || people.length < 2}
                data-testid="button-relationship-submit"
              >
                {createMutation.isPending ? "Creating..." : "Create Relationship"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
