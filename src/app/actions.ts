
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
  getAIPlayerResponse,
  DebateAIPlayerInput,
} from "@/ai/flows/debate-ai-player";

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

export async function getAIPlayerResponseAction(input: DebateAIPlayerInput) {
  try {
    const result = await getAIPlayerResponse(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getAIPlayerResponseAction:", error);
    return { success: false, error: "Failed to get AI player response." };
  }
}
