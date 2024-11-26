import "../styles/globals.css";
import Head from "next/head";
import { JetBrains_Mono } from "next/font/google";

// Import the font
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

function App({ Component, pageProps }) {
  return (
    <div className={`${jetBrainsMono.variable} `}>
      <Head>
        <title>The 404</title>
        <meta name="The 404" content="The 404 Manager by dash and data." />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default App;
