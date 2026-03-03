import { ToolkitTool } from '@/types';

export const TOOLKIT_TOOLS: ToolkitTool[] = [
  {
    id: 'pricing-calculator',
    name: 'Pricing Calculator',
    description:
      'Calculate your selling price using the 4x rule, set margins, and see profit per unit.',
    icon: '💰',
    category: 'finance',
  },
  {
    id: 'recipe-costing',
    name: 'Recipe Costing Sheet',
    description:
      'Break down ingredient costs for any recipe. Get cost per batch and cost per unit.',
    icon: '📝',
    category: 'finance',
  },
  {
    id: 'break-even',
    name: 'Break-Even Calculator',
    description:
      'Find out how many units you need to sell to cover your monthly costs.',
    icon: '📊',
    category: 'finance',
  },
  {
    id: 'batch-planner',
    name: 'Batch Planner',
    description:
      'Plan your weekly production schedule. Know what to bake, when, and how much.',
    icon: '📅',
    category: 'planning',
  },
  {
    id: 'menu-builder',
    name: 'Menu Template Builder',
    description:
      'Create a beautiful, printable menu for your bakery or cafe in minutes.',
    icon: '🍰',
    category: 'marketing',
  },
];

export function getToolById(id: string): ToolkitTool | undefined {
  return TOOLKIT_TOOLS.find((t) => t.id === id);
}

export const TOOL_CATEGORIES = [
  { id: 'finance', name: 'Finance & Pricing', icon: '💰' },
  { id: 'operations', name: 'Operations', icon: '⚙️' },
  { id: 'marketing', name: 'Marketing', icon: '📣' },
  { id: 'planning', name: 'Planning', icon: '📋' },
] as const;
