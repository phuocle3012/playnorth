import type {AppProps} from "next/app";
import StoreProvider from "@/components/configs/StoreProvider";
import '@/components/styles/global.sass';
import fetchData from "@/components/configs/fetch-data";
import Header from "@/components/header/Header";
import React, {useEffect, useState} from "react";
import Footer from "@/components/footer/Footer";
import LoadingOverlay from "@/components/common-ui/loading-overlay/LoadingOverlay";
import {useRouter} from "next/router";
import {Head} from "next/document";

function MyApp({Component, pageProps}: AppProps) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadConfig = async () => {
      const [configResponse] = await fetchData('/en/config', {});
      setConfig(configResponse);
    };
    loadConfig();
  }, []);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  if (!config) {
    return <div/>;
  }

  return <StoreProvider>

    <head>
      <title>Play North</title>
      <meta name="description" content="Play North Assignment" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="icon" href="/favicon.ico"/>
    </head>

    <Header configResponse={config}/>
    <LoadingOverlay loadingProp={loading}/>
    <div id="content-footer">
      <Component {...pageProps} />
      <Footer config={config}/>
    </div>
  </StoreProvider>;
}

export default MyApp;
