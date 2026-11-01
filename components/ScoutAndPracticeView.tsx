'use client';

import React, {useState, useMemo} from 'react';
import {
  Search,
  Calendar,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ClipboardCheck,
  Award,
  Compass,
  Users,
  CheckSquare,
  Square,
  ArrowRight,
} from 'lucide-react';
import {
  HighSchoolData,
  RegionCategory,
  getSchoolScoutingIntelligence,
} from '@/lib/data/schools-data';
import {PlayerProfile, calculateNaishinTotals} from '@/lib/data/career-guide-data';

interface ScoutAndPracticeViewProps {
  schools: HighSchoolData[];
  playerProfile: PlayerProfile;
  onSelectSchoolModal: (
    school: HighSchoolData,
    initialTab?: 'overview' | 'video' | 'testimonials' | 'career'
  ) => void;
  initialSelectedSchoolId?: string | null;
}

const SCOUT_MECHANISM_CARDS = [
  {
    step: 'ルート① クラブ監督・スタッフ経由の推薦（最重要・主流）',
    timing: '中3の4月〜8月（早い選手は中2冬から視察対象）',
    title: 'GRANDE FCと高校指導者のパイプによる「練習会派遣・スカウト声かけ」',
    description:
      'GRANDE FCのように毎年多くの選手を強豪校へ送り出している街クラブには、春〜夏の関東U-15リーグやクラブユース選手権、フェスティバルに各高校の監督・スカウトが直接視察に訪れます。高校側からクラブ監督へ「〇〇番の選手を練習会に呼んでほしい」と声がかかるケースと、選手・保護者の希望をクラブ監督に伝えて高校の練習会（非公開の推薦練習会含む）へ送り出してもらうケースがあります。',
    keyPoint:
      '個人で勝手に動く前に、中2の冬〜中3の春に必ず「どの高校を目指したいか」「今の内申点はいくつか」をGRANDE FCの監督・学年コーチに共有しておくことが最重要です。',
  },
  {
    step: 'ルート② 高校サッカー部公式HPからの「公募練習会・セレクション」参加',
    timing: '中3の5月中旬〜8月下旬（要項発表は5月〜6月がピーク）',
    title: 'Webエントリー形式で誰でも挑戦できる「夏休み練習会・セレクション」',
    description:
      '多くの私立・公立強豪校では、5月〜7月頃にサッカー部公式HPや学校HPで「中学3年生対象 練習会・セレクション」の申込フォームを公開します。ここでは50m走などのフィジカル測定やゲーム形式（紅白戦）が行われ、高校の指導スタッフからA/B/C評価を受けます（※申込時に「所属クラブ代表者の承諾印・署名」が必要な高校がほとんどです）。',
    keyPoint:
      '人気の練習会は公開から数日で定員に達することがあります。中3の5月以降は志望校の公式HPを週1回チェックしましょう。',
  },
  {
    step: 'ルート③ 個別相談会での「内申確約（単願・併願優遇）」＋サッカー部入部',
    timing: '中3の9月〜11月（学校説明会・個別相談会）',
    title: '高い内申点を武器に「学業推薦・併願優遇」で合格してサッカー部へ入る道',
    description:
      '「夏の練習会では特待枠に入らなかった」「都立や他校と併願したい」という場合でも、内申点（9科または5科）が学校の基準を満たしていれば、秋の個別相談会で合格の可能性（単願・併願優遇や学業特待）を確認できます。ただし、全国常連の強豪校では「一般入試・併願での入部制限（事前の練習会参加が必須）」がある学校と、制限なく入部できる学校に分かれるため事前確認が必須です。',
    keyPoint:
      '中1・中2から内申点を9科34〜38以上に高めておくと、「スポーツ推薦」だけでなく「学業特待・併願ルート」という強力なカードが持てます。',
  },
];

