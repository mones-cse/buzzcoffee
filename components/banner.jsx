import style from "./banner.module.css";
const Banner = (props) => {
  return (
    <div className={style.container}>
      <h1 className={style.title}>
        <span className={style.title1}>Coffee</span>
        <span className={style.title2}>Connoisseur</span>
      </h1>
      <p className={style.subtitle}>Discover your local store</p>
      <div className={style.buttonWrapper}>
        <button
          className={style.button}
          type={"button"}
          onClick={props.handleOnClick}
        >
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
