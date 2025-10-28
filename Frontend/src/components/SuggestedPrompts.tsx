import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

const suggestions = [
  "What are the hostel facilities at VIT Chennai?",
  "Tell me about the placement process",
  "What clubs and organizations are available?",
  "How do I register for courses?",
  "What are the library timings?",
  "Explain the grading system",
];

export const SuggestedPrompts = ({ onSelectPrompt }: SuggestedPromptsProps) => {
  return (
    <div className="max-w-4xl mx-auto animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary shadow-glow mb-4">
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome to VIT Chennai AI Assistant
        </h2>
        <p className="text-muted-foreground text-lg">
          Ask me anything about VIT Chennai - I'm here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            onClick={() => onSelectPrompt(suggestion)}
            variant="outline"
            className="h-auto py-4 px-5 text-left justify-start hover-lift bg-card border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs text-primary font-semibold">?</span>
              </div>
              <span className="text-sm text-foreground leading-relaxed">
                {suggestion}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};
