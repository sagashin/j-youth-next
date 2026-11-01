export interface SubjectGrades {
  japanese: number;
  social: number;
  math: number;
  science: number;
  english: number;
  music: number;
  art: number;
  pe: number;
  techHome: number;
}

export interface PlayerVideoClip {
  id: string;
  title: string;
  matchInfo: string;
  duration: string;
  tags: string[];
  scoutViewCount: number;
  uploadedAt: string;
}

export interface PlayerProfile {
  name: string;
  grade: '中学1年' | '中学2年' | '中学3年';
  clubTeam: string;
  residence: string;
  schoolLocation: string;
  primaryPosition: 'FW' | 'MF（トップ下・SH）' | 'MF（ボランチ）' | 'DF（SB）' | 'DF（CB）' | 'GK';
  dominantFoot: '右足' | '左足' | '両足';
  heightCm: number;
  weightKg: number;
  sprint50mSec: number;
  strengths: string[];
  careerPreference: '通学優先（東京・埼玉）' | '寮生活も視野（関東・全国）' | '文武両道・難関大志向' | '高卒プロ・全国制覇最優先';
  grades: SubjectGrades;
  videoClips: PlayerVideoClip[];
}

export interface ChatMessage {
  id: string;
  sender: 'scout' | 'player';
  senderName: string;
  timestamp: string;
  text: string;
}

export interface ScoutThread {
  id: string;
  schoolId: string;
  schoolName: string;
  prefecture: string;
  scoutName: string;
  scoutRole: string;
  offerType: '練習会特別招待・視察済' | '文武両道特待候補' | 'スカウト注目リスト登録';
  status: '交渉中・質問受付中' | '新着オファー' | '練習会日程調整中';
  lastUpdated: string;
  scoutNoteOnPlayer: string;
  quickQuestions: string[];
  messages: ChatMessage[];
}

export interface PracticeSessionEvent {
  id: string;
  schoolId: string;
  schoolName: string;
  prefecture: string;
  title: string;
  targetGrades: string;
  date: string;
  time: string;
  venue: string;
  category: 'U-13/U-14 早期見学会・合同練習' | 'U-15 セレクション・練習会' | '施設・寮見学＆個別進路相談会';
  remainingSlots: number;
  requirements: string;
  applied: boolean;
  applicationNote?: string;
}

export interface RoadmapStep {
  id: string;
  phase: '中学1年（春〜秋）' | '中学1年（冬）〜中学2年（夏）' | '中学2年（秋〜冬）' | '中学3年（春〜夏）' | '中学3年（秋〜冬）';
  title: string;
  subtitle: string;
  soccerActions: string[];
  academicActions: string[];
  parentActions: string[];
  keyCheckpoint: string;
}

export const DEFAULT_PLAYER_PROFILE: PlayerProfile = {
  name: '山田 颯太',
  grade: '中学1年',
  clubTeam: 'GRANDE FC（埼玉・U-13）',
  residence: '東京都（自宅）',
  schoolLocation: '東京都内の公立中学校',
  primaryPosition: 'MF（ボランチ）',
  dominantFoot: '右足',
  heightCm: 161,
  weightKg: 50,
  sprint50mSec: 6.7,
  strengths: ['視野の広さ・スルーパス', '狭い局面でのファーストタッチ', '90分間落ちない運動量'],
  careerPreference: '寮生活も視野（関東・全国）',
  grades: {
    japanese: 3,
    social: 4,
    math: 4,
    science: 3,
    english: 4,
    music: 3,
    art: 4,
    pe: 5,
    techHome: 4,
  },
  videoClips: [
    {
      id: 'vid-1',
      title: '関東U-13リーグ vs J下部組織 ビルドアップ＆ワンタッチ前進集',
      matchInfo: 'GRANDE FC U-13 公式戦（さいたま市人工芝G）',
      duration: '02:15',
      tags: ['ボランチ', 'ビルドアップ', 'ターン＆スルーパス'],
      scoutViewCount: 28,
      uploadedAt: '2026年10月18日',
    },
    {
      id: 'vid-2',
      title: '埼玉県クラブユースU-13 紅白戦・中盤守備強度＆ミドルシュート',
      matchInfo: 'GRANDE FC トレーニングマッチ',
      duration: '01:48',
      tags: ['インターセプト', '推進力', 'ミドルシュート'],
      scoutViewCount: 19,
      uploadedAt: '2026年10月25日',
    },
  ],
};

