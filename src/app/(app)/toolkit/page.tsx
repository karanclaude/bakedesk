'use client';

import Link from 'next/link';
import { TOOLKIT_TOOLS } from '@/lib/toolkit-registry';

export default function ToolkitPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h2 className="font-heading text-2xl font-bold text-brand-primary mb-1">
          Baker&apos;s Toolkit
        </h2>
        <p className="text-sm text-brand-muted">
          Free interactive tools to help you run your bakery business.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TOOLKIT_TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={`/toolkit/${tool.id}`}
            className="bg-white rounded-xl p-5 border border-brand-accent hover:shadow-lg hover:shadow-brand-primary/5 hover:border-brand-primary/20 transition-all group"
          >
            <div className="text-2xl mb-2">{tool.icon}</div>
            <h3 className="font-heading text-base font-bold text-brand-primary mb-1 group-hover:text-brand-primary/80">
              {tool.name}
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              {tool.description}
            </p>
            <span className="inline-block mt-3 text-xs font-medium text-brand-primary bg-brand-accent/60 px-2.5 py-1 rounded-full capitalize">
              {tool.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
