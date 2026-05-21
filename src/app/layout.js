import "./globals.css";

export const metadata = {
  title: "작은 워크숍 문의",
  description: "소규모 오프라인 워크숍 문의 접수 랜딩 서비스"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
