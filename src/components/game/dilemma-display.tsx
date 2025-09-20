import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanText } from 'lucide-react';

interface DilemmaDisplayProps {
  scenario: string;
}

export default function DilemmaDisplay({ scenario }: DilemmaDisplayProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
            <ScanText className="h-6 w-6" />
            The Dilemma
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg leading-relaxed text-foreground/90">
          {scenario}
        </p>
      </CardContent>
    </Card>
  );
}
