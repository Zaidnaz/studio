'use server';

/**
 * @fileOverview This flow allows players to consult an AI expert for strategic insights or relevant information related to the current dilemma.
 *
 * - consultAIExpert - A function that handles the AI expert consultation process.
 * - ConsultAIExpertInput - The input type for the consultAIExpert function.
 * - ConsultAIExpertOutput - The return type for the consultAIExpert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConsultAIExpertInputSchema = z.object({
  dilemmaDescription: z
    .string()
    .describe('The description of the current dilemma.'),
  playerQuery: z.string().describe('The player query about the dilemma.'),
});
export type ConsultAIExpertInput = z.infer<typeof ConsultAIExpertInputSchema>;

const ConsultAIExpertOutputSchema = z.object({
  expertInsight: z
    .string()
    .describe('The AI expert insight based on the dilemma and player query.'),
});
export type ConsultAIExpertOutput = z.infer<typeof ConsultAIExpertOutputSchema>;

export async function consultAIExpert(input: ConsultAIExpertInput): Promise<ConsultAIExpertOutput> {
  return consultAIExpertFlow(input);
}

const consultAIExpertPrompt = ai.definePrompt({
  name: 'consultAIExpertPrompt',
  input: {schema: ConsultAIExpertInputSchema},
  output: {schema: ConsultAIExpertOutputSchema},
  prompt: `You are an AI expert providing strategic insights and relevant information about a given dilemma based on a player's query.

Dilemma Description: {{{dilemmaDescription}}}
Player Query: {{{playerQuery}}}

Provide a concise and informative expert insight to help the player make a more informed decision.`,
});

const consultAIExpertFlow = ai.defineFlow(
  {
    name: 'consultAIExpertFlow',
    inputSchema: ConsultAIExpertInputSchema,
    outputSchema: ConsultAIExpertOutputSchema,
  },
  async input => {
    const {output} = await consultAIExpertPrompt(input);
    return output!;
  }
);
