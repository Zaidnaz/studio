"use client";

import { useState, useEffect } from "react";
import type { GenerateDilemmaScenarioOutput } from "@/ai/flows/generate-dilemma-scenarios";
import DilemmaDisplay from "./dilemma-display";
import DebateFeed from "./debate-feed";
import PlayerInput from "./player-input";
import AiTools from "./ai-tools";
import { Button } from "@/components/ui/button";
import { getAIPlayerResponseAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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
  const [isAiThinking, setIsAiThinking] = useState(false);
  const { toast } = useToast();


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

  const handleNewTranscript = async (transcript: string) => {
    if (transcript.trim()) {
      const userMessage: DebateMessage = {
        speaker: `You`,
        message: transcript,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      const newDebate = [...debate, userMessage];
      setDebate(newDebate);
      setIsAiThinking(true);

      const debateHistory = newDebate.map(
        (msg) => `${msg.speaker}: ${msg.message}`
      );

      const result = await getAIPlayerResponseAction({
        dilemmaDescription: dilemma.scenario,
        playerArgument: transcript,
        debateHistory,
      });

      if (result.success && result.data) {
        const aiMessage: DebateMessage = {
          speaker: "Player 1",
          message: result.data.playerResponse,
          timestamp: new Date().toLocaleTimeString(),
        }
        setDebate(prev => [...prev, aiMessage]);
      } else {
        toast({
          variant: "destructive",
          title: "AI Player Error",
          description: result.error,
        });
        // If AI fails, revert adding the user's message to avoid confusion
        setDebate(debate);
      }
      setIsAiThinking(false);

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
         <PlayerInput onTranscript={handleNewTranscript} disabled={isAiThinking} />
         {isAiThinking && (
            <div className="flex items-center justify-center text-sm text-muted-foreground mt-2">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Player 1 is thinking...
            </div>
          )}
         <div className="text-center mt-4">
            <Button size="lg" variant="default" onClick={onEndGame} disabled={isAiThinking}>Resolve Dilemma</Button>
            <p className="text-xs text-muted-foreground mt-2">When your team has reached a consensus, resolve the dilemma.</p>
         </div>
      </footer>
    </div>
  );
}
