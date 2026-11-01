'use client';

import React, {useState, useEffect} from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Home,
  Trophy,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Dumbbell,
  Calendar,
} from 'lucide-react';
import {HighSchoolData, getSchoolScoutingIntelligence} from '@/lib/data/schools-data';

interface SchoolDetailModalProps {
  school: HighSchoolData | null;
  onClose: () => void;
  playerNaishin9: number;
  playerNaishin5: number;
  onOpenScoutInfo: (schoolId: string) => void;
  initialTab?: 'overview' | 'video' | 'testimonials' | 'career';
}

export default function SchoolDetailModal({
  school,
  onClose,
  playerNaishin9,
  playerNaishin5,
  onOpenScoutInfo,
  initialTab = 'overview',
}: SchoolDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'video' | 'testimonials' | 'career'>(
    initialTab
  );
  const [selectedChapterIdx, setSelectedChapterIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    setActiveTab(initialTab);
    setSelectedChapterIdx(0);
    setIsPlaying(false);
    setProgress(24);
  }, [school?.id, initialTab]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 300);
    return () => clearInterval(timer);
  }, [isPlaying]);

  if (!school) return null;

  const currentChapter =
    school.videoShowcase.chapters[selectedChapterIdx] || school.videoShowcase.chapters[0];
  const scoutingIntel = getSchoolScoutingIntelligence(school);

  const isSportsRecEligible = playerNaishin9 >= school.naishinCriteria.sportsRecommendation9;
  const diffSports = playerNaishin9 - school.naishinCriteria.sportsRecommendation9;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300 mb-1.5">
              <span>
                {school.prefecture}（{school.city}）
              </span>
              <span aria-hidden="true">·</span>
              <span>{school.type}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400 font-medium">{school.league}</span>
              <span aria-hidden="true">·</span>
              <span>{school.dormitoryAndCommute.hasDormitory ? '専用寮完備' : '自宅通学制'}</span>
              <span aria-hidden="true">·</span>
              <span>GRANDE FC OB過去5年 {school.soccerProfile.grandeFcObCountLast5Years}名進学</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              {school.name} サッカー部・進路総合データ
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 border-b border-slate-200 overflow-x-auto shrink-0">
          {[
            {id: 'overview', label: '01. 内申基準・施設・寮・評価'},
            {id: 'video', label: '02. 部活紹介動画（チャプター再生）'},
            {id: 'testimonials', label: '03. 現役選手・GRANDE OB体験談'},
            {id: 'career', label: '04. 卒業後の大学/プロ実績・練習会＆スカウト基準'},
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {activeTab === 'overview' && (
            <>
              {/* Naishin Match Banner */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {isSportsRecEligible ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                    <span className="text-sm font-bold text-slate-900">
                      あなたの現在内申（9科 {playerNaishin9}/45 · 5科 {playerNaishin5}/25）との照合結果：
                      {isSportsRecEligible
                        ? 'スポーツ推薦（単願）の内申目安をクリアしています！'
                        : `スポーツ推薦目安まであと ${Math.abs(diffSports)} ポイントです`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {school.naishinCriteria.tokyoStudentRuleNote}
                  </p>
                </div>

                <div className="flex items-center gap-4 shrink-0 font-mono tabular-nums text-xs">
                  <div className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-500">スポーツ推薦目安</div>
                    <div className="text-base font-bold text-slate-900">
                      9科 {school.naishinCriteria.sportsRecommendation9} / 5科{' '}
                      {school.naishinCriteria.sportsRecommendation5}
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-500">併願優遇・一般推薦</div>
                    <div className="text-base font-bold text-slate-900">
                      9科 {school.naishinCriteria.heigan9}
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white rounded-lg border border-slate-200 text-center">
                    <div className="text-slate-500">偏差値帯</div>
                    <div className="text-base font-bold text-slate-900">
                      {school.deviationMin} - {school.deviationMax}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-Axis Evaluation Metrics & GRANDE FC Fit */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-5 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    5項目クオリティ評価（5.0満点）
                  </h3>
                  <div className="space-y-3">
                    {[
                      {label: 'サッカー競技力・強化体制', val: school.ratings.soccerPower},
                      {label: '学校の学業水準・進学指導', val: school.ratings.academicQuality},
                      {label: 'サッカー施設・人工芝・ジム', val: school.ratings.facilityQuality},
                      {label: '寮環境・栄養・通学サポート', val: school.ratings.dormAndSupport},
                      {label: '卒業後の進路（プロ・大学）', val: school.ratings.careerOutcomes},
                    ].map((item) => (
                      <div key={item.label} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-700 font-medium">{item.label}</span>
                          <span className="font-mono tabular-nums font-bold text-slate-900">
                            {item.val.toFixed(1)} / 5.0
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{width: `${(item.val / 5) * 100}%`}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7 p-5 rounded-xl border border-slate-200 bg-white space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">
                      GRANDE FC（埼玉）選手との相性・戦術スタイル
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-emerald-700 font-semibold">
                      過去5年OB進学：{school.soccerProfile.grandeFcObCountLast5Years}名
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/70 p-3.5 rounded-lg border border-emerald-200/80">
                    {school.soccerProfile.grandeFcFitReason}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <div className="text-slate-500 mb-1">戦術・プレースタイル</div>
                      <div className="font-semibold text-slate-900 leading-snug">
                        {school.soccerProfile.playStyle}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <div className="text-slate-500 mb-1">全国大会実績・部員規模</div>
                      <div className="font-semibold text-slate-900 leading-snug">
                        {school.soccerProfile.nationalChampionshipCount}（部員約
                        {school.soccerProfile.clubMembersCount}名）
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses & Scholarship Ranks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-700" />
                    <h3 className="text-sm font-bold text-slate-900">
                      学科・コース構成と偏差値・入部可否
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {school.courses.map((course) => (
                      <div key={course.name} className="py-3 first:pt-1 last:pb-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-900">{course.name}</span>
                          <span className="text-xs font-mono tabular-nums text-slate-600">
                            偏差値目安 {course.deviation} ·{' '}
                            {course.soccerClubAllowed ? 'サッカー部入部可' : '入部制限あり'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{course.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-slate-700" />
                    <h3 className="text-sm font-bold text-slate-900">
                      特待生・奨学金ランクと学費免除条件
                    </h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {school.naishinCriteria.scholarshipRanks.map((rank) => (
                      <div key={rank.rank} className="py-3 first:pt-1 last:pb-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-900">{rank.rank}</span>
                          <span className="text-xs font-semibold text-emerald-700">
                            {rank.tuitionExemption}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">条件目安：{rank.condition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities & Dormitory / Tokyo Commute Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-slate-700" />
                    <h3 className="text-sm font-bold text-slate-900">
                      サッカー施設・フィジカル・メディカル体制
                    </h3>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {school.facilities.summary}
                  </p>
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <dt className="text-slate-500">グラウンド仕様</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5">
                        {school.facilities.pitchType}
                      </dd>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg">
                      <dt className="text-slate-500">フィジカルジム</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5">
                        {school.facilities.physicalGym}
                      </dd>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg sm:col-span-2">
                      <dt className="text-slate-500">トレーナー・栄養・医科学サポート</dt>
                      <dd className="font-semibold text-slate-900 mt-0.5">
                        {school.facilities.medicalStaff}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4 text-slate-700" />
                    <h3 className="text-sm font-bold text-slate-900">
                      寮生活の有無 ＆ 東京都内からの通学シミュレーション
                    </h3>
                  </div>
                  <dl className="space-y-2.5 text-xs">
                    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-100">
                      <dt className="text-slate-500 shrink-0">学生寮の有無</dt>
                      <dd className="font-bold text-slate-900 text-right">
                        {school.dormitoryAndCommute.hasDormitory
                          ? `あり（${school.dormitoryAndCommute.dormName} / 月額目安 ${school.dormitoryAndCommute.dormMonthlyCost}）`
                          : '寮なし（全員自宅からの通学制）'}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-100">
                      <dt className="text-slate-500 shrink-0">食事・栄養サポート</dt>
                      <dd className="font-medium text-slate-900 text-right">
                        {school.dormitoryAndCommute.mealSupport}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-1.5 border-b border-slate-100">
                      <dt className="text-slate-500 shrink-0">東京からのアクセス</dt>
                      <dd className="font-medium text-slate-900 text-right">
                        {school.dormitoryAndCommute.commuteRouteFromTokyo}（目安{' '}
                        <span className="font-mono tabular-nums font-bold">
                          {school.dormitoryAndCommute.commuteFromTokyoMinutes}
                        </span>
                        分）
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-4 py-1.5">
                      <dt className="text-slate-500 shrink-0">通学 vs 寮の比率</dt>
                      <dd className="font-medium text-slate-900 text-right">
                        {school.dormitoryAndCommute.commuteVsDormRatio}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </>
          )}

          {activeTab === 'video' && (
            <div className="space-y-6">
              {/* Interactive Simulated Video Player */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-white">
                <div className="relative p-6 sm:p-8 min-h-[280px] flex flex-col justify-between bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950">
                  <div className="flex items-center justify-between text-xs text-emerald-300/90 font-mono tabular-nums">
                    <span>
                      CHAPTER {selectedChapterIdx + 1}/{school.videoShowcase.chapters.length} ·{' '}
                      {currentChapter.timeRange}
                    </span>
                    <span>{school.videoShowcase.updatedAt}</span>
                  </div>

                  <div className="my-6 max-w-2xl space-y-3">
                    <div className="text-xs font-semibold text-emerald-400">
                      {school.name} 公式部活紹介ムービー
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      {currentChapter.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {currentChapter.summary}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                      <span className="font-semibold text-white">注目ポイント：</span>
                      {currentChapter.keyMetrics.map((m, idx) => (
                        <React.Fragment key={m}>
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <span>{m}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-800/80">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5" />
                              一時停止中
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5" />
                              チャプター再生
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setProgress(0)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                          title="最初から"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-xs font-mono tabular-nums text-slate-400">
                        戦術テーマ：{currentChapter.tacticalFocus}
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-300"
                        style={{width: `${progress}%`}}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {school.videoShowcase.chapters.map((ch, idx) => {
                  const isSelected = idx === selectedChapterIdx;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => {
                        setSelectedChapterIdx(idx);
                        setIsPlaying(true);
                        setProgress(15);
                      }}
                      className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/40 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-mono tabular-nums text-emerald-700 font-semibold mb-1">
                        {ch.timeRange}
                      </div>
                      <div className="text-sm font-bold text-slate-900 mb-1.5">{ch.title}</div>
                      <p className="text-xs text-slate-600 line-clamp-2">{ch.summary}</p>
                    </button>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-900">
                  {school.soccerProfile.coachName} より中学生へのメッセージ：
                </span>{' '}
                {school.videoShowcase.coachQuote}
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              {school.testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 rounded-xl border border-slate-200 bg-white space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-bold text-emerald-700">{t.juniorHighClub} 出身</span>
                        <span aria-hidden="true">·</span>
                        <span>{t.residenceOrigin}</span>
                        <span aria-hidden="true">·</span>
                        <span>{t.commuteOrDorm}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {t.admissionRoute}（{t.courseName}）
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{t.headline}</h3>
                    </div>
                    <div className="shrink-0 px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono tabular-nums">
                      <div className="text-slate-500">中学内申点の推移（9科）</div>
                      <div className="font-bold text-slate-900 text-sm">
                        中1時: {t.naishinAtJhs1}/45 ➔ 中3時: {t.naishinAtJhs3}/45
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                    <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                      <div className="font-bold text-slate-900">
                        Q1. なぜこの高校を選びましたか？（GRANDE FCからの繋がり）
                      </div>
                      <p className="text-slate-700">{t.whyChoseSchool}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                      <div className="font-bold text-slate-900">
                        Q2. 中学時代の内申点対策と、高校での勉強との両立は？
                      </div>
                      <p className="text-slate-700">{t.soccerAndStudyBalance}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                      <div className="font-bold text-slate-900">
                        Q3. サッカー施設・グラウンドや通学／寮生活のリアルな感想は？
                      </div>
                      <p className="text-slate-700">{t.facilityAndDormImpression}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/70 space-y-1.5">
                      <div className="font-bold text-emerald-950">
                        Q4. 中学1年生の今やっておくべきアドバイス！
                      </div>
                      <p className="text-emerald-900">{t.adviceForJhs1}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'career' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500">過去5年間のJリーガー輩出数</div>
                  <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    {school.careerOutcomes.jLeagueProsLast5Years}
                    <span className="text-sm font-normal text-slate-500 ml-1">名</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    主なOB：{school.careerOutcomes.notableProAlumni.join(' / ')}
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500">大学サッカー部（体育会）継続率</div>
                  <div className="text-3xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                    {school.careerOutcomes.universitySoccerRate}
                    <span className="text-sm font-normal text-slate-500 ml-1">%</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    関東大学サッカー1部・2部リーグへのスポーツ推薦枠多数
                  </div>
                </div>

                <div className="p-5 rounded-xl border border-slate-200 bg-white">
                  <div className="text-xs text-slate-500">GRANDE FC OB進学実績（過去5年）</div>
                  <div className="text-3xl font-bold font-mono tabular-nums text-emerald-700 mt-1">
                    {school.soccerProfile.grandeFcObCountLast5Years}
                    <span className="text-sm font-normal text-slate-500 ml-1">名</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">
                    クラブ指導者と高校スタッフ間の連携パイプあり
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-4">
                <h3 className="text-sm font-bold text-slate-900">卒業後の進路・大学進学実績の詳細</h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {school.careerOutcomes.careerSummary}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1.5">
                      主なサッカー進学先大学（体育会サッカー部）
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {school.careerOutcomes.topSoccerUniversities.join(' · ')}
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80">
                    <div className="font-bold text-slate-900 mb-1.5">
                      主な一般進学・指定校・内部推薦大学
                    </div>
                    <p className="text-slate-700 leading-relaxed">
                      {school.careerOutcomes.topGeneralUniversities.join(' · ')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Scouting & Selection Schedule Details inside Modal */}
              <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    {school.name} の練習会・セレクション時期 ＆ スカウト評価基準
                  </h3>
                  <span className="text-xs font-semibold text-emerald-800">
                    {scoutingIntel.entryRouteType}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">
                      例年の練習会・セレクション時期と申込方法
                    </div>
                    <div className="text-emerald-700 font-semibold mb-1">
                      {scoutingIntel.selectionMonths}
                    </div>
                    <p className="text-slate-700">{scoutingIntel.entryMethodDetail}</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200">
                    <div className="font-bold text-slate-900 mb-1">
                      スカウトが重視する能力 ＆ 内申・出欠条件
                    </div>
                    <p className="text-slate-700 mb-1.5">
                      {scoutingIntel.positionEvaluationPoints}
                    </p>
                    <p className="text-slate-600">{scoutingIntel.cutoffAndAttendanceRule}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-slate-50 border-t border-slate-200 shrink-0">
          <div className="text-xs text-slate-600">
            例年の練習会時期：{scoutingIntel.selectionMonths}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              閉じる
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenScoutInfo(school.id);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              全校の練習会時期・スカウト基準一覧で見る
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