export const INITIAL_SCOUT_THREADS: ScoutThread[] = [
  {
    id: 'scout-shohei',
    schoolId: 'shohei',
    schoolName: '昌平高等学校',
    prefecture: '埼玉県',
    scoutName: '佐藤 健一',
    scoutRole: 'サッカー部 強化・育成スカウト担当',
    offerType: '練習会特別招待・視察済',
    status: '新着オファー',
    lastUpdated: '本日 14:20',
    scoutNoteOnPlayer:
      'GRANDE FC U-13でのトレーニングマッチ映像を確認しました。中盤での受ける前の首振り（スキャン）と前を向くファーストタッチは昌平のスタイルに非常に合致しています。現在の9科内申（34）を中3まで維持・向上できれば、選抜進学コースや特待候補としても十分視野に入ります。',
    quickQuestions: [
      'スポーツ推薦（特待）に必要な内申点の目安を教えてください',
      '東京の自宅から通学している部員はどれくらいいますか？',
      '中学1年生のうちに練習見学や施設見学に行くことは可能ですか？',
      'GRANDE FC出身の先輩はどのコースに多く在籍していますか？',
    ],
    messages: [
      {
        id: 'm1',
        sender: 'scout',
        senderName: '昌平高校 佐藤スカウト',
        timestamp: '10月30日 18:00',
        text: '山田選手、保護者様。はじめまして、昌平高校サッカー部スカウト担当の佐藤です。日頃よりGRANDE FC様からは素晴らしい技術を持った選手に多数進学いただいております。',
      },
      {
        id: 'm2',
        sender: 'scout',
        senderName: '昌平高校 佐藤スカウト',
        timestamp: '本日 14:20',
        text: '登録されているU-13リーグのビルドアップ映像を拝見しました。ボランチでのボールの置き所が大変素晴らしいですね。中学1年生の段階から進路を意識されているとのこと、ぜひ一度杉戸キャンパスの人工芝グラウンド見学やU-13/U-14向けキャリア説明会にお越しになりませんか？ご質問があれば何でもお送りください。',
      },
    ],
  },
  {
    id: 'scout-teikyo',
    schoolId: 'teikyo',
    schoolName: '帝京高等学校',
    prefecture: '東京都',
    scoutName: '高橋 誠',
    scoutRole: 'サッカー部 リクルート・強化担当',
    offerType: 'スカウト注目リスト登録',
    status: '交渉中・質問受付中',
    lastUpdated: '昨日 19:45',
    scoutNoteOnPlayer:
      '東京都在住でありながら埼玉の強豪街クラブ・GRANDE FCで揉まれている点を高く評価しています。十条・板橋キャンパスは都内ご自宅からの通学も、さいたま市方面への移動も非常にスムーズです。',
    quickQuestions: [
      'アスリートコースの推薦基準と1日の時間割を知りたいです',
      '東京都の私立授業料助成制度やアスリート特待について教えてください',
      '中1・中2でもプレミアリーグのホーム戦や練習を見学できますか？',
    ],
    messages: [
      {
        id: 'tk-m1',
        sender: 'scout',
        senderName: '帝京高校 高橋スカウト',
        timestamp: '昨日 19:45',
        text: '山田選手、帝京高校サッカー部の高橋です。東京都在住でGRANDE FC所属というプロフィールとプレー動画を拝見し、注目選手リストに登録させていただきました。帝京では近年、埼玉の街クラブ出身の技術の高いMFが多く主力としてプレミアリーグで活躍しています。進路や内申点について気になる点があればいつでもご相談ください。',
      },
    ],
  },
  {
    id: 'scout-kugayama',
    schoolId: 'kokugakuin-kugayama',
    schoolName: '國學院大學久我山高等学校',
    prefecture: '東京都',
    scoutName: '渡辺 隆之',
    scoutRole: 'サッカー部 育成・進路アドバイザー',
    offerType: '文武両道特待候補',
    status: '交渉中・質問受付中',
    lastUpdated: '2日前',
    scoutNoteOnPlayer:
      '現在9科内申34（5科18）と学業面もバランスよく頑張っており、あと+1〜2（9科35〜36以上）伸ばせば久我山の文化・スポーツ優遇基準にしっかり届きます。GRANDE FCのパスサッカーと久我山のスタイルは相性抜群です。',
    quickQuestions: [
      '文化・スポーツ優遇で必要な内申点（5科・9科）の条件は？',
      '1日2時間・朝練なしで早慶MARCHに合格できる学習サポートとは？',
      'GRANDE FC出身の先輩の活躍や進学先大学を教えてください',
    ],
    messages: [
      {
        id: 'kk-m1',
        sender: 'scout',
        senderName: '國學院久我山 渡辺アドバイザー',
        timestamp: '2日前 16:30',
        text: '山田選手、保護者様。國學院久我山高校サッカー部の渡辺です。GRANDE FCさんで磨かれている「止める・蹴る・ワンタッチの連動」は、本校の『美しく勝つ』スタイルに直結します。現在中学1年生で9科34とのことですので、中2・中3で5教科19以上・9教科35以上をキープしていただければ、文武両道での推薦進学が大きく近づきます！',
      },
    ],
  },
  {
    id: 'scout-maebashi',
    schoolId: 'maebashi-ikuei',
    schoolName: '前橋育英高等学校',
    prefecture: '群馬県',
    scoutName: '金子 剛',
    scoutRole: 'サッカー部 スカウト・関東担当',
    offerType: '練習会特別招待・視察済',
    status: '新着オファー',
    lastUpdated: '3日前',
    scoutNoteOnPlayer:
      'ボランチでの展開力と運動量が光っています。前橋育英では毎年GRANDE FC出身の選手が寮生活を通じて大きく成長し、全国選手権やJリーグへと羽ばたいています。',
    quickQuestions: [
      'サッカー部専用寮の費用や食事、部屋割りについて教えてください',
      '体育特待生（S・A・B）の選考時期と内申点の条件は？',
      '東京の実家への帰省頻度や練習休みのスケジュールは？',
    ],
    messages: [
      {
        id: 'mi-m1',
        sender: 'scout',
        senderName: '前橋育英 金子スカウト',
        timestamp: '3日前 15:10',
        text: '山田選手、前橋育英高校サッカー部スカウトの金子です。GRANDE FCさんとは毎年練習試合やフェスティバルで深く交流させていただいております。中盤でゲームを作れるボランチは本校で最も重要なポジションです。寮見学や施設案内は中学1・2年生でも随時歓迎しておりますので、お気軽にご質問ください。',
      },
    ],
  },
  {
    id: 'scout-shizugaku',
    schoolId: 'shizuoka-gakuen',
    schoolName: '静岡学園高等学校',
    prefecture: '静岡県',
    scoutName: '斉藤 雅人',
    scoutRole: 'サッカー部 関東エリアスカウト担当',
    offerType: 'スカウト注目リスト登録',
    status: '交渉中・質問受付中',
    lastUpdated: '4日前',
    scoutNoteOnPlayer:
      '狭い局面を打開するファーストタッチと遊び心のあるパスセンスを高く評価しています。東京駅から新幹線58分の静岡学園で、全国のテクニシャンと切磋琢磨しませんか。',
    quickQuestions: [
      '教養科学科のスポーツ推薦に必要な内申点はいくつですか？',
      '指定寮・下宿の食事サポートや東京からのアクセスについて知りたい',
      'GRANDE FCから進学した先輩はどのように馴染んでいますか？',
    ],
    messages: [
      {
        id: 'sg-m1',
        sender: 'scout',
        senderName: '静岡学園 斉藤スカウト',
        timestamp: '4日前 11:00',
        text: '山田選手、静岡学園サッカー部の斉藤です。GRANDE FCさんの選手は毎年本校でもトップクラスの技術を発揮してくれています。東京から新幹線で1時間弱という距離感も含め、ぜひ将来の選択肢としてシズガクの環境を知っていただければ幸いです。',
      },
    ],
  },
];

