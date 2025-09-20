'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating unique dilemma scenarios.
 *
 * The flow takes a difficulty level as input and returns a generated dilemma scenario.
 * - `generateDilemmaScenario` - A function that generates a dilemma scenario.
 * - `GenerateDilemmaScenarioInput` - The input type for the generateDilemmaScenario function.
 * - `GenerateDilemmaScenarioOutput` - The return type for the generateDilemmaScenario function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDilemmaScenarioInputSchema = z.object({
  difficulty: z
    .enum(['easy', 'medium', 'hard'])
    .describe('The difficulty level of the dilemma scenario.'),
});
export type GenerateDilemmaScenarioInput = z.infer<
  typeof GenerateDilemmaScenarioInputSchema
>;

const GenerateDilemmaScenarioOutputSchema = z.object({
  scenario: z.string().describe('The generated dilemma scenario.'),
});
export type GenerateDilemmaScenarioOutput = z.infer<
  typeof GenerateDilemmaScenarioOutputSchema
>;

export async function generateDilemmaScenario(
  input: GenerateDilemmaScenarioInput
): Promise<GenerateDilemmaScenarioOutput> {
  return generateDilemmaScenarioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDilemmaScenarioPrompt',
  input: {schema: GenerateDilemmaScenarioInputSchema},
  output: {schema: GenerateDilemmaScenarioOutputSchema},
  prompt: `You are a game master who is responsible for creating interesting and engaging dilemma scenarios for a game of Dilemma Dynamics.

  The difficulty of the scenario should be set to {{difficulty}}.

  Generate a unique dilemma scenario:
  Scenario:`,
});

const generateDilemmaScenarioFlow = ai.defineFlow(
  {
    name: 'generateDilemmaScenarioFlow',
    inputSchema: GenerateDilemmaScenarioInputSchema,
    outputSchema: GenerateDilemmaScenarioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
