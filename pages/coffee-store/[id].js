import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import result from "../../data/coffee-stores.json";
import Image from "next/image";
import Head from "next/head";

export async function getStaticProps({ params }) {
  console.log({ params });
  const store = result.find((eachStore) => eachStore.id == params.id);
  console.log({ store });
  return { props: { store } };
}

export async function getStaticPaths() {
  const paths = result.map((each) => {
    return {
      params: {
        id: each.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = ({ store }) => {
  const { name, address, neighbourhood, imgUrl } = store;
  const router = useRouter();
  if (router.isFallback == true) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href={"/"}>
        <a>
          <h2>Go back Home </h2>
        </a>
      </Link>
      <h2>{name}</h2>
      <p>{address}</p>
      <p>{neighbourhood}</p>
      <Image src={imgUrl} width={500} height={400} />
    </div>
  );
};

export default CoffeeStore;
