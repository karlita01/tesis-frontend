import type { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 w-full">
      {children}
    </div>
  );
}
