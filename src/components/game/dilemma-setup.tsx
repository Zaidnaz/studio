"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getDilemmaAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { GenerateDilemmaScenarioOutput } from "@/ai/flows/generate-dilemma-scenarios";
import { useToast } from "@/hooks/use-toast";

type Difficulty = "easy" | "medium" | "hard";

interface DilemmaSetupProps {
  onGameStart: (dilemma: GenerateDilemmaScenarioOutput) => void;
}

export default function DilemmaSetup({ onGameStart }: DilemmaSetupProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleStart = async () => {
    setIsLoading(true);
    const result = await getDilemmaAction({ difficulty });
    if (result.success && result.data) {
      onGameStart(result.data);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline">
            Welcome to the Dilemma Room
          </CardTitle>
          <CardDescription>
            An AI-powered collaborative challenge. Select a difficulty to begin.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            defaultValue={difficulty}
            onValueChange={(value: Difficulty) => setDifficulty(value)}
            className="grid grid-cols-3 gap-4"
            disabled={isLoading}
          >
            <div>
              <RadioGroupItem value="easy" id="easy" className="sr-only" />
              <Label
                htmlFor="easy"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                Easy
              </Label>
            </div>
            <div>
              <RadioGroupItem value="medium" id="medium" className="sr-only" />
              <Label
                htmlFor="medium"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                Medium
              </Label>
            </div>
            <div>
              <RadioGroupItem value="hard" id="hard" className="sr-only" />
              <Label
                htmlFor="hard"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                Hard
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            onClick={handleStart}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating Scenario..." : "Start Session"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
