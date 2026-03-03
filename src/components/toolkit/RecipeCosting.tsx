'use client';

import { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  qty: number;
  unit: string;
  pricePerUnit: number;
}

function newIngredient(): Ingredient {
  return { id: Math.random().toString(36).slice(2, 8), name: '', qty: 0, unit: 'g', pricePerUnit: 0 };
}

export function RecipeCosting() {
  const [recipeName, setRecipeName] = useState('');
  const [batchYield, setBatchYield] = useState(12);
  const [currency, setCurrency] = useState('₹');
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    newIngredient(),
    newIngredient(),
    newIngredient(),
  ]);

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients((prev) =>
      prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
    );
  };

  const addIngredient = () => setIngredients((prev) => [...prev, newIngredient()]);
  const removeIngredient = (id: string) =>
    setIngredients((prev) => prev.filter((ing) => ing.id !== id));

  const totalCost = ingredients.reduce((sum, ing) => sum + ing.qty * ing.pricePerUnit, 0);
  const costPerUnit = batchYield > 0 ? totalCost / batchYield : 0;
  const suggestedPrice = costPerUnit * 4;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Recipe Name</label>
          <input
            type="text"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="e.g. Classic Vanilla Cupcakes"
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Batch Yield (units)</label>
          <input
            type="number"
            value={batchYield || ''}
            onChange={(e) => setBatchYield(Number(e.target.value))}
            min={1}
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-brand-dark">Ingredients</h3>
          <button
            onClick={addIngredient}
            className="text-xs font-medium text-brand-primary hover:text-brand-primary/80"
          >
            + Add Ingredient
          </button>
        </div>
        <div className="space-y-2">
          {ingredients.map((ing) => (
            <div key={ing.id} className="flex gap-2 items-end">
              <input
                type="text"
                value={ing.name}
                onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                placeholder="Ingredient"
                className="flex-1 min-w-0 px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
              <input
                type="number"
                value={ing.qty || ''}
                onChange={(e) => updateIngredient(ing.id, 'qty', Number(e.target.value))}
                placeholder="Qty"
                className="w-16 px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
              <select
                value={ing.unit}
                onChange={(e) => updateIngredient(ing.id, 'unit', e.target.value)}
                className="w-16 px-1 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              >
                {['g', 'kg', 'ml', 'L', 'pcs', 'tsp', 'tbsp', 'cup'].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <input
                type="number"
                value={ing.pricePerUnit || ''}
                onChange={(e) => updateIngredient(ing.id, 'pricePerUnit', Number(e.target.value))}
                placeholder={`${currency}/unit`}
                className="w-20 px-2.5 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
              />
              <button
                onClick={() => removeIngredient(ing.id)}
                className="shrink-0 text-brand-muted hover:text-danger text-lg leading-none pb-1"
                title="Remove"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-xl border border-brand-accent p-5">
        <h3 className="font-heading text-lg font-bold text-brand-primary mb-3">Cost Summary</h3>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Total Batch Cost</div>
            <div className="font-bold text-brand-dark">{currency}{totalCost.toFixed(2)}</div>
          </div>
          <div className="bg-brand-bg rounded-lg p-3 text-center">
            <div className="text-xs text-brand-muted mb-1">Cost per Unit</div>
            <div className="font-bold text-brand-dark">{currency}{costPerUnit.toFixed(2)}</div>
          </div>
          <div className="bg-brand-primary/10 rounded-lg p-3 text-center">
            <div className="text-xs text-brand-primary mb-1">4x Suggested Price</div>
            <div className="font-bold text-brand-primary text-lg">{currency}{suggestedPrice.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
