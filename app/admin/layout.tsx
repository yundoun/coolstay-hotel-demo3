import { notFound } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // 프로덕션에서는 admin 접근 차단
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {children}
    </div>
  );
}
