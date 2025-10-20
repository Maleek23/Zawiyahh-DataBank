import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: ReactNode;
  className?: string;
}

export function MetricCard({ title, value, icon: Icon, trend, className = "" }: MetricCardProps) {
  return (
    <Card className={`hover-elevate transition-all border-border/50 group ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {title}
        </CardTitle>
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-mono font-bold mb-2 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent" data-testid={`metric-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </div>
        {trend && <div className="text-sm">{trend}</div>}
      </CardContent>
    </Card>
  );
}
