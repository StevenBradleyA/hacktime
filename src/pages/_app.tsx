import { type Session } from "next-auth";

import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
