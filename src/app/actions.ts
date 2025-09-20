
"use server";

import {
  generateDilemmaScenario,
  GenerateDilemmaScenarioInput,
} from "@/ai/flows/generate-dilemma-scenarios";
import {
  consultAIExpert,
  ConsultAIExpertInput,
} from "@/ai/flows/consult-ai-expert";
import {
  generateVisualAid,
  GenerateVisualAidInput,
} from "@/ai/flows/generate-visual-aids";

export async function getDilemmaAction(input: GenerateDilemmaScenarioInput) {
  try {
    const result = await generateDilemmaScenario(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getDilemmaAction:", error);
    return { success: false, error: "Failed to generate a new dilemma." };
  }
}

export async function getExpertInsightAction(input: ConsultAIExpertInput) {
  try {
    const result = await consultAIExpert(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getExpertInsightAction:", error);
    return { success: false, error: "Failed to consult the AI expert." };
  }
}

export async function getVisualAidAction(input: GenerateVisualAidInput) {
  try {
    const result = await generateVisualAid(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getVisualAidAction:", error);
    return { success: false, error: "Failed to generate a visual aid." };
  }
}
