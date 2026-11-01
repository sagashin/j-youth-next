'use client';

import React, {useState, useMemo} from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Compass,
  Award,
  Calendar,
  ArrowRight,
  CheckSquare,
  Square,
} from 'lucide-react';
import {HighSchoolData} from '@/lib/data/schools-data';
import {
  PlayerProfile,
  SubjectGrades,
  calculateNaishinTotals,
  CAREER_ROADMAP_STEPS,
  ADMISSION_ROUTES_COMPARISON,
  CROSS_BORDER_INSIGHTS,
} from '@/lib/data/career-guide-data';

interface CareerGuideAndSimulatorViewProps {
  schools: HighSchoolData[];
  playerProfile: PlayerProfile;
  onUpdateGrades: (newGrades: SubjectGrades) => void;
  onSelectSchool: (
    school: HighSchoolData,
    initialTab?: 'overview' | 'video' | 'testimonials' | 'career'
  ) => void;
  completedChecklistIds: string[];
  onToggleChecklistItem: (itemId: string) => void;
}

const SUBJECT_LABELS: {key: keyof SubjectGrades; label: string; isFiveCore: boolean}[] = [
  {key: 'japanese', label: '国語', isFiveCore: true},
  {key: 'social', label: '社会', isFiveCore: true},
  {key: 'math', label: '数学', isFiveCore: true},
  {key: 'science', label: '理科', isFiveCore: true},
  {key: 'english', label: '英語', isFiveCore: true},
  {key: 'music', label: '音楽', isFiveCore: false},
  {key: 'art', label: '美術', isFiveCore: false},
  {key: 'pe', label: '保健体育', isFiveCore: false},
  {key: 'techHome', label: '技術・家庭', isFiveCore: false},
];

