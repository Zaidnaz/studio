
'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a resolution summary for a debate.
 *
 * - generateResolution - A function that generates a resolution summary.
 * - GenerateResolutionInput - The input type for the generateResolution function.
 * - GenerateResolutionOutput - The return type for the generateResolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResolutionInputSchema = z.object({
  dilemma: z.string().describe('The initial dilemma that was debated.'),
  debateHistory: z
    .array(z.string())
    .describe('The full transcript of the debate.'),
});
export type GenerateResolutionInput = z.infer<
  typeof GenerateResolutionInputSchema
>;

const GenerateResolutionOutputSchema = z.object({
  resolution: z
    .string()
    .describe('A summary of the debate and the resolution reached.'),
});
export type GenerateResolutionOutput = z.infer<
  typeof GenerateResolutionOutputSchema
>;

export async function generateResolution(
  input: GenerateResolutionInput
): Promise<GenerateResolutionOutput> {
  return generateResolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResolutionPrompt',
  input: {schema: GenerateResolutionInputSchema},
  output: {schema: GenerateResolutionOutputSchema},
  prompt: `You are a debate moderator. Your task is to summarize a debate and declare a resolution.

Analyze the provided dilemma and the full debate history. Synthesize the key arguments from both sides and describe the final consensus or compromise that was reached. If no clear consensus was reached, summarize the final positions of each participant.

Your summary should be objective, concise, and clearly state the outcome of the debate.

Dilemma: {{{dilemma}}}

Debate History:
{{#each debateHistory}}
{{{this}}}
{{/each}}

Resolution Summary:`,
});

const generateResolutionFlow = ai.defineFlow(
  {
    name: 'generateResolutionFlow',
    inputSchema: GenerateResolutionInputSchema,
    outputSchema: GenerateResolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
