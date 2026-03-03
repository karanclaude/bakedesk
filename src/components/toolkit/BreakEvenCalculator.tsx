'use client';

import { useState } from 'react';

export function BreakEvenCalculator() {
  const [currency, setCurrency] = useState('₹');
  const [rent, setRent] = useState(0);
  const [salaries, setSalaries] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [otherFixed, setOtherFixed] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [variableCost, setVariableCost] = useState(0);

  const totalFixed = rent + salaries + utilities + otherFixed;
  const contributionMargin = sellingPrice - variableCost;
  const breakEvenUnits = contributionMargin > 0 ? Math.ceil(totalFixed / contributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * sellingPrice;
  const breakEvenPerDay = Math.ceil(breakEvenUnits / 30);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['₹', '$', '£', '€'].map((c) => (
          <button
            key={c}
            onClick={() => setCurrency(c)}
            className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
              currency === c ? 'bg-brand-primary text-white border-brand-primary' : 'border-brand-accent text-brand-muted'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-brand-dark mb-3">Monthly Fixed Costs</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Rent', value: rent, set: setRent },
            { label: 'Salaries', value: salaries, set: setSalaries },
            { label: 'Utilities', value: utilities, set: setUtilities },
            { label: 'Other Fixed Costs', value: otherFixed, set: setOtherFixed },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-medium text-brand-dark mb-1">
                {field.label} ({currency}/month)
              </label>
              <input
                type="number"
                value={field.value || ''}
                onChange={(e) => field.set(Number(e.target.value))}
                min={0}
                className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-brand-dark mb-3">Per-Unit Economics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-brand-dark mb-1">
              Selling Price per Unit ({currency})
            </label>
            <input
              type="number"
              value={sellingPrice || ''}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-brand-dark mb-1">
              Variable Cost per Unit ({currency})
            </label>
            <input
              type="number"
              value={variableCost || ''}
              onChange={(e) => setVariableCost(Number(e.target.value))}
              min={0}
              className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-brand-accent p-5">
        <h3 className="font-heading text-lg font-bold text-brand-primary mb-3">Break-Even Analysis</h3>

        <div className="grid grid-cols-2 gap-3 text-sm mb-4">
          <div className="bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Total Fixed Costs</div>
            <div className="font-bold text-brand-dark">{currency}{totalFixed.toLocaleString()}/mo</div>
          </div>
          <div className="bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Contribution Margin</div>
            <div className="font-bold text-brand-dark">{currency}{contributionMargin.toFixed(2)}/unit</div>
          </div>
        </div>

        {contributionMargin > 0 ? (
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="bg-brand-primary/10 rounded-lg p-3 text-center">
              <div className="text-xs text-brand-primary mb-1">Break-Even Units</div>
              <div className="font-bold text-brand-primary text-lg">{breakEvenUnits.toLocaleString()}/mo</div>
            </div>
            <div className="bg-brand-primary/10 rounded-lg p-3 text-center">
              <div className="text-xs text-brand-primary mb-1">Per Day</div>
              <div className="font-bold text-brand-primary text-lg">{breakEvenPerDay}/day</div>
            </div>
            <div className="bg-success/10 rounded-lg p-3 text-center">
              <div className="text-xs text-success mb-1">Revenue Needed</div>
              <div className="font-bold text-success text-lg">{currency}{breakEvenRevenue.toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-warning text-center py-3">
            Enter a selling price higher than your variable cost to calculate break-even.
          </p>
        )}
      </div>
    </div>
  );
}
