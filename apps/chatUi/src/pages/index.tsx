import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import Script from "next/script";

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "";
    const storedUserData = localStorage.getItem("userData");
    if (!storedUserData) {
      localStorage.clear();
      router.push("/login");
    } else {
      const userData = JSON.parse(storedUserData);
      if (userData?.userId === "") {
        localStorage.clear();
        router.push("/login");
      } else {
        router.push(`chat/${userId}`);
      }
    }
  }, [router]);
  return (
    <>
      <Head>
        <title>Chat UI</title>
      </Head>
      {/* Google tag (gtag.js) */}
      <Script strategy="lazyOnload" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}></Script>
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}',{
          page_path:window.location.pathname,
          })
        `}
      </Script>

      <div>
        <LoadingScreen />
      </div>
    </>
  );
};
export default Home;
