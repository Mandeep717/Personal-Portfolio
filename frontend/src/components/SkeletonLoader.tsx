import React from 'react';

export const SkeletonHero: React.FC = () => {
  return (
    <div className="min-h-[85vh] flex items-center justify-center pt-24 pb-16 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <div className="h-12 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            <div className="h-6 w-2/3 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="h-4 w-4/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
            </div>
            <div className="flex gap-4 pt-6">
              <div className="h-12 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-12 w-36 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonSection: React.FC<{ cards?: number }> = ({ cards = 3 }) => {
  return (
    <div className="py-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-md mx-auto mb-12 space-y-3">
          <div className="h-5 w-28 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
          <div className="h-8 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: cards }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-md" />
                <div className="h-6 w-14 bg-slate-200 dark:bg-slate-800 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
