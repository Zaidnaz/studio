
"use client";

import { useState } from "react";
import DilemmaSetup from "@/components/game/dilemma-setup";
import GameInterface from "@/components/game/game-interface";
import ResolutionScreen from "@/components/game/resolution-screen";
import type { GenerateDilemmaScenarioOutput } from "@/ai/flows/generate-dilemma-scenarios";
import { DilemmaDynamicsLogo } from "@/components/dilemma-dynamics-logo";
import { Button } from "@/components/ui/button";

type GameState = "setup" | "playing" | "resolved";
export type Difficulty = "easy" | "medium" | "hard";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [dilemma, setDilemma] =
    useState<GenerateDilemmaScenarioOutput | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [debateHistory, setDebateHistory] = useState<string[]>([]);

  const handleGameStart = (
    newDilemma: GenerateDilemmaScenarioOutput,
    selectedDifficulty: Difficulty
  ) => {
    setDilemma(newDilemma);
    setDifficulty(selectedDifficulty);
    setDebateHistory([`Moderator: ${newDilemma.scenario}`]);
    setGameState("playing");
  };

  const handleGameResolve = (finalDebate: string[]) => {
    setDebateHistory(finalDebate);
    setGameState("resolved");
  };

  const handleRestart = () => {
    setDilemma(null);
    setDifficulty(null);
    setDebateHistory([]);
    setGameState("setup");
  };

  const renderGameState = () => {
    switch (gameState) {
      case "setup":
        return <DilemmaSetup onGameStart={handleGameStart} />;
      case "playing":
        if (dilemma && difficulty) {
          return (
            <GameInterface
              dilemma={dilemma}
              difficulty={difficulty}
              onResolve={handleGameResolve}
              initialDebateHistory={debateHistory}
            />
          );
        }
        return null;
      case "resolved":
        if (dilemma) {
          return (
            <ResolutionScreen
              dilemma={dilemma.scenario}
              debateHistory={debateHistory}
              onRestart={handleRestart}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 p-4 border-b bg-background/80 backdrop-blur-sm border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <DilemmaDynamicsLogo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline">
            Dilemma Dynamics
          </h1>
        </div>
        {gameState !== "setup" && (
          <Button variant="ghost" onClick={handleRestart}>
            New Game
          </Button>
        )}
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderGameState()}
      </main>
    </div>
  );
}
