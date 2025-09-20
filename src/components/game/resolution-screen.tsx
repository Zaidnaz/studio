
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { getResolutionAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface ResolutionScreenProps {
  dilemma: string;
  debateHistory: string[];
  onRestart: () => void;
}

export default function ResolutionScreen({
  dilemma,
  debateHistory,
  onRestart,
}: ResolutionScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [resolution, setResolution] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchResolution = async () => {
      setIsLoading(true);
      const result = await getResolutionAction({ dilemma, debateHistory });
      if (result.success && result.data) {
        setResolution(result.data.resolution);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to get resolution",
          description: result.error,
        });
        setResolution("Could not generate a resolution summary.");
      }
      setIsLoading(false);
    };

    fetchResolution();
  }, [dilemma, debateHistory, toast]);

  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center">
            Debate Resolved
          </CardTitle>
          <CardDescription className="text-center">
            Here is a summary of your debate and the resolution reached.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">
                Analyzing the debate and generating a conclusion...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">The Original Dilemma</h3>
                <p className="text-muted-foreground">{dilemma}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-primary">Resolution Summary</h3>
                <ScrollArea className="h-48 rounded-md border p-4">
                  <p className="whitespace-pre-wrap">{resolution}</p>
                </ScrollArea>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={onRestart}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Start a New Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
