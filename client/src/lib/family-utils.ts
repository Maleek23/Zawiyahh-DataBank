import { Person, FamilyRelationship } from "@shared/schema";

/**
 * Extract last name from full name
 */
export function getLastName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1];
}

/**
 * Group people by last name
 */
export function groupByLastName(people: Person[]): Map<string, Person[]> {
  const groups = new Map<string, Person[]>();
  
  people.forEach(person => {
    const lastName = getLastName(person.name);
    if (!groups.has(lastName)) {
      groups.set(lastName, []);
    }
    groups.get(lastName)!.push(person);
  });
  
  return groups;
}

/**
 * Find people with matching last names who aren't connected
 */
export function findUnconnectedFamilyMembers(
  people: Person[],
  relationships: FamilyRelationship[]
): Map<string, Person[]> {
  // Create a set of all existing connections (both directions)
  const connections = new Set<string>();
  relationships.forEach(rel => {
    connections.add(`${rel.personId}-${rel.relatedPersonId}`);
    connections.add(`${rel.relatedPersonId}-${rel.personId}`);
  });
  
  // Group by last name
  const familyGroups = groupByLastName(people);
  
  // Filter to only show groups with 2+ people who have unconnected members
  const unconnectedGroups = new Map<string, Person[]>();
  
  familyGroups.forEach((members, lastName) => {
    if (members.length < 2) return; // Skip single-person surnames
    
    // Check if there are any unconnected pairs in this family
    let hasUnconnected = false;
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const person1 = members[i];
        const person2 = members[j];
        const key = `${person1.id}-${person2.id}`;
        if (!connections.has(key)) {
          hasUnconnected = true;
          break;
        }
      }
      if (hasUnconnected) break;
    }
    
    if (hasUnconnected) {
      unconnectedGroups.set(lastName, members);
    }
  });
  
  return unconnectedGroups;
}

/**
 * Check if two people are already connected
 */
export function areConnected(
  person1Id: string,
  person2Id: string,
  relationships: FamilyRelationship[]
): boolean {
  return relationships.some(
    rel =>
      (rel.personId === person1Id && rel.relatedPersonId === person2Id) ||
      (rel.personId === person2Id && rel.relatedPersonId === person1Id)
  );
}

/**
 * Get suggested relationships for a person based on matching last names
 */
export function getSuggestedConnections(
  person: Person,
  allPeople: Person[],
  relationships: FamilyRelationship[]
): Person[] {
  const personLastName = getLastName(person.name);
  
  return allPeople.filter(other => {
    if (other.id === person.id) return false;
    if (areConnected(person.id, other.id, relationships)) return false;
    
    const otherLastName = getLastName(other.name);
    return personLastName.toLowerCase() === otherLastName.toLowerCase();
  });
}
