export type RegionCategory = '埼玉県' | '東京都' | '関東圏' | '全国寮完備';
export type LeagueTier =
  | 'プレミアリーグEAST'
  | 'プレミアリーグWEST'
  | 'プリンスリーグ関東'
  | 'プリンスリーグ東北・東海'
  | '都県1部リーグ（S1/T1等）';

export interface VideoChapter {
  id: string;
  timeRange: string;
  title: string;
  summary: string;
  keyMetrics: string[];
  tacticalFocus: string;
}

export interface StudentTestimonial {
  id: string;
  studentName: string;
  grade: string;
  position: string;
  juniorHighClub: string;
  isGrandeFcOb: boolean;
  residenceOrigin: string;
  commuteOrDorm: '通学' | '寮生活';
  naishinAtJhs1: number; // 9科 /45
  naishinAtJhs3: number; // 9科 /45
  admissionRoute: string;
  courseName: string;
  headline: string;
  whyChoseSchool: string;
  soccerAndStudyBalance: string;
  facilityAndDormImpression: string;
  adviceForJhs1: string;
}

export interface HighSchoolData {
  id: string;
  name: string;
  shortName: string;
  prefecture: string;
  city: string;
  regionCategory: RegionCategory;
  type: '私立' | '公立';
  league: LeagueTier;
  deviationMin: number;
  deviationMax: number;
  deviationRepresentative: number; // For positioning map X-axis
  soccerStrengthScore: number; // 70 - 99 For positioning map Y-axis
  courses: {
    name: string;
    deviation: number;
    soccerClubAllowed: boolean;
    note: string;
  }[];
  naishinCriteria: {
    sportsRecommendation9: number; // 9教科45点満点目安（スポーツ推薦・単願）
    sportsRecommendation5: number; // 5教科25点満点目安
    heigan9: number; // 併願優遇・一般推薦目安（9科）
    academicSpecial9: number; // 特待・文武両道コース目安（9科）
    tokyoStudentRuleNote: string; // 東京都在住・東京の中学校からの出願ルール解説
    scholarshipRanks: {
      rank: string;
      tuitionExemption: string;
      condition: string;
    }[];
  };
  ratings: {
    soccerPower: number; // /5.0
    academicQuality: number; // /5.0
    facilityQuality: number; // /5.0
    dormAndSupport: number; // /5.0
    careerOutcomes: number; // /5.0
  };
  soccerProfile: {
    clubMembersCount: number;
    nationalChampionshipCount: string;
    interHighCount: string;
    playStyle: string;
    formation: string;
    coachName: string;
    grandeFcObCountLast5Years: number;
    grandeFcFitReason: string;
  };
  facilities: {
    summary: string;
    pitchType: string;
    floodlights: boolean;
    clubhouse: boolean;
    physicalGym: string;
    medicalStaff: string;
    studySupportRoom: boolean;
  };
  dormitoryAndCommute: {
    hasDormitory: boolean;
    dormName?: string;
    dormMonthlyCost?: string;
    mealSupport: string;
    commuteFromTokyoMinutes: number;
    commuteRouteFromTokyo: string;
    nearestStation: string;
    commuteVsDormRatio: string;
  };
  careerOutcomes: {
    jLeagueProsLast5Years: number;
    notableProAlumni: string[];
    universitySoccerRate: number; // %
    topSoccerUniversities: string[];
    topGeneralUniversities: string[];
    careerSummary: string;
  };
  videoShowcase: {
    title: string;
    totalDuration: string;
    updatedAt: string;
    coachQuote: string;
    chapters: VideoChapter[];
  };
  testimonials: StudentTestimonial[];
}