const ANNUAL_SCOUT_CALENDAR = [
  {
    season: '春（4月〜6月）',
    tournaments: '関東U-15サッカーリーグ ／ 日本クラブユース選手権（U-15）都道府県・関東予選',
    scoutAction:
      '各高校のスカウト担当者が週末の公式戦や強豪クラブ同士の練習試合を視察し、「今年のGRANDE FCにどんな特徴の選手がいるか」をリストアップする時期。また、5月下旬頃から各高校の夏休み練習会の要項が出始めます。',
    playerParentAction:
      '中1・中2生は公式戦やトレセン、高校との練習試合（B戦含む）で自分の武器（展開力、球際、スピードなど）をアピール。中3生は1学期中間・期末テストで過去最高の内申点を狙う。',
  },
  {
    season: '夏（7月〜8月）',
    tournaments: '各高校の練習会・セレクション最盛期 ／ 夏の全国大会・関東サマーフェスティバル',
    scoutAction:
      '高校サッカー推薦の【最大の天王山】。各高校のグラウンドに中学生が集まり実技選考が行われます。特待生（S・A・B）やスポーツ推薦単願の枠は、8月中旬〜下旬には第1次内々定が出揃い始めます。',
    playerParentAction:
      '7月中旬に出る「中3・1学期の通知表（内申点）」のコピーを持って練習会・面談へ。保護者も必ずグラウンドや寮、最寄り駅からの通学経路を自分の目で確認する。',
  },
  {
    season: '秋（9月〜11月）',
    tournaments: '高円宮杯 JFA U-15サッカーリーグ・トーナメント ／ 各高校の個別相談会',
    scoutAction:
      '実技面で内々定（練習会合格）を得た選手が、中学校の成績（内申点・出欠記録）を持って高校の「個別相談会」に参加し、出願の最終確認（内諾）を行う時期。',
    playerParentAction:
      '東京都在住者が埼玉・関東の私立高校を受ける場合、東京の中学校の9教科（または5教科）評定と欠席日数が推薦基準をクリアしているかを高校担当者と正式に照合する。',
  },
  {
    season: '冬（12月〜3月）',
    tournaments: '1月〜2月 推薦・一般入試本番 ／ 2月〜3月 新入生練習参加・入寮準備',
    scoutAction:
      '埼玉県・千葉県・栃木県・茨城県などの私立入試は1月中旬〜下旬、東京都・神奈川県の入試は2月上旬〜中旬に実施。合格後、春休みの遠征や「関東ルーキーリーグ（U-16）」に向けた新入生トレーニングが始まります。',
    playerParentAction:
      '合格後も油断せず、高校の150〜200名規模の部内競争でスタートダッシュを切るために、持久力・体幹トレーニングと高校基礎英語・数学の予習を進める。',
  },
];

const PARENT_CONSULTATION_CHECKLIST = [
  {
    id: 'chk-1',
    category: '内申・出願条件',
    question:
      '東京都在住・都内公立中学校からの出願の場合、北辰テスト等の模試なしで「学校の通知表（9科または5科内申）」のみでスポーツ推薦・単願の相談が可能か？',
  },
  {
    id: 'chk-2',
    category: '内申・出願条件',
    question:
      '推薦基準に見られるのは「中3の1学期内申」「2学期内申」「中2学年末を含む複数年」のどれか？また「評定に1や2がある場合の不可条件」や「3年間の欠席・遅刻日数の上限」は何日か？',
  },
  {
    id: 'chk-3',
    category: '特待・学費・助成金',
    question:
      'スポーツ特待生（S・A・B）に選ばれた場合、免除されるのは「入学金・授業料」のみか、「施設費・寮費」も含まれるか？また、怪我等で長期離脱した場合でも3年間特待資格は維持されるか？',
  },
  {
    id: 'chk-4',
    category: '特待・学費・助成金',
    question:
      '東京都在住のまま埼玉県・千葉県等の高校へ自宅通学する場合、「東京都の私立高校授業料軽減助成金（年最大約48.4万円）」の手続きと学校独自の奨学金の兼ね合いはどうなるか？',
  },
  {
    id: 'chk-5',
    category: '練習環境・カテゴリー',
    question:
      '部員全員が人工芝グラウンドで練習できるか（AチームとB/C/Dチームで練習場所や時間帯、指導スタッフはどう分かれているか）？1年生対象の「ルーキーリーグ」への参戦カテゴリーは？',
  },
  {
    id: 'chk-6',
    category: '寮・通学・卒業後進路',
    question:
      '（寮希望の場合）寮の空き状況、月額総額（朝昼夕3食・光熱費込）、門限、テスト前の学習時間ルールは？（通学希望の場合）朝練の頻度と、最終下校時刻は何時か？',
  },
  {
    id: 'chk-7',
    category: '寮・通学・卒業後進路',
    question:
      'サッカー部員が所属するコース（アスリートコース／進学コース等）からでも、GMARCHや日東駒専などの「大学指定校推薦枠」や「付属大学内部推薦枠」を利用できるか？',
  },
];

