'use client';

import React, {useState, useEffect, useMemo} from 'react';
import Navbar, {ActiveTab} from '@/components/Navbar';
import SchoolExplorerView from '@/components/SchoolExplorerView';
import VideosAndStoriesView from '@/components/VideosAndStoriesView';
import CareerGuideAndSimulatorView from '@/components/CareerGuideAndSimulatorView';
import ScoutAndPracticeView from '@/components/ScoutAndPracticeView';
import SchoolDetailModal from '@/components/SchoolDetailModal';
import {HIGH_SCHOOLS_DATA, HighSchoolData} from '@/lib/data/schools-data';
import {
  DEFAULT_PLAYER_PROFILE,
  PlayerProfile,
  SubjectGrades,
  calculateNaishinTotals,
} from '@/lib/data/career-guide-data';

const STORAGE_KEYS = {
  PROFILE: 'jyouth_next_player_profile_v1',
  CHECKLIST: 'jyouth_next_roadmap_checklist_v1',
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explorer');
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>(DEFAULT_PLAYER_PROFILE);
  const [completedChecklistIds, setCompletedChecklistIds] = useState<string[]>([
    'step-jhs1-1-soccer-0',
    'step-jhs1-1-acad-2',
  ]);

  // Modal state
  const [modalSchool, setModalSchool] = useState<HighSchoolData | null>(null);
  const [modalInitialTab, setModalInitialTab] = useState<
    'overview' | 'video' | 'testimonials' | 'career'
  >('overview');
  const [scoutTargetSchoolId, setScoutTargetSchoolId] = useState<string | null>(null);

  // Load persisted data from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) setPlayerProfile(JSON.parse(savedProfile));

      const savedChecklist = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
      if (savedChecklist) setCompletedChecklistIds(JSON.parse(savedChecklist));
    } catch {
      // Fallback to defaults if storage unavailable
    }
  }, []);

  const updateProfile = (updated: PlayerProfile) => {
    setPlayerProfile(updated);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
    } catch {}
  };

  const updateGrades = (newGrades: SubjectGrades) => {
    const updated = {
      ...playerProfile,
      grades: newGrades,
    };
    updateProfile(updated);
  };

  const toggleChecklistItem = (itemId: string) => {
    setCompletedChecklistIds((prev) => {
      const next = prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId];
      try {
        localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const naishin9Total = useMemo(
    () => calculateNaishinTotals(playerProfile.grades).nineSubjects,
    [playerProfile.grades]
  );

  const naishin5Total = useMemo(
    () => calculateNaishinTotals(playerProfile.grades).fiveSubjects,
    [playerProfile.grades]
  );

  const handleOpenSchoolModal = (
    school: HighSchoolData,
    initialTab: 'overview' | 'video' | 'testimonials' | 'career' = 'overview'
  ) => {
    setModalSchool(school);
    setModalInitialTab(initialTab);
  };

  const handleJumpToScoutInfo = (schoolId?: string) => {
    if (schoolId) {
      setScoutTargetSchoolId(schoolId);
    }
    setActiveTab('scout');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setScoutTargetSchoolId(null);
          setActiveTab(tab);
        }}
        naishin9Total={naishin9Total}
      />

      <main className="flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-6 pt-6">
        {activeTab === 'explorer' && (
          <SchoolExplorerView
            schools={HIGH_SCHOOLS_DATA}
            playerProfile={playerProfile}
            onSelectSchool={handleOpenSchoolModal}
            onNavigateToGuide={() => setActiveTab('guide')}
            onNavigateToScout={handleJumpToScoutInfo}
          />
        )}

        {activeTab === 'videos' && (
          <VideosAndStoriesView
            schools={HIGH_SCHOOLS_DATA}
            onSelectSchool={handleOpenSchoolModal}
            onOpenScoutChat={(schoolId) => handleJumpToScoutInfo(schoolId)}
          />
        )}

        {activeTab === 'guide' && (
          <CareerGuideAndSimulatorView
            schools={HIGH_SCHOOLS_DATA}
            playerProfile={playerProfile}
            onUpdateGrades={updateGrades}
            onSelectSchool={handleOpenSchoolModal}
            completedChecklistIds={completedChecklistIds}
            onToggleChecklistItem={toggleChecklistItem}
          />
        )}

        {activeTab === 'scout' && (
          <ScoutAndPracticeView
            schools={HIGH_SCHOOLS_DATA}
            playerProfile={playerProfile}
            onSelectSchoolModal={handleOpenSchoolModal}
            initialSelectedSchoolId={scoutTargetSchoolId}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 px-6 text-xs text-slate-500">
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            J-YOUTH NEXT — 中学生クラブチーム選手（GRANDE FC等）のための高校サッカー進路＆推薦・スカウト情報プラットフォーム
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveTab('explorer')}
              className="hover:text-slate-900 cursor-pointer"
            >
              高校探索・比較
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('videos')}
              className="hover:text-slate-900 cursor-pointer"
            >
              部活動画・体験談
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className="hover:text-slate-900 cursor-pointer"
            >
              進路・推薦ガイド
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('scout')}
              className="hover:text-slate-900 cursor-pointer"
            >
              練習会・スカウト情報
            </button>
          </div>
        </div>
      </footer>

      <SchoolDetailModal
        school={modalSchool}
        onClose={() => setModalSchool(null)}
        playerNaishin9={naishin9Total}
        playerNaishin5={naishin5Total}
        onOpenScoutInfo={(schoolId) => handleJumpToScoutInfo(schoolId)}
        initialTab={modalInitialTab}
      />
    </div>
  );
}
