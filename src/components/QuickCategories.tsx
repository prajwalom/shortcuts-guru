import { Code, Palette, FileText, Camera, Globe, Terminal, Gamepad2, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const categories = [
  {
    id: 1,
    name: "Development",
    icon: Code,
    count: 156,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    id: 2,
    name: "Design",
    icon: Palette,
    count: 89,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    id: 3,
    name: "Productivity",
    icon: FileText,
    count: 134,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    id: 4,
    name: "Media",
    icon: Camera,
    count: 67,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    id: 5,
    name: "Browser",
    icon: Globe,
    count: 78,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    id: 6,
    name: "Terminal",
    icon: Terminal,
    count: 45,
    color: "text-gray-500",
    bgColor: "bg-gray-500/10"
  },
  {
    id: 7,
    name: "Gaming",
    icon: Gamepad2,
    count: 23,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  {
    id: 8,
    name: "Audio",
    icon: Music,
    count: 34,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  }
];

interface QuickCategoriesProps {
  onCategorySelect?: (category: string) => void;
}

export const QuickCategories = ({ onCategorySelect }: QuickCategoriesProps) => {
  return (
    <Card className="bg-gradient-subtle border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Browse by Category
        </CardTitle>
        <CardDescription>
          Find shortcuts organized by application type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect?.(category.name)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 hover:bg-card/80 transition-all duration-200 hover:scale-105 group"
              >
                <div className={`p-3 rounded-full ${category.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    {category.name}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {category.count} shortcuts
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};