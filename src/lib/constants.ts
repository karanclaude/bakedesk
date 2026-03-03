export const APP_NAME = 'BakeDesk';
export const APP_TAGLINE = 'AI Business Consultant for Bakers';
export const APP_DESCRIPTION =
  'Free AI-powered business consultant for bakers, cafe owners, and food entrepreneurs. Built by TruffleNation.';

export const STORAGE_KEYS = {
  CONVERSATIONS: 'bakedesk_conversations',
  PREFERENCES: 'bakedesk_preferences',
  CURRENT_CONVERSATION: 'bakedesk_current_conversation',
  TOOLKIT_PREFIX: 'bakedesk_toolkit_',
} as const;

export const WELCOME_MESSAGE = `Hey there! I'm **BakeDesk** — your free AI business consultant for bakeries, cafes, cloud kitchens, and food ventures.

Whether you're dreaming about your first home bakery, scaling a cloud kitchen, or figuring out pricing for your cafe menu — I'm here to help.

**I can help with:**
- Business planning & pricing strategy
- Menu engineering & hero product selection
- Kitchen setup & equipment guidance
- Marketing (Instagram, WhatsApp, Google Business)
- Licensing & compliance (FSSAI for India, local permits globally)
- Scaling from home kitchen to storefront

To give you the best advice, tell me:
1. **What are you building?** (home bakery, cafe, cloud kitchen, etc.)
2. **What stage are you at?** (dreaming, planning, launched, growing?)
3. **Where are you based?**

What's on your mind today?`;
