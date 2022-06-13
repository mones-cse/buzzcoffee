import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import style from "./coffee-store.module.css";
import className from "classnames";
import { fetchStore } from "../../lib/coffee-store";
import { StoreContext } from "../../context/store-context";

export async function getStaticProps({ params }) {
  const formattedData = await fetchStore("23.73,90.37", 6);
  const findCoffeeStoreById = formattedData.find(
    (eachStore) => eachStore.id.toString() == params.id
  );

  return { props: { store: findCoffeeStoreById ? findCoffeeStoreById : {} } };
}

export async function getStaticPaths() {
  const formattedData = await fetchStore("23.73,90.37", 6);
  const paths = formattedData.map((each) => {
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

const handleUpvoteButton = () => {
  console.log("handle up vote");
};

const CoffeeStore = (initialProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [store, setStore] = useState(initialProps.store || {});
  const ctx = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;

  const createCoffeeStore = async (store) => {
    const { id, name, voting, imgUrl, neighbourhood, address } = store;
    const response = await fetch("/api/create-coffee-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name,
        voting: voting || 0,
        imgUrl,
        neighbourhood: neighbourhood || "",
        address: address || "",
      }),
    });
    const result = await response.json();
    setStore((store) => result);
    setIsLoading(false);
    return result;
  };

  useEffect(() => {
    if (initialProps && initialProps.store) {
      if (Object.keys(store).length == 0) {
        console.log(
          "no match found need to find result by ourself",
          ctx.state.stores
        );
        const temp = ctx.state.stores.find((each) => each.id === id);
        createCoffeeStore({ ...temp, id: id });
      } else {
        setStore(initialProps.store);
        createCoffeeStore(initialProps.store);
        setIsLoading(false);
      }
    }
  }, [initialProps.store]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{(store && store.name) || "Demo Name"}</title>
      </Head>

      <div className={style.container}>
        <div className={style.col1}>
          <div className={style.backToHomeLink}>
            <Link href={"/"}>
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={style.nameWrapper}>
            <h2>{(store && store.name) || "Demo Name"}</h2>
          </div>

          <Image
            src={
              (store && store.imgUrl) ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            className={style.storeImg}
            alt={name}
            width={600}
            height={360}
          />
        </div>

        <div className={className("glass", style.col2)}>
          <div className={style.iconWrapper}>
            <Image
              src={"/static/icons/places.svg"}
              width={24}
              height={24}
              alt={"place icon"}
            />
            <p className={style.tex}>{store && store.address}</p>
          </div>
          {store && store.neighbourhood && (
            <div className={style.iconWrapper}>
              <Image
                src={"/static/icons/nearMe.svg"}
                width={24}
                height={24}
                alt={"place icon"}
              />
              <p className={style.text}>{store && store.neighbourhood}</p>
            </div>
          )}
          <div className={style.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width="24"
              height="24"
              alt="star icon"
            />
            <p className={style.text}>{"votingCount"}</p>
          </div>

          <button className={style.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
