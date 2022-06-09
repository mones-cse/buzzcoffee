import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import result from "../../data/coffee-stores.json";
import Image from "next/image";
import Head from "next/head";
import style from "./coffee-store.module.css";
import className from "classnames";

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
            src={imgUrl}
            width={600}
            height={360}
            className={style.storeImg}
            alt={name}
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
