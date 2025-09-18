import { TrendingUp, Users, Zap, Target } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const stats = [
  {
    id: 1,
    title: "Total Shortcuts",
    value: "1,200+",
    icon: Zap,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: 2,
    title: "Applications",
    value: "150+",
    icon: Target,
    color: "text-green-500", 
    bgColor: "bg-green-500/10"
  },
  {
    id: 3,
    title: "Categories",
    value: "25+",
    icon: TrendingUp,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    id: 4,
    title: "Platforms",
    value: "5",
    icon: Users,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  }
];

export const StatsOverview = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.id} className="bg-gradient-subtle border-border/50 hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardContent className="flex items-center gap-3 p-4">
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};