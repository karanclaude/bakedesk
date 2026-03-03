import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      <AppHeader />
      <main className="flex-1 pb-safe">{children}</main>
      <BottomNav />
    </div>
  );
}
