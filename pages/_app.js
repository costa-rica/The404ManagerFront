import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import { JetBrains_Mono } from "@next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const store = configureStore({
  reducer: { user }, //<--- ici il est necessaire avoir une reducer>
});

function App({ Component, pageProps }) {
  return (
    <Provider store={store} className={jetBrainsMono.className}>
      <Head>
        <title>Next.js App</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
