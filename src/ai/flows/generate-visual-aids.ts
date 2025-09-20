'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating visual aids based on a player's described solution.
 *
 * - generateVisualAid - An async function that takes a text description and returns a data URI representing an image.
 * - GenerateVisualAidInput - The input type for the generateVisualAid function.
 * - GenerateVisualAidOutput - The return type for the generateVisualAid function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateVisualAidInputSchema = z.object({
  description: z
    .string()
    .describe('A description of the visual aid to generate.'),
});
export type GenerateVisualAidInput = z.infer<
  typeof GenerateVisualAidInputSchema
>;

const GenerateVisualAidOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'A data URI containing the generated image, including MIME type and Base64 encoding (e.g., data:image/png;base64,<data>)'
    ),
});
export type GenerateVisualAidOutput = z.infer<
  typeof GenerateVisualAidOutputSchema
>;

export async function generateVisualAid(
  input: GenerateVisualAidInput
): Promise<GenerateVisualAidOutput> {
  return generateVisualAidFlow(input);
}

const generateVisualAidFlow = ai.defineFlow(
  {
    name: 'generateVisualAidFlow',
    inputSchema: GenerateVisualAidInputSchema,
    outputSchema: GenerateVisualAidOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      prompt: `Generate a high-quality, visually appealing image based on the following description: ${input.description}`,
      model: 'googleai/imagen-4.0-fast-generate-001',
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageDataUri: media.url};
  }
);
