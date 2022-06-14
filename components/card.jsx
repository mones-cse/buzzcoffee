import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./card.module.css";
import classNames from "classnames";

const Card = (props) => {
  return (
    <Link href={`/coffee-store/${props.url}`}>
      <a className={style.cardLink}>
        {/*<div className={style.container}>*/}
        <div className={classNames("glass", style.container)}>
          <div className={style.cardHeaderWrapper}>
            <h2 className={style.cardHeader}>{props.title}</h2>
          </div>
          <div className={style.cardImageWrapper}>
            <Image
              className={style.cardImage}
              src={props.imgUrl}
              layout="fill"
              objectFit="cover"
              alt={"coffee image"}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
