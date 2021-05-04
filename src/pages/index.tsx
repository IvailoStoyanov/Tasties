import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

import Dishes from "../components/Dishes";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tastiest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Dishes></Dishes>
        <Link href={"/missingIngredients"}>Missing Ingredients</Link>
      </main>
    </div>
  );
}
