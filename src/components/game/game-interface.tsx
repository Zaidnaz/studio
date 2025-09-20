"use client";

import { useState, useEffect } from "react";
import type { GenerateDilemmaScenarioOutput } from "@/ai/flows/generate-dilemma-scenarios";
import DilemmaDisplay from "./dilemma-display";
import DebateFeed from "./debate-feed";
import PlayerInput from "./player-input";
import AiTools from "./ai-tools";
import { Button } from "@/components/ui/button";

interface GameInterfaceProps {
  dilemma: GenerateDilemmaScenarioOutput;
  onEndGame: () => void;
}

export interface DebateMessage {
  speaker: string;
  message: string;
  timestamp: string;
}

export default function GameInterface({ dilemma, onEndGame }: GameInterfaceProps) {
  const [debate, setDebate] = useState<DebateMessage[]>([]);

  useEffect(() => {
    // Announce the dilemma when the game starts
    setDebate([
      {
        speaker: "Moderator",
        message: dilemma.scenario,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, [dilemma]);

  const handleNewTranscript = (transcript: string) => {
    if (transcript.trim()) {
      const newMessage: DebateMessage = {
        speaker: `Player ${Math.floor(Math.random() * 4) + 1}`, // Simulate different players
        message: transcript,
        timestamp: new Date().toLocaleTimeString(),
      };
      setDebate((prev) => [...prev, newMessage]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-6 overflow-hidden">
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2">
          <DilemmaDisplay scenario={dilemma.scenario} />
          <DebateFeed messages={debate} />
        </div>
        <aside className="lg:col-span-2 flex flex-col gap-6 overflow-y-auto">
          <AiTools dilemmaDescription={dilemma.scenario} />
        </aside>
      </div>

      <footer className="mt-6 flex-shrink-0">
         <PlayerInput onTranscript={handleNewTranscript} />
         <div className="text-center mt-4">
            <Button size="lg" variant="default" onClick={onEndGame}>Resolve Dilemma</Button>
            <p className="text-xs text-muted-foreground mt-2">When your team has reached a consensus, resolve the dilemma.</p>
         </div>
      </footer>
    </div>
  );
}
