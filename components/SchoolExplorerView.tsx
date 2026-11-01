'use client';

import React, {useState, useMemo} from 'react';
import {
  Search,
  SlidersHorizontal,
  Play,
  Users,
  CheckCircle2,
  AlertCircle,
  Scale,
  ArrowRight,
  RotateCcw,
  Compass,
  LayoutGrid,
  MessageSquare,
  X,
} from 'lucide-react';
import {HighSchoolData, RegionCategory} from '@/lib/data/schools-data';
import {PlayerProfile, calculateNaishinTotals} from '@/lib/data/career-guide-data';

interface SchoolExplorerViewProps {
  schools: HighSchoolData[];
  playerProfile: PlayerProfile;
  onSelectSchool: (
    school: HighSchoolData,
    initialTab?: 'overview' | 'video' | 'testimonials' | 'career'
  ) => void;
  onNavigateToGuide: () => void;
  onNavigateToScout: (schoolId?: string) => void;
}

export default function SchoolExplorerView({
  schools,
  playerProfile,
  onSelectSchool,
  onNavigateToGuide,
  onNavigateToScout,
}: SchoolExplorerViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<'すべて' | RegionCategory>('すべて');
  const [minDeviation, setMinDeviation] = useState<number>(45);
  const [maxDeviation, setMaxDeviation] = useState<number>(72);
  const [onlyEligibleByNaishin, setOnlyEligibleByNaishin] = useState<boolean>(false);
  const [dormFilter, setDormFilter] = useState<'all' | 'dorm' | 'commute45'>('all');
  const [onlyHighGrandeOb, setOnlyHighGrandeOb] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');
  const [compareIds, setCompareIds] = useState<string[]>(['shohei', 'teikyo']);
  const [showCompareModal, setShowCompareModal] = useState<boolean>(false);

  const naishinTotals = useMemo(
    () => calculateNaishinTotals(playerProfile.grades),
    [playerProfile.grades]
  );

  const filteredSchools = useMemo(() => {
    return schools.filter((school) => {
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchText =
          school.name.toLowerCase().includes(q) ||
          school.prefecture.toLowerCase().includes(q) ||
          school.city.toLowerCase().includes(q) ||
          school.soccerProfile.playStyle.toLowerCase().includes(q) ||
          school.careerOutcomes.topSoccerUniversities.some((u) => u.toLowerCase().includes(q));
        if (!matchText) return false;
      }

      if (selectedRegion !== 'すべて' && school.regionCategory !== selectedRegion) {
        return false;
      }

      // Check if school's deviation range overlaps with [minDeviation, maxDeviation]
      if (school.deviationMax < minDeviation || school.deviationMin > maxDeviation) {
        return false;
      }

      if (
        onlyEligibleByNaishin &&
        naishinTotals.nineSubjects < school.naishinCriteria.sportsRecommendation9
      ) {
        return false;
      }

      if (dormFilter === 'dorm' && !school.dormitoryAndCommute.hasDormitory) {
        return false;
      }
      if (
        dormFilter === 'commute45' &&
        school.dormitoryAndCommute.commuteFromTokyoMinutes > 45
      ) {
        return false;
      }

      if (onlyHighGrandeOb && school.soccerProfile.grandeFcObCountLast5Years < 6) {
        return false;
      }

      return true;
    });
  }, [
    schools,
    searchQuery,
    selectedRegion,
    minDeviation,
    maxDeviation,
    onlyEligibleByNaishin,
    dormFilter,
    onlyHighGrandeOb,
    naishinTotals.nineSubjects,
  ]);

  const eligibleCount = useMemo(
    () =>
      schools.filter(
        (s) => naishinTotals.nineSubjects >= s.naishinCriteria.sportsRecommendation9
      ).length,
    [schools, naishinTotals.nineSubjects]
  );

  const comparedSchools = useMemo(
    () => schools.filter((s) => compareIds.includes(s.id)),
    [schools, compareIds]
  );

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRegion('すべて');
    setMinDeviation(45);
    setMaxDeviation(72);
    setOnlyEligibleByNaishin(false);
    setDormFilter('all');
    setOnlyHighGrandeOb(false);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-400 font-medium">
                <span>{playerProfile.clubTeam}</span>
                <span aria-hidden="true">·</span>
                <span>{playerProfile.residence}</span>
                <span aria-hidden="true">·</span>
                <span>{playerProfile.grade} キャリア設計モード</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight max-w-2xl">
                中学1年から描く、高校サッカー推薦・内申点・将来進路の完全羅針盤
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                東京の自宅から通うか、専用寮に入るか。どの内申点でどの強豪校のスポーツ推薦・特待生に届くのか。「サッカーの強さ」「内申基準・偏差値」「施設・寮」「大学・プロ実績」を横断比較し、スカウト交渉まで一貫サポートします。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onNavigateToGuide}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                9教科内申シミュレーター＆推薦ガイドを開く
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigateToScout()}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                スカウト視察の仕組み・練習会開催時期を見る
              </button>
            </div>
          </div>

          {/* Right Tactical Summary Panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-800/90 via-slate-900 to-emerald-950/80 border-t lg:border-t-0 lg:border-l border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs text-slate-400 mb-1">
                現在の登録ステータス（{playerProfile.name} 選手）
              </div>
              <div className="text-lg font-bold text-white">
                {playerProfile.primaryPosition} · {playerProfile.dominantFoot} · 50m走{' '}
                <span className="font-mono tabular-nums">{playerProfile.sprint50mSec}</span>秒
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono tabular-nums">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-sans text-slate-400">現在内申点（9教科）</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {naishinTotals.nineSubjects}
                  <span className="text-xs text-slate-400 font-normal"> / 45</span>
                </div>
                <div className="text-[11px] font-sans text-slate-400 mt-0.5">
                  5教科合計: {naishinTotals.fiveSubjects}/25（平均 {naishinTotals.average9}）
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs font-sans text-slate-400">スポーツ推薦目安クリア</div>
                <div className="text-2xl font-bold text-white mt-1">
                  {eligibleCount}
                  <span className="text-xs text-slate-400 font-normal">
                    {' '}
                    / {schools.length} 校
                  </span>
                </div>
                <div className="text-[11px] font-sans text-emerald-400 mt-0.5">
                  内申+2でさらに上位校も圏内
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-300 border-t border-slate-800 pt-3 flex items-center justify-between">
              <span>東京都在住 × 埼玉クラブ（GRANDE FC）越境受験対応済</span>
              <button
                type="button"
                onClick={onNavigateToGuide}
                className="text-emerald-400 hover:underline font-medium cursor-pointer"
              >
                内申を変更する →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search Console */}
      <section className="p-6 rounded-xl bg-white border border-slate-200 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <h2 className="text-base font-bold text-slate-900">
              高校サッカー進路 総合検索・偏差値＆内申フィルター
            </h2>
            <span className="text-xs text-slate-500 font-mono tabular-nums ml-2">
              （該当 {filteredSchools.length} / 全 {schools.length} 校）
            </span>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                高校カード一覧
              </button>
              <button
                type="button"
                onClick={() => setViewMode('matrix')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === 'matrix'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                サッカー強さ×内申・偏差値マップ
              </button>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              条件リセット
            </button>
          </div>
        </div>

        {/* Row 1: Keyword + Region Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="高校名・地域・プレースタイル・進学先大学（筑波、明治、早慶など）で検索..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-2 focus:outline-emerald-600"
            />
          </div>

          <div className="lg:col-span-7 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">エリア：</span>
            {(['すべて', '埼玉県', '東京都', '関東圏', '全国寮完備'] as const).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Deviation Score Range Slider + Quick Presets */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          <div className="lg:col-span-6 p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">偏差値レンジ検索フィルター</span>
              <span className="font-mono tabular-nums font-bold text-emerald-700">
                偏差値 {minDeviation} 〜 {maxDeviation}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 items-center">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 whitespace-nowrap">下限 {minDeviation}</span>
                <input
                  type="range"
                  min={45}
                  max={68}
                  value={minDeviation}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMinDeviation(Math.min(val, maxDeviation));
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 whitespace-nowrap">上限 {maxDeviation}</span>
                <input
                  type="range"
                  min={50}
                  max={72}
                  value={maxDeviation}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxDeviation(Math.max(val, minDeviation));
                  }}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {[
                {label: '全偏差値(45-72)', min: 45, max: 72},
                {label: 'アスリート中心(45-56)', min: 45, max: 56},
                {label: '文武両道・中堅〜上位(55-64)', min: 55, max: 64},
                {label: '難関進学校・大学付属(62-72)', min: 62, max: 72},
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setMinDeviation(preset.min);
                    setMaxDeviation(preset.max);
                  }}
                  className={`px-2 py-1 text-[11px] font-medium rounded border transition-colors cursor-pointer ${
                    minDeviation === preset.min && maxDeviation === preset.max
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Row 2 Right: Condition Toggles */}
          <div className="lg:col-span-6 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setOnlyEligibleByNaishin(!onlyEligibleByNaishin)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                onlyEligibleByNaishin
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              現在の内申（9科{naishinTotals.nineSubjects}）で推薦圏内のみ
            </button>

            <button
              type="button"
              onClick={() => setOnlyHighGrandeOb(!onlyHighGrandeOb)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                onlyHighGrandeOb
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              GRANDE FC OB多数進学（過去5年6名以上）
            </button>

            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {[
                {id: 'all', label: '通学・寮すべて'},
                {id: 'commute45', label: '東京から45分以内'},
                {id: 'dorm', label: '専用寮完備'},
              ].map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDormFilter(d.id as typeof dormFilter)}
                  className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    dormFilter === d.id
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Matrix Mode (2D Positioning Map) */}
      {viewMode === 'matrix' && (
        <section className="p-6 rounded-xl bg-white border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                「サッカーの強さ × 必要内申点・偏差値」ポジショニングマップ
              </h3>
              <p className="text-xs text-slate-600">
                縦軸がサッカー競技力（プレミア／全国実績）、横軸がスポーツ推薦目安内申点（9教科45点満点）です。点線の縦ラインがあなたの現在内申（
                {naishinTotals.nineSubjects}）を示しています。
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                <span className="w-3 h-3 rounded-sm bg-emerald-600 inline-block" />
                現在内申で推薦目安クリア
              </span>
              <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
                あと+1〜4ポイント必要
              </span>
            </div>
          </div>

          <div className="relative w-full h-[460px] bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-hidden">
            {/* Axis Labels */}
            <div className="absolute top-3 left-4 text-[11px] font-semibold text-slate-500">
              ▲ サッカー競技力が高い（プレミアリーグ・全国制覇級）
            </div>
            <div className="absolute bottom-3 left-4 text-[11px] font-semibold text-slate-500">
              ▼ 都県1部リーグ・関東大会上位級
            </div>
            <div className="absolute bottom-3 right-4 text-[11px] font-semibold text-slate-500">
              必要内申点・偏差値が高い（難関文武両道・MARCH付属） ▶
            </div>

            {/* Current Player Naishin Vertical Threshold Line */}
            {(() => {
              // X-axis maps sportsRecommendation9 from 26 to 40
              const minNaishinX = 26;
              const maxNaishinX = 40;
              const clampedPlayer = Math.max(
                minNaishinX,
                Math.min(maxNaishinX, naishinTotals.nineSubjects)
              );
              const leftPct = ((clampedPlayer - minNaishinX) / (maxNaishinX - minNaishinX)) * 84 + 8;
              return (
                <div
                  className="absolute top-8 bottom-8 border-l-2 border-dashed border-emerald-600 z-10 pointer-events-none"
                  style={{left: `${leftPct}%`}}
                >
                  <div className="bg-emerald-600 text-white text-[11px] font-mono tabular-nums font-bold px-2 py-0.5 rounded -translate-x-1/2 whitespace-nowrap shadow-xs">
                    あなたの現在内申: 9科 {naishinTotals.nineSubjects}
                  </div>
                </div>
              );
            })()}

            {/* Plot School Nodes */}
            {filteredSchools.map((school) => {
              const minNaishinX = 26;
              const maxNaishinX = 40;
              const minSoccerY = 80;
              const maxSoccerY = 100;

              const leftPct =
                ((school.naishinCriteria.sportsRecommendation9 - minNaishinX) /
                  (maxNaishinX - minNaishinX)) *
                  84 +
                8;
              const bottomPct =
                ((school.soccerStrengthScore - minSoccerY) / (maxSoccerY - minSoccerY)) * 76 + 12;

              const isEligible =
                naishinTotals.nineSubjects >= school.naishinCriteria.sportsRecommendation9;

              return (
                <button
                  key={school.id}
                  type="button"
                  onClick={() => onSelectSchool(school, 'overview')}
                  style={{left: `${leftPct}%`, bottom: `${bottomPct}%`}}
                  className={`absolute -translate-x-1/2 translate-y-1/2 z-20 px-3 py-1.5 rounded-lg border text-left transition-transform hover:scale-105 cursor-pointer shadow-xs ${
                    isEligible
                      ? 'bg-white border-emerald-600 text-slate-900'
                      : 'bg-white border-amber-500 text-slate-900'
                  }`}
                >
                  <div className="text-xs font-bold whitespace-nowrap flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-xs ${
                        isEligible ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                    />
                    {school.shortName}
                  </div>
                  <div className="text-[10px] font-mono tabular-nums text-slate-500 whitespace-nowrap">
                    推薦内申{school.naishinCriteria.sportsRecommendation9} · 偏差値
                    {school.deviationMin}-{school.deviationMax}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* High School Cards Grid */}
      { filteredSchools.length === 0 ? (
        <div className="p-12 rounded-xl bg-white border border-slate-200 text-center space-y-3">
          <div className="text-base font-bold text-slate-900">
            条件に一致する高校が見つかりませんでした
          </div>
          <p className="text-xs text-slate-600">
            偏差値スライダーの範囲を広げるか、フィルター条件をリセットして再度お試しください。
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            すべてのフィルターをリセット
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchools.map((school) => {
            const isEligible =
              naishinTotals.nineSubjects >= school.naishinCriteria.sportsRecommendation9;
            const isCompared = compareIds.includes(school.id);

            return (
              <article
                key={school.id}
                className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-5 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  {/* Zero-Pill Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{school.prefecture}</span>
                    <span aria-hidden="true">·</span>
                    <span>{school.type}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-semibold">{school.league}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {school.dormitoryAndCommute.hasDormitory ? '専用寮完備' : '自宅通学'}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      東京から約{school.dormitoryAndCommute.commuteFromTokyoMinutes}分
                    </span>
                  </div>

                  {/* School Title & Naishin Eligibility Indicator */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-slate-900">
                        {school.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                        {school.soccerProfile.playStyle}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <div
                        className={`inline-flex items-center gap-1 text-xs font-bold ${
                          isEligible ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {isEligible ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            推薦内申クリア
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-4 h-4" />
                            推薦まであと+
                            {school.naishinCriteria.sportsRecommendation9 -
                              naishinTotals.nineSubjects}
                          </>
                        )}
                      </div>
                      <div className="text-[11px] font-mono tabular-nums text-slate-500 mt-0.5">
                        GRANDE OB 5年{school.soccerProfile.grandeFcObCountLast5Years}名
                      </div>
                    </div>
                  </div>

                  {/* Key Tabular Metrics Grid */}
                  <div className="grid grid-cols-4 gap-2 pt-2 font-mono tabular-nums">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <div className="text-[11px] font-sans text-slate-500">偏差値帯</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {school.deviationMin}-{school.deviationMax}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <div className="text-[11px] font-sans text-slate-500">スポーツ推薦目安</div>
                      <div className="text-sm font-bold text-emerald-700 mt-0.5">
                        9科 {school.naishinCriteria.sportsRecommendation9}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <div className="text-[11px] font-sans text-slate-500">併願・一般推薦</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        9科 {school.naishinCriteria.heigan9}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/70">
                      <div className="text-[11px] font-sans text-slate-500">5年プロ輩出</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5">
                        {school.careerOutcomes.jLeagueProsLast5Years}名
                      </div>
                    </div>
                  </div>

                  {/* 5-Axis Rating Summary Row */}
                  <div className="grid grid-cols-5 gap-2 pt-1 text-center font-mono tabular-nums text-xs">
                    {[
                      {label: '競技力', val: school.ratings.soccerPower},
                      {label: '学業', val: school.ratings.academicQuality},
                      {label: '施設', val: school.ratings.facilityQuality},
                      {label: '寮・支援', val: school.ratings.dormAndSupport},
                      {label: '進路実績', val: school.ratings.careerOutcomes},
                    ].map((r) => (
                      <div key={r.label} className="py-1.5 px-1 rounded bg-slate-50/80">
                        <div className="text-[10px] font-sans text-slate-500">{r.label}</div>
                        <div className="font-bold text-slate-900">{r.val.toFixed(1)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Career & Facility Short Summary */}
                  <div className="text-xs text-slate-600 space-y-1 pt-1 border-t border-slate-100">
                    <div className="truncate">
                      <span className="font-semibold text-slate-800">施設：</span>
                      {school.facilities.pitchType}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-slate-800">主な進学大：</span>
                      {school.careerOutcomes.topSoccerUniversities.slice(0, 5).join(' · ')}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectSchool(school, 'video')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      紹介動画
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectSchool(school, 'testimonials')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-emerald-600" />
                      OB体験談
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCompare(school.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isCompared
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-600'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {isCompared ? '比較選択中' : '比較に追加'}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectSchool(school, 'overview')}
                    className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    詳細・内申基準を見る
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {/* Floating Comparison Bar */}
      {comparedSchools.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-full max-w-3xl px-4">
          <div className="p-3.5 rounded-xl bg-slate-900 text-white border border-slate-700 shadow-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto">
              <span className="text-xs font-semibold text-emerald-400 whitespace-nowrap shrink-0">
                並列比較リスト ({comparedSchools.length}/3校):
              </span>
              {comparedSchools.map((s) => (
                <div
                  key={s.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 text-xs whitespace-nowrap shrink-0"
                >
                  <span>{s.shortName}</span>
                  <button
                    type="button"
                    onClick={() => toggleCompare(s.id)}
                    className="text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowCompareModal(true)}
              className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {comparedSchools.length}校を徹底比較する
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-5xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white">
              <h3 className="text-lg font-bold">
                志望校 並列比較テーブル（あなたの現在内申: 9科 {naishinTotals.nineSubjects} / 5科{' '}
                {naishinTotals.fiveSubjects}）
              </h3>
              <button
                type="button"
                onClick={() => setShowCompareModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 font-bold text-slate-600 w-44 bg-slate-50">比較項目</th>
                    {comparedSchools.map((s) => (
                      <th key={s.id} className="py-3 px-4 font-bold text-slate-900 text-sm">
                        <div>{s.name}</div>
                        <div className="text-xs font-normal text-slate-500 mt-0.5">
                          {s.prefecture} · {s.type} · {s.league}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono tabular-nums">
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      偏差値レンジ
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-bold text-slate-900">
                        {s.deviationMin} 〜 {s.deviationMax}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      スポーツ推薦目安内申
                    </td>
                    {comparedSchools.map((s) => {
                      const ok =
                        naishinTotals.nineSubjects >= s.naishinCriteria.sportsRecommendation9;
                      return (
                        <td key={s.id} className="py-3 px-4">
                          <span
                            className={`font-bold ${
                              ok ? 'text-emerald-700' : 'text-amber-700'
                            }`}
                          >
                            9科 {s.naishinCriteria.sportsRecommendation9}/45 · 5科{' '}
                            {s.naishinCriteria.sportsRecommendation5}/25
                          </span>
                          <div className="font-sans text-[11px] text-slate-500 mt-0.5">
                            {ok
                              ? '現在内申でクリア'
                              : `あと+${s.naishinCriteria.sportsRecommendation9 - naishinTotals.nineSubjects}必要`}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      併願優遇・学業推薦目安
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 text-slate-900">
                        9科 {s.naishinCriteria.heigan9}/45（特待目安:{' '}
                        {s.naishinCriteria.academicSpecial9}）
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      東京からの通学・寮
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-sans text-slate-800">
                        <div className="font-bold">
                          東京から約 {s.dormitoryAndCommute.commuteFromTokyoMinutes}分（
                          {s.dormitoryAndCommute.hasDormitory ? '寮完備' : '自宅通学制'}）
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          {s.dormitoryAndCommute.nearestStation}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      サッカー施設クオリティ
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-sans text-slate-800">
                        <div className="font-bold text-emerald-700">
                          評価 {s.ratings.facilityQuality.toFixed(1)} / 5.0
                        </div>
                        <div className="mt-0.5">{s.facilities.pitchType}</div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      GRANDE FC OB進学実績
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-sans text-slate-800">
                        <span className="font-mono font-bold text-slate-900">
                          過去5年 {s.soccerProfile.grandeFcObCountLast5Years}名
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-sans font-semibold text-slate-700 bg-slate-50">
                      卒業後の進路（プロ/大学）
                    </td>
                    {comparedSchools.map((s) => (
                      <td key={s.id} className="py-3 px-4 font-sans text-slate-800">
                        <div className="font-bold">
                          5年プロ輩出 {s.careerOutcomes.jLeagueProsLast5Years}名 · 大学サッカー継続{' '}
                          {s.careerOutcomes.universitySoccerRate}%
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          {s.careerOutcomes.topSoccerUniversities.slice(0, 4).join('・')}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
