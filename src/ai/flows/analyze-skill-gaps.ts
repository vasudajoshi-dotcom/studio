'use server';
/**
 * @fileOverview An AI career mentor flow to analyze skill gaps for a desired job role and suggest learning modules.
 *
 * - analyzeSkillGaps - A function that handles the skill gap analysis process.
 * - AnalyzeSkillGapsInput - The input type for the analyzeSkillGaps function.
 * - AnalyzeSkillGapsOutput - The return type for the analyzeSkillGaps function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSkillGapsInputSchema = z.object({
  desiredJobRole: z
    .string()
    .describe('The desired job role for which to analyze skill gaps.'),
});
export type AnalyzeSkillGapsInput = z.infer<typeof AnalyzeSkillGapsInputSchema>;

const AnalyzeSkillGapsOutputSchema = z.object({
  jobRole: z.string().describe('The desired job role that was analyzed.'),
  requiredSkills: z
    .array(z.string())
    .describe('A list of essential skills required for the desired job role, based on current market trends.'),
  suggestedLearningModules: z
    .array(
      z.object({
        name: z.string().describe('The name of the learning module or course.'),
        description: z
          .string()
          .describe('A brief description of what the learning module covers and how it addresses a skill gap.'),
      })
    )
    .describe(
      'A list of specific learning modules or courses recommended to bridge the identified skill gaps.'
    ),
  skillGapsSummary: z
    .string()
    .describe(
      'A comprehensive summary detailing the identified skill gaps for the desired job role and how the suggested learning modules will help to bridge these gaps.'
    ),
});
export type AnalyzeSkillGapsOutput = z.infer<
  typeof AnalyzeSkillGapsOutputSchema
>;

export async function analyzeSkillGaps(
  input: AnalyzeSkillGapsInput
): Promise<AnalyzeSkillGapsOutput> {
  return analyzeSkillGapsFlow(input);
}

const analyzeSkillGapsPrompt = ai.definePrompt({
  name: 'analyzeSkillGapsPrompt',
  input: {schema: AnalyzeSkillGapsInputSchema},
  output: {schema: AnalyzeSkillGapsOutputSchema},
  prompt: `You are an AI Career Architect, an expert in career development and market trends.
Your task is to analyze the skills required for a given desired job role, considering current market demands and future outlook.
Based on this analysis, you will identify key skill gaps that a user might have for this role and suggest specific learning modules to bridge these gaps.

Desired Job Role: {{{desiredJobRole}}}

Carefully analyze the market for the '{{{desiredJobRole}}}' role to identify the core and advanced skills necessary for success.
Then, propose specific learning modules that would help someone acquire or enhance these skills.
Finally, provide a summary of the identified skill gaps and how the suggested modules address them.

Respond with a JSON object strictly adhering to the output schema provided.`,
});

const analyzeSkillGapsFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapsFlow',
    inputSchema: AnalyzeSkillGapsInputSchema,
    outputSchema: AnalyzeSkillGapsOutputSchema,
  },
  async input => {
    const {output} = await analyzeSkillGapsPrompt(input);
    return output!;
  }
);
