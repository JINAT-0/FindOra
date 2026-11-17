import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FindOra — University Lost & Found Management System | PUST Bogura",
  description:
    "Official university-exclusive Lost and Found platform for Pundra University of Science & Technology. Lost it. Found it. Bring it home.",
  keywords: [
    "FindOra",
    "Pundra University",
    "PUST",
    "Lost and Found",
    "Bogura",
    "Campus Belongings",
    "Student Support",
  ],
  authors: [{ name: "Pundra University of Science & Technology" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-brand-warm text-brand-navy antialiased`}>
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

