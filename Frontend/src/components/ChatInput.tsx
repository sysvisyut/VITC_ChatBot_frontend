import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 backdrop-blur-md bg-background/95 border-t border-border shadow-medium p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about VIT Chennai..."
              disabled={disabled}
              className="resize-none min-h-[56px] max-h-[200px] pr-12 py-4 text-sm bg-card border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-2xl shadow-soft transition-all"
              rows={1}
            />
            {input.length > 0 && (
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                {input.length}
              </div>
            )}
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            size="lg"
            className="h-14 w-14 rounded-2xl shadow-glow hover:shadow-glow hover:scale-105 transition-all bg-gradient-primary"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};
