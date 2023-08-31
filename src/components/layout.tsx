import Head from "next/head";
import NavBar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>hacktime</title>
        <meta name="description" content="it's hack time" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-black text-hacktime">
        <NavBar />
        <main className="flex flex-col items-center justify-center">
          {children}
        </main>
      </div>
    </>
  );
}