export const INITIAL_PRACTICE_EVENTS: PracticeSessionEvent[] = [
  {
    id: 'ev-1',
    schoolId: 'shohei',
    schoolName: '昌平高等学校',
    prefecture: '埼玉県',
    title: '【中1・中2対象】人工芝グラウンド・施設見学会＆プレミアリーグ視察会',
    targetGrades: '中学1年生・中学2年生および保護者',
    date: '2026年11月22日（日）',
    time: '13:00 - 16:30',
    venue: '昌平高校 杉戸キャンパス人工芝グラウンド',
    category: '施設・寮見学＆個別進路相談会',
    remainingSlots: 8,
    requirements: 'クラブチーム所属選手・保護者同伴可（スパイク不要・見学＆個別内申相談あり）',
    applied: false,
  },
  {
    id: 'ev-2',
    schoolId: 'bunan',
    schoolName: '武南高等学校',
    prefecture: '埼玉県',
    title: '【街クラブU-13/U-14向け】技術クリニック＆高校サッカー進路ガイダンス',
    targetGrades: '中学1年生・中学2年生',
    date: '2026年11月29日（日）',
    time: '14:00 - 17:00',
    venue: '武南高校グラウンド（JR西川口駅徒歩10分）',
    category: 'U-13/U-14 早期見学会・合同練習',
    remainingSlots: 12,
    requirements: '所属クラブの活動に支障がないこと・サッカー用具一式持参',
    applied: false,
  },
  {
    id: 'ev-3',
    schoolId: 'teikyo',
    schoolName: '帝京高等学校',
    prefecture: '東京都',
    title: '【東京・埼玉クラブ選手対象】アスリートコース説明会＆トレーニング公開',
    targetGrades: '中学1年生〜中学3年生および保護者',
    date: '2026年12月06日（日）',
    time: '10:00 - 12:30',
    venue: '帝京高校 板橋キャンパス（JR十条駅徒歩10分）',
    category: '施設・寮見学＆個別進路相談会',
    remainingSlots: 6,
    requirements: '事前エントリー制・練習見学後にスカウト担当者への個別質問可能',
    applied: false,
  },
  {
    id: 'ev-4',
    schoolId: 'seibudai',
    schoolName: '西武台高等学校',
    prefecture: '埼玉県',
    title: '第2グラウンド（専用人工芝）オープン練習体験＆フィジカル測定会',
    targetGrades: '中学1年生・中学2年生（U-13/U-14）',
    date: '2026年12月13日（日）',
    time: '15:00 - 18:00',
    venue: '西武台高校 第2グラウンド（新座市）',
    category: 'U-13/U-14 早期見学会・合同練習',
    remainingSlots: 10,
    requirements: '50m走・アジリティ測定＋高校生とのボールワーク体験',
    applied: false,
  },
  {
    id: 'ev-5',
    schoolId: 'maebashi-ikuei',
    schoolName: '前橋育英高等学校',
    prefecture: '群馬県',
    title: '【関東街クラブ対象】専用グラウンド群＆サッカー部専用寮 見学ツアー',
    targetGrades: '中学1年生・中学2年生および保護者',
    date: '2026年12月20日（日）',
    time: '11:00 - 15:00',
    venue: '前橋育英高校 高崎・前橋グラウンドおよび専用寮',
    category: '施設・寮見学＆個別進路相談会',
    remainingSlots: 5,
    requirements: '寮食（昼食）試食体験付き・要事前予約',
    applied: false,
  },
];

