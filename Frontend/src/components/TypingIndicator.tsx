export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <div className="bg-card border border-border rounded-2xl rounded-tl-md px-5 py-4 shadow-soft">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "0ms" }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "200ms" }} />
          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse-soft" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  );
};
