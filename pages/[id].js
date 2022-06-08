import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const Foobar = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Head>
        <title>{id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>Page {id}</main>
    </div>
  );
};
export default Foobar;