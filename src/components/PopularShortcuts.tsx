import { TrendingUp, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const popularShortcuts = [
  {
    id: 1,
    title: "Copy",
    shortcut: "Ctrl+C / ⌘C",
    description: "Copy selected text or item",
    platform: "Universal",
    usage: "98%"
  },
  {
    id: 2,
    title: "Paste",
    shortcut: "Ctrl+V / ⌘V", 
    description: "Paste copied content",
    platform: "Universal",
    usage: "95%"
  },
  {
    id: 3,
    title: "Undo",
    shortcut: "Ctrl+Z / ⌘Z",
    description: "Undo last action",
    platform: "Universal", 
    usage: "89%"
  },
  {
    id: 4,
    title: "Save",
    shortcut: "Ctrl+S / ⌘S",
    description: "Save current document",
    platform: "Universal",
    usage: "87%"
  },
  {
    id: 5,
    title: "Find",
    shortcut: "Ctrl+F / ⌘F",
    description: "Search within page or document",
    platform: "Universal",
    usage: "82%"
  }
];

export const PopularShortcuts = () => {
  return (
    <Card className="bg-gradient-subtle border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Most Popular Shortcuts
        </CardTitle>
        <CardDescription>
          The keyboard shortcuts everyone should know
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {popularShortcuts.map((shortcut) => (
          <div
            key={shortcut.id}
            className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors duration-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-foreground">{shortcut.title}</h4>
                <Badge variant="outline" className="text-xs">
                  {shortcut.platform}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {shortcut.description}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs text-primary">
                <Star className="w-3 h-3 fill-current" />
                {shortcut.usage}
              </div>
              <Badge variant="secondary" className="font-mono text-xs">
                {shortcut.shortcut}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};