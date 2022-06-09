import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import result from "../../data/coffee-stores.json";
import Image from "next/image";

export async function getStaticProps({ params }) {
  console.log({ params });
  const store = result.find((eachStore) => eachStore.id == params.id);
  console.log({ store });
  return { props: { store } };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "0", val: "0" } },
      { params: { id: "1", val: "1" } },
    ],
    fallback: false,
  };
}

const CoffeeStore = (props) => {
  console.log({ props });
  return (
    <div>
      <Link href={"/"}>
        <a>
          <h2>Go back Home </h2>
        </a>
      </Link>
      <h2>{props.store.name}</h2>
      <p>{props.store.address}</p>
      <Image src={props.store.imgUrl} width={500} height={400} />
    </div>
  );
};
export default CoffeeStore;
