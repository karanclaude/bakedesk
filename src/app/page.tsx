import Link from 'next/link';

const FEATURES = [
  {
    icon: '💬',
    title: 'AI Business Consultant',
    desc: 'Get personalized advice on pricing, marketing, licensing, hiring — tailored to your bakery.',
  },
  {
    icon: '💰',
    title: 'Pricing Calculator',
    desc: 'Calculate selling prices, profit margins, and break-even using the 4x rule.',
  },
  {
    icon: '📝',
    title: 'Recipe Costing',
    desc: 'Break down ingredient costs per batch and per unit for any recipe.',
  },
  {
    icon: '📊',
    title: 'Break-Even Analysis',
    desc: 'Know exactly how many units you need to sell to cover costs.',
  },
  {
    icon: '📅',
    title: 'Batch Planner',
    desc: 'Plan your weekly production schedule across multiple products.',
  },
  {
    icon: '🍰',
    title: 'Menu Builder',
    desc: 'Create a beautiful, printable menu for your bakery or cafe.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-accent">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧁</span>
            <span className="font-heading text-xl font-bold text-brand-primary">
              BakeDesk
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="bg-brand-primary text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-brand-primary/90 transition-colors"
            >
              Start Free
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center">
        <div className="inline-block bg-brand-accent text-brand-primary text-xs font-semibold px-3 py-1 rounded-full mb-6">
          Built by TruffleNation
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-brand-primary leading-tight mb-6">
          Your AI Business
          <br />
          Consultant for Baking
        </h1>
        <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Free AI-powered guidance on pricing, marketing, licensing, and
          scaling — for home bakeries, cafes, cloud kitchens, and food
          entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/chat"
            className="bg-brand-primary text-white px-8 py-3.5 rounded-xl font-semibold text-lg hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
          >
            Chat with BakeDesk — Free
          </Link>
          <Link
            href="/toolkit"
            className="bg-white text-brand-primary px-8 py-3.5 rounded-xl font-semibold text-lg border-2 border-brand-primary/20 hover:border-brand-primary/40 transition-colors"
          >
            Browse Toolkit
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-primary text-center mb-12">
          Everything You Need to Build a Successful Bakery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-xl p-6 border border-brand-accent hover:shadow-lg hover:shadow-brand-primary/5 transition-all"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-heading text-lg font-bold text-brand-primary mb-2">
                {f.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who it's for */}
      <section className="bg-white border-y border-brand-accent py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-primary mb-10">
            Built For Every Stage of Your Journey
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { emoji: '🏠', label: 'Home Bakeries' },
              { emoji: '☁️', label: 'Cloud Kitchens' },
              { emoji: '☕', label: 'Cafes' },
              { emoji: '🍽️', label: 'Restaurants' },
              { emoji: '🎂', label: 'Catering' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-brand-bg rounded-xl p-5 border border-brand-accent"
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="font-medium text-sm text-brand-primary">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-primary mb-4">
          Ready to Build Your Dream Bakery?
        </h2>
        <p className="text-brand-muted text-lg mb-8 max-w-xl mx-auto">
          Every great bakery started with one person and one good recipe.
          You&apos;ve already got the dream — that&apos;s the hardest part.
        </p>
        <Link
          href="/chat"
          className="inline-block bg-brand-primary text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-brand-primary/90 transition-colors shadow-lg shadow-brand-primary/20"
        >
          Get Started — It&apos;s Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-accent py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-muted">
          <div className="flex items-center gap-2">
            <span>🧁</span>
            <span className="font-heading font-bold text-brand-primary">
              BakeDesk
            </span>
            <span>by TruffleNation</span>
          </div>
          <div>
            The dough doesn&apos;t rise overnight, but it always rises.
          </div>
        </div>
      </footer>
    </div>
  );
}