export default function ScoutAndPracticeView({
  schools,
  playerProfile,
  onSelectSchoolModal,
  initialSelectedSchoolId,
}: ScoutAndPracticeViewProps) {
  const [regionFilter, setRegionFilter] = useState<'すべて' | RegionCategory>('すべて');
  const [routeFilter, setRouteFilter] = useState<'すべて' | 'クラブ推薦重視' | 'Web公募練習会あり'>('すべて');
  const [searchQuery, setSearchQuery] = useState('');
  const [checkedQuestions, setCheckedQuestions] = useState<string[]>(['chk-1', 'chk-4']);

  const naishinTotals = useMemo(
    () => calculateNaishinTotals(playerProfile.grades),
    [playerProfile.grades]
  );

  const toggleQuestionCheck = (id: string) => {
    setCheckedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredSchools = useMemo(() => {
    return schools.filter((s) => {
      if (regionFilter !== 'すべて' && s.regionCategory !== regionFilter) return false;
      const intel = getSchoolScoutingIntelligence(s);
      if (
        routeFilter === 'クラブ推薦重視' &&
        intel.entryRouteType !== 'クラブ監督推薦＋練習会'
      ) {
        return false;
      }
      if (
        routeFilter === 'Web公募練習会あり' &&
        intel.entryRouteType !== '公式Web公募練習会＋クラブ推薦'
      ) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          s.name.toLowerCase().includes(q) ||
          s.prefecture.toLowerCase().includes(q) ||
          intel.positionEvaluationPoints.toLowerCase().includes(q) ||
          intel.selectionMonths.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [schools, regionFilter, routeFilter, searchQuery]);

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <section className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 space-y-4">
        <div className="text-xs font-semibold text-emerald-400">
          SCOUTING MECHANISM & SELECTION SCHEDULE INTELLIGENCE
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          高校サッカースカウト視察の仕組み ＆ 全16校の練習会・推薦条件完全データ
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          街クラブ（GRANDE FC）の選手がどのように高校スカウトの目に留まり、いつ練習会・セレクションに参加し、どの内申点でスポーツ推薦や特待生の内諾を得るのか。実際の進路決定プロセスと各校の評価基準を網羅しています。
        </p>
      </section>

      {/* Section 1: The 3 Real-World Scouting & Recommendation Routes */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            1. 街クラブ（GRANDE FC）から強豪高校サッカー部へ進む「3つの実ルート」
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            実際の高校サッカー界では、アプリ等から個人でいきなり交渉するのではなく、以下の3つのルートで進路が決まります。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SCOUT_MECHANISM_CARDS.map((card) => (
            <div
              key={card.step}
              className="rounded-xl bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700">{card.step}</span>
                </div>
                <div className="text-[11px] font-mono tabular-nums text-slate-500">
                  時期目安：{card.timing}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-xs text-emerald-950">
                <span className="font-bold block mb-0.5">中1・保護者への重要ポイント：</span>
                {card.keyPoint}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Annual Scouting & Practice Session Calendar */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            2. 高校スカウトは「いつ・どの大会」を見に来るのか？（年間視察＆練習会カレンダー）
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            中学3年生の夏になってから慌てないために、中1・中2のうちから知っておくべき年間サイクルです。
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="py-3.5 px-4 font-bold text-slate-900 w-36">時期</th>
                <th className="py-3.5 px-4 font-bold text-slate-900 w-64">
                  スカウトが視察する主な大会・イベント
                </th>
                <th className="py-3.5 px-4 font-bold text-slate-900">
                  高校スカウト・指導者の裏側の動き
                </th>
                <th className="py-3.5 px-4 font-bold text-slate-900 w-72">
                  選手・保護者がやるべきアクション
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {ANNUAL_SCOUT_CALENDAR.map((row) => (
                <tr key={row.season} className="hover:bg-slate-50/70">
                  <td className="py-4 px-4 align-top font-bold text-slate-900">{row.season}</td>
                  <td className="py-4 px-4 align-top font-semibold text-emerald-800 leading-relaxed">
                    {row.tournaments}
                  </td>
                  <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                    {row.scoutAction}
                  </td>
                  <td className="py-4 px-4 align-top text-slate-700 leading-relaxed bg-slate-50/50">
                    {row.playerParentAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: All 16 Schools Practice Session Timing & Scout Evaluation Criteria */}
      <section className="space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              3. 高校別「練習会・セレクション開催時期 ＆ スカウト評価基準・足切り条件」一覧
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              各高校の練習会が例年いつ行われ、どう申し込むのか、またスカウトがピッチ上でどこを見ているかを網羅しています。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="高校名や特徴で検索..."
                className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg"
              />
            </div>

            <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
              {(['すべて', '埼玉県', '東京都', '関東圏', '全国寮完備'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegionFilter(r)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    regionFilter === r
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5">
          {filteredSchools.map((school) => {
            const intel = getSchoolScoutingIntelligence(school);
            const isHighlighted = initialSelectedSchoolId === school.id;
            const isNaishinOk =
              naishinTotals.nineSubjects >= school.naishinCriteria.sportsRecommendation9;

            return (
              <article
                key={school.id}
                className={`rounded-xl bg-white border p-6 space-y-4 transition-colors ${
                  isHighlighted
                    ? 'border-emerald-600 ring-2 ring-emerald-600/20'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-700">{school.prefecture}</span>
                      <span aria-hidden="true">·</span>
                      <span>{school.type}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald-700 font-semibold">{school.league}</span>
                      <span aria-hidden="true">·</span>
                      <span>GRANDE FC OB過去5年 {school.soccerProfile.grandeFcObCountLast5Years}名進学</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{school.name}</h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0 font-mono tabular-nums text-xs">
                    <div className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                      <span className="font-sans text-slate-500">例年の練習会時期：</span>
                      <span className="font-sans font-bold text-slate-900">
                        {intel.selectionMonths}
                      </span>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-lg border font-sans font-bold ${
                        isNaishinOk
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                          : 'bg-amber-50 border-amber-200 text-amber-800'
                      }`}
                    >
                      推薦内申目安: 9科 {school.naishinCriteria.sportsRecommendation9}（あなた:{' '}
                      {naishinTotals.nineSubjects}）
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
                  <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                    <div className="font-bold text-slate-900">
                      ① 練習会・セレクション申込経路（{intel.entryRouteType}）
                    </div>
                    <p className="text-slate-700">{intel.entryMethodDetail}</p>
                    <div className="pt-1 text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">主な視察大会：</span>
                      {intel.scoutVisitedTournaments.join(' ／ ')}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                    <div className="font-bold text-slate-900">
                      ② スカウトが求める選手像・実技評価ポイント
                    </div>
                    <p className="text-slate-700">{intel.positionEvaluationPoints}</p>
                    <div className="pt-1 text-[11px] text-emerald-800 font-medium">
                      GRANDE FCとの相性：{school.soccerProfile.grandeFcFitReason}
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-50 space-y-1.5">
                    <div className="font-bold text-slate-900">
                      ③ 内申点・欠席日数の足切りラインと個別相談の注意点
                    </div>
                    <p className="text-slate-700">{intel.cutoffAndAttendanceRule}</p>
                    <div className="pt-1 text-[11px] text-slate-600">
                      特待ランク：{school.naishinCriteria.scholarshipRanks.map((r) => r.rank).join(' / ')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-800">
                      説明会・練習会での確認推奨ポイント：
                    </span>
                    {intel.consultationQuestions[0]}
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectSchoolModal(school, 'overview')}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {school.shortName}の全データ・施設・動画を見る
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Section 4: Parent & Player Consultation Checklist */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            4. 学校説明会・練習会・クラブ進路面談で必ず確認すべき「7つの重要質問リスト」
          </h2>
          <p className="text-xs text-slate-600 mt-1">
            実際に高校の個別相談会やGRANDE FCの進路面談に臨む際、聞き漏らしを防ぐためのチェックシートです。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PARENT_CONSULTATION_CHECKLIST.map((item) => {
            const isChecked = checkedQuestions.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleQuestionCheck(item.id)}
                className="text-left p-4 rounded-xl border border-slate-200 hover:border-emerald-500 bg-slate-50/50 flex items-start gap-3 transition-colors cursor-pointer"
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-emerald-700">{item.category}</div>
                  <div
                    className={`leading-relaxed ${
                      isChecked ? 'line-through text-slate-400' : 'text-slate-800 font-medium'
                    }`}
                  >
                    {item.question}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