export const CAREER_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: 'step-jhs1-1',
    phase: '中学1年（春〜秋）',
    title: '現在地：クラブでの基礎技術確立と「9教科オール3.5（内申32以上）」の習慣化',
    subtitle: '中学1年生の今だからこそ差がつく、生活リズムと評定の土台づくり',
    soccerActions: [
      'GRANDE FCの練習で「止める・蹴る・運ぶ」の基礎技術と、ボールを受ける前の首振り（スキャン）を徹底する',
      '東京の自宅〜さいたま市のグラウンドまでの移動時間を「睡眠・捕食（おにぎり等）・英単語暗記」に充てるルーティンを作る',
      '自分の得意なプレー（スルーパス、ターン、守備の予測など）を言語化し、試合動画をスマホ・タブレットで振り返る習慣をつける',
    ],
    academicActions: [
      '5教科（英・数・国・理・社）で「3」を無くし「4」を増やす（特に英語・数学は中1の積み残しが命取りになるため最優先）',
      '実技4教科（音・美・保体・技家）は提出物と授業態度を完璧にし、体育5・その他4以上を確保して9科合計32〜36をベースにする',
      '「遅刻・欠席ゼロ」を徹底する（多くの私立強豪校のスポーツ推薦・併願優遇では「3年間の欠席10日以内」などの条件があります）',
    ],
    parentActions: [
      '高校サッカー選手権予選（東京・埼玉）やプレミア／プリンスリーグの試合を親子で1〜2試合観戦し、高校年代のスピード感を肌で感じる',
      '「自宅から通学（東京・埼玉）」か「寮生活もOK（関東・全国）」かの大まかな家庭方針・予算感を話し合っておく',
    ],
    keyCheckpoint: '中1・2学期通知表で「9科32以上（5科17以上）・欠席0」を達成できていれば、ほぼ全ての強豪校のスポーツ推薦土台に乗れます！',
  },
  {
    id: 'step-jhs1-2',
    phase: '中学1年（冬）〜中学2年（夏）',
    title: 'フィジカル成長期のケアと「英検3級〜準2級」の先行取得',
    subtitle: '身長が伸びる時期の怪我予防と、中3で効いてくる資格加点の確保',
    soccerActions: [
      '成長痛（オスグッド等）が起きやすい時期のため、股関節の柔軟性と睡眠8時間・練習直後のタンパク質＆糖質補給を徹底する',
      'U-14カテゴリーでの公式戦・フェスティバルで出場時間を伸ばし、複数ポジション（例：ボランチ＋SBやトップ下）をこなせる戦術眼を養う',
    ],
    academicActions: [
      '中学2年の夏までに「英検3級」、できれば中2冬までに「英検準2級」を取得する（埼玉・東京の私立高校推薦で内申+1〜+2相当の加点になる学校が多数！）',
      '中2の中だるみを防ぎ、9科内申34〜38を目指して定期テスト2週間前からは朝学習・移動時間学習を強化する',
    ],
    parentActions: [
      '気になる高校（昌平、武南、西武台、立教新座、帝京、久我山、前橋育英など）の文化祭や公開試合、学園説明会に足を運ぶ',
      'スマートフォン等で息子の良いプレーシーン（30秒〜2分程度）を少しずつ撮りためておく',
    ],
    keyCheckpoint: '英検3級／準2級を持っていると、中3でサッカーの練習会が重なって忙しい時期に内申加点で圧倒的に有利になります。',
  },
  {
    id: 'step-jhs2-2',
    phase: '中学2年（秋〜冬）',
    title: '志望校タイプ（プロ志向／文武両道／大学付属）の絞り込みとスカウト視察開始',
    subtitle: '早い高校スカウトはU-14の秋冬から関東リーグ・強豪街クラブの視察を始めます',
    soccerActions: [
      '新U-15（最高学年）に向けたチームの中心選手として、声出し・リーダーシップ・切り替えの速さをピッチで体現する',
      'GRANDE FCの先輩（中3生）がどの高校にスポーツ推薦や単願で決まったか、クラブ内で情報を聞いて参考にする',
    ],
    academicActions: [
      '東京都や埼玉県の高校の多くは「中2の学年末内申」または「中3の1学期・2学期内申」を推薦基準に使います。中2の3学期内申で自己ベストを狙う',
    ],
    parentActions: [
      '「第一志望群（スポーツ推薦・単願）」と「併願優遇・学業推薦群」の候補を3〜5校リストアップする',
      '東京都在住者が埼玉県の私立高校を受ける場合のルール（9科内申基準や、必要に応じて中3春からの「埼玉・北辰テスト」受験の有無）を確認する',
    ],
    keyCheckpoint: '中2学年末の9教科内申点が、中3春のクラブ面談での「狙える高校リスト」の基準になります。',
  },
  {
    id: 'step-jhs3-1',
    phase: '中学3年（春〜夏）',
    title: '【最重要期】クラブ監督面談・高校練習会（セレクション）参加・スカウト交渉',
    subtitle: '高校サッカーのスポーツ推薦は「中3の5月〜8月」が事実上の勝負所です！',
    soccerActions: [
      '4月〜6月：関東リーグ・クラブユース選手権で全力アピール（高校の監督・スカウトが多数視察に訪れます）',
      '6月〜8月：GRANDE FCの監督・スタッフと進路相談を行い、志望高校の「練習会・セレクション」にエントリーして参加する',
      '練習会では技術だけでなく「挨拶・返事・球際の姿勢・切り替えの速さ」を100%出し切る',
    ],
    academicActions: [
      '中3・1学期（前期）の定期テストに全力を注ぐ！7月の通知表（内申点）を持って夏の練習会・個別相談に臨むため極めて重要です',
    ],
    parentActions: [
      '練習会参加時に保護者もグラウンドや寮を見学し、特待条件（S/A/Bランクの免除内容）や必要な内申点基準を高校側・クラブ監督とすり合わせる',
    ],
    keyCheckpoint: 'スポーツ推薦（特に強豪校の特待枠）は8月下旬〜9月中旬には内々定（枠の確保）が埋まり始めます。',
  },
  {
    id: 'step-jhs3-2',
    phase: '中学3年（秋〜冬）',
    title: '個別相談会での「確約・内諾」獲得から出願・合格、そして高校サッカー準備へ',
    subtitle: '内申基準をクリアして正式出願し、高1春からのルーキーリーグに向けて身体を作る',
    soccerActions: [
      '進路が内定した後も高円宮杯U-15までクラブでやり切り、冬からは高校生レベルの走力・筋力トレーニングを開始する',
      '進学先高校の練習参加（内定者練習会）が始まる場合は積極的に参加し、高校の戦術とスピードに慣れておく',
    ],
    academicActions: [
      '中3・2学期の期末テストまで気を抜かず、推薦基準の内申点を確実にクリアする',
      '1月〜2月の推薦入試（面接・作文・基礎学力試験）を突破し、高校のクラス分けテストに向けて英語・数学を復習する',
    ],
    parentActions: [
      '9月〜11月の高校個別相談会に通知表・調査書関連資料を持参し、出願確認を行う',
      '1月（埼玉・千葉・茨城等）〜2月（東京・神奈川等）の入試・入学手続き、学生寮または通学定期の手配を進める',
    ],
    keyCheckpoint: '中学卒業までの残り半年間の過ごし方で、高校1年春の「関東ルーキーリーグ」で即メンバー入りできるかが決まります！',
  },
];

