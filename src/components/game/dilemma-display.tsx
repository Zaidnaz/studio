
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/app/page";

interface DilemmaDisplayProps {
  scenario: string;
  difficulty: Difficulty;
}

export default function DilemmaDisplay({
  scenario,
  difficulty,
}: DilemmaDisplayProps) {

  const difficultyVariant = {
    easy: "default",
    medium: "secondary",
    hard: "destructive",
  } as const;


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-primary">
            <ScanText className="h-6 w-6" />
            The Dilemma
          </CardTitle>
          <Badge variant={difficultyVariant[difficulty]} className="capitalize">
            {difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-foreground/90">
          {scenario}
        </p>
      </CardContent>
    </Card>
  );
}
