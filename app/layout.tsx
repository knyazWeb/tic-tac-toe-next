import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe game app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