export const HIGH_SCHOOLS_DATA: HighSchoolData[] = [
  {
    id: 'shohei',
    name: '昌平高等学校',
    shortName: '昌平',
    prefecture: '埼玉県',
    city: '北葛飾郡杉戸町',
    regionCategory: '埼玉県',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 52,
    deviationMax: 68,
    deviationRepresentative: 58,
    soccerStrengthScore: 97,
    courses: [
      {
        name: '標準コース（アスリート・選抜進学）',
        deviation: 54,
        soccerClubAllowed: true,
        note: 'サッカー部員の主力が多く在籍。放課後の練習時間を最大限確保。',
      },
      {
        name: '特別進学コース（特進・IB）',
        deviation: 64,
        soccerClubAllowed: true,
        note: '国公立・難関私大（早慶GMARCH）とサッカーを両立する部員も在籍。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 30,
      sportsRecommendation5: 17,
      heigan9: 35,
      academicSpecial9: 38,
      tokyoStudentRuleNote:
        '東京都内の中学校からの出願者も多数。埼玉県の「北辰テスト」未受験でも、東京の中学校の9教科内申点（中3の1学期または2学期）とクラブ監督推薦・練習会評価で出願相談が可能。',
      scholarshipRanks: [
        {
          rank: 'T特待（サッカー特別奨学生A）',
          tuitionExemption: '入学金・施設費・授業料全額免除',
          condition: '関東リーグ級クラブ主力・トレセン歴・練習会S評価＋内申基準クリア',
        },
        {
          rank: 'サッカー特待B',
          tuitionExemption: '入学金・授業料免除',
          condition: '練習会A評価＋5科17以上／9科30以上目安（欠席日数条件あり）',
        },
        {
          rank: '学業特待併願',
          tuitionExemption: '内申・模試基準に応じた授業料免除',
          condition: '9科38以上または5科21以上目安',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.5,
      facilityQuality: 4.9,
      dormAndSupport: 4.7,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 165,
      nationalChampionshipCount: '全国高校サッカー選手権 6回出場（ベスト4・ベスト8多数）',
      interHighCount: 'インターハイ全国大会 優勝（2024年）・ベスト4多数',
      playStyle: '徹底した個人技術・ワンタッチパス・創造性あふれるポゼッション＆アタッキングフットボール',
      formation: '4-2-3-1 / 4-3-3',
      coachName: '玉田 圭司 監督（元日本代表）／育成スタッフ陣',
      grandeFcObCountLast5Years: 9,
      grandeFcFitReason:
        'GRANDE FCが掲げる「個の技術・駆け引き・考えるサッカー」と戦術コンセプトが極めて近く、毎年GRANDE FCから主力・プロ輩出ルートに乗る選手が進学しています。',
    },
    facilities: {
      summary: '高規格フルサイズ人工芝グラウンド（夜間LED照明完備）、天然芝グラウンド、最新鋭ストレングスジム完備',
      pitchType: '専用フルサイズロングパイル人工芝グラウンド＋天然芝フィールド',
      floodlights: true,
      clubhouse: true,
      physicalGym: 'フリーウエイト・スプリント計測機器を備えた専用トレーニングルーム',
      medicalStaff: '専属アスレティックトレーナー・管理栄養士・Jクラブ連携ドクター',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '昌平サッカー部指定学生寮（キャンパス近隣）',
      dormMonthlyCost: '約75,000円〜85,000円（朝・夕2食＋栄養管理費込）',
      mealSupport: '管理栄養士監修のアスリートビュッフェ（朝・夕）＋補食おにぎり提供',
      commuteFromTokyoMinutes: 65,
      commuteRouteFromTokyo: '北千住駅・上野方面から東武伊勢崎線（スカイツリーライン）急行で「久喜駅」または「杉戸高野台駅」下車',
      nearestStation: '東武日光線「杉戸高野台駅」徒歩15分／JR・東武「久喜駅」スクールバス15分',
      commuteVsDormRatio: '通学60%（東京北部・東部や埼玉県内から通学多数）：寮生活40%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 14,
      notableProAlumni: ['佐相 壱明', '針谷 岳晃', '須藤 直輝', '小見 洋太', '荒井 悠汰', '篠田 翼'],
      universitySoccerRate: 68,
      topSoccerUniversities: ['筑波大学', '明治大学', '早稲田大学', '流通経済大学', '東洋大学', '日本体育大学', '法政大学'],
      topGeneralUniversities: ['東京理科大学', '明治大学', '立教大学', '法政大学', '東洋大学'],
      careerSummary:
        '高卒で毎年2〜4名がJリーグへ直接プロ入りする全国屈指のプロ輩出校でありながら、筑波大・早慶MARCH・関東大学1部リーグへのスポーツ推薦／指定校進学も非常に強い文武両道校です。',
    },
    videoShowcase: {
      title: '昌平高校サッカー部 — 技術で圧倒するアタッキングフットボールの裏側と施設全貌',
      totalDuration: '08:45',
      updatedAt: '2026年10月更新',
      coachQuote: '「止める・蹴る・運ぶの質と、ピッチ上で自ら判断できるインテリジェンスを持った選手を待っています。」',
      chapters: [
        {
          id: 'ch1',
          timeRange: '00:00 - 02:30',
          title: '01. ロンド＆ポゼッション戦術トレーニング公開',
          summary: '練習冒頭から行われる高強度ロンドと、狭い局面をワンタッチ・スルーパスで打開する昌平独自の技術ドリル。',
          keyMetrics: ['パス判断速度 0.8秒以内', '狭いグリッドでの3人目の動き出し'],
          tacticalFocus: 'ボールを受ける前の予備動作（スキャン）と体の向き',
        },
        {
          id: 'ch2',
          timeRange: '02:30 - 05:10',
          title: '02. 人工芝グラウンド・フィジカルジム・学校施設ツアー',
          summary: 'ナイター完備の専用人工芝ピッチ、ウエイトルーム、そして ICT 教育が充実した校舎・自習スペースを紹介。',
          keyMetrics: ['FIFA基準ロングパイル人工芝', '専属トレーナー常駐ケア室'],
          tacticalFocus: '怪我予防のモビリティワークと学年別フィジカル強化',
        },
        {
          id: 'ch3',
          timeRange: '05:10 - 08:45',
          title: '03. 寮生活・食事サポートと東京からの通学スケジュール',
          summary: '寮生の1日ルーティンと、東京都内（足立・練馬・北区・板橋・上野方面）から電車通学する選手の放課後タイムライン。',
          keyMetrics: ['1日3,800kcal栄養設計', 'テスト2週間前の部活別学習会'],
          tacticalFocus: 'Jリーガー・関東大学1部を見据えた3年間のセルフマネジメント',
        },
      ],
    },
    testimonials: [
      {
        id: 'shohei-t1',
        studentName: 'K.S 選手',
        grade: '高校2年（Aチーム・MF）',
        position: 'MF（ボランチ／トップ下）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都北区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 31,
        naishinAtJhs3: 36,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '選抜進学コース',
        headline: 'GRANDEで磨いた「駆け引きと技術」が昌平のサッカーにそのまま繋がった',
        whyChoseSchool:
          '中1の冬にGRANDEの先輩が全国選手権で活躍する姿を見て憧れました。中2の秋に昌平の練習試合を見学した際、パススピードとアイデアの共有レベルが圧倒的で、「ここでプロを目指したい」と決意しました。',
        soccerAndStudyBalance:
          '中1の時は9科31でしたが、GRANDEのコーチから「強豪私立の推薦でも5科18・9科34以上あると特待や大学進学で圧倒的に有利になる」と聞き、中2から定期テスト前に提出物を完璧にしました。今は赤羽から久喜経由で通学しながら電車の時間を単語暗記に使っています。',
        facilityAndDormImpression:
          '人工芝の質が最高で、雨の日でも一切ぬかるまず技術を磨けます。東京から通学する仲間も多く、長期合宿や遠征時は寮生と同じ食堂で栄養満点の食事をとれます。',
        adviceForJhs1:
          '中1のうちはまずGRANDEの練習で「止める・蹴る」の基礎と視野の広さを徹底的に磨いてください。そして学校の副教科（音・美・保体・技家）も手を抜かずに4以上キープしておくと、中3の夏に選べる高校の幅が2倍に広がります！',
      },
    ],
  },
  {
    id: 'bunan',
    name: '武南高等学校',
    shortName: '武南',
    prefecture: '埼玉県',
    city: '蕨市',
    regionCategory: '埼玉県',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 53,
    deviationMax: 63,
    deviationRepresentative: 57,
    soccerStrengthScore: 89,
    courses: [
      {
        name: '進学コース',
        deviation: 54,
        soccerClubAllowed: true,
        note: 'サッカー部員の多くが所属し、GMARCH・日東駒専・体育系大学への進学実績も豊富。',
      },
      {
        name: '選抜コース・特進コース',
        deviation: 61,
        soccerClubAllowed: true,
        note: '高い内申点を活かして学業特待・難関私大現役合格とサッカー部を両立可能。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 31,
      sportsRecommendation5: 17,
      heigan9: 34,
      academicSpecial9: 38,
      tokyoStudentRuleNote:
        'JR京浜東北線「西川口駅」徒歩圏のため、東京都内から荒川を渡ってすぐ（赤羽駅から2駅・約6分）。東京の中学校の内申基準による単願・併願相談が非常にスムーズで、東京在住のGRANDE FC選手にとって最も通いやすい伝統校の一つです。',
      scholarshipRanks: [
        {
          rank: 'スポーツ奨学生',
          tuitionExemption: '入学金・授業料減免',
          condition: '中3練習会での実技評価＋内申基準（5科17／9科31目安）',
        },
        {
          rank: '進学・選抜学業奨学生',
          tuitionExemption: '入学金・授業料全額または半額免除',
          condition: '5科20〜22以上または模試偏差値基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.5,
      academicQuality: 4.3,
      facilityQuality: 4.1,
      dormAndSupport: 4.0,
      careerOutcomes: 4.5,
    },
    soccerProfile: {
      clubMembersCount: 150,
      nationalChampionshipCount: '全国高校サッカー選手権 15回出場（優勝1回・準優勝1回）',
      interHighCount: 'インターハイ全国大会 多数出場',
      playStyle: '伝統の華麗なパスワークと個人技・ドリブルを融合させた攻撃的スタイル',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '内野 慎一郎 監督（武南OB・筑波大出身）',
      grandeFcObCountLast5Years: 12,
      grandeFcFitReason:
        'さいたま市（GRANDE FC活動拠点）と東京都内のちょうど中間に位置する蕨市にあり、GRANDE FCから毎年複数の選手がスポーツ推薦・単願で進学する太いパイプがあります。',
    },
    facilities: {
      summary: '校庭人工芝グラウンドおよび第2グラウンド、ウエイトトレーニング室、自習ラーニングコモンズ完備',
      pitchType: '人工芝グラウンド（校内＋専用練習場併用）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '校内トレーニングルーム完備',
      medicalStaff: '専属トレーナー帯同・整骨院メディカル提携',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '校内カフェテリア・購買にてアスリート向け弁当・捕食販売',
      commuteFromTokyoMinutes: 25,
      commuteRouteFromTokyo: 'JR京浜東北線「赤羽駅」からわずか6分、池袋・新宿方面からも赤羽乗換で25分前後で通学可能',
      nearestStation: 'JR京浜東北線「西川口駅」徒歩10分',
      commuteVsDormRatio: '通学100%（自宅から通いながら親元のサポートで文武両道を実現）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 3,
      notableProAlumni: ['金沢 慎', '宮沢 克行', '奥原 崇', '室井 彗佑'],
      universitySoccerRate: 60,
      topSoccerUniversities: ['筑波大学', '明治大学', '立教大学', '法政大学', '東洋大学', '国士舘大学', '日本大学'],
      topGeneralUniversities: ['早稲田大学', '明治大学', '立教大学', '法政大学', '日本大学', '東洋大学'],
      careerSummary:
        '伝統のテクニック重視の育成で関東大学サッカー連盟（1部・2部）への進学ルートが極めて強く、指定校推薦枠も豊富なため卒業後の大学進学の安心感が非常に高い高校です。',
    },
    videoShowcase: {
      title: '武南高校サッカー部 — 伝統のパス＆ドリブルと東京から25分で通える文武両道環境',
      totalDuration: '06:50',
      updatedAt: '2026年9月更新',
      coachQuote: '「ボールを大切にし、観ている人を魅了するクリエイティブな選手を育てます。」',
      chapters: [
        {
          id: 'b-ch1',
          timeRange: '00:00 - 02:20',
          title: '01. 武南伝統の「技術＆コンビネーション」トレーニング',
          summary: '狭いエリアでのダイレクトプレーとドリブル突破を組み合わせた実戦形式メニュー。',
          keyMetrics: ['1対1仕掛け成功率重視', 'ショートパス連続展開'],
          tacticalFocus: '相手の逆を取るファーストタッチと2人・3人目の連動',
        },
        {
          id: 'b-ch2',
          timeRange: '02:20 - 04:40',
          title: '02. 校舎リニューアル・ラーニングコモンズと放課後練習',
          summary: '綺麗な校舎設備、自習スペース、そして授業終了から10分でピッチに出られる効率的な動線を紹介。',
          keyMetrics: ['西川口駅徒歩10分', '移動ロスゼロの放課後環境'],
          tacticalFocus: '睡眠時間と学習時間を確保するタイムマネジメント',
        },
        {
          id: 'b-ch3',
          timeRange: '04:40 - 06:50',
          title: '03. GRANDE FC出身OBインタビュー「なぜ武南を選んだか」',
          summary: '東京都在住・埼玉クラブ出身の現役部員が語る、通学のしやすさとハイレベルな部内競争。',
          keyMetrics: ['GRANDE FC OB多数在籍', '大学スポーツ推薦・指定校充実'],
          tacticalFocus: '1年次ルーキーリーグからの出場チャンス',
        },
      ],
    },
    testimonials: [
      {
        id: 'bunan-t1',
        studentName: 'R.T 選手',
        grade: '高校3年（DF・副キャプテン）',
        position: 'DF（サイドバック／センターバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都板橋区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 30,
        naishinAtJhs3: 35,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '進学コース',
        headline: '東京の自宅から通学25分！親の手料理を食べながら埼玉トップレベルで戦える最高の環境',
        whyChoseSchool:
          '中学時代は板橋からさいたま市のGRANDEまで通っていたので、高校は通学時間を短くして睡眠と自主練の時間を増やしたいと考えていました。武南は西川口駅から歩いてすぐで、しかもGRANDEのプレースタイルと同じく足元の技術を大事にしてくれるので迷わず決めました。',
        soccerAndStudyBalance:
          '中1の時は5科16・9科30くらいでしたが、武南の進学コースに余裕を持って入るために中2から英語と数学だけ塾に通い、中3の1学期に5科18・9科35まで上げました。高校でも評定4.1を維持してGMARCHの指定校・スポーツ推薦を狙えています。',
        facilityAndDormImpression:
          '校舎がとにかく綺麗で、図書館や自習室がカフェのように快適です。寮はありませんが、その分自宅から通う選手ばかりなので放課後の時間使い方が上手くなります。',
        adviceForJhs1:
          '東京在住でGRANDEに通っているなら、武南は通学のしやすさもサッカーの相性も抜群です。中3の夏休みに練習会があるので、中1・中2のうちから武南の試合（S1リーグや選手権予選）を一度観に行ってみてください！',
      },
    ],
  },
  {
    id: 'seibudai',
    name: '西武台高等学校',
    shortName: '西武台',
    prefecture: '埼玉県',
    city: '新座市',
    regionCategory: '埼玉県',
    type: '私立',
    league: 'プリンスリーグ関東',
    deviationMin: 51,
    deviationMax: 64,
    deviationRepresentative: 55,
    soccerStrengthScore: 91,
    courses: [
      {
        name: '進学コース・選抜進学コース',
        deviation: 53,
        soccerClubAllowed: true,
        note: 'サッカー部員の中心コース。文武両道で関東大学リーグや有名私大へ多数進学。',
      },
      {
        name: '特進コース',
        deviation: 62,
        soccerClubAllowed: true,
        note: '国公立・難関私大志望。学習サポートと部活動を両立する環境。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 16,
      heigan9: 33,
      academicSpecial9: 37,
      tokyoStudentRuleNote:
        '埼玉県新座市に位置し、東京都練馬区・板橋区・豊島区・中野区・清瀬市と隣接。生徒の約3〜4割が東京都内から通学しており、東京の公立中学校の内申基準（9科または5科）に完全対応しています。',
      scholarshipRanks: [
        {
          rank: '体育特待生（A・B）',
          tuitionExemption: '入学金・授業料免除（ランクによる）',
          condition: '中3練習会・セレクション合格＋中学校内申・出欠基準クリア',
        },
        {
          rank: '学業特待生',
          tuitionExemption: '入学金・施設費・授業料減免',
          condition: '5科20以上／9科37以上目安',
        },
      ],
    },
    ratings: {
      soccerPower: 4.6,
      academicQuality: 4.1,
      facilityQuality: 4.8,
      dormAndSupport: 4.2,
      careerOutcomes: 4.6,
    },
    soccerProfile: {
      clubMembersCount: 170,
      nationalChampionshipCount: '全国高校サッカー選手権 4回出場（ベスト8）',
      interHighCount: 'インターハイ全国大会 10回以上出場（ベスト4）',
      playStyle: '全員守備・全員攻撃のハードワークと、サイドを起点としたダイナミックな崩し',
      formation: '4-4-2 / 3-4-2-1',
      coachName: '守屋 保 監督',
      grandeFcObCountLast5Years: 11,
      grandeFcFitReason:
        '専用人工芝の第2グラウンドがさいたま市・新座市エリアから近く、GRANDE FCとの練習試合・交流も非常に盛ん。東京西部・北部からの通学利便性も抜群です。',
    },
    facilities: {
      summary: 'サッカー部専用の全面人工芝「西武台第2グラウンド」（ナイター・観覧席・クラブハウス完備）',
      pitchType: 'サッカー部専用フルサイズ人工芝グラウンド（第2グラウンド）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '第2グラウンド併設のウエイトトレーニング施設',
      medicalStaff: '専属アスレティックトレーナー・フィジカルコーチ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '練習後の捕食プログラム・栄養セミナー実施',
      commuteFromTokyoMinutes: 30,
      commuteRouteFromTokyo: '池袋駅から東武東上線急行で「柳瀬川駅」または「志木駅」、もしくはJR武蔵野線「新座駅」下車',
      nearestStation: '東武東上線「柳瀬川駅」・JR武蔵野線「新座駅」よりスクールバスまたは徒歩',
      commuteVsDormRatio: '通学100%（東京都内および埼玉県南部から自宅通学）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 5,
      notableProAlumni: ['新井 栄聡', '橋本 陸', '原田 岳', '細田 優希'],
      universitySoccerRate: 65,
      topSoccerUniversities: ['東洋大学', '法政大学', '国士舘大学', '日本体育大学', '拓殖大学', '東京国際大学'],
      topGeneralUniversities: ['法政大学', '東洋大学', '日本大学', '駒澤大学', '専修大学'],
      careerSummary:
        'Jリーガー輩出に加え、関東大学サッカー1部・2部リーグへの進学実績が極めて厚く、大学経由でプロになる選手も多数輩出しています。',
    },
    videoShowcase: {
      title: '西武台高校サッカー部 — 専用人工芝「第2グラウンド」とプロ・大学へ繋ぐ育成力',
      totalDuration: '07:20',
      updatedAt: '2026年10月更新',
      coachQuote: '「人間的な成長なくしてサッカーの上達なし。東京からも埼玉からも通える最高の専用ピッチがここにあります。」',
      chapters: [
        {
          id: 's-ch1',
          timeRange: '00:00 - 02:40',
          title: '01. 西武台第2グラウンド（専用人工芝＆クラブハウス）全景',
          summary: '高校年代トップクラスの専用人工芝ピッチと、照明・トレーニングルームを備えた環境を紹介。',
          keyMetrics: ['サッカー部完全専用ピッチ', 'LED夜間照明完備'],
          tacticalFocus: '放課後毎日フルピッチを使える圧倒的なボールタッチ時間',
        },
        {
          id: 's-ch2',
          timeRange: '02:40 - 05:15',
          title: '02. 攻守の切り替え（トランジション）＆クロス攻撃練習',
          summary: '球際の強度と、奪ってから3パス以内でフィニッシュまで持ち込むスピード感あふれる練習。',
          keyMetrics: ['奪回後5秒以内のシュート意識', '両SBのオーバーラップ運動量'],
          tacticalFocus: '関東プリンスリーグを勝ち抜く強度と走力',
        },
        {
          id: 's-ch3',
          timeRange: '05:15 - 07:20',
          title: '03. 池袋・赤羽方面からの通学ルートと大学進学サポート',
          summary: '東京都内から30分圏内で通う部員の1日と、大学サッカー監督との連携による進路指導。',
          keyMetrics: ['関東大学リーグ進学率65%超', '東京都在住部員多数'],
          tacticalFocus: '高校3年間＋大学4年間の7年スパンで描くプロへの道',
        },
      ],
    },
    testimonials: [
      {
        id: 'seibudai-t1',
        studentName: 'Y.M 選手',
        grade: '高校2年（FW）',
        position: 'FW（センターフォワード／ウイング）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都練馬区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 28,
        naishinAtJhs3: 32,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '進学コース',
        headline: 'サッカー部専用の人工芝グラウンドに感動！練馬の自宅から30分で通えています',
        whyChoseSchool:
          '他部活とグラウンドを共用する高校が多い中、西武台はサッカー部専用の人工芝グラウンドとクラブハウスがあり、1年生から毎日人工芝で思い切りボールが蹴れることに惹かれました。',
        soccerAndStudyBalance:
          '中1の頃は9科28と少し不安でしたが、中2から「5教科でオール3以上、得意な体育と美術で5を取る」と決めて内申32まで上げ、中3夏の練習会で評価していただき推薦を掴みました。',
        facilityAndDormImpression:
          '専用グラウンドの隣にウエイトルームがあり、練習前後にいつでもフィジカルを鍛えられます。先輩もGRANDE出身の方がいて最初から馴染みやすかったです。',
        adviceForJhs1:
          '内申点は最低でも9科30（オール3＋α）、できれば33あると進学コースの選択肢が広がります。欠席・遅刻をゼロにすることも推薦ではすごく大事です！',
      },
    ],
  },
  {
    id: 'rikkyo-niiza',
    name: '立教新座高等学校',
    shortName: '立教新座',
    prefecture: '埼玉県',
    city: '新座市',
    regionCategory: '埼玉県',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 68,
    deviationMax: 72,
    deviationRepresentative: 70,
    soccerStrengthScore: 83,
    courses: [
      {
        name: '普通科（立教大学推薦進学カリキュラム）',
        deviation: 70,
        soccerClubAllowed: true,
        note: '卒業生の約85%が立教大学へ内部推薦進学可能。他大学受験（国公立・早慶等）制度もあり。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 38,
      sportsRecommendation5: 21,
      heigan9: 42,
      academicSpecial9: 41,
      tokyoStudentRuleNote:
        '立教大学付属校でありながら、埼玉県S1リーグや全国大会予選上位で戦う文武両道の名門。アスリート選抜（推薦入試）では、高い競技実績（関東リーグ所属クラブ・都道府県トレセン等）に加え、9科36〜38以上（特に英語・数学・国語の基礎学力と欠席日数）が重視されます。',
      scholarshipRanks: [
        {
          rank: '立教新座奨学金制度（給付型）',
          tuitionExemption: '学費相当額の給付制度あり（家計・成績条件による）',
          condition: '出願前申請または入学後選考',
        },
      ],
    },
    ratings: {
      soccerPower: 4.2,
      academicQuality: 5.0,
      facilityQuality: 4.8,
      dormAndSupport: 4.3,
      careerOutcomes: 5.0,
    },
    soccerProfile: {
      clubMembersCount: 115,
      nationalChampionshipCount: '埼玉県大会ベスト4・関東大会出場多数',
      interHighCount: 'インターハイ全国大会出場実績あり',
      playStyle: '学生主体で戦術を分析・構築するインテリジェンス重視のポゼッションサッカー',
      formation: '4-3-3 / 4-2-3-1',
      coachName: '前田 和伸 監督',
      grandeFcObCountLast5Years: 5,
      grandeFcFitReason:
        '「サッカーも関東リーグ級のクラブで本気でやり、かつGMARCH（立教大学）以上の学歴も確実に手にしたい」というGRANDE FCの文武両道層に絶大な人気を誇ります。',
    },
    facilities: {
      summary: '大学キャンパス並みの広大な敷地に専用人工芝サッカー場、温水プール、大型トレーニングジム完備',
      pitchType: 'フルサイズ人工芝サッカー場（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '大学レベルの最新トレーニングマシンを備えたフィットネスルーム',
      medicalStaff: '専属トレーナー・フィジカルコーチ契約',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '大型学生食堂（カフェテリア）にて昼食・放課後軽食利用可能',
      commuteFromTokyoMinutes: 28,
      commuteRouteFromTokyo: '池袋駅から東武東上線急行で約20分「志木駅」下車、またはJR武蔵野線「新座駅」利用',
      nearestStation: '東武東上線「志木駅」徒歩15分／JR武蔵野線「新座駅」徒歩22分',
      commuteVsDormRatio: '通学100%（東京都内から通う生徒が全体の約半数）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 1,
      notableProAlumni: ['立教大学体育会サッカー部経由でのJリーガー・総合商社・大手企業内定多数'],
      universitySoccerRate: 72,
      topSoccerUniversities: ['立教大学（体育会サッカー部・関東大学リーグ）', '早稲田大学', '慶應義塾大学', '筑波大学'],
      topGeneralUniversities: ['立教大学（約85%内部進学）', '早稲田大学', '慶應義塾大学', '東京工業大学', '一橋大学'],
      careerSummary:
        '大学受験勉強で高3の夏に部活を引退する必要がなく、立教大学への内部進学権を確保したまま高3冬の選手権まで100%サッカーに打ち込めるのが最大の強みです。',
    },
    videoShowcase: {
      title: '立教新座高校サッカー部 — 大学受験に追われず高3冬まで選手権に挑める「究極の文武両道」',
      totalDuration: '07:10',
      updatedAt: '2026年9月更新',
      coachQuote: '「自ら考え、仲間と議論し、ピッチ内外でリーダーシップを発揮できる選手を歓迎します。」',
      chapters: [
        {
          id: 'rn-ch1',
          timeRange: '00:00 - 02:30',
          title: '01. 大学キャンパス級の人工芝ピッチと選手主体の戦術ミーティング',
          summary: '映像分析ツールを用いて選手自身が相手スカウティングとビルドアップ配置を議論する様子。',
          keyMetrics: ['立教大内部進学率 約85%', '映像分析アナリスト班活動'],
          tacticalFocus: '数的優位を意図的に作るビルドアップ設計',
        },
        {
          id: 'rn-ch2',
          timeRange: '02:30 - 05:00',
          title: '02. 附属校だからこそ可能な「高3冬・選手権まで全力プレー」',
          summary: '一般進学校と違い、受験勉強による早期引退がないため3年間を通して競技力を伸ばせる仕組み。',
          keyMetrics: ['高3冬まで部員継続100%', '立教大体育会サッカー部との連携'],
          tacticalFocus: '高校・大学の7年間を見据えたキャリアデザイン',
        },
        {
          id: 'rn-ch3',
          timeRange: '05:00 - 07:10',
          title: '03. 街クラブ出身者が語る「中1から準備した内申点と英語検定」',
          summary: '関東リーグ所属クラブから推薦・一般で合格した先輩の中学時代の勉強法。',
          keyMetrics: ['目標内申 9科38以上', '英検準2級〜2級取得推奨'],
          tacticalFocus: 'クラブの遠征移動日を活用した学習ルーティン',
        },
      ],
    },
    testimonials: [
      {
        id: 'rikkyo-t1',
        studentName: 'H.K 選手',
        grade: '高校2年（MF）',
        position: 'MF（インサイドハーフ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都豊島区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 37,
        naishinAtJhs3: 41,
        admissionRoute: '推薦入試（アスリート・課外活動評価）',
        courseName: '普通科',
        headline: '「強豪サッカー部」と「MARCH（立教大）進学保証」の両方を手に入れられる最高の選択肢',
        whyChoseSchool:
          '両親からは「将来のために大学はMARCH以上に行ってほしい」と言われていましたが、僕自身はGRANDEで培ったサッカーを高校でも全国を目指して本気で続けたかったので、高3の冬まで受験で引退せずにサッカーに打ち込める立教新座を選びました。',
        soccerAndStudyBalance:
          '中1の最初から「内申点は絶対に9科38以上をキープする」と決め、GRANDEの練習から帰った後、毎日45分だけ机に向かう習慣をつけました。中2の冬に英検準2級を取ったことも大きなプラスになりました。',
        facilityAndDormImpression:
          '立教大学新座キャンパスと同じ敷地内にあり、グラウンドもジムも学食も大学レベルです。池袋から東武東上線1本で通えるので通学もとても楽です。',
        adviceForJhs1:
          '中1の1学期・2学期から内申点を高く保っておけば、「サッカーの強豪校」だけでなく「大学付属の強豪校」という選択肢が生まれます。今から5教科オール4以上を目指してみてください！',
      },
    ],
  },
  {
    id: 'urawa-gakuin',
    name: '浦和学院高等学校',
    shortName: '浦和学院',
    prefecture: '埼玉県',
    city: 'さいたま市緑区',
    regionCategory: '埼玉県',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 48,
    deviationMax: 65,
    deviationRepresentative: 53,
    soccerStrengthScore: 86,
    courses: [
      {
        name: '総合進学コース・アスリート系',
        deviation: 50,
        soccerClubAllowed: true,
        note: '強化指定クラブの選手が多く所属し、練習環境・遠征スケジュールに完全対応。',
      },
      {
        name: '文理選抜・特進コース',
        deviation: 60,
        soccerClubAllowed: true,
        note: '国公立・難関私大を目指しながら部活動に取り組むコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 28,
      sportsRecommendation5: 15,
      heigan9: 31,
      academicSpecial9: 35,
      tokyoStudentRuleNote:
        'さいたま市緑区にあり、GRANDE FCの活動エリア（さいたま市）のすぐ近く。東京都内からもJR武蔵野線・埼玉高速鉄道（東京メトロ南北線直通「浦和美園駅」）で王子・駒込・飯田橋方面から乗り換えなしで通学可能です。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特待生（S・A・B）',
          tuitionExemption: '入学金・施設費・授業料免除（ランク別）',
          condition: '練習会評価＋クラブ実績＋内申基準（9科28〜30以上目安）',
        },
      ],
    },
    ratings: {
      soccerPower: 4.4,
      academicQuality: 4.0,
      facilityQuality: 4.7,
      dormAndSupport: 4.5,
      careerOutcomes: 4.4,
    },
    soccerProfile: {
      clubMembersCount: 160,
      nationalChampionshipCount: '埼玉県大会上位常連・関東大会出場',
      interHighCount: '埼玉県ベスト4・ベスト8常連',
      playStyle: '豊富な運動量と組織的なハイプレスからの高速カウンター＆ポゼッション',
      formation: '4-4-2 / 4-3-3',
      coachName: '強化育成スタッフ陣（Jクラブ・強豪大出身指導者）',
      grandeFcObCountLast5Years: 10,
      grandeFcFitReason:
        '同じさいたま市内にあり、GRANDE FCの選手にとって練習会場の土地勘や指導者間の繋がりが非常に強く、内申28〜32前後からでも特待・スポーツ推薦を狙える有力校です。',
    },
    facilities: {
      summary: '専用人工芝サッカーグラウンド、大型ウエイトジム、専用クラブハウス、学生寮完備',
      pitchType: '専用フルサイズ人工芝グラウンド（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '強化部専用の大型ストレングス＆コンディショニングセンター',
      medicalStaff: '常駐トレーナー・スポーツドクター連携',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '浦和学院強化クラブ寮',
      dormMonthlyCost: '約70,000円（3食・光熱費込）',
      mealSupport: '朝・昼（弁当）・夕の3食アスリート栄養管理食',
      commuteFromTokyoMinutes: 45,
      commuteRouteFromTokyo: '東京メトロ南北線直通（埼玉高速鉄道）「浦和美園駅」またはJR武蔵野線「東川口駅」よりスクールバス',
      nearestStation: '埼玉高速鉄道「浦和美園駅」・JR「東川口駅」スクールバス10〜15分',
      commuteVsDormRatio: '通学75%：寮生活25%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 2,
      notableProAlumni: ['複数のJリーガーおよび関東・関西大学サッカー連盟主力選手'],
      universitySoccerRate: 62,
      topSoccerUniversities: ['東洋大学', '日本大学', '国士舘大学', '日本体育大学', '大東文化大学', '平成国際大学'],
      topGeneralUniversities: ['日本大学', '東洋大学', '駒澤大学', '専修大学', '文教大学'],
      careerSummary:
        '総合大学への付属・提携推薦枠や指定校推薦枠が非常に多く、サッカーを大学でも続ける選手・一般就職や資格取得を目指す選手の双方に手厚い進路実績があります。',
    },
    videoShowcase: {
      title: '浦和学院高校サッカー部 — 全国トップ水準の総合スポーツ施設とフィジカル育成',
      totalDuration: '06:30',
      updatedAt: '2026年8月更新',
      coachQuote: '「さいたまの地から全国へ。恵まれた専用施設で3年間妥協なく自分を鍛え抜ける環境です。」',
      chapters: [
        {
          id: 'ug-ch1',
          timeRange: '00:00 - 02:15',
          title: '01. 専用人工芝ピッチと大型ストレングスジム紹介',
          summary: 'プロ顔負けのウエイト設備と、ナイター照明付き専用グラウンドでのトレーニング風景。',
          keyMetrics: ['専用人工芝フルピッチ', '専属フィジカルコーチ指導'],
          tacticalFocus: '高校3年間で当たり負けしない体幹・出力強化',
        },
        {
          id: 'ug-ch2',
          timeRange: '02:15 - 04:30',
          title: '02. 戦術トレーニング：ハイプレスからのショートカウンター',
          summary: '前線からの連動した守備ハメと、奪ってから縦へ速く仕掛ける攻撃パターン練習。',
          keyMetrics: ['スプリント回数計測', 'トランジション強度'],
          tacticalFocus: '90分間落ちないインテンシティ',
        },
        {
          id: 'ug-ch3',
          timeRange: '04:30 - 06:30',
          title: '03. 東京メトロ南北線直通ルート＆スクールバス通学ガイド',
          summary: '東京都内（王子・赤羽・後楽園方面）から乗り換えなしで通う生徒の通学レポート。',
          keyMetrics: ['浦和美園駅・東川口駅から専用バス', '寮選択も可能'],
          tacticalFocus: '通学・寮どちらも選べる柔軟な生活スタイル',
        },
      ],
    },
    testimonials: [
      {
        id: 'ug-t1',
        studentName: 'T.A 選手',
        grade: '高校1年（DF）',
        position: 'DF（センターバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都足立区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 27,
        naishinAtJhs3: 30,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '総合進学コース',
        headline: 'GRANDEで慣れ親しんださいたま市の環境！トレーニングジムの設備が本当にすごいです',
        whyChoseSchool:
          '中学3年間、東京からさいたま市のGRANDEに通っていたので、浦和美園エリアは土地勘があって安心でした。練習会に参加した際、グラウンドとジムの設備が圧倒的だったことが決め手です。',
        soccerAndStudyBalance:
          '勉強は少し苦手で中1の時はオール3（27）でしたが、欠席ゼロを続けて中3で9科30にしたことで推薦基準をクリアできました。高校では小テストのフォローが手厚いので助かっています。',
        facilityAndDormImpression:
          'ウエイトルームの器具がプロ並みで、入学して半年で体重が5kg増え、空中戦や球際で負けない体になりました。',
        adviceForJhs1:
          'もし今、内申点が27〜30くらいでも諦めないでください！無遅刻・無欠席を続けてGRANDEの試合でアピールすれば、設備が最高の高校へ推薦で行く道がしっかりあります。',
      },
    ],
  },
  {
    id: 'shochi-fukaya',
    name: '正智深谷高等学校',
    shortName: '正智深谷',
    prefecture: '埼玉県',
    city: '深谷市',
    regionCategory: '埼玉県',
    type: '私立',
    league: 'プリンスリーグ関東',
    deviationMin: 49,
    deviationMax: 62,
    deviationRepresentative: 53,
    soccerStrengthScore: 92,
    courses: [
      {
        name: '総合進学科（マイスター・進学系）',
        deviation: 51,
        soccerClubAllowed: true,
        note: 'サッカー部主力が多く在籍し、全国大会を見据えた強化体制。',
      },
      {
        name: '特別進学科',
        deviation: 60,
        soccerClubAllowed: true,
        note: '大学受験・難関私大推薦を目指すコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 28,
      sportsRecommendation5: 15,
      heigan9: 31,
      academicSpecial9: 35,
      tokyoStudentRuleNote:
        '東京都内からはJR高崎線（上野東京ライン・湘南新宿ライン直通）で「深谷駅」まで1本、またはサッカー部専用寮への入寮も選択可能。東京の中学校の内申点＋中3夏以降の練習会評価でスポーツ推薦・特待相談が可能です。',
      scholarshipRanks: [
        {
          rank: '体育特待生（S・A・B）',
          tuitionExemption: '入学金・授業料全額または一部免除',
          condition: '練習会・セレクション高評価＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.7,
      academicQuality: 4.0,
      facilityQuality: 4.6,
      dormAndSupport: 4.6,
      careerOutcomes: 4.5,
    },
    soccerProfile: {
      clubMembersCount: 155,
      nationalChampionshipCount: '全国高校サッカー選手権 4回出場（ベスト8）',
      interHighCount: 'インターハイ全国大会 複数回出場',
      playStyle: '堅守速攻と球際の粘り強さ、セットプレーとサイド攻撃の多彩なバリエーション',
      formation: '4-4-2',
      coachName: '小島 時和 監督',
      grandeFcObCountLast5Years: 8,
      grandeFcFitReason:
        'GRANDE FC出身の先輩が歴代キャプテンや全国大会出場メンバーとして活躍してきた実績があり、指導者間の信頼関係が非常に厚い埼玉屈指の強豪校です。',
    },
    facilities: {
      summary: '専用人工芝グラウンド「仙元山・校内ピッチ」、トレーニングルーム、サッカー部寮完備',
      pitchType: '人工芝グラウンド（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用ウエイトルーム完備',
      medicalStaff: '専属トレーナー・栄養アドバイザー',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '正智深谷サッカー部寮',
      dormMonthlyCost: '約68,000円〜75,000円（朝・夕2食＋昼弁当込）',
      mealSupport: '寮母・栄養士による3食サポート',
      commuteFromTokyoMinutes: 70,
      commuteRouteFromTokyo: '赤羽・池袋・上野駅からJR高崎線（湘南新宿・上野東京ライン）直通で「深谷駅」下車、徒歩8分',
      nearestStation: 'JR高崎線「深谷駅」徒歩8分',
      commuteVsDormRatio: '通学65%：寮生活35%（東京在住者は高崎線1本で通学するか入寮を選択）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 4,
      notableProAlumni: ['オナイウ 阿道', '新井 晴樹', '小山 開喜', '福井 啓太'],
      universitySoccerRate: 66,
      topSoccerUniversities: ['筑波大学', '明治大学', '日本体育大学', '国士舘大学', '東京国際大学', '関東学院大学'],
      topGeneralUniversities: ['東洋大学', '日本大学', '駒澤大学', '大東文化大学'],
      careerSummary:
        '日本代表FWオナイウ阿道選手らを輩出し、近年も高卒Jリーガーや大学サッカー界のトップタレントを続々と送り出しています。',
    },
    videoShowcase: {
      title: '正智深谷高校サッカー部 — 全国ベスト8を掴んだ堅守速攻と寮・通学環境',
      totalDuration: '06:40',
      updatedAt: '2026年10月更新',
      coachQuote: '「素直に学び、仲間のために汗をかける選手が3年間で大きく化けます。」',
      chapters: [
        {
          id: 'sf-ch1',
          timeRange: '00:00 - 02:20',
          title: '01. 全国大会常連を支える守備連動＆カウンター練習',
          summary: 'コンパクトなブロック形成から、奪った瞬間に全員がスプリントする伝統のトレーニング。',
          keyMetrics: ['ブロック間距離15m維持', 'カウンター3本目の走り込み'],
          tacticalFocus: '強豪相手でも崩れない守備組織の徹底',
        },
        {
          id: 'sf-ch2',
          timeRange: '02:20 - 04:30',
          title: '02. 深谷駅徒歩8分の立地とサッカー部寮の生活',
          summary: '駅から歩いてすぐのキャンパスと、県外・都内出身の部員が暮らす寮の食事・部屋を紹介。',
          keyMetrics: ['深谷駅徒歩8分', '3食付きの安心な寮生活'],
          tacticalFocus: '親元を離れても安心な生活指導と仲間意識',
        },
        {
          id: 'sf-ch3',
          timeRange: '04:30 - 06:40',
          title: '03. GRANDE FC出身・全国選手権出場メンバーの体験談',
          summary: '中学時代の練習会参加から入学後のポジション争いまでを語る。',
          keyMetrics: ['GRANDE FCからの進学実績多数', '大学1部リーグへの推薦枠'],
          tacticalFocus: '街クラブの技術を高校サッカーの強度に昇華させる方法',
        },
      ],
    },
    testimonials: [
      {
        id: 'sf-t1',
        studentName: 'S.N 選手',
        grade: '高校3年（MF）',
        position: 'MF（サイドハーフ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都北区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 28,
        naishinAtJhs3: 31,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '総合進学科',
        headline: '東京から入寮を選択！移動時間ゼロで朝練・自主練に打ち込み全国大会のピッチに立てました',
        whyChoseSchool:
          '赤羽から高崎線1本で通学もできましたが、僕は3年間サッカーにすべてを懸けたいと思い、両親と相談して寮に入りました。GRANDEの先輩が毎年正智深谷で活躍していたことも大きな安心材料でした。',
        soccerAndStudyBalance:
          '中学時代は9科30を目標に定期テスト前にしっかり提出物を出し、中3の1学期で31を取りました。寮では消灯前に勉強時間が決められているので、スマホをダラダラ見る習慣がなくなりました。',
        facilityAndDormImpression:
          '寮のご飯が本当に美味しくて、3食しっかり食べられるので怪我をしにくい体になりました。駅から学校まで徒歩8分なので、週末に東京の実家に帰るのもすぐです。',
        adviceForJhs1:
          '「通学」か「寮」かで迷っているなら、正智深谷は両方選べるので、中2・中3で見学に来た時に寮もぜひ見てみてください！',
      },
    ],
  },
  {
    id: 'teikyo',
    name: '帝京高等学校',
    shortName: '帝京',
    prefecture: '東京都',
    city: '板橋区',
    regionCategory: '東京都',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 52,
    deviationMax: 66,
    deviationRepresentative: 57,
    soccerStrengthScore: 95,
    courses: [
      {
        name: 'アスリートコース',
        deviation: 52,
        soccerClubAllowed: true,
        note: '強化指定部専用のカリキュラム。午後の練習時間や遠征・合宿に完全最適化。',
      },
      {
        name: '進学コース・特進コース',
        deviation: 59,
        soccerClubAllowed: false,
        note: '※サッカー部（男子強化）は原則としてアスリートコースでの募集・活動となります。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 30,
      sportsRecommendation5: 16,
      heigan9: 35,
      academicSpecial9: 36,
      tokyoStudentRuleNote:
        '東京都板橋区（十条・板橋エリア）にあるため、東京都在住の選手にとっては地元通学が可能。また埼玉（さいたま市・GRANDE FC）へのアクセスも埼京線「十条駅」から大宮・武蔵浦和方面へ1本という絶好の立地です。アスリートコースは実技（練習会・スカウト評価）と中学校内申・生活態度を総合評価します。',
      scholarshipRanks: [
        {
          rank: 'アスリート特待生',
          tuitionExemption: '入学金・授業料等の減免制度あり',
          condition: 'スカウト・練習会S/A評価＋内申・生活態度基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.2,
      facilityQuality: 4.7,
      dormAndSupport: 4.3,
      careerOutcomes: 4.8,
    },
    soccerProfile: {
      clubMembersCount: 145,
      nationalChampionshipCount: '全国高校サッカー選手権 35回出場（全国優勝6回・カナリア軍団）',
      interHighCount: 'インターハイ全国大会 優勝3回・準優勝多数',
      playStyle: '名門「カナリア軍団」の勝負強さに、現代的なポジショナルプレーと高い技術・戦術眼を融合',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '藤倉 寛 監督（帝京OB）',
      grandeFcObCountLast5Years: 6,
      grandeFcFitReason:
        '東京都板橋区にありながら埼玉の街クラブ（GRANDE FCやLAVIDA等）から多くの技術派選手が進学しており、プレミアリーグEASTの最高峰舞台で戦えます。',
    },
    facilities: {
      summary: '校内人工芝グラウンド、帝京大学グループ連携のスポーツ医科学サポート、最新トレーニングルーム完備',
      pitchType: '校内フルサイズ人工芝グラウンド（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: 'アスリートコース専用ストレングスルーム',
      medicalStaff: '帝京大学スポーツ医科学センター連携トレーナー・栄養士・メンタルトレーナー',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: 'アスリートコース向け栄養管理プログラム・カフェテリア利用',
      commuteFromTokyoMinutes: 15,
      commuteRouteFromTokyo: 'JR埼京線「十条駅」徒歩10分、または都営三田線「板橋本町駅」徒歩8分（池袋から5分・新宿から11分）',
      nearestStation: 'JR埼京線「十条駅」徒歩10分／都営三田線「板橋本町駅」徒歩8分',
      commuteVsDormRatio: '通学100%（都内・埼玉・千葉・神奈川から通学抜群）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 8,
      notableProAlumni: ['中田 浩二', '木梨 憲武（OB応援）', '森本 貴幸', '佐々木 大樹', '齊藤 慈斗', '梅木 怜'],
      universitySoccerRate: 70,
      topSoccerUniversities: ['明治大学', '早稲田大学', '筑波大学', '法政大学', '東洋大学', '帝京大学', '日本体育大学'],
      topGeneralUniversities: ['帝京大学（内部進学枠充実）', '明治大学', '法政大学', '東洋大学', '日本大学'],
      careerSummary:
        '全国優勝6回の伝統に加え、近年はプレミアリーグ昇格と高卒Jリーガー輩出が再加速。帝京大学グループの医科学・進学バックアップも強力です。',
    },
    videoShowcase: {
      title: '帝京高校サッカー部 — 令和に進化した「カナリア軍団」のポジショナルサッカーと医科学サポート',
      totalDuration: '08:10',
      updatedAt: '2026年10月更新',
      coachQuote: '「歴史とプライドを胸に、ピッチ上で最も賢く、最も逞しく戦う選手を育てます。」',
      chapters: [
        {
          id: 'tk-ch1',
          timeRange: '00:00 - 02:50',
          title: '01. ポジショナルプレー＆ビルドアップ戦術練習',
          summary: '相手のプレスを剥がして前進するビルドアップと、アタッキングサードでの崩しの共有。',
          keyMetrics: ['プレミアリーグEAST参戦', 'GPSトラッキングデータ活用'],
          tacticalFocus: '複数のポジションをこなせる戦術理解度',
        },
        {
          id: 'tk-ch2',
          timeRange: '02:50 - 05:30',
          title: '02. 帝京大学スポーツ医科学センター連携のフィジカル＆栄養指導',
          summary: '血液検査や体組成データに基づいた個別コンディショニングとフィジカル強化。',
          keyMetrics: ['大学レベルのスポーツ医科学連携', '怪我予防プログラム'],
          tacticalFocus: 'データドリブンな身体づくり',
        },
        {
          id: 'tk-ch3',
          timeRange: '05:30 - 08:10',
          title: '03. アスリートコースの1日（板橋・十条キャンパスの利便性）',
          summary: '都心から15分で通える立地と、アスリートコースならではの集中できる授業・練習環境。',
          keyMetrics: ['JR十条駅徒歩10分', '東京都私立授業料軽減助成対象'],
          tacticalFocus: '東京都在住メリット（都の私立学費助成金）も活かせる進路設計',
        },
      ],
    },
    testimonials: [
      {
        id: 'teikyo-t1',
        studentName: 'K.O 選手',
        grade: '高校2年（MF）',
        position: 'MF（ボランチ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都文京区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 31,
        naishinAtJhs3: 34,
        admissionRoute: 'スポーツ推薦（アスリートコース単願）',
        courseName: 'アスリートコース',
        headline: '東京の自宅から通いながらプレミアリーグで戦える！都の私立学費助成も受けられて親孝行に',
        whyChoseSchool:
          '中学は埼玉のGRANDEまで通っていましたが、高校は東京の自宅から近くて、しかも最高峰のプレミアリーグでプレーできる帝京に憧れました。GRANDEで鍛えた「パス＆コントロールと戦術眼」が帝京のサッカーにすごく合っています。',
        soccerAndStudyBalance:
          'アスリートコースは周りがみんな全国を目指す仲間なので意識が高く、授業中も集中して受ける雰囲気があります。内申は中1の31から中3で34まで上げて推薦をいただきました。',
        facilityAndDormImpression:
          '十条駅から歩いてすぐで、校内の人工芝ピッチも綺麗です。大学の医科学スタッフが栄養やトレーニングを数値で見てくれるのがすごいです。',
        adviceForJhs1:
          '東京在住なら、東京都の高校に進学すると都の授業料助成制度が手厚いというメリットもあります。埼玉の強豪と東京の帝京・久我山などを両方比較しておくのがおすすめです！',
      },
    ],
  },
  {
    id: 'kokugakuin-kugayama',
    name: '國學院大學久我山高等学校',
    shortName: '國學院久我山',
    prefecture: '東京都',
    city: '杉並区',
    regionCategory: '東京都',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 64,
    deviationMax: 70,
    deviationRepresentative: 67,
    soccerStrengthScore: 88,
    courses: [
      {
        name: '普通科（CCクラス・一般クラス）',
        deviation: 67,
        soccerClubAllowed: true,
        note: 'スポーツ推薦・優遇入学者も一般生徒と共にハイレベルな大学進学カリキュラムを履修。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 35,
      sportsRecommendation5: 19,
      heigan9: 40,
      academicSpecial9: 41,
      tokyoStudentRuleNote:
        '「美しく勝つ」を掲げる全国屈指の文武両道校。スポーツ推薦（文化・スポーツ優遇）であっても一定の学力・内申基準（9科34〜36以上目安、5科に2がないこと等）が求められるため、中1からの着実な定期テスト対策が必須です。',
      scholarshipRanks: [
        {
          rank: '文化・スポーツ優遇制度',
          tuitionExemption: '東京都私立高校授業料軽減助成＋学園奨学金制度',
          condition: 'サッカー部練習会評価＋内申基準（5科19／9科35前後目安）クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.5,
      academicQuality: 4.9,
      facilityQuality: 4.4,
      dormAndSupport: 4.1,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 120,
      nationalChampionshipCount: '全国高校サッカー選手権 9回出場（準優勝1回・ベスト8多数）',
      interHighCount: 'インターハイ全国大会 11回出場',
      playStyle: '「美しく勝つ」を体現する超攻撃的パスワーク＆コンビネーションサッカー',
      formation: '4-3-3',
      coachName: '李 済華 総監督 ／ スタッフ陣',
      grandeFcObCountLast5Years: 7,
      grandeFcFitReason:
        'リズムよくパスを繋ぎ、個のアイデアで崩すスタイルがGRANDE FCの育成哲学と非常に親和性が高く、「朝練なし・夜19時完全下校」の短時間集中練習で難関大進学も両立できます。',
    },
    facilities: {
      summary: '杉並キャンパス内人工芝グラウンド（照明完備）、トレーニングルーム、自習室完備',
      pitchType: '校内人工芝グラウンド',
      floodlights: true,
      clubhouse: true,
      physicalGym: '校内ウエイトトレーニング室',
      medicalStaff: '専属トレーナー・フィジカルコーチ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '校内食堂完備',
      commuteFromTokyoMinutes: 25,
      commuteRouteFromTokyo: '渋谷駅・吉祥寺駅から京王井の頭線急行で「久我山駅」下車、徒歩12分',
      nearestStation: '京王井の頭線「久我山駅」徒歩12分',
      commuteVsDormRatio: '通学100%（朝練なし・1日2時間集中のため都内全域・埼玉南部から通学可能）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 3,
      notableProAlumni: ['丸山 祐市', '田邉 草民', '富樫 敬真', '名倉 巧', '塩貝 健人'],
      universitySoccerRate: 65,
      topSoccerUniversities: ['慶應義塾大学', '早稲田大学', '明治大学', '筑波大学', '立教大学', '法政大学', '國學院大學'],
      topGeneralUniversities: ['早稲田大学', '慶應義塾大学', '上智大学', '明治大学', '青山学院大学', '立教大学', '中央大学', '國學院大學'],
      careerSummary:
        '慶應大からJ1・海外へ羽ばたいた塩貝健人選手のように、「久我山 ➔ 早慶MARCH・筑波大サッカー部 ➔ Jリーグ／一流企業」という黄金キャリアを描ける日本最高峰の文武両道校です。',
    },
    videoShowcase: {
      title: '國學院久我山高校サッカー部 — 「朝練なし・1日2時間集中」で全国上位と早慶MARCH合格を両立する秘密',
      totalDuration: '07:45',
      updatedAt: '2026年10月更新',
      coachQuote: '「サッカーが上手い選手は、勉強の要領も良い。2時間の密度を極限まで高めるのが久我山流です。」',
      chapters: [
        {
          id: 'kk-ch1',
          timeRange: '00:00 - 02:30',
          title: '01. 1日120分・移動時間0秒で切り替わる超集中パスワーク練習',
          summary: '無駄なランニングや待ち時間を徹底排除し、すべてボールを使った高負荷メニューで構成される練習風景。',
          keyMetrics: ['練習時間120分厳守', '朝練なし（睡眠・朝学習確保）'],
          tacticalFocus: '3人目の動きとワンタッチ・ツータッチの高速崩し',
        },
        {
          id: 'kk-ch2',
          timeRange: '02:30 - 05:10',
          title: '02. 早慶・GMARCH・国公立へ多数合格する学習環境',
          summary: '19時前に練習を終え、帰宅後2時間の学習時間を確保できるタイムスケジュールを解説。',
          keyMetrics: ['早慶GMARCH合格者多数', '國學院大學への内部推薦制度も保有'],
          tacticalFocus: '文武両道を実現する週間ルーティン',
        },
        {
          id: 'kk-ch3',
          timeRange: '05:10 - 07:45',
          title: '03. 街クラブ出身選手が語る「中1から内申36以上をキープした方法」',
          summary: '埼玉・東京のクラブチームから進学した部員のリアルな受験体験記。',
          keyMetrics: ['推薦目安 9科35以上', '技術と知性の両立'],
          tacticalFocus: '中1からの定期テスト対策と練習会参加時期',
        },
      ],
    },
    testimonials: [
      {
        id: 'kk-t1',
        studentName: 'M.Y 選手',
        grade: '高校3年（FW）',
        position: 'FW（ウイング／シャドー）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都新宿区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 34,
        naishinAtJhs3: 37,
        admissionRoute: '文化・スポーツ優遇（単願）',
        courseName: '普通科',
        headline: '朝練なし・1日2時間の超集中練習！GRANDEのパスサッカーが大好きなら最高の環境です',
        whyChoseSchool:
          '体力任せの縦ポンサッカーではなく、GRANDEのように足元の技術とパスワークで崩す高校を探していて久我山に出会いました。「朝練なし・練習2時間」なのに全国で勝っているスタイルに衝撃を受けました。',
        soccerAndStudyBalance:
          '久我山はスポーツ推薦でも内申点がしっかり見られるので、中1の34から中3で37（5科20）まで上げました。高校でも19時半には自宅に着くので、毎日机に向かう習慣が続き、今は早稲田と明治のスポーツ・指定校推薦を目指しています。',
        facilityAndDormImpression:
          '井の頭線の久我山駅から緑豊かな住宅街を歩いて通えます。グラウンドは全面人工芝で、とにかく練習のテンポが速くて楽しいです。',
        adviceForJhs1:
          '「パスサッカーで全国に行きたい、でも大学も早慶MARCHに行きたい」という人には久我山がナンバーワンだと思います。中1から5教科で4を揃えておくと本当に強いです！',
      },
    ],
  },
  {
    id: 'komazawa',
    name: '駒澤大学高等学校',
    shortName: '駒澤大高',
    prefecture: '東京都',
    city: '世田谷区',
    regionCategory: '東京都',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 58,
    deviationMax: 63,
    deviationRepresentative: 60,
    soccerStrengthScore: 87,
    courses: [
      {
        name: '普通科（内部推薦・他大受験対応）',
        deviation: 60,
        soccerClubAllowed: true,
        note: '駒澤大学への内部推薦権（約6〜7割）を保持しながら他大学受験も可能。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 32,
      sportsRecommendation5: 17,
      heigan9: 36,
      academicSpecial9: 38,
      tokyoStudentRuleNote:
        '東京都世田谷区の人気大学付属校。スポーツ推薦ではクラブでの実績・練習会評価に加え、9科32以上（3年間の欠席日数制限あり）が目安となります。',
      scholarshipRanks: [
        {
          rank: 'スポーツ推薦奨学制度',
          tuitionExemption: '東京都私立授業料軽減助成＋学園奨学金',
          condition: '練習会合格＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.5,
      academicQuality: 4.4,
      facilityQuality: 4.3,
      dormAndSupport: 4.1,
      careerOutcomes: 4.6,
    },
    soccerProfile: {
      clubMembersCount: 160,
      nationalChampionshipCount: '全国高校サッカー選手権 複数回出場（全国ベスト8）',
      interHighCount: 'インターハイ全国大会出場',
      playStyle: '圧倒的な走力・ハードワークと規律ある守備ブロックからのダイナミックな攻撃',
      formation: '4-4-2',
      coachName: '大野 祥司 監督',
      grandeFcObCountLast5Years: 4,
      grandeFcFitReason:
        '大学付属（駒澤大学）の安心感を持ちながら全国選手権の常連として戦えるため、東京在住のクラブチーム選手に非常に人気があります。',
    },
    facilities: {
      summary: '校内全面人工芝グラウンド（照明完備）、トレーニングルーム、駒澤大学玉川キャンパス施設連携',
      pitchType: '人工芝グラウンド（校内＋大学連携グラウンド）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '校内ウエイトトレーニング室',
      medicalStaff: '専属トレーナー帯同',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '校内カフェテリア利用可能',
      commuteFromTokyoMinutes: 30,
      commuteRouteFromTokyo: '東急田園都市線「桜新町駅」または「用賀駅」下車徒歩13分（渋谷から10分）',
      nearestStation: '東急田園都市線「桜新町駅」徒歩13分',
      commuteVsDormRatio: '通学100%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 2,
      notableProAlumni: ['巻 佑樹', '佐藤 晃大', '宮崎 鴻'],
      universitySoccerRate: 68,
      topSoccerUniversities: ['駒澤大学（体育会サッカー部）', '明治大学', '法政大学', '日本体育大学', '国士舘大学'],
      topGeneralUniversities: ['駒澤大学（内部推薦多数）', '明治大学', '青山学院大学', '法政大学'],
      careerSummary:
        '駒澤大学への内部推薦進学枠が非常に大きく、大学サッカーの名門である駒澤大学体育会サッカー部へ進む道も、一般学部に進む道も開かれています。',
    },
    videoShowcase: {
      title: '駒澤大学高校サッカー部 — 160人の結束力と大学付属ならではの進路安心感',
      totalDuration: '06:20',
      updatedAt: '2026年9月更新',
      coachQuote: '「礼儀・規律・感謝を重んじ、最後の一歩まで走り切れるチームを作っています。」',
      chapters: [
        {
          id: 'km-ch1',
          timeRange: '00:00 - 02:10',
          title: '01. 伝統のハイインテンシティ守備＆セットプレー練習',
          summary: '全国ベスト8を支える球際の迫力と、精度の高いセットプレー練習。',
          keyMetrics: ['T1リーグ上位常連', 'セットプレー得点率35%超'],
          tacticalFocus: '全員がサボらない守備規律とセカンドボール回収',
        },
        {
          id: 'km-ch2',
          timeRange: '02:10 - 04:15',
          title: '02. 駒澤大学への内部推薦制度と文武両道サポート',
          summary: '高校3年間の定期テストの積み重ねで駒澤大学へ進学できる仕組みを解説。',
          keyMetrics: ['駒澤大内部推薦枠 約65%', '他大学受験制度も併用可'],
          tacticalFocus: '日々の授業と定期考査の積み上げ',
        },
        {
          id: 'km-ch3',
          timeRange: '04:15 - 06:20',
          title: '03. 現役部員インタビュー「礼儀と人間力が身につく3年間」',
          summary: 'ピッチ外での挨拶や主体的な運営が社会に出てからどう活きるかを語る。',
          keyMetrics: ['桜新町駅徒歩13分', '部員全員が役割を持つ組織運営'],
          tacticalFocus: 'ピッチ内外での自律',
        },
      ],
    },
    testimonials: [
      {
        id: 'km-t1',
        studentName: 'D.S 選手',
        grade: '高校2年（DF）',
        position: 'DF（センターバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都目黒区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 31,
        naishinAtJhs3: 34,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '普通科',
        headline: '駒澤大学への内部推薦がある安心感！高3の冬まで選手権優勝だけを見て走れます',
        whyChoseSchool:
          '大学付属でありながら、全国高校サッカー選手権の常連として本気で日本一を目指せる環境だからです。応援団も含めたチームの一体感が最高です。',
        soccerAndStudyBalance:
          '中学で内申34を取って推薦で入りました。高校に入ってからも定期テストで平均以上を取っていれば駒澤大学の希望学部に行けるので、普段の授業を大事にしています。',
        facilityAndDormImpression:
          '世田谷の住宅街にありながら照明付きの人工芝グラウンドがあり、大学のグラウンドを使うこともあります。',
        adviceForJhs1:
          '駒大高は挨拶や生活態度、中学校での欠席日数がとても重視されます。中1から遅刻・欠席ゼロを続けることが一番のアピールになります！',
      },
    ],
  },
  {
    id: 'jissen-gakuen',
    name: '実践学園高等学校',
    shortName: '実践学園',
    prefecture: '東京都',
    city: '中野区（高尾専用G）',
    regionCategory: '東京都',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 52,
    deviationMax: 64,
    deviationRepresentative: 56,
    soccerStrengthScore: 87,
    courses: [
      {
        name: 'リベラルアーツ＆サイエンス（スポーツ・進学群）',
        deviation: 54,
        soccerClubAllowed: true,
        note: '強化部員が多く所属し、大学進学と部活動を高次元で両立。',
      },
      {
        name: '特進コース',
        deviation: 62,
        soccerClubAllowed: true,
        note: '難関私大受験特化カリキュラム。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 16,
      heigan9: 33,
      academicSpecial9: 37,
      tokyoStudentRuleNote:
        '中野坂上駅から徒歩5分の都心キャンパスと、高尾の広大な総合グラウンドを併用。東京在住の選手にとって中野坂上への通学が極めて便利で、GRANDE FCからも毎年練習会参加・進学者が多い都内強豪校です。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特別奨学生',
          tuitionExemption: '入学金・授業料減免＋東京都授業料軽減助成',
          condition: '練習会評価＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.5,
      academicQuality: 4.2,
      facilityQuality: 4.6,
      dormAndSupport: 4.2,
      careerOutcomes: 4.5,
    },
    soccerProfile: {
      clubMembersCount: 165,
      nationalChampionshipCount: '全国高校サッカー選手権 複数回出場',
      interHighCount: 'インターハイ全国大会出場',
      playStyle: '粘り強い守備と全員がボールに関わり続けるテクニカルな連動サッカー',
      formation: '4-2-3-1 / 4-4-2',
      coachName: '内田 尊久 監督',
      grandeFcObCountLast5Years: 8,
      grandeFcFitReason:
        'GRANDE FCと練習試合やフェスティバルでの交流が深く、東京在住のGRANDE選手が「都内の高校で全国を目指したい」という場合に非常にマッチしやすい1校です。',
    },
    facilities: {
      summary: '高尾総合グラウンド（フルサイズ人工芝サッカー場・クラブハウス・照明完備）＋中野校舎',
      pitchType: '専用フルサイズ人工芝グラウンド（高尾総合グラウンド）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用トレーニングルーム完備',
      medicalStaff: '専属トレーナー・栄養指導スタッフ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '校内カフェテリア・練習後の捕食サポート',
      commuteFromTokyoMinutes: 20,
      commuteRouteFromTokyo: '東京メトロ丸ノ内線・都営大江戸線「中野坂上駅」徒歩5分（新宿駅から2駅4分）',
      nearestStation: '丸ノ内線・大江戸線「中野坂上駅」徒歩5分',
      commuteVsDormRatio: '通学100%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 2,
      notableProAlumni: ['尾ب 健太', '複数のJリーガーおよび関東大学リーグ選手'],
      universitySoccerRate: 64,
      topSoccerUniversities: ['法政大学', '東洋大学', '日本大学', '国士舘大学', '拓殖大学', '日本体育大学'],
      topGeneralUniversities: ['明治大学', '法政大学', '日本大学', '東洋大学', '専修大学'],
      careerSummary:
        '約150大学・700名以上の指定校推薦枠を保有しており、サッカー部員も3年間の評定を積み上げることで有名私大へ確実に進学できる強みがあります。',
    },
    videoShowcase: {
      title: '実践学園高校サッカー部 — 都心・中野坂上校舎と高尾専用人工芝ピッチで磨く総合力',
      totalDuration: '06:45',
      updatedAt: '2026年9月更新',
      coachQuote: '「ピッチの中でも外でも、周囲から応援される誠実でタフな選手を育てます。」',
      chapters: [
        {
          id: 'jg-ch1',
          timeRange: '00:00 - 02:20',
          title: '01. 高尾専用人工芝グラウンドでの戦術＆紅白戦',
          summary: '豊かな自然に囲まれた専用フルサイズ人工芝ピッチでの実践トレーニング。',
          keyMetrics: ['FIFA公認級人工芝ピッチ', 'カテゴリー別競争システム'],
          tacticalFocus: '攻守一体のコンパクトな陣形維持',
        },
        {
          id: 'jg-ch2',
          timeRange: '02:20 - 04:30',
          title: '02. 新宿から4分・中野坂上キャンパスの学習環境',
          summary: '都心ならではの通学利便性と、700枠を超える大学指定校推薦サポート。',
          keyMetrics: ['中野坂上駅徒歩5分', '指定校推薦枠700名分以上'],
          tacticalFocus: '部活後の移動時間を活かした学習習慣',
        },
        {
          id: 'jg-ch3',
          timeRange: '04:30 - 06:45',
          title: '03. GRANDE FC出身先輩のメッセージ',
          summary: '埼玉のクラブから東京の強豪・実践学園へ進んだ理由と高校生活の充実度。',
          keyMetrics: ['GRANDE FC OB在籍', '都内1部T1リーグ参戦'],
          tacticalFocus: '中1から意識すべき基礎技術と学校の評定',
        },
      ],
    },
    testimonials: [
      {
        id: 'jg-t1',
        studentName: 'R.K 選手',
        grade: '高校2年（MF）',
        position: 'MF（サイドハーフ／トップ下）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都中野区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 29,
        naishinAtJhs3: 32,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: 'スポーツ・進学群',
        headline: '新宿から4分の校舎と、専用人工芝グラウンドの両方が手に入る！大学推薦枠も豊富です',
        whyChoseSchool:
          '自宅が中野区なので朝の通学が自転車や電車で15分と近く、しかも高尾にサッカー部専用の素晴らしい人工芝グラウンドがあることに惹かれました。',
        soccerAndStudyBalance:
          '内申点は中3で9科32（5科17）を取りました。高校では指定校推薦の枠が本当にたくさんあるので、普段の定期テストを頑張ればGMARCHや日東駒専への道がしっかり開けます。',
        facilityAndDormImpression:
          '高尾の専用グラウンドは空気が綺麗でサッカーだけに集中できます。校舎も中野坂上駅のすぐ近くでとても綺麗です。',
        adviceForJhs1:
          '東京在住で埼玉のGRANDEに通っている人は、埼玉の高校だけでなく東京の強豪校の練習会にも中3の夏に絶対参加してみてください！',
      },
    ],
  },
  {
    id: 'maebashi-ikuei',
    name: '前橋育英高等学校',
    shortName: '前橋育英',
    prefecture: '群馬県',
    city: '前橋市',
    regionCategory: '関東圏',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 48,
    deviationMax: 65,
    deviationRepresentative: 53,
    soccerStrengthScore: 98,
    courses: [
      {
        name: '保育・スポーツコース（アスリートクラス）',
        deviation: 49,
        soccerClubAllowed: true,
        note: '全国制覇を目指すサッカー部主力選手が在籍。',
      },
      {
        name: '普通科（進学・選抜・特進コース）',
        deviation: 56,
        soccerClubAllowed: true,
        note: '一般教科を深く学びながらサッカー部に所属し、難関大学を目指す選手も在籍。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 15,
      heigan9: 33,
      academicSpecial9: 37,
      tokyoStudentRuleNote:
        'GRANDE FCからも歴代多くの選手がスカウト・練習会を経て進学している全国屈指の名門「タイガー軍団」。東京・埼玉からの進学者はサッカー部専用寮に入寮します。内申点は9科28〜30以上（欠席日数・生活態度重視）＋クラブ実績・練習会評価でスポーツ推薦相談が可能です。',
      scholarshipRanks: [
        {
          rank: '体育特待生（S・A・B）',
          tuitionExemption: '入学金・施設費・授業料全額または一部免除＋寮費補助制度あり',
          condition: 'スカウト直接オファーまたは練習会S評価＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 5.0,
      academicQuality: 4.1,
      facilityQuality: 4.9,
      dormAndSupport: 4.9,
      careerOutcomes: 5.0,
    },
    soccerProfile: {
      clubMembersCount: 190,
      nationalChampionshipCount: '全国高校サッカー選手権 27回出場（全国優勝2回・準優勝3回）',
      interHighCount: 'インターハイ全国大会 優勝2回',
      playStyle: '圧倒的なボール保持力・中盤の技術・素早い攻守の切り替えで試合を支配する王道スタイル',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '山田 耕介 監督',
      grandeFcObCountLast5Years: 6,
      grandeFcFitReason:
        '中盤での細かいパスワークと個人のボールキープ力を極限まで重視するため、GRANDE FCで技術を磨いた選手が毎年スカウトの目に留まり進学しています。',
    },
    facilities: {
      summary: '高崎・前橋エリアの専用サッカーグラウンド（人工芝・天然芝複数面）、大型ウエイトジム、専用学生寮完備',
      pitchType: '専用フルサイズ人工芝グラウンド複数面＋天然芝グラウンド',
      floodlights: true,
      clubhouse: true,
      physicalGym: 'プロ仕様のウエイト＆コンディショニングセンター',
      medicalStaff: '専属トレーナー複数名・管理栄養士・Jクラブ連携メディカル',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '前橋育英サッカー部専用寮',
      dormMonthlyCost: '約68,000円〜75,000円（朝・昼弁当・夕3食込）',
      mealSupport: '専属栄養士による3食完全サポート（育英カレー・リカバリー食など名物メニュー充実）',
      commuteFromTokyoMinutes: 95,
      commuteRouteFromTokyo: '東京在住者は原則入寮（帰省時はJR高崎線・上越新幹線で東京・上野・赤羽へ約60〜80分）',
      nearestStation: 'JR両毛線「前橋駅」または「新前橋駅」よりバス・自転車',
      commuteVsDormRatio: '寮生活70%（関東一円・全国から集結）：通学30%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 18,
      notableProAlumni: ['松田 直樹', '細貝 萌', '渡邊 凌磨', '坂元 達裕', '榎本 樹', '秋山 裕紀', '徳永 涼'],
      universitySoccerRate: 75,
      topSoccerUniversities: ['筑波大学', '明治大学', '早稲田大学', '中央大学', '法政大学', '流通経済大学', '東洋大学'],
      topGeneralUniversities: ['早稲田大学', '明治大学', '中央大学', '法政大学', '日本大学', '東洋大学'],
      careerSummary:
        '通算70名以上のJリーガーを輩出する「プロ養成所」でありながら、筑波大・早大・明大・中大など大学サッカー界の最高峰へも毎年主力を送り込む全国トップクラスの進路実績を誇ります。',
    },
    videoShowcase: {
      title: '前橋育英高校サッカー部 — 全国制覇「タイガー軍団」の専用グラウンド群と寮生活のすべて',
      totalDuration: '09:15',
      updatedAt: '2026年10月更新',
      coachQuote: '「基本技術と人間性。毎日の練習で1ミリでも上手くなりたいという情熱を持った選手を育てます。」',
      chapters: [
        {
          id: 'mi-ch1',
          timeRange: '00:00 - 03:10',
          title: '01. 複数面の専用人工芝・天然芝グラウンドとA〜Dチーム入れ替え制度',
          summary: '190名の部員全員が実戦機会を得られる複数リーグ参戦（プレミア・プリンス・県1部・ルーキーリーグ）の仕組み。',
          keyMetrics: ['専用ピッチ複数面保有', '毎週の紅白戦でカテゴリー昇格チャンス'],
          tacticalFocus: '止める・蹴るの圧倒的な質と中盤の支配力',
        },
        {
          id: 'mi-ch2',
          timeRange: '03:10 - 06:20',
          title: '02. サッカー部専用寮の1日と3食のアスリート食事サポート',
          summary: '東京・埼玉の街クラブから入寮した1年生の部屋、食堂、夜の自主練・学習時間を密着取材。',
          keyMetrics: ['3食栄養管理付き寮完備', '東京から新幹線・在来線で帰省も容易'],
          tacticalFocus: '自立心と仲間との絆を育む寮生活',
        },
        {
          id: 'mi-ch3',
          timeRange: '06:20 - 09:15',
          title: '03. 70名超のJリーガー輩出＆筑波・早慶MARCHへの進路実績',
          summary: '山田耕介監督が語る「プロになる選手・大学で伸びる選手の共通点」。',
          keyMetrics: ['過去5年プロ輩出18名', '関東大学1部進学率トップクラス'],
          tacticalFocus: '高校3年間でプロ基準の習慣を身につける',
        },
      ],
    },
    testimonials: [
      {
        id: 'mi-t1',
        studentName: 'A.H 選手',
        grade: '高校3年（MF・プレミアリーグ出場）',
        position: 'MF（ボランチ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都練馬区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 30,
        naishinAtJhs3: 33,
        admissionRoute: 'スポーツ推薦（特待単願）',
        courseName: 'スポーツコース',
        headline: 'GRANDEから憧れのタイガー軍団へ！寮生活で24時間サッカーに打ち込み全国制覇を経験',
        whyChoseSchool:
          'GRANDEの先輩が前橋育英で10番や主力を背負ってプロになっていく姿を見て、「絶対にここでプレーしたい」と思っていました。中3の春・夏の関東リーグと練習会でスカウトの方の目に留まり、声をかけていただきました。',
        soccerAndStudyBalance:
          '内申点は9科30以上を絶対条件として意識し、中3で33を取りました。スポーツコースは午前中にしっかり授業を受け、午後から専用グラウンドで長く深く練習できるので最高です。',
        facilityAndDormImpression:
          '人工芝も天然芝も専用グラウンドがあり、環境はJクラブユースと変わりません。東京の実家からも高崎線1本なので、オフの日に帰省するのも簡単です。',
        adviceForJhs1:
          '前橋育英のスカウトの方は、関東U-15リーグやクラブユース選手権の試合をよく観に来られます。中1から基礎技術（特にプレッシャー下でのファーストタッチ）をGRANDEで極限まで磨いてください！',
      },
    ],
  },
  {
    id: 'ichiritsu-funabashi',
    name: '船橋市立船橋高等学校',
    shortName: '市立船橋',
    prefecture: '千葉県',
    city: '船橋市',
    regionCategory: '関東圏',
    type: '公立',
    league: 'プレミアリーグEAST',
    deviationMin: 50,
    deviationMax: 58,
    deviationRepresentative: 55,
    soccerStrengthScore: 95,
    courses: [
      {
        name: '体育科',
        deviation: 50,
        soccerClubAllowed: true,
        note: 'サッカー部主力が在籍。専門的なスポーツ科学・トレーニング理論を授業でも履修。',
      },
      {
        name: '普通科・商業科',
        deviation: 57,
        soccerClubAllowed: true,
        note: '学業と部活を両立して大学進学を目指すコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 31,
      sportsRecommendation5: 17,
      heigan9: 35,
      academicSpecial9: 36,
      tokyoStudentRuleNote:
        '公立（市立）高校ですが、体育科・専門学科や入寮・転居規定を満たすことで県外（東京・埼玉等）のクラブチームからも多くの選手がセレクション・練習会を経て進学しています。公立のため学費負担が非常に軽いのも特徴です。',
      scholarshipRanks: [
        {
          rank: '公立高校授業料無償化制度対象',
          tuitionExemption: '公立高校のため年間授業料が私立に比べ大幅に安価',
          condition: '高等学校等就学支援金制度適用',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.1,
      facilityQuality: 4.6,
      dormAndSupport: 4.6,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 130,
      nationalChampionshipCount: '全国高校サッカー選手権 24回出場（全国優勝5回）',
      interHighCount: 'インターハイ全国大会 優勝9回（全国最多級）',
      playStyle: '伝統の「球際・切り替え・運動量」に加え、緻密なビルドアップとセットプレーを誇る名門',
      formation: '4-3-3 / 4-4-2',
      coachName: '波多 秀吾 監督（市立船橋OB）',
      grandeFcObCountLast5Years: 4,
      grandeFcFitReason:
        '関東の街クラブからセレクション・練習会を経て進学する選手が多く、東京都内（特に東部・都心）からは総武線快速で通学圏内でもあります。',
    },
    facilities: {
      summary: '校内人工芝グラウンド、グラスポ（法典公園人工芝球技場）連携、大型トレーニングジム、専用寮完備',
      pitchType: '人工芝グラウンド（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '体育科仕様の大型ウエイトトレーニング施設',
      medicalStaff: '専属トレーナー・フィジカルコーチ・栄養士',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '市立船橋サッカー部寮',
      dormMonthlyCost: '約65,000円〜72,000円（朝・夕食事込）',
      mealSupport: '栄養管理された寮食＋捕食サポート',
      commuteFromTokyoMinutes: 40,
      commuteRouteFromTokyo: '東京駅・秋葉原・錦糸町方面からJR総武線快速で「船橋駅」または「東船橋駅」下車（東京駅から約28分）',
      nearestStation: 'JR総武線「東船橋駅」徒歩12分',
      commuteVsDormRatio: '通学55%（東京東部・千葉県内）：寮生活45%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 12,
      notableProAlumni: ['カレン・ロバート', '増嶋 竜也', '杉岡 大暉', '原 輝綺', '鈴木 唯人', '郡司 璃来'],
      universitySoccerRate: 72,
      topSoccerUniversities: ['筑波大学', '明治大学', '法政大学', '早稲田大学', '順天堂大学', '日本体育大学', '流通経済大学'],
      topGeneralUniversities: ['法政大学', '日本大学', '東洋大学', '順天堂大学', '日本体育大学'],
      careerSummary:
        '全国制覇14回（選手権5・インハイ9）の圧倒的実績を持ち、欧州組・J1主力・大学サッカー界のエースを毎年輩出しています。',
    },
    videoShowcase: {
      title: '市立船橋高校サッカー部 — 公立の雄「イチフナ」の強度の秘密と体育科カリキュラム',
      totalDuration: '07:50',
      updatedAt: '2026年10月更新',
      coachQuote: '「日常の基準を日本一に。細部にこだわり抜く姿勢がプロへの扉を開きます。」',
      chapters: [
        {
          id: 'if-ch1',
          timeRange: '00:00 - 02:40',
          title: '01. プレミアリーグを戦い抜く伝統の「球際＆切り替え」練習',
          summary: '1対1・2対2のデュエル強度と、攻守が入れ替わった瞬間のスプリント習慣。',
          keyMetrics: ['インターハイ全国優勝9回', 'プレミアリーグEAST所属'],
          tacticalFocus: 'ゴール前での粘り強さとクロス対応',
        },
        {
          id: 'if-ch2',
          timeRange: '02:40 - 05:15',
          title: '02. 体育科の専門授業と大型ウエイトトレーニング室',
          summary: '解剖学やスポーツ栄養学を授業で学びながら身体を作る体育科ならではの強み。',
          keyMetrics: ['公立ならではの学費メリット', '専門トレーニング施設'],
          tacticalFocus: '理論に基づいたフィジカル強化',
        },
        {
          id: 'if-ch3',
          timeRange: '05:15 - 07:50',
          title: '03. 東京駅から30分圏内のアクセス＆サッカー部寮紹介',
          summary: 'JR東船橋駅から徒歩12分の好立地と、県外選手を支える寮環境。',
          keyMetrics: ['JR東船橋駅徒歩12分', '寮完備'],
          tacticalFocus: '高卒プロ・大学トップリーグへのキャリア設計',
        },
      ],
    },
    testimonials: [
      {
        id: 'if-t1',
        studentName: 'K.T 選手',
        grade: '高校2年（DF）',
        position: 'DF（サイドバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都江東区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 31,
        naishinAtJhs3: 34,
        admissionRoute: '体育科・実技検査入試',
        courseName: '体育科',
        headline: '公立高校の学費で全国トップのプレミアリーグを戦える！東京からも総武線で通いやすい',
        whyChoseSchool:
          '全国優勝の歴史がある「イチフナ」の青いユニフォームに憧れていました。公立高校なので親に学費の負担をかけずに日本一の環境で挑戦できることも大きかったです。',
        soccerAndStudyBalance:
          '公立入試なので実技だけでなく学力検査（5教科）と内申点（9科34）の両方を中2からしっかり準備しました。体育科の授業はスポーツ理論が学べてサッカーに直結します。',
        facilityAndDormImpression:
          'ウエイトルームの設備が凄まじく、フィジカルが劇的に強くなりました。東船橋駅から近くて東京からも30分ちょっとで着きます。',
        adviceForJhs1:
          '市船のような公立強豪校を目指すなら、サッカーの実技だけでなく5教科の基礎学力も必ず必要になります。中1の英語と数学は絶対に積み残さないようにしてください！',
      },
    ],
  },
  {
    id: 'ryukei-kashiwa',
    name: '流通経済大学付属柏高等学校',
    shortName: '流通経済大柏',
    prefecture: '千葉県',
    city: '柏市',
    regionCategory: '関東圏',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 50,
    deviationMax: 66,
    deviationRepresentative: 55,
    soccerStrengthScore: 97,
    courses: [
      {
        name: 'スポーツ進学コース（III類）',
        deviation: 50,
        soccerClubAllowed: true,
        note: 'サッカー部員専用のクラス編成。午後の練習・遠征・栄養プログラムに完全対応。',
      },
      {
        name: '総合進学・特進コース（I類・II類）',
        deviation: 60,
        soccerClubAllowed: false,
        note: '※サッカー部（強化）は原則スポーツ進学コースでの募集となります。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 15,
      heigan9: 34,
      academicSpecial9: 36,
      tokyoStudentRuleNote:
        '秋葉原・北千住駅からつくばエクスプレス（TX）で「柏の葉キャンパス駅」まで約25〜30分。東京・埼玉（武蔵野線・TX沿線）から通学する部員も多く、またキャンパス隣接の専用寮も完備しています。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特待生（S・A・B）',
          tuitionExemption: '入学金・授業料全額または一部免除',
          condition: 'スカウト・練習会評価＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.1,
      facilityQuality: 4.9,
      dormAndSupport: 4.8,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 180,
      nationalChampionshipCount: '全国高校サッカー選手権 優勝1回・準優勝3回',
      interHighCount: 'インターハイ全国大会 優勝2回',
      playStyle: '全国屈指のハイプレス＆ショートカウンターと、磨かれた個人技術を融合した高強度スタイル',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '榎本 雅大 監督',
      grandeFcObCountLast5Years: 7,
      grandeFcFitReason:
        '埼玉南部・東京北部から武蔵野線やつくばエクスプレスでアクセスしやすく、GRANDE FCからもプロ志向・大学サッカー志向の強い選手が進学しています。',
    },
    facilities: {
      summary: '校内フルサイズ人工芝サッカー場（夜間照明・観客席完備）、専用ウエイトジム、キャンパス内学生寮完備',
      pitchType: '専用フルサイズ人工芝サッカー場（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '最新ウエイト＆アジリティトレーニング施設',
      medicalStaff: '専属トレーナー・フィジカルコーチ・栄養士',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '流通経済大柏 強化クラブ学生寮（敷地内隣接）',
      dormMonthlyCost: '約72,000円（3食込）',
      mealSupport: 'キャンパス食堂にて朝・昼・夕3食アスリートビュッフェ提供',
      commuteFromTokyoMinutes: 45,
      commuteRouteFromTokyo: '秋葉原・北千住駅からつくばエクスプレス「柏の葉キャンパス駅」下車、またはJR常磐線「柏駅」よりバス',
      nearestStation: 'つくばエクスプレス「柏の葉キャンパス駅」バス7分／東武野田線「江戸川台駅」バス5分',
      commuteVsDormRatio: '寮生活60%：通学40%（東京北部・埼玉・千葉から通学可能）',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 13,
      notableProAlumni: ['大前 元紀', '小泉 慶', '関川 郁万', 'ジャーメイン 良', '松本 隼'],
      universitySoccerRate: 78,
      topSoccerUniversities: ['流通経済大学（大学サッカー名門・内部進学枠）', '明治大学', '筑波大学', '法政大学', '早稲田大学', '東洋大学'],
      topGeneralUniversities: ['流通経済大学', '法政大学', '東洋大学', '日本大学', '駒澤大学'],
      careerSummary:
        'プロ輩出数が全国トップクラスであるだけでなく、大学サッカー界の王者・流通経済大学への優先進学ルートを持っているため、「高卒プロ」と「大学経由プロ」の二段構えが可能な稀有な環境です。',
    },
    videoShowcase: {
      title: '流通経済大柏高校サッカー部 — プレミアリーグの強度と「流経大」へ繋がるプロ育成パイプ',
      totalDuration: '08:00',
      updatedAt: '2026年10月更新',
      coachQuote: '「日本一の強度の中で技術を出し切る。本気でプロを目指す選手にとって最高の道場です。」',
      chapters: [
        {
          id: 'rk-ch1',
          timeRange: '00:00 - 02:45',
          title: '01. 流経柏の代名詞「超高速ハイプレス＆トランジション」練習',
          summary: 'ボールを失った瞬間の即時奪回と、局面を打開するドリブル・パス練習。',
          keyMetrics: ['プレミアリーグEAST常連', '全カテゴリー人工芝練習'],
          tacticalFocus: 'プレッシャー下での正確な判断と球際勝利',
        },
        {
          id: 'rk-ch2',
          timeRange: '02:45 - 05:30',
          title: '02. キャンパス内人工芝グラウンド＆隣接学生寮ツアー',
          summary: '部屋から徒歩2分で人工芝ピッチに出られる寮環境と3食ビュッフェ食堂を紹介。',
          keyMetrics: ['寮からピッチまで徒歩2分', '3食栄養管理ビュッフェ'],
          tacticalFocus: '24時間サッカーに集中できる環境設計',
        },
        {
          id: 'rk-ch3',
          timeRange: '05:30 - 08:00',
          title: '03. 高卒Jリーガー＆大学サッカー名門への進路ルート解説',
          summary: '流通経済大学サッカー部や明治大・筑波大へ進みJリーガーになるキャリアパス。',
          keyMetrics: ['過去5年Jリーガー13名', '流通経済大学への内部推薦枠'],
          tacticalFocus: '確実にプロへ届くための7年育成プラン',
        },
      ],
    },
    testimonials: [
      {
        id: 'rk-t1',
        studentName: 'H.M 選手',
        grade: '高校2年（FW）',
        position: 'FW（センターフォワード）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都荒川区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 29,
        naishinAtJhs3: 31,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: 'スポーツ進学コース',
        headline: '寮からグラウンドまで徒歩2分！北千住からTXで近いので週末の帰省もすごく楽です',
        whyChoseSchool:
          '高卒でJリーガーになるか、大学サッカー1部に行ってプロになるかの両方の道が一番太いのが流経柏だと思ったからです。練習会での熱量に圧倒されて即決しました。',
        soccerAndStudyBalance:
          '中学の内申は9科31でした。スポーツ進学コースは同じ夢を持つ仲間ばかりで、午前中の授業もしっかり受けて午後は100%サッカーに打ち込めます。',
        facilityAndDormImpression:
          '寮のすぐ目の前が人工芝のメイングラウンドなので、朝練や夜の自主練がいつでもできます。実家の東京からもつくばエクスプレスですぐなので寂しさもありません。',
        adviceForJhs1:
          '流経柏は技術だけでなく「走る・戦う・声を出す」というベースをすごく見てくれます。GRANDEの試合で最後まで走り切る姿勢を見せてください！',
      },
    ],
  },
  {
    id: 'aomori-yamada',
    name: '青森山田高等学校',
    shortName: '青森山田',
    prefecture: '青森県',
    city: '青森市',
    regionCategory: '全国寮完備',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 46,
    deviationMax: 62,
    deviationRepresentative: 51,
    soccerStrengthScore: 99,
    courses: [
      {
        name: '普通科 スポーツコース',
        deviation: 48,
        soccerClubAllowed: true,
        note: '全国から集まるトップアスリート専用のカリキュラム。',
      },
      {
        name: '普通科 特進・進学コース',
        deviation: 58,
        soccerClubAllowed: true,
        note: '国公立・有名私大進学を目指すコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 28,
      sportsRecommendation5: 15,
      heigan9: 32,
      academicSpecial9: 36,
      tokyoStudentRuleNote:
        '全国制覇4回を誇る高校サッカー界の絶対王者。GRANDE FCからも過去に全国選手権メンバーやプロ候補が進学しています。関東の街クラブ選手は中2〜中3の遠征試合や練習会でのスカウト評価＋中学校内申点（9科28以上・欠席日数基準）でスポーツ推薦出願となります。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特待生（S・A・B）',
          tuitionExemption: '入学金・授業料・施設費・寮費等の免除（ランクによる）',
          condition: 'スカウト評価・練習会合格＋内申・素行基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 5.0,
      academicQuality: 3.9,
      facilityQuality: 4.9,
      dormAndSupport: 5.0,
      careerOutcomes: 5.0,
    },
    soccerProfile: {
      clubMembersCount: 200,
      nationalChampionshipCount: '全国高校サッカー選手権 29回連続出場（全国優勝4回・準優勝4回）',
      interHighCount: 'インターハイ全国大会 優勝2回',
      playStyle: '圧倒的なフィジカル・球際・セットプレーと、ゴールへ最短で向かう組織的アタッキングサッカー',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '正木 昌宣 監督',
      grandeFcObCountLast5Years: 4,
      grandeFcFitReason:
        '「関東の街クラブで磨いた技術を、青森山田のフィジカル・メンタリティと掛け合わせて高卒Jリーガー・海外移籍を実現したい」という覚悟を持ったGRANDE FC選手が進学しています。',
    },
    facilities: {
      summary: '人工芝サッカー場2面（照明・雪対策設備）、室内練習場、大型ウエイトジム、複数の専用学生寮完備',
      pitchType: '専用フルサイズ人工芝グラウンド2面＋室内トレーニング施設',
      floodlights: true,
      clubhouse: true,
      physicalGym: '日本トップクラスのストレングス＆コンディショニングジム',
      medicalStaff: '専属トレーナー・栄養士・メンタルトレーナー・提携整形外科',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '青森山田高校サッカー部専用寮（北原寮ほか）',
      dormMonthlyCost: '約65,000円〜72,000円（3食・光熱費込）',
      mealSupport: '1日4,000kcal超を支える3食＋捕食の徹底した栄養管理',
      commuteFromTokyoMinutes: 195,
      commuteRouteFromTokyo: '全寮制（東京駅・上野駅から東北新幹線「はやぶさ」で新青森駅まで約3時間）',
      nearestStation: 'JR「青森駅」・東北新幹線「新青森駅」',
      commuteVsDormRatio: '寮生活90%（東京・埼玉・関東出身の部員が多数在籍）：通学10%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 21,
      notableProAlumni: ['柴崎 岳', '室屋 成', '神谷 優太', '郷家 友太', 'バスケス バイロン', '松木 玖生', '宇野 禅斗'],
      universitySoccerRate: 76,
      topSoccerUniversities: ['明治大学', '筑波大学', '法政大学', '早稲田大学', '中央大学', '東洋大学', '日本体育大学'],
      topGeneralUniversities: ['法政大学', '東洋大学', '日本大学', '日本体育大学', '青森大学'],
      careerSummary:
        'プレミアリーグEAST優勝回数・選手権優勝回数・プロ輩出数すべてにおいて高校サッカー界の頂点に君臨しています。',
    },
    videoShowcase: {
      title: '青森山田高校サッカー部 — 日本一の日常、雪国で鍛えるフィジカルと北原寮の全貌',
      totalDuration: '09:30',
      updatedAt: '2026年10月更新',
      coachQuote: '「私生活の乱れはピッチに出る。感謝と自立を持った人間だけが日本一の舞台に立てます。」',
      chapters: [
        {
          id: 'ay-ch1',
          timeRange: '00:00 - 03:20',
          title: '01. 人工芝2面での紅白戦＆日本一のフィジカルトレーニング',
          summary: 'プレミアリーグとプリンスリーグ東北の両方に参戦する圧倒的な選手層と球際トレーニング。',
          keyMetrics: ['プレミア＆プリンス2チーム参戦', '体幹・スプリント強化'],
          tacticalFocus: '90分間相手を圧倒するデュエルとゴール前の迫力',
        },
        {
          id: 'ay-ch2',
          timeRange: '03:20 - 06:30',
          title: '02. 関東出身選手が多く暮らす「サッカー部専用寮」密着',
          summary: '洗濯・掃除・食事・ミーティングまで、親元を離れて人間的に自立する3年間の寮生活。',
          keyMetrics: ['3食完全栄養管理', '関東出身部員が約半数'],
          tacticalFocus: '自立心とチームメイトとの一生モノの絆',
        },
        {
          id: 'ay-ch3',
          timeRange: '06:30 - 09:30',
          title: '03. 柴崎岳・松木玖生に続くプロ輩出メソッド',
          summary: 'なぜ青森山田の選手は高卒1年目からJリーグや欧州で試合に出られるのか。',
          keyMetrics: ['過去5年プロ21名輩出', '大学1部リーグ推薦枠も盤石'],
          tacticalFocus: 'プロ基準の日常習慣とメンタリティ',
        },
      ],
    },
    testimonials: [
      {
        id: 'ay-t1',
        studentName: 'K.Y 選手',
        grade: '高校3年（MF）',
        position: 'MF（ボランチ／サイドハーフ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都北区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 29,
        naishinAtJhs3: 32,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: 'スポーツコース',
        headline: '東京・埼玉を出て青森へ！GRANDEで磨いた技術に山田の強度が加わり自分が別人に成長しました',
        whyChoseSchool:
          '「高校3年間で絶対にプロになれる人間に成長したい」と思い、あえて親元を離れて日本一厳しい環境に飛び込みました。GRANDEの先輩が青森山田で活躍していたことも背中を押してくれました。',
        soccerAndStudyBalance:
          '中学時代は9科32を取って推薦をいただきました。青森山田は生活指導が本当にしっかりしているので、授業態度や寮での学習時間もチーム全員で徹底しています。',
        facilityAndDormImpression:
          'グラウンドのすぐ横に寮があり、移動時間は0分です。関東（東京・埼玉・神奈川）から来ている仲間がすごく多いので、方言や環境の不安もすぐに消えました。',
        adviceForJhs1:
          '本気で日本一や高卒プロを目指すなら、中2・中3の夏に青森山田の練習会にぜひ挑戦してみてください。自分の現在地がはっきり分かります！',
      },
    ],
  },
  {
    id: 'shizuoka-gakuen',
    name: '静岡学園高等学校',
    shortName: '静岡学園',
    prefecture: '静岡県',
    city: '静岡市葵区',
    regionCategory: '全国寮完備',
    type: '私立',
    league: 'プレミアリーグWEST',
    deviationMin: 54,
    deviationMax: 66,
    deviationRepresentative: 58,
    soccerStrengthScore: 97,
    courses: [
      {
        name: '教養科学科（探求・進学系）',
        deviation: 58,
        soccerClubAllowed: true,
        note: '全生徒が「教養科学科」に所属し、高い学業水準と全国トップのサッカーを両立。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 31,
      sportsRecommendation5: 17,
      heigan9: 36,
      academicSpecial9: 38,
      tokyoStudentRuleNote:
        '「テクニックとドリブルの聖地」シズガク。GRANDE FCからも毎年のように技術自慢の選手がスカウト・練習会を経て進学しています。東京駅から東海道新幹線「ひかり」で静岡駅まで約58分と実は非常に近く、指定寮・下宿環境も整っています。',
      scholarshipRanks: [
        {
          rank: 'スポーツ奨学生',
          tuitionExemption: '入学金・授業料減免制度あり',
          condition: 'スカウト・練習会評価＋内申基準（9科30〜32以上目安）',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.4,
      facilityQuality: 4.7,
      dormAndSupport: 4.8,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 220,
      nationalChampionshipCount: '全国高校サッカー選手権 15回出場（全国優勝2回）',
      interHighCount: 'インターハイ全国大会 複数回出場（準優勝）',
      playStyle: 'リフティング・ドリブル・個人技を極限まで突き詰める「シズガク・スタイル」',
      formation: '4-2-3-1 / 4-1-4-1',
      coachName: '川口 修 監督',
      grandeFcObCountLast5Years: 8,
      grandeFcFitReason:
        'GRANDE FCが最も大切にする「個の技術・フェイント・駆け引き・遊び心」を高校年代の最高峰レベルで伸ばせる学校であり、GRANDE FCから多数のOBが進学・活躍しています。',
    },
    facilities: {
      summary: '谷田専用人工芝グラウンド（照明完備）、校内人工芝ピッチ、ウエイトルーム、複数の指定学生寮完備',
      pitchType: '専用フルサイズ人工芝グラウンド（谷田G）＋校内人工芝',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用ストレングス＆コンディショニングルーム',
      medicalStaff: '専属トレーナー・フィジカルコーチ・栄養アドバイザー',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '静岡学園サッカー部指定寮・下宿（複数棟）',
      dormMonthlyCost: '約70,000円〜78,000円（朝・昼弁当・夕3食込）',
      mealSupport: '栄養バランスの取れた3食手作り食事サポート',
      commuteFromTokyoMinutes: 75,
      commuteRouteFromTokyo: '入寮制（東京駅・品川駅から東海道新幹線で「静岡駅」までわずか58分！）',
      nearestStation: 'JR「東静岡駅」徒歩10分／JR「静岡駅」自転車12分',
      commuteVsDormRatio: '寮・下宿生活75%（関東・関西・全国から技術派が集結）：通学25%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 16,
      notableProAlumni: ['三浦 知良', '大島 僚太', '旗手 怜央', '松村 優太', '古川 陽介', '髙橋 隆大'],
      universitySoccerRate: 74,
      topSoccerUniversities: ['筑波大学', '明治大学', '早稲田大学', '慶應義塾大学', '順天堂大学', '法政大学', '関西学院大学'],
      topGeneralUniversities: ['早稲田大学', '明治大学', '立命館大学', '法政大学', '関西大学', '東洋大学'],
      careerSummary:
        '大島僚太選手・旗手怜央選手・古川陽介選手など、見る者を魅了するテクニシャンをJリーグ・欧州・大学トップリーグへ毎年大量に輩出しています。',
    },
    videoShowcase: {
      title: '静岡学園高校サッカー部 — 伝統の「リフティング＆ドリブルドリル」と東京から新幹線58分の寮環境',
      totalDuration: '08:50',
      updatedAt: '2026年10月更新',
      coachQuote: '「テクニックは裏切らない。誰にも真似できない自分の武器を持った選手を待っています。」',
      chapters: [
        {
          id: 'sg-ch1',
          timeRange: '00:00 - 03:00',
          title: '01. 名物！1時間続く「シズガク個人技術・リフティング＆ドリブル」',
          summary: '220名の部員全員が毎日欠かさず行う、超絶技巧のリフティングと1対1駆け引きドリル。',
          keyMetrics: ['毎日60分の個人技術特化時間', 'プレミアリーグ参戦'],
          tacticalFocus: 'プレッシャーを無力化するボールタッチと独特のリズム',
        },
        {
          id: 'sg-ch2',
          timeRange: '03:00 - 05:50',
          title: '02. 谷田専用人工芝グラウンドと「教養科学科」の文武両道',
          summary: '新校舎（東静岡駅近く）の充実した学習環境と、専用ピッチでの創造性あふれる紅白戦。',
          keyMetrics: ['全生徒が教養科学科で学ぶ進学校体制', '専用人工芝グラウンド'],
          tacticalFocus: '高い学力とサッカーの閃きを同時に鍛える',
        },
        {
          id: 'sg-ch3',
          timeRange: '05:50 - 08:50',
          title: '03. GRANDE FC出身選手が語る「シズガクの寮生活と成長実感」',
          summary: '埼玉・東京から静岡学園に進学した先輩たちの日常と、東京から新幹線1時間の距離感。',
          keyMetrics: ['東京駅から新幹線58分', 'GRANDE FC OB多数進学'],
          tacticalFocus: '全国のテクニシャンと切磋琢磨する3年間',
        },
      ],
    },
    testimonials: [
      {
        id: 'sg-t1',
        studentName: 'T.K 選手',
        grade: '高校2年（MF）',
        position: 'MF（トップ下／サイドハーフ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都品川区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 32,
        naishinAtJhs3: 35,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '教養科学科',
        headline: 'ドリブルとテクニックを磨くなら日本一！GRANDEのスタイルが一番活きる高校です',
        whyChoseSchool:
          'GRANDEでずっと「個で剥がすドリブルと遊び心のあるパス」を磨いてきたので、それを高校でさらに突き詰めたいと思い静岡学園を選びました。GRANDEの先輩が毎年シズガクに行って活躍しているのも心強かったです。',
        soccerAndStudyBalance:
          '静岡学園は「教養科学科」という進学校カリキュラムなので、推薦でも内申点（僕は9科35でした）がしっかり見られます。高校の授業レベルも高く、筑波大や早慶MARCHに進む先輩が多いです。',
        facilityAndDormImpression:
          '静岡と聞くと遠く感じますが、東京駅・品川駅から新幹線で58分なので、実は北関東の高校より早く実家に帰れます（笑）。寮のご飯も温かくて最高です。',
        adviceForJhs1:
          'シズガクを目指すなら、中1から毎日リフティングとボールタッチを誰よりもやり込んで「これだけは負けない」という武器を作ってください！',
      },
    ],
  },
  {
    id: 'seibo-gakuen',
    name: '聖望学園高等学校',
    shortName: '聖望学園',
    prefecture: '埼玉県',
    city: '飯能市',
    regionCategory: '埼玉県',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 52,
    deviationMax: 65,
    deviationRepresentative: 56,
    soccerStrengthScore: 86,
    courses: [
      {
        name: '総合進学コース',
        deviation: 53,
        soccerClubAllowed: true,
        note: 'サッカー部員の多くが所属し、指定校推薦やAO・総合型選抜での大学進学に強い。',
      },
      {
        name: '選抜進学コース・特進コース',
        deviation: 61,
        soccerClubAllowed: true,
        note: 'GMARCH・難関私大受験とサッカー部活動を両立するコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 16,
      heigan9: 33,
      academicSpecial9: 37,
      tokyoStudentRuleNote:
        '池袋駅から西武池袋線急行1本で「東飯能駅」または「飯能駅」まで約45分。練馬区・豊島区・板橋区・西東京エリアからの通学者が非常に多く、GRANDE FCからも歴代多数の選手が進学している埼玉私学の雄です。',
      scholarshipRanks: [
        {
          rank: 'S特待・A特待（スポーツ・学業奨学生）',
          tuitionExemption: '入学金・施設費・授業料免除（ランク別）',
          condition: '練習会評価＋内申基準（5科16／9科29以上目安・欠席条件あり）',
        },
      ],
    },
    ratings: {
      soccerPower: 4.4,
      academicQuality: 4.2,
      facilityQuality: 4.6,
      dormAndSupport: 4.3,
      careerOutcomes: 4.5,
    },
    soccerProfile: {
      clubMembersCount: 145,
      nationalChampionshipCount: '全国高校サッカー選手権・インターハイ出場実績あり',
      interHighCount: '埼玉県大会ベスト4・関東大会出場多数',
      playStyle: '丁寧なビルドアップと中盤の連動性で主導権を握るテクニカルなポゼッションスタイル',
      formation: '4-3-3 / 4-2-3-1',
      coachName: '山本 昌輝 監督',
      grandeFcObCountLast5Years: 9,
      grandeFcFitReason:
        'ボールを大事に繋ぐサッカー哲学がGRANDE FCと共通しており、毎年GRANDE FCから中盤・DFラインの主軸候補として多くの選手が進学しています。',
    },
    facilities: {
      summary: '下川崎専用人工芝グラウンド（フルサイズ・照明・クラブハウス完備）、トレーニングジム完備',
      pitchType: 'サッカー部専用フルサイズ人工芝グラウンド',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用ウエイト＆コンディショニングルーム',
      medicalStaff: '専属アスレティックトレーナー・フィジカルコーチ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '聖望学園指定学生寮',
      dormMonthlyCost: '約68,000円（朝・夕食事込）',
      mealSupport: '栄養管理された寮食提供',
      commuteFromTokyoMinutes: 45,
      commuteRouteFromTokyo: '池袋駅・練馬駅から西武池袋線急行で「飯能駅」またはJR八高線「東飯能駅」下車',
      nearestStation: '西武池袋線「飯能駅」・JR/西武「東飯能駅」徒歩またはバス',
      commuteVsDormRatio: '通学80%（東京北西部・埼玉県内）：寮生活20%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 2,
      notableProAlumni: ['中島 翔哉（在籍歴）', '坂井 大将', '複数のJリーガー・大学1部主力選手'],
      universitySoccerRate: 63,
      topSoccerUniversities: ['立教大学', '法政大学', '東洋大学', '国士舘大学', '日本体育大学', '拓殖大学'],
      topGeneralUniversities: ['立教大学', '法政大学', '東洋大学', '日本大学', '武蔵大学', '成蹊大学'],
      careerSummary:
        'キリスト教主義教育に基づく手厚い進学指導と指定校推薦枠（立教大・法政大・東洋大ほか）があり、サッカーと大学進学の両面で満足度が非常に高い学校です。',
    },
    videoShowcase: {
      title: '聖望学園高校サッカー部 — 専用人工芝ピッチで磨くポゼッションサッカーと文武両道',
      totalDuration: '06:35',
      updatedAt: '2026年9月更新',
      coachQuote: '「判断を伴った技術と、仲間と意図を共有するサッカーの楽しさを追求しています。」',
      chapters: [
        {
          id: 'sb-ch1',
          timeRange: '00:00 - 02:20',
          title: '01. 下川崎専用人工芝グラウンドでのポゼッション＆崩し練習',
          summary: 'キーパーから繋いで前進するビルドアップと、アタッキングサードでの3人目の動き。',
          keyMetrics: ['専用フルサイズ人工芝', 'ポゼッション率重視'],
          tacticalFocus: '相手を見て立ち位置を変える戦術眼',
        },
        {
          id: 'sb-ch2',
          timeRange: '02:20 - 04:30',
          title: '02. 池袋・練馬方面から1本で通えるアクセスと学習サポート',
          summary: '西武池袋線での通学風景と、大学指定校推薦を活かしたキャリア設計。',
          keyMetrics: ['池袋から急行45分', 'GMARCH・成成明学指定校枠充実'],
          tacticalFocus: '通学時間を活用した学習習慣',
        },
        {
          id: 'sb-ch3',
          timeRange: '04:30 - 06:35',
          title: '03. GRANDE FC出身先輩インタビュー',
          summary: 'GRANDE FCの技術がそのまま活きる練習環境と先輩・後輩の雰囲気。',
          keyMetrics: ['GRANDE FC OB過去5年9名', '1年次から出場機会豊富'],
          tacticalFocus: '街クラブ出身者が中心となって創るチーム文化',
        },
      ],
    },
    testimonials: [
      {
        id: 'sb-t1',
        studentName: 'Y.H 選手',
        grade: '高校2年（MF）',
        position: 'MF（ボランチ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都練馬区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 29,
        naishinAtJhs3: 33,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '総合進学コース',
        headline: '練馬から西武池袋線1本で座って通学！GRANDEと同じ「繋ぐサッカー」で毎日が楽しいです',
        whyChoseSchool:
          '練馬の自宅から下り電車で座って通えることと、練習会に参加したときに先輩たちが徹底してショートパスを繋ぐサッカーをしていて、GRANDEのスタイルに一番近いと感じたからです。',
        soccerAndStudyBalance:
          '中3の1学期で9科33を取り、スポーツ推薦で合格しました。下りの電車は空いているので、行き帰りの電車内で英単語やテスト勉強がしっかりできます。',
        facilityAndDormImpression:
          '専用の人工芝グラウンドがとても広く、ナイター設備も綺麗です。',
        adviceForJhs1:
          '東京の西武線沿線や北部からGRANDEに通っている人には本当に通いやすくておすすめの高校です！',
      },
    ],
  },
  {
    id: 'ichiritsu-urawa',
    name: 'さいたま市立浦和高等学校',
    shortName: '市立浦和',
    prefecture: '埼玉県',
    city: 'さいたま市浦和区',
    regionCategory: '埼玉県',
    type: '公立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 67,
    deviationMax: 70,
    deviationRepresentative: 68,
    soccerStrengthScore: 84,
    courses: [
      {
        name: '普通科（中高一貫・高校募集）',
        deviation: 68,
        soccerClubAllowed: true,
        note: '埼玉県屈指の公立進学校。国公立大学・早慶GMARCHへの現役合格多数。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 40,
      sportsRecommendation5: 22,
      heigan9: 41,
      academicSpecial9: 42,
      tokyoStudentRuleNote:
        'さいたま市にある公立の伝統名門校（全国選手権優勝4回）。公立高校のためスポーツ推薦枠（単願確約）はなく一般学力検査＋調査書（内申点）での勝負となります（※県外受験は原則として入学までのさいたま市・埼玉県内への転居または所定条件が必要となるため、転居を視野に入れた超文武両道志望者の目標校となります）。',
      scholarshipRanks: [
        {
          rank: '公立高校就学支援金制度',
          tuitionExemption: '公立高校のため私立に比べ学費が大幅に安価',
          condition: '一般入試（5教科本番得点＋調査書）合格',
        },
      ],
    },
    ratings: {
      soccerPower: 4.3,
      academicQuality: 5.0,
      facilityQuality: 4.3,
      dormAndSupport: 3.9,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 95,
      nationalChampionshipCount: '全国高校サッカー選手権 優勝4回（浦和サッカー伝統校）',
      interHighCount: 'インターハイ全国大会 複数回出場',
      playStyle: '限られた練習時間で最大限の質を出す、伝統のハードワーク＆知性派サッカー',
      formation: '4-4-2',
      coachName: '市立浦和 指導スタッフ陣',
      grandeFcObCountLast5Years: 5,
      grandeFcFitReason:
        'GRANDE FCの本拠地・さいたま市浦和エリアにあり、「勉強も学年トップクラス（偏差値68前後）で、サッカーもS1・関東大会レベルで本気でやりたい」という選手が挑戦する憧れの伝統校です。',
    },
    facilities: {
      summary: '校内全面人工芝グラウンド（照明完備）、トレーニング室、自習室完備',
      pitchType: '校内フルサイズ人工芝グラウンド（公立では希少な全面人工芝）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '校内トレーニングルーム',
      medicalStaff: 'トレーナー帯同サポート',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '購買・各自持参',
      commuteFromTokyoMinutes: 35,
      commuteRouteFromTokyo: 'JR京浜東北線「北浦和駅」徒歩12分（赤羽駅から約18分）',
      nearestStation: 'JR京浜東北線「北浦和駅」徒歩12分',
      commuteVsDormRatio: '通学100%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 1,
      notableProAlumni: ['町田 也真人', '戸嶋 祥郎（筑波大経由J1プロ）'],
      universitySoccerRate: 55,
      topSoccerUniversities: ['筑波大学', '東京学芸大学', '早稲田大学', '慶應義塾大学', '明治大学', '立教大学'],
      topGeneralUniversities: ['東京大学', '一橋大学', '筑波大学', '千葉大学', '埼玉大学', '早稲田大学', '慶應義塾大学', '明治大学'],
      careerSummary:
        '筑波大学蹴球部からJリーガーになった戸嶋祥郎選手のように、国公立大学や早慶へ一般・推薦で現役合格して大学サッカーで輝くロールモデルが多数います。',
    },
    videoShowcase: {
      title: '市立浦和高校サッカー部 — 公立にして全面人工芝！偏差値68×埼玉トップリーグの文武両道',
      totalDuration: '06:15',
      updatedAt: '2026年8月更新',
      coachQuote: '「サッカーも受験勉強も、本質は『課題を分析し、自ら解決する力』にあります。」',
      chapters: [
        {
          id: 'iu-ch1',
          timeRange: '00:00 - 02:10',
          title: '01. 公立校では極めて珍しい「校内全面人工芝ピッチ」での短時間高密度練習',
          summary: '放課後の限られた時間で私立強豪校に対抗するための集中したゲーム形式トレーニング。',
          keyMetrics: ['校内全面人工芝完備', '90分〜120分短期集中'],
          tacticalFocus: '攻守の切り替えとセットプレーの精度',
        },
        {
          id: 'iu-ch2',
          timeRange: '02:10 - 04:15',
          title: '02. 国公立大・早慶へ現役合格するサッカー部員の学習ルーティン',
          summary: '朝自習・授業・部活・家庭学習の黄金サイクルを紹介。',
          keyMetrics: ['国公立・早慶GMARCH多数合格', '9科内申40以上目安'],
          tacticalFocus: '中1からの5教科高得点維持',
        },
        {
          id: 'iu-ch3',
          timeRange: '04:15 - 06:15',
          title: '03. 街クラブ（GRANDE FC等）から一般入試で突破した先輩の勉強法',
          summary: '中3秋の高円宮杯までクラブで続けながら偏差値68をクリアした秘訣。',
          keyMetrics: ['北浦和駅徒歩12分', '伝統のオレンジユニフォーム'],
          tacticalFocus: 'クラブ練習日と模試対策の両立',
        },
      ],
    },
    testimonials: [
      {
        id: 'iu-t1',
        studentName: 'S.T 選手',
        grade: '高校3年（MF）',
        position: 'MF（ボランチ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: 'さいたま市（転居含む）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 39,
        naishinAtJhs3: 42,
        admissionRoute: '公立一般入試（学力検査＋調査書）',
        courseName: '普通科',
        headline: '公立なのに校内が全面人工芝！筑波大や早慶を目指しながら埼玉トップレベルで戦えます',
        whyChoseSchool:
          'GRANDEで普段から浦和エリアでプレーしていたので、市立浦和の伝統と人工芝グラウンドにずっと憧れていました。',
        soccerAndStudyBalance:
          '公立入試はスポーツ推薦がないので、中1の最初から5教科オール4〜5（9科40以上）を維持しました。GRANDEは遠征や練習の時間を事前に共有してくれるので、塾のスケジュールとも両立できました。',
        facilityAndDormImpression:
          '北浦和駅から歩いてすぐで、公立高校とは思えないほど綺麗な人工芝ピッチがあります。',
        adviceForJhs1:
          'もし5教科の勉強が得意なら、私立のスポーツ推薦だけでなく「最難関の文武両道校」も視野に入れて中1から勉強を頑張ると選択肢が無限に広がります！',
      },
    ],
  },
  {
    id: 'tokai-takanawadai',
    name: '東海大学付属高輪台高等学校',
    shortName: '東海大高輪台',
    prefecture: '東京都',
    city: '港区',
    regionCategory: '東京都',
    type: '私立',
    league: '都県1部リーグ（S1/T1等）',
    deviationMin: 57,
    deviationMax: 62,
    deviationRepresentative: 59,
    soccerStrengthScore: 86,
    courses: [
      {
        name: '普通科（東海大学付属推薦・他大進学対応）',
        deviation: 59,
        soccerClubAllowed: true,
        note: '卒業生の約8割以上が東海大学（全学部）へ内部推薦進学可能。国公立・早慶GMARCH他大受験も可。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 32,
      sportsRecommendation5: 17,
      heigan9: 36,
      academicSpecial9: 38,
      tokyoStudentRuleNote:
        '東京都港区（白金高輪・品川・高輪ゲートウェイ圏内）に位置する大人気付属校。GRANDE FCの公式進路実績にも名を連ねており、都心からの通学利便性と東海大学への内部進学保証、そして200名規模の熱い部活環境が魅力です。',
      scholarshipRanks: [
        {
          rank: 'スポーツ推薦・特待制度',
          tuitionExemption: '東京都私立授業料軽減助成＋学園奨学金制度',
          condition: '練習会・セレクション高評価＋内申基準（9科32前後・5科に2がないこと等）クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.4,
      academicQuality: 4.4,
      facilityQuality: 4.5,
      dormAndSupport: 4.1,
      careerOutcomes: 4.6,
    },
    soccerProfile: {
      clubMembersCount: 185,
      nationalChampionshipCount: '東京都大会ベスト4・関東大会出場',
      interHighCount: '東京都上位常連',
      playStyle: '展開の速いサイド攻撃と、全員がハードワークするアグレッシブなアタッキングサッカー',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '川島 純一 監督',
      grandeFcObCountLast5Years: 5,
      grandeFcFitReason:
        '東京都在住のGRANDE FC選手にとって、都心の港区キャンパスに通いながら専用総合グラウンド（埼玉・東松山／浦安等）で鍛えられ、大学付属の安心感も得られる有力選択肢です。',
    },
    facilities: {
      summary: '高輪キャンパス最新校舎・室内練習場・トレーニングジム＋専用総合グラウンド（人工芝）',
      pitchType: '人工芝グラウンド（専用グラウンド＋校内コート）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '最新ウエイトトレーニングルーム完備',
      medicalStaff: '専属トレーナー・フィジカルコーチ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: false,
      mealSupport: '校内大型食堂（カフェテリア）完備',
      commuteFromTokyoMinutes: 20,
      commuteRouteFromTokyo: '東京メトロ南北線・都営三田線「白金高輪駅」、都営浅草線「泉岳寺駅」、JR「高輪ゲートウェイ駅」徒歩圏',
      nearestStation: '南北線・三田線「白金高輪駅」徒歩8分／浅草線「泉岳寺駅」徒歩9分',
      commuteVsDormRatio: '通学100%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 2,
      notableProAlumni: ['東海大学体育会サッカー部（総理大臣杯日本一）経由でのJリーガー多数'],
      universitySoccerRate: 70,
      topSoccerUniversities: ['東海大学（体育会サッカー部）', '明治大学', '法政大学', '日本体育大学', '国士舘大学'],
      topGeneralUniversities: ['東海大学（医学部・工学部・体育学部など約85%内部推薦可）', '明治大学', '法政大学'],
      careerSummary:
        '総合大学である東海大学への内部進学枠が盤石なため、文系・理系・体育系・医療系まで将来の進路を幅広く選びながら高校サッカーに全力を注げます。',
    },
    videoShowcase: {
      title: '東海大高輪台高校サッカー部 — 都心・港区キャンパスと東海大付属の強みを活かした育成',
      totalDuration: '06:30',
      updatedAt: '2026年9月更新',
      coachQuote: '「人間力と勝負強さ。都心の真ん中から全国を驚かせるチームを目指しています。」',
      chapters: [
        {
          id: 'tt-ch1',
          timeRange: '00:00 - 02:15',
          title: '01. スピード感あふれるサイド攻撃＆シュートドリル',
          summary: '球際の激しさと、サイドを突破してからの多彩なクロス・フィニッシュ練習。',
          keyMetrics: ['部員約185名の競争環境', 'T1/T2リーグ参戦'],
          tacticalFocus: '縦への推進力とゴール前の入り方',
        },
        {
          id: 'tt-ch2',
          timeRange: '02:15 - 04:20',
          title: '02. 白金高輪・品川エリアの最新校舎とトレーニング施設',
          summary: '東京メトロ南北線・都営三田線で都内どこからでも通いやすいキャンパス環境。',
          keyMetrics: ['白金高輪駅徒歩8分', '東海大内部進学率85%超'],
          tacticalFocus: '高3冬まで引退せずに続けられる付属校メリット',
        },
        {
          id: 'tt-ch3',
          timeRange: '04:20 - 06:30',
          title: '03. GRANDE FC出身部員が語る「埼玉のクラブから高輪台へ進んだ理由」',
          summary: '南北線1本で埼玉（浦和美園）とも港区とも繋がるアクセスの良さと部活の雰囲気。',
          keyMetrics: ['南北線沿線で通学抜群', 'GRANDE FC OB在籍'],
          tacticalFocus: '中1から意識したい9教科内申32以上の確保',
        },
      ],
    },
    testimonials: [
      {
        id: 'tt-t1',
        studentName: 'K.M 選手',
        grade: '高校2年（DF）',
        position: 'DF（サイドバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都文京区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 31,
        naishinAtJhs3: 34,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '普通科',
        headline: '南北線1本で通学20分！校舎がホテルのように綺麗で、東海大学への内部進学も安心です',
        whyChoseSchool:
          '中学時代は南北線（埼玉高速鉄道）で浦和美園方面のGRANDEに通っていたので、同じ南北線で逆方向の白金高輪にある高輪台は通学がすごくイメージしやすかったです。',
        soccerAndStudyBalance:
          '推薦基準として9科32以上（2がないこと）が必要だったので、中2から苦手をなくして34を取りました。付属校なので大学受験で部活を早く辞める必要がないのが最高です。',
        facilityAndDormImpression:
          '港区の校舎はとにかく設備が最新で、学食も美味しいです。週末や長期休みは専用人工芝グラウンドで思い切り試合ができます。',
        adviceForJhs1:
          '付属校のスポーツ推薦は「内申に2があると推薦できない」というルールがある学校が多いので、中1から苦手な教科でも絶対に3以上を取っておくことが大事です！',
      },
    ],
  },
  {
    id: 'toko-gakuen',
    name: '桐光学園高等学校',
    shortName: '桐光学園',
    prefecture: '神奈川県',
    city: '川崎市麻生区',
    regionCategory: '関東圏',
    type: '私立',
    league: 'プリンスリーグ関東',
    deviationMin: 61,
    deviationMax: 68,
    deviationRepresentative: 64,
    soccerStrengthScore: 93,
    courses: [
      {
        name: '普通科（SAコース・Aコース）',
        deviation: 64,
        soccerClubAllowed: true,
        note: '全国屈指の進学校でありながら、サッカー部員もハイレベルな授業を履修し難関大・プロへ進む。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 33,
      sportsRecommendation5: 18,
      heigan9: 39,
      academicSpecial9: 40,
      tokyoStudentRuleNote:
        '新宿駅から小田急線で約30分（新百合ヶ丘・栗平エリア）のため東京都内からの通学者が非常に多く、遠方者向けの寮も完備。GRANDE FCからも歴代進学実績がある「文武両道×全国トップレベル」の代表校です。',
      scholarshipRanks: [
        {
          rank: 'スポーツ推薦（特待・奨学制度）',
          tuitionExemption: '入学金・授業料減免制度あり',
          condition: 'クラブ実績・スカウト評価・練習会合格＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.8,
      academicQuality: 4.8,
      facilityQuality: 4.8,
      dormAndSupport: 4.6,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 135,
      nationalChampionshipCount: '全国高校サッカー選手権 14回出場（準優勝2回・ベスト4多数）',
      interHighCount: 'インターハイ全国大会 優勝1回・準優勝1回',
      playStyle: '緻密な戦術眼と連動した守備ブロック、サイドからの鋭い崩しを兼ね備えたインテリジェンス集団',
      formation: '4-4-2 / 4-2-3-1',
      coachName: '鈴木 勝大 監督（桐光学園OB）',
      grandeFcObCountLast5Years: 4,
      grandeFcFitReason:
        '戦術理解度と足元の技術の高さが求められるため、GRANDE FCで「考えるサッカー」を学んだ選手が非常にフィットしやすい環境です。',
    },
    facilities: {
      summary: 'サッカー部専用フルサイズ人工芝グラウンド（照明・観覧席完備）、ウエイトルーム、学生寮完備',
      pitchType: '校内専用フルサイズ人工芝サッカー場（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用トレーニングジム完備',
      medicalStaff: '専属トレーナー・フィジカルコーチ・栄養アドバイザー',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '桐光学園 強化運動部寮',
      dormMonthlyCost: '約72,000円（朝・夕食事込）',
      mealSupport: '栄養士監修の寮食および校内食堂完備',
      commuteFromTokyoMinutes: 35,
      commuteRouteFromTokyo: '新宿駅・下北沢駅から小田急線で「新百合ヶ丘駅」乗換、小田急多摩線「栗平駅」徒歩12分',
      nearestStation: '小田急多摩線「栗平駅」徒歩12分',
      commuteVsDormRatio: '通学75%（東京都内・神奈川県内）：寮生活25%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 9,
      notableProAlumni: ['中村 俊輔', '藤本 淳吾', '小川 航基', '鳥海 晃司', '西川 潤', '佐々木 旭', '三原 秀真'],
      universitySoccerRate: 72,
      topSoccerUniversities: ['筑波大学', '早稲田大学', '慶應義塾大学', '明治大学', '法政大学', '中央大学', '順天堂大学'],
      topGeneralUniversities: ['東京大学', '一橋大学', '筑波大学', '早稲田大学', '慶應義塾大学', '明治大学', '青山学院大学'],
      careerSummary:
        '中村俊輔氏や小川航基選手、西川潤選手ら日本代表・Jリーガーを多数輩出しつつ、筑波大・早慶・GMARCHへの進学実績も全国トップクラスを誇ります。',
    },
    videoShowcase: {
      title: '桐光学園高校サッカー部 — 中村俊輔・小川航基を生んだ専用人工芝ピッチと「究極の文武両道」',
      totalDuration: '07:55',
      updatedAt: '2026年10月更新',
      coachQuote: '「ピッチ上の判断速度は、日頃の学びの深さと比例します。プロと難関大の両方を本気で目指せる場所です。」',
      chapters: [
        {
          id: 'tg-ch1',
          timeRange: '00:00 - 02:40',
          title: '01. 専用人工芝サッカー場での高強度戦術トレーニング',
          summary: 'プリンスリーグ関東と全国大会を勝ち抜くための、スピーディーな展開とクロスからの得点パターン。',
          keyMetrics: ['インターハイ全国制覇', '専用フルサイズ人工芝'],
          tacticalFocus: '相手の弱点を突くゲームコントロール',
        },
        {
          id: 'tg-ch2',
          timeRange: '02:40 - 05:20',
          title: '02. 進学校としての学習サポートと大学・プロ進路実績',
          summary: '授業と部活を完全に両立し、筑波・早慶MARCH・Jリーグへ進む先輩たちの学習環境。',
          keyMetrics: ['過去5年Jリーガー9名', '早慶GMARCH・国公立合格多数'],
          tacticalFocus: '文武両道を高次元で成立させるカリキュラム',
        },
        {
          id: 'tg-ch3',
          timeRange: '05:20 - 07:55',
          title: '03. 新宿から35分の通学環境＆運動部寮の紹介',
          summary: '小田急線での都内からの通学と、遠方選手のための寮環境を紹介。',
          keyMetrics: ['栗平駅徒歩12分', '通学・入寮どちらも対応'],
          tacticalFocus: '生活リズムの確立',
        },
      ],
    },
    testimonials: [
      {
        id: 'tg-t1',
        studentName: 'N.K 選手',
        grade: '高校3年（MF）',
        position: 'MF（サイドハーフ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都世田谷区（都内公立中出身）',
        commuteOrDorm: '通学',
        naishinAtJhs1: 33,
        naishinAtJhs3: 36,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '普通科',
        headline: 'プロ輩出数も大学進学実績も全国トップ！レベルの高い仲間に囲まれて人間的にも成長できます',
        whyChoseSchool:
          '小川航基選手や西川潤選手に憧れていたことと、もし高卒でプロになれなくても筑波大や早慶MARCHのサッカー部に進める環境があることから桐光学園を選びました。',
        soccerAndStudyBalance:
          '進学校なので周りの生徒の勉強意識が高く、自然とテスト前に勉強する習慣がつきます。中学時代は内申36を取って推薦をいただきました。',
        facilityAndDormImpression:
          'キャンパスの中にサッカー部専用のフルサイズ人工芝グラウンドがあり、授業が終わって5分で練習を始められます。',
        adviceForJhs1:
          '桐光学園はサッカーの戦術理解度と学校の成績の両方を大事にするので、中1から内申33〜36以上をキープしておくと大きな武器になります！',
      },
    ],
  },
  {
    id: 'yaita-chuo',
    name: '矢板中央高等学校',
    shortName: '矢板中央',
    prefecture: '栃木県',
    city: '矢板市',
    regionCategory: '関東圏',
    type: '私立',
    league: 'プリンスリーグ関東',
    deviationMin: 45,
    deviationMax: 58,
    deviationRepresentative: 50,
    soccerStrengthScore: 93,
    courses: [
      {
        name: '普通科（スポーツ・総合進学コース）',
        deviation: 48,
        soccerClubAllowed: true,
        note: 'サッカー部主力が多く在籍し、全国大会制覇に向けた強化環境。',
      },
      {
        name: '普通科（特進コース）',
        deviation: 57,
        soccerClubAllowed: true,
        note: '大学進学を重視するコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 27,
      sportsRecommendation5: 14,
      heigan9: 30,
      academicSpecial9: 34,
      tokyoStudentRuleNote:
        '全国高校サッカー選手権ベスト4を4度誇る「赤き要塞」。GRANDE FCの公式進路実績でも毎年多数の選手が進学している非常に縁の深い強豪校です。内申点が27〜30前後であっても、練習会での実技評価（特に球際・走力・守備強度）が高ければスポーツ推薦・特待で大きく道が開けます。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特待生（S・A・B）',
          tuitionExemption: '入学金・施設費・授業料全額または一部免除',
          condition: '練習会・セレクション高評価＋クラブ監督推薦＋内申基準クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.8,
      academicQuality: 3.9,
      facilityQuality: 4.8,
      dormAndSupport: 4.8,
      careerOutcomes: 4.6,
    },
    soccerProfile: {
      clubMembersCount: 195,
      nationalChampionshipCount: '全国高校サッカー選手権 14回出場（全国ベスト4 4回）',
      interHighCount: 'インターハイ全国大会 複数回出場',
      playStyle: '日本屈指の堅守速攻・球際の強度・多彩なセットプレーで全国上位に食い込む勝負強さ',
      formation: '4-4-2',
      coachName: '高橋 健二 監督',
      grandeFcObCountLast5Years: 11,
      grandeFcFitReason:
        'GRANDE FCで培った足元の技術を持つ選手が、矢板中央のフィジカル・守備規律と融合することで1・2年次から主力として全国選手権に出場するケースが非常に多いです。',
    },
    facilities: {
      summary: '東泉専用人工芝サッカーグラウンド（照明・クラブハウス完備）、トレーニングジム、専用学生寮複数棟完備',
      pitchType: '専用フルサイズ人工芝グラウンド（東泉グラウンド）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用ウエイト＆フィジカルトレーニング施設',
      medicalStaff: '専属トレーナー・フィジカルコーチ・栄養士',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '矢板中央サッカー部専用寮',
      dormMonthlyCost: '約65,000円〜70,000円（朝・昼弁当・夕3食込）',
      mealSupport: '3食完全サポート（身体を大きくする増量食プログラムあり）',
      commuteFromTokyoMinutes: 90,
      commuteRouteFromTokyo: '入寮制（帰省時はJR宇都宮線または東北新幹線「那須塩原駅」経由で東京・上野・赤羽へ約70〜90分）',
      nearestStation: 'JR東北本線（宇都宮線）「矢板駅」徒歩10分',
      commuteVsDormRatio: '寮生活80%（埼玉・東京・関東の街クラブ出身者が多数）：通学20%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 6,
      notableProAlumni: ['富山 貴光', '星 キョーワァン', '飯島 陸', '多田 圭佑', '藤井 陽登'],
      universitySoccerRate: 74,
      topSoccerUniversities: ['法政大学', '東洋大学', '拓殖大学', '国士舘大学', '日本体育大学', '流通経済大学', '作新学院大学'],
      topGeneralUniversities: ['東洋大学', '日本大学', '駒澤大学', '大東文化大学', '帝京大学'],
      careerSummary:
        '全国選手権ベスト4常連の知名度と実績により、関東大学サッカー1部・2部リーグのスポーツ推薦枠が非常に豊富で、高卒プロも毎年のように輩出しています。',
    },
    videoShowcase: {
      title: '矢板中央高校サッカー部 — 全国ベスト4常連「赤き要塞」の専用人工芝ピッチと寮生活',
      totalDuration: '07:30',
      updatedAt: '2026年10月更新',
      coachQuote: '「粘り強く戦い、仲間と泥臭く勝利を掴む。全国ベスト4の壁を越えたい選手を待っています。」',
      chapters: [
        {
          id: 'yc-ch1',
          timeRange: '00:00 - 02:30',
          title: '01. 東泉専用人工芝グラウンドでの守備ブロック＆高速カウンター練習',
          summary: '全国大会で強豪を次々と破ってきた伝統の守備組織とロングスロー・セットプレー練習。',
          keyMetrics: ['全国選手権ベスト4 4回', 'プリンス関東＆県リーグ複数参戦'],
          tacticalFocus: '球際デュエルとゴール前の集中力',
        },
        {
          id: 'yc-ch2',
          timeRange: '02:30 - 05:00',
          title: '02. 埼玉・東京出身者が多く暮らす専用寮と食事サポート',
          summary: '3年間で体重・筋力を大きく伸ばす食事プログラムとアットホームな寮生活。',
          keyMetrics: ['3食付きの専用寮完備', 'JR矢板駅徒歩10分'],
          tacticalFocus: '当たり負けしないフィジカル育成',
        },
        {
          id: 'yc-ch3',
          timeRange: '05:00 - 07:30',
          title: '03. GRANDE FC出身OBインタビュー「なぜ矢板中央で全国に出られたか」',
          summary: 'GRANDEの技術と矢板の走力を掛け合わせて全国選手権のピッチに立った先輩の体験談。',
          keyMetrics: ['GRANDE FC OB過去5年11名', '大学スポーツ推薦枠多数'],
          tacticalFocus: '自分の武器をチームの勝利に直結させる意識',
        },
      ],
    },
    testimonials: [
      {
        id: 'yc-t1',
        studentName: 'M.S 選手',
        grade: '高校3年（DF・選手権メンバー）',
        position: 'DF（センターバック／サイドバック）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都足立区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 27,
        naishinAtJhs3: 29,
        admissionRoute: 'スポーツ推薦（特待単願）',
        courseName: '普通科',
        headline: '内申29から特待で入学！GRANDEの先輩がたくさんいる寮で鍛え、全国選手権の舞台に立てました',
        whyChoseSchool:
          'テレビで見ていた冬の全国高校サッカー選手権にどうしても出たくて、毎年のように全国ベスト4に入っている矢板中央の練習会に中3の夏に参加しました。GRANDEの先輩が毎年何人も進学していたので安心感がありました。',
        soccerAndStudyBalance:
          '勉強はあまり得意ではなく内申は9科29でしたが、練習会での1対1やヘディング、走る姿勢を高く評価していただき特待生として声をかけてもらえました。',
        facilityAndDormImpression:
          '専用の東泉グラウンドが素晴らしく、寮のご飯も山盛り食べられるので身長も体重も一気に伸びました。赤羽駅から宇都宮線1本で帰省できるのも便利です。',
        adviceForJhs1:
          '学校のテストが平均くらい（オール3前後）でも、サッカーの熱量と球際、そしてGRANDEで磨いた技術があれば全国の舞台に立てる高校です！',
      },
    ],
  },
  {
    id: 'shoshi',
    name: '尚志高等学校',
    shortName: '尚志',
    prefecture: '福島県',
    city: '郡山市',
    regionCategory: '全国寮完備',
    type: '私立',
    league: 'プレミアリーグEAST',
    deviationMin: 46,
    deviationMax: 61,
    deviationRepresentative: 52,
    soccerStrengthScore: 96,
    courses: [
      {
        name: '普通科（総合進学コース）',
        deviation: 49,
        soccerClubAllowed: true,
        note: 'サッカー部主力が多く在籍し、プレミアリーグや全国大会の遠征にも柔軟に対応。',
      },
      {
        name: '普通科（特別進学コース）',
        deviation: 59,
        soccerClubAllowed: true,
        note: '国公立・難関私大を目指すコース。',
      },
    ],
    naishinCriteria: {
      sportsRecommendation9: 29,
      sportsRecommendation5: 15,
      heigan9: 32,
      academicSpecial9: 36,
      tokyoStudentRuleNote:
        'プレミアリーグEASTに所属し、染野唯月選手やチェイス・アンリ選手らを輩出した全国屈指のテクニカル強豪校。実は東京駅・上野駅・大宮駅から東北新幹線「やまびこ」で郡山駅まで約75分（大宮から約50分！）と非常に近く、GRANDE FCからも毎年のように主力候補が進学しています。',
      scholarshipRanks: [
        {
          rank: 'スポーツ特待生（S・A・B）',
          tuitionExemption: '入学金・施設費・授業料免除（ランク別）',
          condition: 'スカウト評価・練習会合格＋内申基準（9科28〜30以上・欠席基準）クリア',
        },
      ],
    },
    ratings: {
      soccerPower: 4.9,
      academicQuality: 4.0,
      facilityQuality: 4.8,
      dormAndSupport: 4.9,
      careerOutcomes: 4.9,
    },
    soccerProfile: {
      clubMembersCount: 175,
      nationalChampionshipCount: '全国高校サッカー選手権 15回出場（全国ベスト4）',
      interHighCount: 'インターハイ全国大会 ベスト4・上位常連',
      playStyle: '徹底したパス＆コントロールとポゼッションで強豪を崩す華麗なアタッキングサッカー',
      formation: '4-4-2 / 4-3-3',
      coachName: '仲村 浩二 監督',
      grandeFcObCountLast5Years: 8,
      grandeFcFitReason:
        '仲村監督が掲げる「ボールを大切にする技術的サッカー」がGRANDE FCの育成スタイルと完全に一致しており、GRANDE FC出身の先輩が数多くレギュラー・プロ候補として活躍しています。',
    },
    facilities: {
      summary: '校内フルサイズ人工芝サッカー場（照明完備）、トレーニングジム、キャンパス隣接学生寮完備',
      pitchType: '校内専用フルサイズ人工芝グラウンド（照明完備）',
      floodlights: true,
      clubhouse: true,
      physicalGym: '専用ストレングス＆コンディショニングルーム',
      medicalStaff: '専属アスレティックトレーナー・栄養士・フィジカルコーチ',
      studySupportRoom: true,
    },
    dormitoryAndCommute: {
      hasDormitory: true,
      dormName: '尚志高校 学生寮（校舎・グラウンド隣接）',
      dormMonthlyCost: '約65,000円〜72,000円（朝・昼・夕3食込）',
      mealSupport: 'キャンパス内食堂にて朝・昼・夕の3食温かい栄養管理食を提供',
      commuteFromTokyoMinutes: 80,
      commuteRouteFromTokyo: '入寮制（東京駅・上野駅から東北新幹線で「郡山駅」まで約75分、大宮駅からはわずか約50分！）',
      nearestStation: 'JR「郡山駅」よりバス',
      commuteVsDormRatio: '寮生活85%（東京・埼玉・神奈川・千葉の街クラブ出身者が多数）：通学15%',
    },
    careerOutcomes: {
      jLeagueProsLast5Years: 11,
      notableProAlumni: ['山岸 祐也', '染野 唯月', 'チェイス アンリ', '加瀬 直輝', '松尾 春希', '安齋 悠人'],
      universitySoccerRate: 74,
      topSoccerUniversities: ['明治大学', '筑波大学', '早稲田大学', '法政大学', '中央大学', '東洋大学', '流通経済大学', '桐蔭横浜大学'],
      topGeneralUniversities: ['法政大学', '東洋大学', '日本大学', '駒澤大学', '東北学院大学'],
      careerSummary:
        '高卒でJ1クラブや欧州（シュトゥットガルト等）へ直接進む選手を毎年輩出し、関東大学サッカー1部リーグへの進学ルートも極めて太い全国屈指の育成校です。',
    },
    videoShowcase: {
      title: '尚志高校サッカー部 — プレミアリーグを沸かせるパスサッカーと「寮・校舎・人工芝一体型」環境',
      totalDuration: '08:15',
      updatedAt: '2026年10月更新',
      coachQuote: '「止める・蹴るの質と遊び心。関東の街クラブで磨いた技術を全国トップレベルへ引き上げます。」',
      chapters: [
        {
          id: 'sh-ch1',
          timeRange: '00:00 - 02:50',
          title: '01. 尚志の代名詞！高速パスワーク＆ポゼッション練習',
          summary: 'ワンタッチ・ツータッチで相手のプレスを無力化し、ゴール前を崩すトレーニング。',
          keyMetrics: ['プレミアリーグEAST所属', 'パス成功率・前進率重視'],
          tacticalFocus: '出し手と受け手のタイミング共有',
        },
        {
          id: 'sh-ch2',
          timeRange: '02:50 - 05:30',
          title: '02. 校舎・人工芝ピッチ・学生寮がすべて敷地内に揃う「移動0分」環境',
          summary: '朝起きてから授業、放課後の練習、3食の食事、自主練までがすべてキャンパス内で完結する強み。',
          keyMetrics: ['寮・校舎・人工芝が隣接', '3食キャンパス食堂提供'],
          tacticalFocus: '移動時間ゼロで睡眠と自主練を最大化',
        },
        {
          id: 'sh-ch3',
          timeRange: '05:30 - 08:15',
          title: '03. 東京・埼玉（GRANDE FC等）から進学した部員の座談会',
          summary: '大宮から新幹線50分・東京から75分の距離感と、関東出身の仲間が多い寮の雰囲気。',
          keyMetrics: ['GRANDE FC OB過去5年8名', '過去5年プロ輩出11名'],
          tacticalFocus: '高卒プロ・関東大学1部を見据えた3年間',
        },
      ],
    },
    testimonials: [
      {
        id: 'sh-t1',
        studentName: 'K.I 選手',
        grade: '高校2年（MF）',
        position: 'MF（トップ下／ボランチ）',
        juniorHighClub: 'GRANDE FC（埼玉）',
        isGrandeFcOb: true,
        residenceOrigin: '東京都北区（都内公立中出身）',
        commuteOrDorm: '寮生活',
        naishinAtJhs1: 30,
        naishinAtJhs3: 32,
        admissionRoute: 'スポーツ推薦（単願）',
        courseName: '総合進学コース',
        headline: '寮・校舎・人工芝グラウンドが全部すぐ隣！GRANDEのパスサッカーがそのまま活きる環境です',
        whyChoseSchool:
          'ロングボールばかり蹴るサッカーではなく、プレミアリーグの舞台で徹底してパスを繋いで崩す尚志のスタイルに一目惚れしました。GRANDEの先輩が毎年進学して主力になっているのも決め手でした。',
        soccerAndStudyBalance:
          '内申点は中3で9科32を取りました。寮と校舎とグラウンドが同じ敷地内にあるので、通学時間が0分で、夜のテスト勉強や自主練の時間がたっぷり取れます。',
        facilityAndDormImpression:
          '福島県といっても郡山なので、赤羽から大宮に出て新幹線に乗れば1時間ちょっとで実家に帰れます。寮生は東京や埼玉の街クラブ出身ばかりですぐに仲良くなれました。',
        adviceForJhs1:
          'GRANDEのサッカーが好きな人には尚志は本当に合います！中2・中3の夏休みに練習会があるので、早めに親御さんと相談して見に来てみてください。',
      },
    ],
  },
];

export interface SchoolScoutingIntelligence {
  selectionMonths: string;
  entryRouteType: 'クラブ監督推薦＋練習会' | '公式Web公募練習会＋クラブ推薦' | '一般入試・内申確約＋入部相談';
  entryMethodDetail: string;
  scoutVisitedTournaments: string[];
  positionEvaluationPoints: string;
  cutoffAndAttendanceRule: string;
  consultationQuestions: string[];
}

export function getSchoolScoutingIntelligence(school: HighSchoolData): SchoolScoutingIntelligence {
  if (school.id === 'ichiritsu-urawa') {
    return {
      selectionMonths: '中3の7月〜11月（学校説明会・部活動見学会）※実技セレクションなし',
      entryRouteType: '一般入試・内申確約＋入部相談',
      entryMethodDetail:
        '公立進学校のためスポーツ推薦（実技による事前内定）はありません。夏休みの部活動見学会・学校説明会に個人で申し込み、中3・2月の埼玉県公立高校一般入試（5教科）で合格して入部します。',
      scoutVisitedTournaments: ['埼玉県クラブユース選手権', '高円宮杯埼玉県予選（見学・情報交換）'],
      positionEvaluationPoints:
        '入部時のセレクション制限はなく、入学後に全員が人工芝ピッチで競争できます。基礎技術と限られた時間で考え抜く戦術理解度が重視されます。',
      cutoffAndAttendanceRule:
        '9科内申40以上（オール4.5前後）＋本番5教科入試で高得点が必要。県外（東京）からの受験は入学時までの居住地要件（転居等）の確認が必須です。',
      consultationQuestions: [
        '東京都内の中学校から受験する場合の居住地要件・手続きはどうなるか？',
        'サッカー部員の放課後の完全下校時刻と、予備校・塾との両立状況は？',
      ],
    };
  }

  if (school.id === 'rikkyo-niiza' || school.id === 'kokugakuin-kugayama' || school.id === 'toko-gakuen') {
    return {
      selectionMonths: '中3の6月〜8月（練習会・セレクション実施）＋ 9月〜11月（個別相談・内申確認）',
      entryRouteType: '公式Web公募練習会＋クラブ推薦',
      entryMethodDetail:
        '中3の5月〜7月に高校サッカー部公式HPで練習会要項が公開されるほか、GRANDE FCの監督・進路スタッフ経由で練習会への参加調整を行います。実技合格後、秋に中学校の通知表（内申点）を持参して個別相談に臨みます。',
      scoutVisitedTournaments: [
        '関東U-15サッカーリーグ',
        '日本クラブユース選手権（U-15）関東予選',
        '東京都・埼玉県トップリーグおよび春・夏フェスティバル',
      ],
      positionEvaluationPoints:
        '単なるフィジカル能力だけでなく、「止める・蹴るの正確さ」「認知・判断の速さ（ボランチ・MFの展開力）」、そして高水準の授業についていける「学習意欲・生活規律」が厳しく見られます。',
      cutoffAndAttendanceRule: `スポーツ推薦（優遇）であっても9科内申${school.naishinCriteria.sportsRecommendation9}以上（特に英数国で3以上、または9科に2がないこと）、3年間の欠席日数10日以内などが厳格にチェックされます。`,
      consultationQuestions: [
        'スポーツ推薦（文化・スポーツ優遇）で出願する場合、中3の1学期と2学期のどちらの内申点が使われるか？',
        '英検準2級・2級を取得している場合の内申加点措置はあるか？',
        '一般入試や併願優遇で合格した場合でも、サッカー部への入部は可能か（事前の練習会参加が必須か）？',
      ],
    };
  }

  if (
    school.regionCategory === '全国寮完備' ||
    school.id === 'maebashi-ikuei' ||
    school.id === 'ryukei-kashiwa' ||
    school.id === 'yaita-chuo'
  ) {
    return {
      selectionMonths: '中3の5月〜8月（第1回〜第3回練習会・早期スカウト視察ピーク）',
      entryRouteType: 'クラブ監督推薦＋練習会',
      entryMethodDetail:
        '全国トップレベルの強豪校のため、まずはGRANDE FCの監督・コーチに志望を伝え、クラブ間のパイプを通じて練習会（中3の6月〜8月）に参加するか、公式HPのセレクション申込フォーム（所属クラブ代表者の署名・承諾が必要）からエントリーします。',
      scoutVisitedTournaments: [
        '関東U-15サッカーリーグ（1部・2部）',
        '街クラブ選抜フェスティバル（時之栖・鹿島・波崎・菅平など）',
        '日本クラブユース選手権（U-15）関東大会・全国大会',
      ],
      positionEvaluationPoints:
        '全国大会・プレミアリーグ基準の「1対1の守備強度・球際」「プレッシャー下でも失わないファーストタッチとターン」「90分間スプリントを繰り返せる走力」が重視されます。',
      cutoffAndAttendanceRule: `スポーツ推薦（単願）の内申目安は9科${school.naishinCriteria.sportsRecommendation9}以上。特待生（S/A/B）枠は8月下旬までに内々定が埋まることが多いため、中3の春〜夏前のアピールが勝負です。`,
      consultationQuestions: [
        '特待生（S・A・Bランク）の学費・寮費免除の範囲と、高校3年間の継続条件（成績基準など）は？',
        'サッカー部専用寮の月額費用（食費・光熱費含む）と、怪我をした際のリハビリ・病院サポート体制は？',
        'A〜Dチームのカテゴリー分けと、1年次の「関東ルーキーリーグ」への出場機会は？',
      ],
    };
  }

  // Saitama & Tokyo private powerhouses (昌平, 武南, 西武台, 浦和学院, 正智深谷, 聖望学園, 帝京, 駒澤大高, 実践学園, 東海大高輪台, 市立船橋)
  return {
    selectionMonths: '中3の6月中旬〜8月下旬（夏休み練習会・セレクション）＋ 9月〜11月（個別相談会）',
    entryRouteType: '公式Web公募練習会＋クラブ推薦',
    entryMethodDetail:
      '5月〜6月頃に高校公式HP（またはサッカー部HP）で練習会エントリーが開始されます。GRANDE FCは埼玉・東京の各強豪校と毎年強い繋がりがあるため、必ず事前にクラブの監督・学年コーチに相談した上で練習会に参加します。',
    scoutVisitedTournaments: [
      '関東U-15リーグ ／ 埼玉県ユース（U-15）サッカーリーグ',
      '埼玉県クラブユース選手権・高円宮杯予選',
      '各高校との直接トレーニングマッチ（GRANDE FC U-14/U-15 vs 高校B/1年生チーム）',
    ],
    positionEvaluationPoints: `${school.soccerProfile.playStyle}にフィットする基礎技術と判断力、および練習会での「声出し・切り替えの速さ・挨拶や聞く姿勢」が総合評価されます。`,
    cutoffAndAttendanceRule: `スポーツ推薦（単願）は9科${school.naishinCriteria.sportsRecommendation9}（5科${school.naishinCriteria.sportsRecommendation5}）前後が目安。併願や上位コースを狙う場合は9科${school.naishinCriteria.heigan9}以上が必要です。3年間の欠席・遅刻数も必ず確認されます。`,
    consultationQuestions: [
      '東京都在住・都内公立中学校からの出願の場合、通知表（9科または5科内申）のみで個別相談が可能か？',
      '東京都の「私立高校授業料軽減助成金」と学校独自の特待制度の併用はどうなるか？',
      '朝練の有無・頻度と、東京都内から通学している現役部員の主な通学ルート・帰宅時間は？',
    ],
  };
}

