import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@ant-design/v5-patch-for-react-19';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
