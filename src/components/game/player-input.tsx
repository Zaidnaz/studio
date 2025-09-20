"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface PlayerInputProps {
  onTranscript: (transcript: string) => void;
}

export default function PlayerInput({ onTranscript }: PlayerInputProps) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (inputText.trim()) {
      onTranscript(inputText);
      setInputText("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-full max-w-lg flex items-center gap-2">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your argument..."
          className="flex-grow resize-none"
          rows={2}
        />
        <Button onClick={handleSubmit} size="icon">
          <Send className="h-4 w-4" />
          <span className="sr-only">Submit</span>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Press Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  );
}
