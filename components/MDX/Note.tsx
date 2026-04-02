import React from 'react';
import { Info, AlertTriangle, AlertOctagon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NoteProps {
  type?: 'info' | 'warning' | 'danger';
  children: React.ReactNode;
}

export function Note({ type = 'info', children }: NoteProps) {
  const config = {
    info: {
      icon: Info,
      styles: 'bg-zinc-900/40 border-zinc-700 text-zinc-300',
      iconStyles: 'text-zinc-400',
    },
    warning: {
      icon: AlertTriangle,
      styles: 'bg-amber-950/20 border-amber-900/50 text-amber-200/90',
      iconStyles: 'text-amber-500',
    },
    danger: {
      icon: AlertOctagon,
      styles: 'bg-red-950/20 border-red-900/50 text-red-200/90',
      iconStyles: 'text-red-500',
    },
  };

  const active = config[type];
  const Icon = active.icon;

  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 border p-4 my-6 rounded-lg backdrop-blur-sm", active.styles)}>
      <div className="flex-shrink-0 mt-0.5">
        <Icon className={cn("w-5 h-5", active.iconStyles)} />
      </div>
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
}
