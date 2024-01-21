import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import LoadingOverlay from "@/app/common-ui/loading-overlay/LoadingOverlay";
import StoreProvider from "@/app/configs/StoreProvider";
import Header from "@/app/header/Header";
import React from "react";
import fetchData from "@/app/configs/fetch-data";
import {ConfigResponse} from "@/app/header/types/ConfigResponse";
import Footer from "@/app/footer/Footer";
import '@/app/styles/global.sass';

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Play North',
  description: 'Play North Assignment',
}

const Layout = async ({children}: { children: React.ReactNode }) => {
  const [configResponse] = await fetchData('/en/config', {});
  const config = (configResponse as ConfigResponse);

  return <html lang="en">
    <body className={inter.className}>
      <LoadingOverlay/>
      <Header configResponse={config}/>

      <div id="content-footer">
        {children}
        <Footer config={config}/>
      </div>
    </body>
  </html>;
};

export default async function RootLayout({children}: { children: React.ReactNode }) {
  return <StoreProvider>
    <Layout children={children}/>
  </StoreProvider>;
}
