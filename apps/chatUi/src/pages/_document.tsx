
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />
          {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
        </Head>
      <body>
        <div id="modal_portal" />
        <Main />
        <NextScript />
      </body>

    </Html>
  );
}
