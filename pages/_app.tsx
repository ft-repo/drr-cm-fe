import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@ant-design/v5-patch-for-react-19';
import { Provider } from "react-redux";
import { wrapper } from "@/lib/store";

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
