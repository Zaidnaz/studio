
"use client";
import { useState } from "react";
import Image from "next/image";
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
import { getExpertInsightAction, getVisualAidAction } from "@/app/actions";
import { BrainCircuit, Image as ImageIcon, Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface AiToolsProps {
  dilemmaDescription: string;
}

export default function AiTools({ dilemmaDescription }: AiToolsProps) {
  const { toast } = useToast();

  const [expertQuery, setExpertQuery] = useState("");
  const [isConsultingExpert, setIsConsultingExpert] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const [visualAidDesc, setVisualAidDesc] = useState("");
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [visualAidUrl, setVisualAidUrl] = useState("");

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

  const handleGenerateVisual = async () => {
    if (!visualAidDesc.trim()) {
      toast({
        title: "Description is empty",
        description: "Please enter a description for the visual aid.",
      });
      return;
    }
    setIsGeneratingVisual(true);
    setVisualAidUrl("");
    const result = await getVisualAidAction({ description: visualAidDesc });
    if (result.success && result.data) {
      setVisualAidUrl(result.data.imageDataUri);
    } else {
      toast({
        variant: "destructive",
        title: "Visual Aid Generation Failed",
        description: result.error,
      });
    }
    setIsGeneratingVisual(false);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>AI Tools</CardTitle>
        <CardDescription>
          Use AI to help you solve the dilemma.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Tabs defaultValue="expert" className="flex flex-col flex-grow">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expert">
              <BrainCircuit className="mr-2 h-4 w-4" />
              Consult Expert
            </TabsTrigger>
            <TabsTrigger value="visualizer">
              <ImageIcon className="mr-2 h-4 w-4" />
              Visual Aid
            </TabsTrigger>
          </TabsList>
          <TabsContent value="expert" className="flex-grow flex flex-col gap-4 mt-4">
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
          </TabsContent>
          <TabsContent value="visualizer" className="flex-grow flex flex-col gap-4 mt-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Describe the visual aid you want to generate..."
                value={visualAidDesc}
                onChange={(e) => setVisualAidDesc(e.target.value)}
                disabled={isGeneratingVisual}
              />
              <Button
                onClick={handleGenerateVisual}
                disabled={isGeneratingVisual}
                className="w-full"
              >
                {isGeneratingVisual && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Generate Image
              </Button>
            </div>
            <div className="flex-grow rounded-md border p-4 flex items-center justify-center bg-secondary/20 min-h-[200px]">
              {isGeneratingVisual ? (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <p>Generating your visual aid...</p>
                </div>
              ) : visualAidUrl ? (
                <Image
                  src={visualAidUrl}
                  alt="Generated visual aid"
                  width={400}
                  height={400}
                  className="rounded-md object-contain max-h-full max-w-full"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  Your generated image will appear here.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
