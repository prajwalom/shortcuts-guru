import { useState, useEffect } from "react";
import { Sparkles} from "lucide-react";
import { Button } from "../components/ui/button";
import { AIChatDialog } from "../components/AIChatDialog";

export const FloatingAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!isVisible) return null;

  return (
    <>
    
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-elegant transition-all duration-300 hover:scale-105"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </Button>
        
       
        <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs text-muted-foreground">
            AI Assistant
          </p>
          <p className="text-xs text-primary font-medium">
            Press ⌘K
          </p>
        </div>
      </div>

      <AIChatDialog
        open={isOpen}
        onOpenChange={setIsOpen}
      />
    </>
  );
};