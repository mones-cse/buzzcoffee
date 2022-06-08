import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./card.module.css";
import classNames from "classnames";

const Card = () => {
  return (
    <Link href={"/asd"}>
      <a className={style.cardLink}>
        {/*<div className={style.container}>*/}
        <div className={classNames("glass", style.container)}>
          <div className={style.cardHeaderWrapper}>
            <h2 className={style.cardHeader}>Title</h2>
          </div>
          <div className={style.cardImageWrapper}>
            <Image
              className={style.cardImage}
              src={"/static/hero-image.png"}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
