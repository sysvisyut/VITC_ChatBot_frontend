import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";

interface HeaderProps {
  onNewChat: () => void;
}

export const Header = ({ onNewChat }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-primary-foreground">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">VIT Chennai AI Assistant</h1>
              <p className="text-sm text-muted-foreground">Your smart college companion</p>
            </div>
          </div>
          
          <Button
            onClick={onNewChat}
            variant="outline"
            size="sm"
            className="gap-2 hover-lift"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>
    </header>
  );
};
