'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

function newItem(): MenuItem {
  return { id: Math.random().toString(36).slice(2, 8), name: '', price: '', description: '' };
}

function newCategory(): MenuCategory {
  return { id: Math.random().toString(36).slice(2, 8), name: '', items: [newItem()] };
}

export function MenuTemplate() {
  const [bakeryName, setBakeryName] = useState('');
  const [tagline, setTagline] = useState('');
  const [currency, setCurrency] = useState('₹');
  const [categories, setCategories] = useState<MenuCategory[]>([newCategory()]);
  const [showPreview, setShowPreview] = useState(false);

  const addCategory = () => setCategories((prev) => [...prev, newCategory()]);
  const removeCategory = (id: string) => setCategories((prev) => prev.filter((c) => c.id !== id));

  const addItem = (catId: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, items: [...c.items, newItem()] } : c))
    );
  };
  const removeItem = (catId: string, itemId: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c
      )
    );
  };
  const updateItem = (catId: string, itemId: string, field: keyof MenuItem, value: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === catId
          ? { ...c, items: c.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)) }
          : c
      )
    );
  };
  const updateCategory = (id: string, name: string) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };

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
          <label className="block text-xs font-medium text-brand-dark mb-1">Bakery / Cafe Name</label>
          <input
            type="text"
            value={bakeryName}
            onChange={(e) => setBakeryName(e.target.value)}
            placeholder="e.g. Sweet Surrender Bakery"
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-brand-dark mb-1">Tagline (optional)</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Baked with Love, Served with Joy"
            className="w-full px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
          />
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white rounded-xl border border-brand-accent p-4">
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={cat.name}
              onChange={(e) => updateCategory(cat.id, e.target.value)}
              placeholder="Category (e.g. Cakes, Cookies, Beverages)"
              className="flex-1 px-3 py-2 rounded-lg border border-brand-accent bg-brand-bg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
            />
            {categories.length > 1 && (
              <button onClick={() => removeCategory(cat.id)} className="text-brand-muted hover:text-danger text-lg">&times;</button>
            )}
          </div>

          <div className="space-y-2">
            {cat.items.map((item) => (
              <div key={item.id} className="flex gap-2 items-start">
                <div className="flex-1 grid grid-cols-[1fr_80px] gap-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(cat.id, item.id, 'name', e.target.value)}
                    placeholder="Item name"
                    className="px-2.5 py-1.5 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                  <input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateItem(cat.id, item.id, 'price', e.target.value)}
                    placeholder={`${currency}Price`}
                    className="px-2.5 py-1.5 rounded-lg border border-brand-accent bg-brand-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  />
                </div>
                <button onClick={() => removeItem(cat.id, item.id)} className="text-brand-muted hover:text-danger text-sm mt-1">
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addItem(cat.id)} className="mt-2 text-xs font-medium text-brand-primary">
            + Add Item
          </button>
        </div>
      ))}

      <button onClick={addCategory} className="w-full py-2.5 rounded-xl border-2 border-dashed border-brand-accent text-sm text-brand-muted hover:border-brand-primary/30 hover:text-brand-primary transition-colors">
        + Add Category
      </button>

      <button
        onClick={() => setShowPreview(!showPreview)}
        className="w-full py-2.5 rounded-xl bg-brand-primary text-white font-medium text-sm hover:bg-brand-primary/90 transition-colors"
      >
        {showPreview ? 'Hide Preview' : 'Preview Menu'}
      </button>

      {/* Preview */}
      {showPreview && (
        <div className="bg-white rounded-xl border-2 border-brand-primary/20 p-8 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-primary mb-1">
            {bakeryName || 'Your Bakery Name'}
          </h2>
          {tagline && <p className="text-sm text-brand-muted italic mb-6">{tagline}</p>}

          {categories.map((cat) => (
            <div key={cat.id} className="mb-6 last:mb-0">
              <h3 className="font-heading text-lg font-bold text-brand-primary mb-3 border-b border-brand-accent pb-2">
                {cat.name || 'Category'}
              </h3>
              <div className="space-y-2">
                {cat.items
                  .filter((i) => i.name)
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-baseline">
                      <span className="text-sm text-brand-dark">{item.name}</span>
                      <span className="text-sm font-semibold text-brand-primary">
                        {item.price ? `${currency}${item.price}` : '—'}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <div className="mt-8 pt-4 border-t border-brand-accent text-xs text-brand-muted">
            Made with BakeDesk by TruffleNation
          </div>
        </div>
      )}
    </div>
  );
}
