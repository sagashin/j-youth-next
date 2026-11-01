'use client';

import React from 'react';

export type ActiveTab = 'explorer' | 'videos' | 'guide' | 'scout';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  naishin9Total: number;
}

export default function Navbar({
  activeTab,
  onSelectTab,
  naishin9Total,
}: NavbarProps) {
  const navItems: {id: ActiveTab; label: string}[] = [
    {id: 'explorer', label: '高校探索・比較'},
    {id: 'videos', label: '部活動画・体験談'},
    {id: 'guide', label: '進路・推薦ガイド'},
    {id: 'scout', label: '練習会・スカウト情報'},
  ];

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 bg-white/95 backdrop-blur border-b border-slate-200 px-6 py-3.5">
      {/* Zone 1: Single text element wordmark */}
      <button
        type="button"
        onClick={() => onSelectTab('explorer')}
        className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
      >
        J-YOUTH NEXT
      </button>

      {/* Zone 2: 4 concise single-line text navigation links */}
      <nav className="flex items-center gap-6 overflow-x-auto text-sm font-medium text-slate-600">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer border-b-2 ${
                isActive
                  ? 'border-emerald-600 text-slate-900 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={() => onSelectTab('guide')}
          className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          現在内申 9科 {naishin9Total}/45 診断
        </button>
      </div>
    </header>
  );
}
