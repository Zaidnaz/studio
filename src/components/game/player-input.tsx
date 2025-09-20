"use client";

import { useEffect } from "react";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PlayerInputProps {
  onTranscript: (transcript: string) => void;
}

export default function PlayerInput({ onTranscript }: PlayerInputProps) {
  const { text, start, stop, isListening, hasSupport } = useSpeechRecognition();
  const { toast } = useToast();

  useEffect(() => {
    if (text) {
      onTranscript(text);
    }
  }, [text, onTranscript]);
  
  useEffect(() => {
    if (!hasSupport && typeof window !== 'undefined') {
        toast({
            variant: "destructive",
            title: "Browser Not Supported",
            description: "Speech recognition is not available in your browser. Please try Chrome or Edge."
        })
    }
  }, [hasSupport, toast])

  const handlePointerDown = () => {
    if (hasSupport) {
      start();
    }
  };

  const handlePointerUp = () => {
    if (hasSupport) {
      stop();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <button
        onMouseDown={handlePointerDown}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
        disabled={!hasSupport}
        className={cn(
          "relative flex items-center justify-center w-20 h-20 rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/50",
          isListening
            ? "bg-accent shadow-accent/50 shadow-[0_0_20px]"
            : "bg-primary hover:bg-primary/90",
            !hasSupport && "bg-muted cursor-not-allowed"
        )}
      >
        <Mic className="w-8 h-8 text-primary-foreground" />
        {isListening && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        )}
      </button>
      <p className="text-sm text-muted-foreground">
        {isListening ? "Listening..." : "Hold to Speak"}
      </p>
    </div>
  );
}
