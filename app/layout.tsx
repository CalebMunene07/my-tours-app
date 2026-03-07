import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Import the new Footer component
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wikima Safari | Discover the Wild",
  description: "Experience the heart of Africa with our curated safari tours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* CORRECTION 5: Applied Bright Layout with bg-white */}
      <body className={`${inter.className} bg-white text-gray-900`}> 
        {/* Navbar stays here so it shows on every page */}
        <Navbar />
        
        {/* This renders the content of your page.tsx files */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* CORRECTION 4: Global Footer appears on every page */}
        <Footer />
        
        {/* Toaster allows your booking success messages to pop up */}
        <Toaster position="top-center" expand={false} richColors />

        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
      </body>
    </html>
  );
}