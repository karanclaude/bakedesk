'use client';

import { useState } from 'react';

interface Item {
  name: string;
  ingredientCost: number;
  laborMinutes: number;
  batchSize: number;
}

export function PricingCalculator() {
  const [item, setItem] = useState<Item>({
    name: '',
    ingredientCost: 0,
    laborMinutes: 0,
    batchSize: 1,
  });
  const [laborRate, setLaborRate] = useState(200); // per hour
  const [overheadPercent, setOverheadPercent] = useState(15);
  const [marginPercent, setMarginPercent] = useState(60);
  const [currency, setCurrency] = useState('₹');

  const laborCost = (item.laborMinutes / 60) * laborRate;
  const totalCost = item.ingredientCost + laborCost;
  const costPerUnit = item.batchSize > 0 ? totalCost / item.batchSize : 0;
  const overheadPerUnit = costPerUnit * (overheadPercent / 100);
  const totalCostPerUnit = costPerUnit + overheadPerUnit;
  const sellingPrice = marginPercent < 100 ? totalCostPerUnit / (1 - marginPercent / 100) : totalCostPerUnit * 4;
  const profitPerUnit = sellingPrice - totalCostPerUnit;
  const fourXPrice = item.batchSize > 0 ? (item.ingredientCost / item.batchSize) * 4 : 0;

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['₹', '$', '£', '€'].map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
              currency === c
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'border-brand-accent text-brand-muted hover:border-brand-primary/30'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Product Name</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            placeholder="e.g. Chocolate Brownies"
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Batch Size (units)</label>
          <input
            type="number"
            value={item.batchSize || ''}
            onChange={(e) => setItem({ ...item, batchSize: Number(e.target.value) })}
            min={1}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">
            Total Ingredient Cost ({currency})
          </label>
          <input
            type="number"
            value={item.ingredientCost || ''}
            onChange={(e) => setItem({ ...item, ingredientCost: Number(e.target.value) })}
            min={0}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Labor Time (minutes)</label>
          <input
            type="number"
            value={item.laborMinutes || ''}
            onChange={(e) => setItem({ ...item, laborMinutes: Number(e.target.value) })}
            min={0}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">
            Labor Rate ({currency}/hour)
          </label>
          <input
            type="number"
            value={laborRate || ''}
            onChange={(e) => setLaborRate(Number(e.target.value))}
            min={0}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Overhead (%)</label>
          <input
            type="number"
            value={overheadPercent || ''}
            onChange={(e) => setOverheadPercent(Number(e.target.value))}
            min={0}
            max={100}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-brand-dark mb-2">
          Target Profit Margin: {marginPercent}%
        </label>
        <input
          type="range"
          value={marginPercent}
          onChange={(e) => setMarginPercent(Number(e.target.value))}
          min={20}
          max={90}
          step={5}
          className="w-full accent-brand-primary"
        />
        <div className="flex justify-between text-xs text-brand-muted mt-1">
          <span>20%</span>
          <span>90%</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-brand-accent p-5 space-y-3">
        <h3 className="font-heading text-lg font-bold text-brand-primary">Price Breakdown</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-brand-bg rounded-lg p-3">
            <div className="text-xs text-brand-muted mb-1">Cost per Unit</div>
            <div className="font-bold text-brand-dark">{currency}{totalCostPerUnit.toFixed(2)}</div>
          </div>
          <div className="bg-brand-bg rounded-lg p-3">
            <div className="text-xs text-brand-muted mb-1">4x Rule Price</div>
            <div className="font-bold text-warning">{currency}{fourXPrice.toFixed(2)}</div>
          </div>
          <div className="bg-brand-primary/10 rounded-lg p-3">
            <div className="text-xs text-brand-primary mb-1">Suggested Price</div>
            <div className="font-bold text-brand-primary text-lg">{currency}{sellingPrice.toFixed(2)}</div>
          </div>
          <div className="bg-success/10 rounded-lg p-3">
            <div className="text-xs text-success mb-1">Profit per Unit</div>
            <div className="font-bold text-success text-lg">{currency}{profitPerUnit.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
