import styles from "./Intro.module.scss";

const Intro = () => {
  return (
    <div className={styles.veggieCircle}>
      <div className={styles.textWrapper}>
        <h1>Tasties</h1>
        <p>
          Keep track of your meals with the help of this{" "}
          <span>digital kitchen cupboard</span>
        </p>
      </div>
      <img src="/images/fruitCircle.svg" alt="Image of Icecream"></img>
    </div>
  );
};

export default Intro;
