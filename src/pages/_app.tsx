import { type Session } from "next-auth";

import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Layout from "~/components/layout";
import { Toaster } from "react-hot-toast";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
};

export default api.withTRPC(MyApp);
