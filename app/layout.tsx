import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wikima Safari | Discover the Wild",
  description: "Experience the heart of Africa with our curated safari tours.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "icon" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Patch Node.prototype.removeChild BEFORE React hydrates.
          Google Translate splits text nodes in the DOM; when React tries to
          remove the originals they're already gone → crash.
          This guard silently skips cross-tree removals instead of throwing.
        */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var _r=Node.prototype.removeChild;
  Node.prototype.removeChild=function(c){
    if(c.parentNode!==this)return c;
    return _r.apply(this,arguments);
  };
  var _i=Node.prototype.insertBefore;
  Node.prototype.insertBefore=function(n,r){
    if(r&&r.parentNode!==this)return this.appendChild(n);
    return _i.apply(this,arguments);
  };
})();`,
          }}
        />
        {/* Hide every piece of Google Translate UI */}
        <style>{`
          .skiptranslate,.goog-te-banner-frame,iframe.skiptranslate,
          #goog-gt-tt,.goog-te-balloon-frame,.goog-tooltip{display:none!important;}
          body{top:0!important;position:static!important;}
          #gt_widget_mount{display:none!important;}
        `}</style>
      </head>
      <body
        className={`${inter.className} bg-white text-gray-900`}
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
        suppressHydrationWarning
      >
        <TopBar />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster position="top-center" expand={false} richColors />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}