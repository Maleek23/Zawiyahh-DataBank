import { Badge } from "@/components/ui/badge";
import { PROGRESS_LEVELS } from "@shared/schema";

const LEVEL_COLORS: Record<string, string> = {
  "Bad": "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 font-semibold",
  "Poor": "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30 font-semibold",
  "Average": "bg-yellow-500/15 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 font-semibold",
  "Good": "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30 font-semibold",
  "Great": "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 font-semibold",
  "Excellent": "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-semibold",
  "Elite": "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 font-semibold",
  "Elite+": "bg-purple-600/15 text-purple-700 dark:text-purple-300 border-purple-600/30 font-semibold",
  "Elite++": "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-700 dark:text-purple-300 border-purple-600/40 font-bold shadow-sm",
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
      className={`${colorClass} px-3 py-1 text-xs ${className}`}
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