export default function CareerGuideAndSimulatorView({
  schools,
  playerProfile,
  onUpdateGrades,
  onSelectSchool,
  completedChecklistIds,
  onToggleChecklistItem,
}: CareerGuideAndSimulatorViewProps) {
  const [selectedRoadmapIdx, setSelectedRoadmapIdx] = useState<number>(0);

  const totals = useMemo(
    () => calculateNaishinTotals(playerProfile.grades),
    [playerProfile.grades]
  );

  const handleGradeChange = (subject: keyof SubjectGrades, val: number) => {
    onUpdateGrades({
      ...playerProfile.grades,
      [subject]: val,
    });
  };

  const applyPreset = (type: 'current' | 'all4' | 'topAcademic' | 'sportsMin') => {
    if (type === 'current') {
      onUpdateGrades({
        japanese: 3,
        social: 4,
        math: 4,
        science: 3,
        english: 4,
        music: 3,
        art: 4,
        pe: 5,
        techHome: 4,
      });
    } else if (type === 'all4') {
      onUpdateGrades({
        japanese: 4,
        social: 4,
        math: 4,
        science: 4,
        english: 4,
        music: 4,
        art: 4,
        pe: 5,
        techHome: 4,
      });
    } else if (type === 'topAcademic') {
      onUpdateGrades({
        japanese: 4,
        social: 4,
        math: 5,
        science: 4,
        english: 5,
        music: 4,
        art: 4,
        pe: 5,
        techHome: 5,
      });
    } else if (type === 'sportsMin') {
      onUpdateGrades({
        japanese: 3,
        social: 3,
        math: 3,
        science: 3,
        english: 3,
        music: 3,
        art: 4,
        pe: 5,
        techHome: 3,
      });
    }
  };

  const schoolSimulationGroups = useMemo(() => {
    const bothOk: HighSchoolData[] = [];
    const sportsRecOk: HighSchoolData[] = [];
    const challengeRange: HighSchoolData[] = [];

    schools.forEach((s) => {
      if (totals.nineSubjects >= s.naishinCriteria.heigan9) {
        bothOk.push(s);
      } else if (totals.nineSubjects >= s.naishinCriteria.sportsRecommendation9) {
        sportsRecOk.push(s);
      } else {
        challengeRange.push(s);
      }
    });

    return {bothOk, sportsRecOk, challengeRange};
  }, [schools, totals.nineSubjects]);

  const activeRoadmap = CAREER_ROADMAP_STEPS[selectedRoadmapIdx] || CAREER_ROADMAP_STEPS[0];

  return (
    <div className="space-y-10 pb-16">
      {/* Section 1: Interactive 9-Subject Naishin Simulator */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">
              INTERACTIVE GRADE & ADMISSION SIMULATOR
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              9教科内申点シミュレーター ＆ 推薦出願可能校リアルタイム判定
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              各教科の評定（1〜5）をクリックして変更すると、スポーツ推薦（単願）・併願優遇・学業特待で狙える強豪校が即座に変わります。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 mr-1">シミュレーション一括セット：</span>
            <button
              type="button"
              onClick={() => applyPreset('sportsMin')}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
            >
              基礎ライン (9科30)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('current')}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg cursor-pointer"
            >
              現在の中1成績 (9科34)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('all4')}
              className="px-2.5 py-1.5 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg cursor-pointer"
            >
              目標：オール4＋体育5 (9科37)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('topAcademic')}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg cursor-pointer"
            >
              難関付属・特待ライン (9科40)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 9-Subject Controls */}
          <div className="lg:col-span-6 space-y-4">
            <div className="grid grid-cols-3 gap-3 font-mono tabular-nums">
              <div className="p-4 rounded-xl bg-slate-900 text-white">
                <div className="text-xs font-sans text-slate-400">9教科合計（45満点）</div>
                <div className="text-2xl font-bold text-emerald-400 mt-1">
                  {totals.nineSubjects}
                  <span className="text-xs text-slate-400 font-normal"> / 45</span>
                </div>
                <div className="text-[11px] font-sans text-slate-400 mt-0.5">
                  9科平均評定: {totals.average9}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-sans text-slate-500">5教科合計（25満点）</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {totals.fiveSubjects}
                  <span className="text-xs text-slate-400 font-normal"> / 25</span>
                </div>
                <div className="text-[11px] font-sans text-slate-500 mt-0.5">
                  主要5科（英数国理社）
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-sans text-slate-500">東京都換算内申</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">
                  {totals.tokyoConverted65}
                  <span className="text-xs text-slate-400 font-normal"> / 65</span>
                </div>
                <div className="text-[11px] font-sans text-slate-500 mt-0.5">
                  実技4科×2倍換算
                </div>
              </div>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl p-4 bg-slate-50/40">
              {SUBJECT_LABELS.map((sub) => {
                const currentVal = playerProfile.grades[sub.key];
                return (
                  <div
                    key={sub.key}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 w-20">{sub.label}</span>
                      <span className="text-[11px] text-slate-500">
                        {sub.isFiveCore ? '主要5教科' : '実技4教科'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono tabular-nums">
                      {[1, 2, 3, 4, 5].map((score) => (
                        <button
                          key={score}
                          type="button"
                          onClick={() => handleGradeChange(sub.key, score)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                            currentVal === score
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          {score}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Real-Time School Eligibility Classification */}
          <div className="lg:col-span-6 space-y-4">
            {/* Group 1: Both Sports & Academic/Heigan Clear */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    スポーツ推薦 ＆ 併願・上位コースともに目安クリア（
                    {schoolSimulationGroups.bothOk.length}校）
                  </h3>
                </div>
                <span className="text-xs font-semibold text-emerald-700">学業特待も視野</span>
              </div>
              <p className="text-xs text-slate-600">
                サッカーの実技評価に加え、高い内申点を活かして上位進学コースや学業奨学生制度も狙える非常に有利な状態です。
              </p>
              <div className="flex flex-wrap gap-2">
                {schoolSimulationGroups.bothOk.length === 0 ? (
                  <span className="text-xs text-slate-500">
                    9科34〜36以上に上げると、多くの高校で併願基準・上位コース基準もクリアできます。
                  </span>
                ) : (
                  schoolSimulationGroups.bothOk.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectSchool(s, 'overview')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-xs font-bold text-slate-900 hover:bg-emerald-50 transition-colors cursor-pointer"
                    >
                      {s.shortName}（推薦{s.naishinCriteria.sportsRecommendation9} / 併願
                      {s.naishinCriteria.heigan9}）
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Group 2: Sports Recommendation Clear */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    スポーツ推薦（単願）目安クリア圏内（
                    {schoolSimulationGroups.sportsRecOk.length}校）
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-600">練習会・実技評価で合格圏</span>
              </div>
              <p className="text-xs text-slate-600">
                中3夏〜秋の練習会・セレクションまたはクラブ経由のスカウト評価を得ることで、スポーツ推薦（単願）で出願可能な水準です。
              </p>
              <div className="flex flex-wrap gap-2">
                {schoolSimulationGroups.sportsRecOk.length === 0 ? (
                  <span className="text-xs text-slate-500">該当校なし</span>
                ) : (
                  schoolSimulationGroups.sportsRecOk.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectSchool(s, 'overview')}
                      className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 hover:border-emerald-600 transition-colors cursor-pointer"
                    >
                      {s.shortName}（スポーツ推薦目安: 9科{s.naishinCriteria.sportsRecommendation9}）
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Group 3: Challenge Range */}
            <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    あと内申アップで届くチャレンジ校（
                    {schoolSimulationGroups.challengeRange.length}校）
                  </h3>
                </div>
                <span className="text-xs font-semibold text-amber-800">中1・中2からの目標設定</span>
              </div>
              <p className="text-xs text-slate-600">
                現在の内申点からあと何ポイント上げればスポーツ推薦基準に届くかを確認しましょう。
              </p>
              <div className="flex flex-wrap gap-2">
                {schoolSimulationGroups.challengeRange.length === 0 ? (
                  <span className="text-xs text-emerald-700 font-semibold">
                    素晴らしい！現在登録されている全強豪校のスポーツ推薦目安内申をクリアしています！
                  </span>
                ) : (
                  schoolSimulationGroups.challengeRange.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => onSelectSchool(s, 'overview')}
                      className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-slate-900 hover:bg-amber-50 transition-colors cursor-pointer"
                    >
                      {s.shortName}（あと+
                      {s.naishinCriteria.sportsRecommendation9 - totals.nineSubjects} / 目安9科
                      {s.naishinCriteria.sportsRecommendation9}）
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Tokyo Resident x Saitama Club (GRANDE FC) Cross-Border Guide */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            【東京都在住 × 埼玉・GRANDE FC所属】ならではの進路・越境受験 4大重要ルール
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            住まいと中学校は東京都、クラブチームは埼玉県（GRANDE FC）という環境を最大限に有利に活かすための必須知識です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CROSS_BORDER_INSIGHTS.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-xl bg-white border border-slate-200 space-y-2.5"
            >
              <div className="text-xs font-semibold text-emerald-700">{item.badge}</div>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Comparison Matrix of Admission Routes */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            高校サッカー進路・推薦入試 4つの選択肢と条件比較
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            「スポーツ推薦（特待）」「一般スポーツ単願」「学業併願・文武両道」「Jユース昇格」の動き出し時期と内申・学費の違いを整理しています。
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3.5 px-4 font-bold text-slate-900 w-52">進路・推薦区分</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 w-44">勝負時期・スケジュール</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 w-48">求められるサッカー評価</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 w-44">目安内申点（9科）</th>
                <th className="py-3.5 px-4 font-bold text-slate-900">学費免除・特徴・注意点</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ADMISSION_ROUTES_COMPARISON.map((row) => (
                <tr key={row.routeType} className="hover:bg-slate-50/70">
                  <td className="py-4 px-4 align-top">
                    <div className="font-bold text-slate-900">{row.routeType}</div>
                    <div className="text-[11px] text-emerald-700 font-medium mt-1">
                      {row.commitment}
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                    {row.timing}
                  </td>
                  <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                    {row.soccerRequirement}
                  </td>
                  <td className="py-4 px-4 align-top font-mono tabular-nums font-semibold text-slate-900">
                    {row.naishinRequirement}
                  </td>
                  <td className="py-4 px-4 align-top space-y-1">
                    <div className="font-bold text-emerald-800">{row.financialBenefit}</div>
                    <p className="text-slate-600 leading-relaxed">{row.meritAndNote}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: JHS 1st-Year to 3rd-Year Roadmap & Action Checklist */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">
              3-YEAR CAREER ROADMAP FOR GRANDE FC U-13 PLAYER
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              中学1年生から高校合格までの時期別アクションプラン（チェックリスト付）
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              今やるべき項目をクリックしてチェックを入れると、進捗が自動保存されます。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {CAREER_ROADMAP_STEPS.map((step, idx) => (
              <button
                key={step.id}
                type="button"
                onClick={() => setSelectedRoadmapIdx(idx)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  idx === selectedRoadmapIdx
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {step.phase}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-semibold">{activeRoadmap.phase}</div>
              <h3 className="text-lg font-bold mt-0.5">{activeRoadmap.title}</h3>
              <p className="text-xs text-slate-300 mt-1">{activeRoadmap.subtitle}</p>
            </div>
            <div className="shrink-0 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-emerald-300 max-w-xs">
              <span className="font-bold text-white block mb-0.5">この時期の最重要目標：</span>
              {activeRoadmap.keyCheckpoint}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Soccer Actions */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                ① サッカー・クラブ活動（GRANDE FC）
              </h4>
              <div className="space-y-2.5">
                {activeRoadmap.soccerActions.map((act, i) => {
                  const itemId = `${activeRoadmap.id}-soccer-${i}`;
                  const checked = completedChecklistIds.includes(itemId);
                  return (
                    <button
                      key={itemId}
                      type="button"
                      onClick={() => onToggleChecklistItem(itemId)}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 transition-colors cursor-pointer"
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          checked ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        {act}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Academic Actions */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                ② 学校の勉強・内申点・資格対策
              </h4>
              <div className="space-y-2.5">
                {activeRoadmap.academicActions.map((act, i) => {
                  const itemId = `${activeRoadmap.id}-acad-${i}`;
                  const checked = completedChecklistIds.includes(itemId);
                  return (
                    <button
                      key={itemId}
                      type="button"
                      onClick={() => onToggleChecklistItem(itemId)}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 transition-colors cursor-pointer"
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          checked ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        {act}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Parent Support Actions */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                ③ 保護者のサポート・情報収集
              </h4>
              <div className="space-y-2.5">
                {activeRoadmap.parentActions.map((act, i) => {
                  const itemId = `${activeRoadmap.id}-parent-${i}`;
                  const checked = completedChecklistIds.includes(itemId);
                  return (
                    <button
                      key={itemId}
                      type="button"
                      onClick={() => onToggleChecklistItem(itemId)}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-slate-200/80 hover:border-emerald-500 transition-colors cursor-pointer"
                    >
                      {checked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={`text-xs leading-relaxed ${
                          checked ? 'line-through text-slate-400' : 'text-slate-700'
                        }`}
                      >
                        {act}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
