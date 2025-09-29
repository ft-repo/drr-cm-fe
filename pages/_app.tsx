import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import store, { persistor } from '@/lib/storeSetup'
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
