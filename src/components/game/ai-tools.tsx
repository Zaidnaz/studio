"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getVisualAidAction, getExpertInsightAction } from "@/app/actions";
import { BrainCircuit, Image as ImageIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

interface AiToolsProps {
  dilemmaDescription: string;
}

export default function AiTools({ dilemmaDescription }: AiToolsProps) {
  const { toast } = useToast();
  
  const [visualPrompt, setVisualPrompt] = useState("");
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [visuals, setVisuals] = useState<string[]>([]);
  
  const [expertQuery, setExpertQuery] = useState("");
  const [isConsultingExpert, setIsConsultingExpert] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);

  const handleGenerateVisual = async () => {
    if (!visualPrompt.trim()) {
        toast({ title: "Prompt is empty", description: "Please describe the visual you want to generate."});
        return;
    }
    setIsGeneratingVisual(true);
    const result = await getVisualAidAction({ description: visualPrompt });
    if (result.success && result.data) {
      setVisuals((prev) => [...prev, result.data.imageDataUri]);
      setVisualPrompt("");
    } else {
      toast({
        variant: "destructive",
        title: "Visual Generation Failed",
        description: result.error,
      });
    }
    setIsGeneratingVisual(false);
  };
  
  const handleConsultExpert = async () => {
    if (!expertQuery.trim()) {
        toast({ title: "Query is empty", description: "Please enter a question for the expert."});
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
            <CardTitle>AI Assistant</CardTitle>
            <CardDescription>Leverage AI to gain an edge in your debate.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
            <Tabs defaultValue="visuals" className="flex-grow flex flex-col">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="visuals"><ImageIcon className="mr-2 h-4 w-4"/>Generate Visual</TabsTrigger>
                    <TabsTrigger value="expert"><BrainCircuit className="mr-2 h-4 w-4"/>Consult Expert</TabsTrigger>
                </TabsList>
                <TabsContent value="visuals" className="flex-grow flex flex-col gap-4 mt-4">
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Describe a scene or concept to visualize..."
                            value={visualPrompt}
                            onChange={(e) => setVisualPrompt(e.target.value)}
                            disabled={isGeneratingVisual}
                        />
                        <Button onClick={handleGenerateVisual} disabled={isGeneratingVisual} className="w-full">
                            {isGeneratingVisual && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate
                        </Button>
                    </div>
                    <ScrollArea className="flex-grow rounded-md border p-4">
                        <div className="grid grid-cols-2 gap-4">
                            {isGeneratingVisual && <Skeleton className="w-full h-32" />}
                            {visuals.slice().reverse().map((src, index) => (
                                <Image
                                    key={index}
                                    src={src}
                                    alt={`Generated visual aid ${visuals.length - index}`}
                                    width={200}
                                    height={200}
                                    className="rounded-lg object-cover w-full h-auto aspect-square"
                                    data-ai-hint="dilemma concept"
                                />
                            ))}
                        </div>
                        {visuals.length === 0 && !isGeneratingVisual && (
                            <div className="text-center text-muted-foreground py-10">No visuals generated yet.</div>
                        )}
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="expert" className="flex-grow flex flex-col gap-4 mt-4">
                     <div className="space-y-2">
                        <Textarea
                            placeholder="Ask the AI expert for insights..."
                            value={expertQuery}
                            onChange={(e) => setExpertQuery(e.target.value)}
                            disabled={isConsultingExpert}
                        />
                        <Button onClick={handleConsultExpert} disabled={isConsultingExpert} className="w-full">
                            {isConsultingExpert && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Consult
                        </Button>
                    </div>
                    <ScrollArea className="flex-grow rounded-md border p-4">
                         <div className="space-y-4">
                            {isConsultingExpert && <Skeleton className="w-full h-20" />}
                            {insights.slice().reverse().map((insight, index) => (
                               <Card key={index} className="bg-secondary/50">
                                   <CardContent className="p-4">
                                       <p>{insight}</p>
                                   </CardContent>
                               </Card>
                            ))}
                        </div>
                        {insights.length === 0 && !isConsultingExpert && (
                            <div className="text-center text-muted-foreground py-10">No insights requested yet.</div>
                        )}
                    </ScrollArea>
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
  );
}
