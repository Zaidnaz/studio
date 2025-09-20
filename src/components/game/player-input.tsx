"use client";

import { useState, useEffect } from "react";
import { Send, Mic, MicOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface PlayerInputProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export default function PlayerInput({ onTranscript, disabled = false }: PlayerInputProps) {
  const [inputText, setInputText] = useState("");
  const {
    text: speechText,
    isListening,
    start: startSpeech,
    stop: stopSpeech,
    hasSupport,
  } = useSpeechRecognition();

  useEffect(() => {
    if (speechText) {
      setInputText(prev => prev ? `${prev} ${speechText}`: speechText);
    }
  }, [speechText]);


  const handleSubmit = () => {
    if (inputText.trim() && !disabled) {
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

  const handleMicClick = () => {
    if (isListening) {
      stopSpeech();
    } else {
      startSpeech();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="w-full max-w-lg flex items-center gap-2">
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or dictate your argument..."
          className="flex-grow resize-none"
          rows={2}
          disabled={disabled}
        />
        <div className="flex flex-col gap-2">
          {hasSupport && (
             <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleMicClick} size="icon" variant="outline" disabled={disabled}>
                    {isListening ? <MicOff className="h-4 w-4 text-destructive animate-pulse" /> : <Mic className="h-4 w-4" />}
                    <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isListening ? "Stop listening" : "Start listening"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <Button onClick={handleSubmit} size="icon" disabled={disabled}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Submit</span>
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Press Enter to send, Shift+Enter for a new line.
      </p>
    </div>
  );
}
