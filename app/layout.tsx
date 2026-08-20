import type { Metadata } from "next";
import "./globals.css";
import "./update.css";
export const metadata:Metadata={
  title:"Group-Specific Amino Acid Finder",
  description:"Compare a tested protein group against every other sequence at adjustable prevalence thresholds.",
  openGraph:{
    title:"Group-Specific Amino Acid Finder",
    description:"Compare a tested protein group against every other sequence.",
    images:["https://group-specific-amino-acid-finder.umm99.chatgpt.site/og.png"]
  },
  twitter:{
    card:"summary_large_image",
    title:"Group-Specific Amino Acid Finder",
    description:"Compare a tested protein group against every other sequence.",
    images:["https://group-specific-amino-acid-finder.umm99.chatgpt.site/og.png"]
  }
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
