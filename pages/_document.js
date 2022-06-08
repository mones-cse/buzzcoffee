import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang={"en"}>
        <Head>
          <link
            rel="prefetch"
            href="/fonts/IBMPlexSans-Bold.ttf"
            as="font"
            crorssOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/fonts/IBMPlexSans-Regular.ttf"
            as="font"
            crorssOrigin="anonymous"
          />
          <link
            rel="prefetch"
            href="/fonts/IBMPlexSans-SemiBold.ttf"
            as="font"
            crorssOrigin="anonymous"
          />
        </Head>
        <body>
          <Main></Main>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
