import { FOUNDATION_KNOWLEDGE } from './knowledge/foundation';
import { PRICING_KNOWLEDGE } from './knowledge/pricing';
import { OPERATIONS_KNOWLEDGE } from './knowledge/operations';
import { MARKETING_KNOWLEDGE } from './knowledge/marketing';
import { LICENSING_KNOWLEDGE } from './knowledge/licensing';
import { SCALING_KNOWLEDGE } from './knowledge/scaling';

/**
 * Builds the full system prompt from modular knowledge documents.
 * To add new knowledge: import your new knowledge file and append it below.
 */
export function buildSystemPrompt(userPreferences?: {
  businessType?: string;
  location?: string;
  currency?: string;
  stage?: string;
}): string {
  const knowledgeSections = [
    FOUNDATION_KNOWLEDGE,
    PRICING_KNOWLEDGE,
    OPERATIONS_KNOWLEDGE,
    MARKETING_KNOWLEDGE,
    LICENSING_KNOWLEDGE,
    SCALING_KNOWLEDGE,
  ];

  let prompt = knowledgeSections.join('\n\n---\n\n');

  if (userPreferences) {
    prompt += `\n\n---\n\n## CURRENT USER CONTEXT\n`;
    if (userPreferences.businessType) {
      prompt += `- Business Type: ${userPreferences.businessType}\n`;
    }
    if (userPreferences.location) {
      prompt += `- Location: ${userPreferences.location}\n`;
    }
    if (userPreferences.currency) {
      prompt += `- Preferred Currency: ${userPreferences.currency}\n`;
    }
    if (userPreferences.stage) {
      prompt += `- Business Stage: ${userPreferences.stage}\n`;
    }
    prompt += `\nTailor your responses to this user's specific context. Use their currency for all pricing examples. Reference location-specific regulations and market conditions.\n`;
  }

  return prompt;
}

export const DEFAULT_SYSTEM_PROMPT = buildSystemPrompt();
