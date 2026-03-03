'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  batchSize: number;
  dailyDemand: number;
  prepTime: number; // minutes
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function newProduct(): Product {
  return { id: Math.random().toString(36).slice(2, 8), name: '', batchSize: 12, dailyDemand: 0, prepTime: 60 };
}

export function BatchPlanner() {
  const [products, setProducts] = useState<Product[]>([newProduct()]);
  const [workDays, setWorkDays] = useState<boolean[]>([true, true, true, true, true, true, false]);

  const addProduct = () => setProducts((prev) => [...prev, newProduct()]);
  const removeProduct = (id: string) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));
  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const activeDays = workDays.filter(Boolean).length;
  const weeklyDemand = products.map((p) => ({
    ...p,
    totalWeekly: p.dailyDemand * activeDays,
    batchesNeeded: p.batchSize > 0 ? Math.ceil((p.dailyDemand * activeDays) / p.batchSize) : 0,
  }));
  const totalPrepMinutes = weeklyDemand.reduce(
    (sum, p) => sum + p.batchesNeeded * p.prepTime,
    0
  );
  const totalPrepHours = (totalPrepMinutes / 60).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Work days */}
      <div>
        <h3 className="text-sm font-semibold text-brand-dark mb-2">Work Days</h3>
        <div className="flex gap-2">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => {
                const next = [...workDays];
                next[i] = !next[i];
                setWorkDays(next);
              }}
              className={`w-10 h-10 rounded-lg text-xs font-medium border transition-colors ${
                workDays[i]
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'border-brand-accent text-brand-muted'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-brand-dark">Products</h3>
          <button onClick={addProduct} className="text-xs font-medium text-brand-primary">
            + Add Product
          </button>
        </div>
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-brand-accent p-4">
              <div className="flex gap-2 items-center mb-3">
                <input
                  type="text"
                  value={p.name}
                  onChange={(e) => updateProduct(p.id, 'name', e.target.value)}
                  placeholder="Product name"
                  className="flex-1 px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
                {products.length > 1 && (
                  <button onClick={() => removeProduct(p.id)} className="text-brand-muted hover:text-danger text-lg">
                    &times;
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-brand-muted mb-1">Batch Size</label>
                  <input
                    type="number"
                    value={p.batchSize || ''}
                    onChange={(e) => updateProduct(p.id, 'batchSize', Number(e.target.value))}
                    min={1}
                    className="w-full px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted mb-1">Daily Demand</label>
                  <input
                    type="number"
                    value={p.dailyDemand || ''}
                    onChange={(e) => updateProduct(p.id, 'dailyDemand', Number(e.target.value))}
                    min={0}
                    className="w-full px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-xs text-brand-muted mb-1">Prep (min)</label>
                  <input
                    type="number"
                    value={p.prepTime || ''}
                    onChange={(e) => updateProduct(p.id, 'prepTime', Number(e.target.value))}
                    min={0}
                    className="w-full px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white rounded-xl border border-brand-accent p-5">
        <h3 className="font-heading text-lg font-bold text-brand-primary mb-3">Weekly Schedule</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-accent">
                <th className="text-left py-2 text-xs font-semibold text-brand-dark">Product</th>
                <th className="text-center py-2 text-xs font-semibold text-brand-dark">Weekly Need</th>
                <th className="text-center py-2 text-xs font-semibold text-brand-dark">Batches</th>
                <th className="text-center py-2 text-xs font-semibold text-brand-dark">Total Time</th>
              </tr>
            </thead>
            <tbody>
              {weeklyDemand.map((p) => (
                <tr key={p.id} className="border-b border-brand-accent/50">
                  <td className="py-2 font-medium">{p.name || 'Unnamed'}</td>
                  <td className="py-2 text-center">{p.totalWeekly} units</td>
                  <td className="py-2 text-center">{p.batchesNeeded}</td>
                  <td className="py-2 text-center">{p.batchesNeeded * p.prepTime} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex gap-3">
          <div className="flex-1 bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Total Prep Time</div>
            <div className="font-bold text-brand-primary">{totalPrepHours} hours/week</div>
          </div>
          <div className="flex-1 bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Work Days</div>
            <div className="font-bold text-brand-primary">{activeDays} days/week</div>
          </div>
        </div>
      </div>
    </div>
  );
}