export const ADMISSION_ROUTES_COMPARISON = [
  {
    routeType: '① スポーツ推薦（特待生 S・A・Bランク）',
    commitment: '単願（第一志望・合格したら必ず入学）',
    timing: '中3の5月〜8月の試合視察・練習会で内々定 ➔ 10〜11月個別相談 ➔ 1〜2月入試',
    soccerRequirement: '関東リーグ級クラブ主力・トレセン歴・練習会での高評価（高校スカウトからのオファー）',
    naishinRequirement: '9科27〜32以上目安（学校・コースにより異なる。特進や難関校は36以上。欠席日数制限あり）',
    financialBenefit: '入学金・施設費・3年間の授業料が全額または半額免除（さらに寮費補助がある学校も）',
    meritAndNote:
      '最も手厚い待遇で強化指定メンバーとして迎えられます。GRANDE FCのような強豪街クラブからは毎年このルートで進学する選手が多数います。',
  },
  {
    routeType: '② スポーツ推薦（一般スポーツ単願・部活推薦）',
    commitment: '単願（第一志望）',
    timing: '中3の7月〜9月の練習会・セレクション合格 ➔ 10〜11月個別相談 ➔ 1〜2月入試',
    soccerRequirement: '高校の練習会・セレクションに参加し、実技合格（練習参加許可）を得ること',
    naishinRequirement: '9科28〜35以上／5科15〜19以上目安（コース基準による）',
    financialBenefit: '国の就学支援金＋東京都／埼玉県等の私立授業料軽減助成が適用（学業成績次第で学業特待併用も可）',
    meritAndNote:
      '高校サッカー部へ正式な推薦枠で入部できる王道ルートです。入部制限がある強豪校（一般入試からはサッカー部に入れない高校）でも確実に入部できます。',
  },
  {
    routeType: '③ 学業単願推薦・併願優遇（文武両道ルート）',
    commitment: '単願 または 併願（都立・他校との併願可）',
    timing: '中3の10月〜12月の学校説明会・個別相談会で内申基準クリアを確認',
    soccerRequirement: '事前にサッカー部顧問へ「一般／併願入部が可能か（練習会参加が必要か）」を必ず確認すること',
    naishinRequirement: '9科34〜42以上／5科18〜23以上目安（英検・漢検・生徒会等の加点制度あり）',
    financialBenefit: '内申点や模試偏差値が高い場合、「学業特待生」として入学金・授業料免除を受けられる高校が多数',
    meritAndNote:
      '「サッカーの練習会では特待枠に入らなかったが、内申点が高いので学業推薦・特進コースで合格し、サッカー部に入部する」という裏技かつ非常に賢いルートです（※部員数制限のある高校は事前の練習会参加が必須）。',
  },
  {
    routeType: '④ Jリーグユース（U-18）セレクション・スカウト',
    commitment: '専願（クラブ契約）',
    timing: '中3の5月〜8月にJクラブU-18セレクションまたは練習参加',
    soccerRequirement: '全国トップレベルの個人能力・将来性（浦和レッズ、RB大宮アルディージャ、ジェフ千葉など）',
    naishinRequirement: '提携高校または通信制・通学圏内の高校へ進学するための基準内申',
    financialBenefit: 'Jユースの月謝・遠征費が免除または軽減され、トップチーム（2種登録）への最短距離',
    meritAndNote:
      'GRANDE FCからは浦和レッズU-18やRB大宮アルディージャU-18、ジェフ千葉U-18等への進学者も出ています。高体連（高校サッカー）と並行して中3春〜夏に検討します。',
  },
];

