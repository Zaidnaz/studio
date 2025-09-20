"use client";

import { useState } from "react";
import DilemmaSetup from "@/components/game/dilemma-setup";
import GameInterface from "@/components/game/game-interface";
import type { GenerateDilemmaScenarioOutput } from "@/ai/flows/generate-dilemma-scenarios";
import { DilemmaDynamicsLogo } from "@/components/dilemma-dynamics-logo";
import { Button } from "@/components/ui/button";

type GameState = "setup" | "playing";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>("setup");
  const [dilemma, setDilemma] =
    useState<GenerateDilemmaScenarioOutput | null>(null);

  const handleGameStart = (newDilemma: GenerateDilemmaScenarioOutput) => {
    setDilemma(newDilemma);
    setGameState("playing");
  };

  const handleEndGame = () => {
    setDilemma(null);
    setGameState("setup");
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
        {gameState === "playing" && (
          <Button variant="ghost" onClick={handleEndGame}>
            End Session
          </Button>
        )}
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {gameState === "setup" && <DilemmaSetup onGameStart={handleGameStart} />}
        {gameState === "playing" && dilemma && (
          <GameInterface dilemma={dilemma} onEndGame={handleEndGame} />
        )}
      </main>
    </div>
  );
}
