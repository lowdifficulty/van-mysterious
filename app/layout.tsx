import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import Script from "next/script";
import { ContactBubble } from "@/components/ContactBubble";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";
import { themeInitScript } from "@/components/ThemeToggle";
import { StudioChrome } from "@/components/studio/StudioChrome";
import { StudioProvider } from "@/components/studio/StudioContext";
import { getSession } from "@/lib/session";
import { rootSeo } from "@/lib/seo";
import { loadSiteContent } from "@/lib/site-store";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadSiteContent();
  return {
    ...rootSeo,
    title: content.site.seoTitle
      ? { default: content.site.seoTitle, template: `%s · ${content.site.name}` }
      : rootSeo.title,
    description: content.site.seoDescription || rootSeo.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#070506",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await getSession();
  const content = await loadSiteContent();
  const admitted = Boolean(session.admitted || session.studio);

  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      data-theme={content.site.defaultTheme === "light" ? "light" : "dark"}
      suppressHydrationWarning
    >
      <body className="film-grain relative min-h-full flex flex-col bg-velvet text-cream">
        <Script id="van-theme" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <StudioProvider isStudio={Boolean(session.studio)} initial={content}>
          <div className="fog-layer" />
          <div className="fog-drift" />
          <div className="vignette" />
          {session.studio ? <StudioChrome /> : null}
          {admitted ? <SiteNav items={content.nav} /> : null}
          {admitted ? <ContactBubble /> : null}
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
          <Footer
            admitted={admitted}
            line={content.site.footerLine}
            note={content.site.footerNote}
          />
        </StudioProvider>
      </body>
    </html>
  );
}
