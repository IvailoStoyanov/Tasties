import Head from "next/head";
import styles from "../styles/MissingIngredients.module.scss";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Tastiest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <header>
          <h1>Missing ingredients</h1>
        </header>
        <div className={styles.missingItemsWrapper}>
          <ul>
            <li>Carrots <img src="/icons/arrowDown.svg" /></li>
            <li>Eggs <img src="/icons/arrowDown.svg" /></li>
          </ul>
        </div>
        <div className={styles.list}>
          <h2>
            To Buy <img src="/icons/cart.svg" alt="shopping cart" />
          </h2>
          <ul>
            <li>
              <img src="/icons/checkBoxOutline.svg" /> <span>Milk</span>
              <img className={styles.moveArrow} src="/icons/arrowUp.svg" />
            </li>
            <li>
              <img src="/icons/checkBoxOutline.svg" /> <span>Cucumber</span>
              <img className={styles.moveArrow} src="/icons/arrowUp.svg" />
            </li>
          </ul>
          <button>We got them</button>
        </div>
      </main>
    </div>
  );
}
