import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

interface ShortcutCardProps {
  title: string;
  description?: string;
  shortcut: string;
  platform: string;
  appName?: string;
  tags?: string[];
}

const platformIcons = {
  mac: "🍎",
  windows: "🪟", 
  linux: "🐧"
};

const appIcons = {
  vscode: "⚡",
  figma: "🎨",
  chrome: "🌐",
  default: "📱"
};

export const ShortcutCard = ({ 
  title, 
  description, 
  shortcut, 
  platform, 
  appName, 
  tags 
}: ShortcutCardProps) => {
  const platformIcon = platformIcons[platform as keyof typeof platformIcons] || "💻";
  const appIcon = appName ? (appIcons[appName as keyof typeof appIcons] || appIcons.default) : null;

  return (
    <Card className="shortcut-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              <span className="text-2xl">{platformIcon}</span>
              {appIcon && <span className="text-xl">{appIcon}</span>}
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-col gap-3">
          <div className="kbd text-sm font-mono bg-secondary/50 border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
            {shortcut}
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs capitalize">
              {platform}
            </Badge>
            {appName && (
              <Badge variant="outline" className="text-xs capitalize">
                {appName}
              </Badge>
            )}
            {tags?.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs opacity-70">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};