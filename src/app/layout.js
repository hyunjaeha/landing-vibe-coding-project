import "./globals.css";

export const metadata = {
  title: "작은 워크숍 문의 랜딩",
  description: "소규모 오프라인 워크숍의 일정과 문의를 접수하는 랜딩 서비스",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
