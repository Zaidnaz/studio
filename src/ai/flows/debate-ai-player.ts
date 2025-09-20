'use server';

/**
 * @fileOverview This flow generates a response from an AI debate player.
 *
 * - getAIPlayerResponse - A function that generates the AI player's response.
 * - DebateAIPlayerInput - The input type for the getAIPlayerResponse function.
 * - DebateAIPlayerOutput - The return type for the getAIPlayerResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DebateAIPlayerInputSchema = z.object({
  dilemmaDescription: z
    .string()
    .describe('The description of the current dilemma.'),
  playerArgument: z.string().describe("The user's most recent argument."),
  debateHistory: z
    .array(z.string())
    .describe('The history of the debate so far.'),
});
export type DebateAIPlayerInput = z.infer<typeof DebateAIPlayerInputSchema>;

const DebateAIPlayerOutputSchema = z.object({
  playerResponse: z
    .string()
    .describe("The AI player's response to the user's argument."),
});
export type DebateAIPlayerOutput = z.infer<typeof DebateAIPlayerOutputSchema>;

export async function getAIPlayerResponse(
  input: DebateAIPlayerInput
): Promise<DebateAIPlayerOutput> {
  return debateAIPlayerFlow(input);
}

const debateAIPlayerPrompt = ai.definePrompt({
  name: 'debateAIPlayerPrompt',
  input: {schema: DebateAIPlayerInputSchema},
  output: {schema: DebateAIPlayerOutputSchema},
  prompt: `You are Player 1, a participant in a debate game called Dilemma Dynamics. Your goal is to argue your side of a given dilemma. You should be a thoughtful, and slightly challenging debate partner.

Analyze the user's argument in the context of the dilemma and the debate history. Provide a counter-argument or a different perspective. Your response should be a few sentences long and contribute to a back-and-forth conversation.

Dilemma: {{{dilemmaDescription}}}

Debate History:
{{#each debateHistory}}
- {{{this}}}
{{/each}}

User's Latest Argument: {{{playerArgument}}}

Your Response as Player 1:`,
});

const debateAIPlayerFlow = ai.defineFlow(
  {
    name: 'debateAIPlayerFlow',
    inputSchema: DebateAIPlayerInputSchema,
    outputSchema: DebateAIPlayerOutputSchema,
  },
  async input => {
    const {output} = await debateAIPlayerPrompt(input);
    return output!;
  }
);
