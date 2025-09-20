"use client";

import GameProvider from "@/components/game/game-provider";
import { DilemmaDynamicsLogo } from "@/components/dilemma-dynamics-logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <GameProvider>
      {({ gameState, handleRestart }) => (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          <header className="sticky top-0 z-10 p-4 border-b bg-background/80 backdrop-blur-sm border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DilemmaDynamicsLogo className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold font-headline">
                Dilemma Dynamics
              </h1>
            </div>
            <div className="flex items-center gap-2">
              {gameState !== "setup" && (
                <button
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  onClick={handleRestart}
                >
                  New Game
                </button>
              )}
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4 md:p-8">
            <h1 className="sr-only">Dilemma Dynamics Game</h1>
          </main>
        </div>
      )}
    </GameProvider>
  );
}
