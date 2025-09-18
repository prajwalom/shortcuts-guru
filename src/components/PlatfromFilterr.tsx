import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface PlatformFilterProps {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  selectedApps: string[];
  onAppChange: (apps: string[]) => void;
}

const platforms = [
  { id: 'mac', name: 'macOS', icon: '🍎' },
  { id: 'windows', name: 'Windows', icon: '🪟' },
  { id: 'linux', name: 'Linux', icon: '🐧' }
];

const categories = [
  { id: 'os', name: 'Operating System', icon: '💻' },
  { id: 'app', name: 'Applications', icon: '📱' }
];

const apps = [
  { id: 'vscode', name: 'VS Code', icon: '⚡' },
  { id: 'figma', name: 'Figma', icon: '🎨' },
  { id: 'chrome', name: 'Chrome', icon: '🌐' },
  { id: 'slack', name: 'Slack', icon: '💬' },
  { id: 'notion', name: 'Notion', icon: '📝' }
];

export const PlatformFilter = ({ 
  selectedPlatforms, 
  onPlatformChange,
  selectedCategories,
  onCategoryChange,
  selectedApps,
  onAppChange
}: PlatformFilterProps) => {
  
  const togglePlatform = (platformId: string) => {
    const updated = selectedPlatforms.includes(platformId)
      ? selectedPlatforms.filter(p => p !== platformId)
      : [...selectedPlatforms, platformId];
    onPlatformChange(updated);
  };

  const toggleCategory = (categoryId: string) => {
    const updated = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updated);
  };

  const toggleApp = (appId: string) => {
    const updated = selectedApps.includes(appId)
      ? selectedApps.filter(a => a !== appId)
      : [...selectedApps, appId];
    onAppChange(updated);
  };

  const clearAll = () => {
    onPlatformChange([]);
    onCategoryChange([]);
    onAppChange([]);
  };

  const hasActiveFilters = selectedPlatforms.length > 0 || selectedCategories.length > 0 || selectedApps.length > 0;

  return (
    <div className="space-y-6 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border/50">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Platform</h4>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform) => (
              <Button
                key={platform.id}
                variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePlatform(platform.id)}
                className="flex items-center gap-2"
              >
                <span>{platform.icon}</span>
                {platform.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category.id)}
                className="flex items-center gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Applications</h4>
          <div className="flex flex-wrap gap-2">
            {apps.map((app) => (
              <Button
                key={app.id}
                variant={selectedApps.includes(app.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleApp(app.id)}
                className="flex items-center gap-2"
              >
                <span>{app.icon}</span>
                {app.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="pt-4 border-t border-border/30">
          <div className="flex flex-wrap gap-1">
            {selectedPlatforms.map(p => (
              <Badge key={p} variant="secondary" className="text-xs">
                {platforms.find(pl => pl.id === p)?.name}
              </Badge>
            ))}
            {selectedCategories.map(c => (
              <Badge key={c} variant="secondary" className="text-xs">
                {categories.find(cat => cat.id === c)?.name}
              </Badge>
            ))}
            {selectedApps.map(a => (
              <Badge key={a} variant="secondary" className="text-xs">
                {apps.find(app => app.id === a)?.name}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};