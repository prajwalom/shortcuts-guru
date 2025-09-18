import { useState } from "react";
import { Keyboard, TrendingUp, Users, Zap } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { ShortcutCard } from "../components/ShortcutCard";
import { PlatformFilter } from "../components/PlatfromFilterr";
import { FloatingAIAssistant } from "../components/FloatingAIAssistant";
import { PopularShortcuts } from "../components/PopularShortcuts";
import { QuickCategories } from "../components/QuickCategories";
import { StatsOverview } from "../components/StatsOverview";
import { useShortcuts } from "../hooks/useShortcuts";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const { shortcuts, loading, error } = useShortcuts({
    searchQuery,
    platforms: selectedPlatforms,
    categories: selectedCategories,
    apps: selectedApps
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategories([category]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen">
      
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-background/50">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-primary/10 border-primary/20 text-primary hover:bg-primary/20">
                <Zap className="w-3 h-3 mr-1" />
                Powered by AI
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Master Every{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Keyboard Shortcut
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover, learn, and master keyboard shortcuts for macOS, Windows, Linux, 
                VS Code, Figma, and hundreds of other applications. Boost your productivity 
                with AI-powered search.
              </p>
            </div>

            <div className="mt-12">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Search shortcuts... (e.g., copy, paste, screenshot, vs code terminal)"
              />
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground mt-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>1000+ Shortcuts</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>All Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-primary" />
                <span>AI Assistant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="container mx-auto px-4 py-8">
        <StatsOverview />
      </section>

      
      <section className="container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <QuickCategories onCategorySelect={handleCategorySelect} />
          <PopularShortcuts />
        </div>
      </section>

     
      <section className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <div className="lg:col-span-1">
            <PlatformFilter
              selectedPlatforms={selectedPlatforms}
              onPlatformChange={setSelectedPlatforms}
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              selectedApps={selectedApps}
              onAppChange={setSelectedApps}
            />
          </div>

          
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">
                  {searchQuery ? `Results for "${searchQuery}"` : 'All Shortcuts'}
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {loading ? 'Loading...' : `${shortcuts.length} shortcuts`}
                </Badge>
              </div>

              {error && (
                <div className="text-center py-8">
                  <p className="text-destructive">Error loading shortcuts: {error}</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-32 bg-muted rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : shortcuts.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <Keyboard className="w-16 h-16 text-muted-foreground mx-auto opacity-50" />
                  <h3 className="text-xl font-medium">No shortcuts found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters, or use the floating AI assistant for help!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                  {shortcuts.map((shortcut) => (
                    <ShortcutCard
                      key={shortcut.id}
                      title={shortcut.title}
                      description={shortcut.description ?? undefined}
                      shortcut={shortcut.shortcut_key}
                      platform={shortcut.platform}
                      appName={shortcut.app_name ?? undefined}
                      tags={shortcut.tags ?? undefined}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <FloatingAIAssistant />
    </div>
  );
};

export default Index;