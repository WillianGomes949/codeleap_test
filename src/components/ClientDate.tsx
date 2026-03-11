// ClientDate.tsx
'use client';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface ClientDateProps {
  date: string | Date;
}

export function ClientDate({ date }: ClientDateProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-sm text-neutral-500">Loading...</span>;
  }

  return (
    <span className="text-sm text-neutral-500">
      {formatDistanceToNow(new Date(date), { addSuffix: true, locale: enUS })}
    </span>
  );
}