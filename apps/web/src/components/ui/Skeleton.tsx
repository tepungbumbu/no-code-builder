import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'rectangular'
}) => {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-neutral-200',
        variants[variant],
        className
      )}
    />
  );
};

export const ProjectsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="clay-card p-6 space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      ))}
    </div>
  );
};

export const EditorSkeleton: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Skeleton className="w-64 h-full rounded-none" />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton variant="circular" className="h-12 w-12 mx-auto" />
          <Skeleton variant="text" className="w-48 mx-auto" />
        </div>
      </div>
      <Skeleton className="w-80 h-full rounded-none" />
    </div>
  );
};
