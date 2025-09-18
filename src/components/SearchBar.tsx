import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  onSearch, 
  placeholder = "Search shortcuts... (e.g., copy, paste, screenshot)" 
}: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="search-input w-full pl-12 pr-4 py-6 text-lg bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-300"
          />
          <Button
            type="submit"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>
        
        
        <div className="absolute inset-0 -z-10 bg-gradient-primary opacity-0 group-focus-within:opacity-20 blur-xl transition-opacity duration-300 rounded-lg" />
      </form>
      
      <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
        <span>Try: "copy paste", "screenshot", "vs code terminal"</span>
        <span className="text-primary">•</span>
        <span>Press Enter to search</span>
      </div>
    </div>
  );
};