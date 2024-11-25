import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
// import JetBrains_Mono from "../public/fonts/JetBrainsMono-Variable";

import { JetBrains_Mono, Righteous } from "next/font/google";

// Import the font
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const righteous = Righteous({
  subsets: ["latin"],
  variable: "--font-righteous",
  weight: ["400"],
  display: "swap",
});

const store = configureStore({
  reducer: { user }, //<--- ici il est necessaire avoir une reducer>
});

function App({ Component, pageProps }) {
  return (
    <div className={`${jetBrainsMono.variable} ${righteous.variable}`}>
      <Provider store={store}>
        <Head>
          <title>The 404</title>
          <meta name="The 404" content="The 404 Manager by dash and data." />
        </Head>
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}

export default App;
