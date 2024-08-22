import "~/styles/globals.css";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "react-hot-toast";
import SessionProviderWrapper from "./components/Context/Session/sessionProviderWrapper";
import MobileProvider from "./components/Context/Mobile";
import GlobalStateProvider from "./components/Context/GlobalState/globalState";
import Navigation from "./components/Navigation/navigation";

export const metadata: Metadata = {
  title: "HackTime",
  description: "Developing bespoke websites that drive business success.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  authors: [{ name: "Steven", url: "https://steven-anderson.com" }],
  generator: "Next.js",
  keywords: [
    "HackTime",
    "Hack Time",
    "hacktime",
    "hacktime.dev",
    "Hacktime.dev",
    "hacktime devs",
  ],
  referrer: "origin",
  appleWebApp: {
    capable: true,
    title: "HackTime",
    statusBarStyle: "black-translucent",
  },
  // icons: {
  //     icon: "/favicon.ico",
  //      apple: "/apple-touch-icon.png",
  // },
  openGraph: {
    type: "website",
    url: "https://hacktime.dev",
    title: "HackTime",
    description: "Developing bespoke websites that drive business success.",
    siteName: "HackTime",
    images: [
      {
        url: "https://hacktime.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "HackTime",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hacktime.dev",
    creator: "@hacktime.dev",
    title: "HackTime",
    description: "Developing bespoke websites that drive business success.",
    images: ["https://hacktime.dev/og-image.png"],
  },
  // verification: {
  //     google: '1234567890',
  //     yandex: '1234567890',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-poppins bg-dark text-white">
        <TRPCReactProvider>
          <Toaster />
          <SessionProviderWrapper>
            <MobileProvider>
              <GlobalStateProvider>
                <Navigation />
                <main>{children}</main>
              </GlobalStateProvider>
            </MobileProvider>
          </SessionProviderWrapper>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
