'use client';

import { useParams, useRouter } from 'next/navigation';
import { getToolById } from '@/lib/toolkit-registry';
import { PricingCalculator } from '@/components/toolkit/PricingCalculator';
import { RecipeCosting } from '@/components/toolkit/RecipeCosting';
import { BreakEvenCalculator } from '@/components/toolkit/BreakEvenCalculator';
import { BatchPlanner } from '@/components/toolkit/BatchPlanner';
import { MenuTemplate } from '@/components/toolkit/MenuTemplate';

const TOOL_COMPONENTS: Record<string, React.ComponentType> = {
  'pricing-calculator': PricingCalculator,
  'recipe-costing': RecipeCosting,
  'break-even-calculator': BreakEvenCalculator,
  'batch-planner': BatchPlanner,
  'menu-builder': MenuTemplate,
};

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.tool as string;
  const tool = getToolById(toolId);
  const Component = TOOL_COMPONENTS[toolId];

  if (!tool || !Component) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h2 className="text-xl font-bold text-brand-dark mb-2">Tool Not Found</h2>
        <p className="text-sm text-brand-muted mb-4">The tool you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => router.push('/toolkit')}
          className="px-4 py-2 bg-brand-primary text-white rounded-xl text-sm font-medium"
        >
          Back to Toolkit
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
      <button
        onClick={() => router.back()}
        className="text-sm text-brand-muted hover:text-brand-primary mb-4 flex items-center gap-1"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{tool.icon}</span>
          <h1 className="font-heading text-xl font-bold text-brand-dark">{tool.name}</h1>
        </div>
        <p className="text-sm text-brand-muted">{tool.description}</p>
      </div>

      <Component />
    </div>
  );
}
