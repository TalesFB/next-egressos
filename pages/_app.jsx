import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";

import { AuthUserProvider } from "../contexts/authUserContext";

import NavBar from "../components/navBar";
import SideBar from "../components/sideBar";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

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
            <div className="bg-title">
              <NavBar type="dashboard" />
            </div>
            <div className="flex">
              <SideBar />
              <div className="flex-1 h-screen bg-bg-container">
                <Component {...pageProps} />
              </div>
            </div>
          </>
        ) : (
          <Component {...pageProps} />
        )}
      </AuthUserProvider>
    </>
  );
}

export default MyApp;
