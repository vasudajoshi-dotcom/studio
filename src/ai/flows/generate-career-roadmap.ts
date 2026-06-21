'use server';
/**
 * @fileOverview A Genkit flow for generating personalized long-term career roadmaps.
 *
 * - generateCareerRoadmap - A function that handles the career roadmap generation process.
 * - GenerateCareerRoadmapInput - The input type for the generateCareerRoadmap function.
 * - GenerateCareerRoadmapOutput - The return type for the generateCareerRoadmap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerRoadmapInputSchema = z.object({
  professionalBackground: z
    .string()
    .describe(
      'A detailed description of the user\'s current professional background, including experience, roles, and achievements.'
    ),
  interests: z
    .string()
    .describe(
      'A description of the user\'s career interests, desired fields, and long-term aspirations.'
    ),
});
export type GenerateCareerRoadmapInput = z.infer<
  typeof GenerateCareerRoadmapInputSchema
>;

const GenerateCareerRoadmapOutputSchema = z.object({
  roadmap: z
    .array(
      z.object({
        stage: z.string().describe('The title or name of the career stage.'),
        description:
          z.string().describe('A detailed description of this career stage, outlining key objectives and focus areas.'),
        recommendedSkills:
          z.array(z.string()).describe('A list of skills to acquire or develop during this stage.'),
        actions:
          z.array(z.string()).describe('Specific actionable steps or milestones to achieve in this stage.'),
      })
    )
    .describe('A personalized long-term career roadmap broken down into stages.'),
});
export type GenerateCareerRoadmapOutput = z.infer<
  typeof GenerateCareerRoadmapOutputSchema
>;

export async function generateCareerRoadmap(
  input: GenerateCareerRoadmapInput
): Promise<GenerateCareerRoadmapOutput> {
  return generateCareerRoadmapFlow(input);
}

const generateCareerRoadmapPrompt = ai.definePrompt({
  name: 'generateCareerRoadmapPrompt',
  input: {schema: GenerateCareerRoadmapInputSchema},
  output: {schema: GenerateCareerRoadmapOutputSchema},
  prompt: `You are an AI Career Architect, an expert in career development and professional growth.
Your task is to analyze a user's professional background and interests to create a personalized, long-term career roadmap.

The roadmap should be broken down into distinct stages, each with a clear title, detailed description, a list of recommended skills to acquire or develop, and specific actionable steps.

Professional Background: {{{professionalBackground}}}
Career Interests and Aspirations: {{{interests}}}

Generate the career roadmap in a structured JSON format as described by the output schema.`,
});

const generateCareerRoadmapFlow = ai.defineFlow(
  {
    name: 'generateCareerRoadmapFlow',
    inputSchema: GenerateCareerRoadmapInputSchema,
    outputSchema: GenerateCareerRoadmapOutputSchema,
  },
  async (input) => {
    const {output} = await generateCareerRoadmapPrompt(input);
    if (!output) {
      throw new Error('Failed to generate career roadmap.');
    }
    return output;
  }
);
