import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import style from "./coffee-store.module.css";
import className from "classnames";
import { fetchStore } from "../../lib/coffee-store";

export async function getStaticProps({ params }) {
  const formattedData = await fetchStore("23.73,90.37", 6);
  const store = formattedData.find((eachStore) => eachStore.id == params.id);
  return { props: { store } };
}

export async function getStaticPaths() {
  const formattedData = await fetchStore();
  const paths = formattedData.map((each) => {
    return {
      params: {
        id: each.id.toString(),
      },
    };
  });
  console.log({ paths });
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
  const handleUpvoteButton = () => {
    console.log("0000");
  };

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={style.container}>
        <div className={style.col1}>
          <div className={style.backToHomeLink}>
            <Link href={"/"}>
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={style.nameWrapper}>
            <h2>{name}</h2>
          </div>

          <Image
            src={
              imgUrl ||
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
            <p className={style.tex}>{address}</p>
          </div>
          {neighbourhood && (
            <div className={style.iconWrapper}>
              <Image
                src={"/static/icons/nearMe.svg"}
                width={24}
                height={24}
                alt={"place icon"}
              />
              <p className={style.text}>{neighbourhood}</p>
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
