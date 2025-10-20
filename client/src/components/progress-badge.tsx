import { Badge } from "@/components/ui/badge";
import { PROGRESS_LEVELS } from "@shared/schema";

const LEVEL_COLORS: Record<string, string> = {
  "Bad": "bg-red-500/10 text-red-500 border-red-500/20",
  "Poor": "bg-orange-500/10 text-orange-500 border-orange-500/20",
  "Average": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  "Good": "bg-green-500/10 text-green-500 border-green-500/20",
  "Great": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  "Excellent": "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  "Elite": "bg-purple-500/10 text-purple-500 border-purple-500/20",
  "Elite+": "bg-purple-600/10 text-purple-600 border-purple-600/20",
  "Elite++": "bg-purple-700/10 text-purple-700 border-purple-700/20",
};

interface ProgressBadgeProps {
  level: string;
  className?: string;
}

export function ProgressBadge({ level, className = "" }: ProgressBadgeProps) {
  const colorClass = LEVEL_COLORS[level] || LEVEL_COLORS["Average"];
  
  return (
    <Badge
      variant="outline"
      className={`${colorClass} ${className}`}
      data-testid={`badge-progress-${level.toLowerCase()}`}
    >
      {level}
    </Badge>
  );
}

export function getProgressLevelIndex(level: string): number {
  return PROGRESS_LEVELS.indexOf(level as any);
}

export function getProgressPercentage(level: string): number {
  const index = getProgressLevelIndex(level);
  return ((index + 1) / PROGRESS_LEVELS.length) * 100;
}