export const CROSS_BORDER_INSIGHTS = [
  {
    title: 'ポイント1：東京の中学校の「内申点」で埼玉・千葉・群馬の私立高校は受けられる？',
    badge: '越境受験の基本',
    content:
      '結論から言うと【まったく問題なく受験・推薦出願が可能】です。埼玉県内の私立高校（昌平・武南・西武台・立教新座・浦和学院・正智深谷など）は、東京都内の中学生向けに「9教科5段階評定（45点満点）」または「5教科評定（25点満点）」での推薦・単願・併願基準を明確に設けています。',
  },
  {
    title: 'ポイント2：埼玉の私立高校でよく聞く「北辰（ほくしん）テスト」は東京在住でも必要？',
    badge: '保護者必見',
    content:
      '埼玉県の中学生は民間模試「北辰テスト」の偏差値で私立高校の確約（個別相談）を取るのが一般的ですが、東京都内の中学校に通う生徒は【中学校の通知表（内申点）のみで相談可能な高校】が多いです。ただし、もし中3の時点で「内申点があと1〜2足りないけれど、実力テストの偏差値でカバーして上位コースや学業特待を狙いたい」という場合は、東京在住者でも個人申し込みで埼玉の北辰テスト（中3の7月〜11月）を受験してスコアを使うことができます！',
  },
  {
    title: 'ポイント3：「東京都内在住のまま埼玉の私立高校に通う」場合の学費助成金はどうなる？',
    badge: '学費・助成金',
    content:
      '東京都の「私立高等学校等授業料軽減助成金（令和6年度以降、所得制限が撤廃され都内在住なら最大約48.4万円／年まで助成）」は、【生徒と保護者が東京都内に住んでいれば、埼玉県・千葉県・神奈川県など他県の私立高校に通学する場合でも支給対象】になります！（※ただし、住民票を県外の寮に移す場合は対象外になるケースがあるため、通学か入寮かを検討する際の重要なチェックポイントです）。',
  },
  {
    title: 'ポイント4：なぜ「GRANDE FC（埼玉）× 東京在住」は進路選びで最強のポジションなのか？',
    badge: '最大の強み',
    content:
      '普段さいたま市を拠点とするGRANDE FCでプレーしているため、埼玉県の強豪校（昌平・武南・西武台・正智深谷・浦和学院など）のスカウトや指導者との距離が非常に近く、同時に東京都民としての通学利便性や都の学費助成を活かして東京の強豪校（帝京・國學院久我山・駒澤大高・実践学園など）も自由に選べるという、両都県のメリットを100%享受できる恵まれた環境にあります。',
  },
];

export function calculateNaishinTotals(grades: SubjectGrades) {
  const fiveSubjects =
    grades.japanese + grades.social + grades.math + grades.science + grades.english;
  const fourSubSubjects = grades.music + grades.art + grades.pe + grades.techHome;
  const nineSubjects = fiveSubjects + fourSubSubjects;
  // 東京都立高校入試などで使われる換算内申（5科×1 ＋ 実技4科×2 ＝ 65点満点）
  const tokyoConverted65 = fiveSubjects + fourSubSubjects * 2;
  const average9 = Number((nineSubjects / 9).toFixed(2));

  return {
    fiveSubjects,
    fourSubSubjects,
    nineSubjects,
    tokyoConverted65,
    average9,
  };
}
