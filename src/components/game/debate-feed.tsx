"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { DebateMessage } from "./game-interface";
import { cn } from "@/lib/utils";
import { MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface DebateFeedProps {
  messages: DebateMessage[];
}

export default function DebateFeed({ messages }: DebateFeedProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <Card className="flex-grow flex flex-col">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Debate Feed
            </CardTitle>
        </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg animate-in fade-in-20 slide-in-from-bottom-2",
                msg.speaker === "Moderator" ? "bg-card" : "bg-secondary/50"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                {msg.speaker.charAt(0)}
                {msg.speaker.split(" ")[1] || ""}
              </div>
              <div className="flex-grow">
                <div className="flex items-baseline gap-2">
                  <p className="font-bold text-primary">{msg.speaker}</p>
                  <p className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </p>
                </div>
                <p className="text-foreground/90">{msg.message}</p>
              </div>
            </div>
          ))}
           {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              The debate feed is empty. Use the push-to-talk button to start the discussion.
            </div>
          )}
        </div>
      </ScrollArea>
      </CardContent>
    </Card>
  );
}
