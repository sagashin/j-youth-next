import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'J-YOUTH NEXT — 高校サッカー進路・内申診断＆スカウトプラットフォーム',
  description:
    '中学生クラブチーム選手（GRANDE FC等）と保護者のための、高校サッカー推薦・内申点シミュレーション・施設＆寮比較・部活動画・先輩体験談・スカウト交渉プラットフォーム。',
  openGraph: {
    title: 'J-YOUTH NEXT — 高校サッカー進路・内申診断＆スカウトプラットフォーム',
    description:
      '中学生クラブチーム選手（GRANDE FC等）と保護者のための、高校サッカー推薦・内申点シミュレーション・施設＆寮比較・部活動画・先輩体験談・スカウト交渉プラットフォーム。',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'J-YOUTH NEXT — 高校サッカー進路・内申診断＆スカウトプラットフォーム',
    description:
      '中学生クラブチーム選手（GRANDE FC等）と保護者のための、高校サッカー推薦・内申点シミュレーション・施設＆寮比較・部活動画・先輩体験談・スカウト交渉プラットフォーム。',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ja">
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased selection:bg-emerald-600 selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
