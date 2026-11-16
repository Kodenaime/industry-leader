import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Industry Leader",
  description:
    "One-on-one leadership coaching for capable professionals ready to turn expertise into authority, influence, and lasting impact.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
