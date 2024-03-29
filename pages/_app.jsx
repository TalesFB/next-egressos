import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { ToastContainer } from "react-toastify";
import { AuthUserProvider } from "../contexts/authUserContext";

import NProgress from "nprogress";

import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";

import "../styles/globals.css";
import "../styles/nprogress.css";
import "../styles/ReactToastify.css";
import { isMobile } from "react-device-detect";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => {
      console.log(`Loading: ${url}`);
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>Egressos IFNMG Campus Salinas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/if_icon.png" />
      </Head>
      <AuthUserProvider>
        {router.asPath.includes("/dashboard") || router.asPath.includes("/painel") ? (
          <>
            <NavBar type="dashboard" />
            {isMobile ? (
              <div className="pt-8">
                <Component {...pageProps} />
                <SideBar />
              </div>
            ) : (
              <div className="flex">
                <SideBar />
                <Component {...pageProps} />
              </div>
            )}
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthUserProvider>
      <ToastContainer position="top-center" autoClose={1500} theme="dark" />
    </>
  );
}

export default MyApp;
