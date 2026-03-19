import "./globals.css";

export const metadata = {
  title: "AI Event Concierge",
  description: "Corporate offsite planner using AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}