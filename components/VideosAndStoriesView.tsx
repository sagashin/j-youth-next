'use client';

import React, {useState, useMemo, useEffect} from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Users,
  Video,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import {HighSchoolData} from '@/lib/data/schools-data';

interface VideosAndStoriesViewProps {
  schools: HighSchoolData[];
  onSelectSchool: (
    school: HighSchoolData,
    initialTab?: 'overview' | 'video' | 'testimonials' | 'career'
  ) => void;
  onOpenScoutChat: (schoolId: string) => void;
}

export default function VideosAndStoriesView({
  schools,
  onSelectSchool,
  onOpenScoutChat,
}: VideosAndStoriesViewProps) {
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(schools[0]?.id || 'shohei');
  const [activeChapterIdx, setActiveChapterIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(30);
  const [storyFilter, setStoryFilter] = useState<'all' | 'commute' | 'dorm' | 'highNaishin'>('all');

  const activeSchool = useMemo(
    () => schools.find((s) => s.id === selectedSchoolId) || schools[0],
    [schools, selectedSchoolId]
  );

  const activeChapter =
    activeSchool.videoShowcase.chapters[activeChapterIdx] ||
    activeSchool.videoShowcase.chapters[0];

  useEffect(() => {
    setActiveChapterIdx(0);
    setIsPlaying(false);
    setProgress(25);
  }, [selectedSchoolId]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 300);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const allTestimonials = useMemo(() => {
    const list = schools.flatMap((school) =>
      school.testimonials.map((t) => ({
        ...t,
        school,
      }))
    );

    return list.filter((item) => {
      if (storyFilter === 'commute') return item.commuteOrDorm === '通学';
      if (storyFilter === 'dorm') return item.commuteOrDorm === '寮生活';
      if (storyFilter === 'highNaishin') return item.naishinAtJhs3 >= 35;
      return true;
    });
  }, [schools, storyFilter]);

  return (
    <div className="space-y-10 pb-16">
      {/* Section 1: Interactive Club Intro Video Showcase */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">
              OFFICIAL CLUB VIDEO ARCHIVE
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              強豪高校サッカー部 紹介動画＆練習・施設・寮ツアー
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              高校ごとの戦術トレーニング風景、専用人工芝グラウンド、ウエイトジム、学生寮のリアルな映像チャプターを確認できます。
            </p>
          </div>

          {/* School Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {schools.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedSchoolId(s.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  s.id === activeSchool.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {s.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Main Video Stage + Chapter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-8 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 text-white flex flex-col justify-between p-6 sm:p-8 relative">
            <div className="flex items-center justify-between text-xs font-mono tabular-nums text-emerald-400">
              <span>
                {activeSchool.name} · {activeSchool.league}
              </span>
              <span>
                CHAPTER {activeChapterIdx + 1}/{activeSchool.videoShowcase.chapters.length} (
                {activeChapter.timeRange})
              </span>
            </div>

            {/* Simulated Tactical Pitch & Highlight Stage */}
            <div className="my-6 p-6 rounded-xl bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 border border-emerald-800/50 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-semibold text-emerald-300">
                  {activeSchool.videoShowcase.title}
                </span>
                <span className="font-mono tabular-nums">
                  全体尺 {activeSchool.videoShowcase.totalDuration}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {activeChapter.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeChapter.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-emerald-300">
                <span className="text-white font-semibold">チャプター注目指標：</span>
                {activeChapter.keyMetrics.map((m, i) => (
                  <React.Fragment key={m}>
                    {i > 0 && <span aria-hidden="true">·</span>}
                    <span>{m}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Player Controls */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4" />
                        一時停止
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        このチャプターを再生
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProgress(0)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-300">
                  戦術・育成フォーカス：<span className="text-white font-semibold">{activeChapter.tacticalFocus}</span>
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

          {/* Right Column: Chapters & Coach Message */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-700">
                収録チャプター一覧（クリックで切替）
              </div>
              {activeSchool.videoShowcase.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setActiveChapterIdx(idx);
                    setIsPlaying(true);
                    setProgress(15);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    idx === activeChapterIdx
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 hover:bg-white'
                  }`}
                >
                  <div className="text-[11px] font-mono tabular-nums text-emerald-700 font-semibold">
                    {ch.timeRange}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{ch.title}</div>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{ch.summary}</p>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-xs font-bold text-slate-900">
                {activeSchool.soccerProfile.coachName}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeSchool.videoShowcase.coachQuote}
              </p>
              <button
                type="button"
                onClick={() => onSelectSchool(activeSchool, 'overview')}
                className="w-full mt-2 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {activeSchool.shortName}の内申基準・施設詳細を開く
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Active Players & GRANDE FC Alumni Testimonials */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              現役選手・GRANDE FC出身先輩のリアル体験談ライブラリ
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              「中1の時の内申点はいくつだった？」「東京の自宅からの通学は大変？」「寮のご飯や勉強時間は？」など、先輩たちの本音を網羅しています。
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {[
              {id: 'all', label: 'すべての体験談'},
              {id: 'commute', label: '東京都内から自宅通学'},
              {id: 'dorm', label: '寮生活を選択'},
              {id: 'highNaishin', label: '内申35以上・文武両道'},
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setStoryFilter(f.id as typeof storyFilter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  storyFilter === f.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {allTestimonials.map((item) => (
            <article
              key={item.id}
              className="rounded-xl bg-white border border-slate-200 p-6 space-y-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-bold text-slate-900">{item.school.name}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-emerald-700">
                      {item.juniorHighClub} 出身
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {item.studentName}（{item.grade}）
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.residenceOrigin}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-700">{item.commuteOrDorm}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.headline}</h3>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono tabular-nums text-xs">
                  <div className="px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="font-sans text-[11px] text-slate-500">
                      中学時代の9教科内申推移
                    </div>
                    <div className="font-bold text-slate-900 text-sm">
                      中1: {item.naishinAtJhs1} ➔ 中3: {item.naishinAtJhs3} / 45
                    </div>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="font-sans text-[11px] text-emerald-700">合格ルート</div>
                    <div className="font-sans font-bold text-emerald-950 text-xs">
                      {item.admissionRoute}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs leading-relaxed">
                <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900">① 志望理由とクラブとの繋がり</div>
                  <p className="text-slate-700">{item.whyChoseSchool}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900">② 内申点アップの工夫と両立</div>
                  <p className="text-slate-700">{item.soccerAndStudyBalance}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                  <div className="font-bold text-slate-900">③ 施設・グラウンド・寮/通学</div>
                  <p className="text-slate-700">{item.facilityAndDormImpression}</p>
                </div>
                <div className="p-4 rounded-lg bg-emerald-50/70 border border-emerald-200/80 space-y-1.5">
                  <div className="font-bold text-emerald-950">
                    ④ GRANDE FCの後輩（中1）へのアドバイス
                  </div>
                  <p className="text-emerald-900">{item.adviceForJhs1}</p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onSelectSchool(item.school, 'overview')}
                  className="text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  {item.school.shortName}の推薦内申・進学実績を見る →
                </button>
                <button
                  type="button"
                  onClick={() => onOpenScoutChat(item.school.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  {item.school.shortName}の練習会時期・スカウト基準を見る
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
