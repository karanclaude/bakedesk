export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface UserPreferences {
  businessType: string;
  businessName: string;
  location: string;
  currency: string;
  stage: string;
}

export interface ToolkitTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'finance' | 'operations' | 'marketing' | 'planning';
}

export const BUSINESS_TYPES = [
  'Home Bakery',
  'Cloud Kitchen',
  'Bakery-Cafe',
  'Cafe / Coffee Shop',
  'Restaurant',
  'Catering Business',
  'Patisserie',
  'Other',
] as const;

export const BUSINESS_STAGES = [
  'Dreaming / Researching',
  'Planning / Pre-launch',
  'Just Launched (0-6 months)',
  'Growing (6-24 months)',
  'Scaling / Expanding',
] as const;

export const CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
] as const;
