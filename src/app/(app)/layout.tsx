import { AppHeader } from '@/components/layout/AppHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-brand-bg flex flex-col">
        <AppHeader />
        <main className="flex-1 pb-safe">{children}</main>
        <BottomNav />
      </div>
    </AuthProvider>
  );
}
