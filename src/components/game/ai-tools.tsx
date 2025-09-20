
"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getExpertInsightAction } from "@/app/actions";
import { BrainCircuit, Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface AiToolsProps {
  dilemmaDescription: string;
}

export default function AiTools({ dilemmaDescription }: AiToolsProps) {
  const { toast } = useToast();

  const [expertQuery, setExpertQuery] = useState("");
  const [isConsultingExpert, setIsConsultingExpert] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const handleConsultExpert = async () => {
    if (!expertQuery.trim()) {
      toast({
        title: "Query is empty",
        description: "Please enter a question for the expert.",
      });
      return;
    }
    setIsConsultingExpert(true);
    const result = await getExpertInsightAction({
      dilemmaDescription,
      playerQuery: expertQuery,
    });
    if (result.success && result.data) {
      setInsights((prev) => [...prev, result.data.expertInsight]);
      setExpertQuery("");
    } else {
      toast({
        variant: "destructive",
        title: "Expert Consultation Failed",
        description: result.error,
      });
    }
    setIsConsultingExpert(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit />
          AI Expert
        </CardTitle>
        <CardDescription>
          Ask for a strategic insight on the dilemma.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Ask the AI expert for insights..."
            value={expertQuery}
            onChange={(e) => setExpertQuery(e.target.value)}
            disabled={isConsultingExpert}
          />
          <Button
            onClick={handleConsultExpert}
            disabled={isConsultingExpert}
            className="w-full"
          >
            {isConsultingExpert && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Consult
          </Button>
        </div>
        <ScrollArea className="flex-grow rounded-md border p-4 min-h-[200px]">
          <div className="space-y-4">
            {isConsultingExpert && insights.length === 0 && (
              <Skeleton className="w-full h-20" />
            )}
            {insights
              .slice()
              .reverse()
              .map((insight, index) => (
                <Card key={index} className="bg-secondary/50">
                  <CardContent className="p-4">
                    <p>{insight}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
          {insights.length === 0 && !isConsultingExpert && (
            <div className="text-center text-muted-foreground py-10">
              No insights requested yet.
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
