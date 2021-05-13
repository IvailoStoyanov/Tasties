import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { useAuth } from "../hooks/useAuth";

import Link from "next/link";
import Dish from "../components/Dish";
import DishForm from "../components/DishForm";

export default function Home({ dishes: defaultDishes }) {
  const [dishes, updateDishes] = useState(defaultDishes);

  useEffect(() => {
    async function run() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`
      );
      const { dishes } = await response.json();
      updateDishes(dishes);
    }
    run();
  }, []);

  const { user, logIn, logOut } = useAuth();

  async function handleOnSubmit(data:any, e) {
    e.preventDefault();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`, {
        method: 'POST',
        body: JSON.stringify(data)
      });
  }

  // console.log("user:", user);
  // console.log("dishes:", dishes);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tastiest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!user && (
        <p>
          <button onClick={logIn}>Log in</button>
        </p>
      )}
      {user && (
        <p>
          <button onClick={logOut}>Log out</button>
        </p>
      )}
      {user && <p>Render stuff once a user is logged in!</p>}

      <main className={styles.main}>
        <ul>
          {dishes.map((dish) => {
            return (
              <Dish
                key={dish.id}
                url={dish.url}
                image={dish.image[0].thumbnails.large.url}
                dishName={dish.name}
                time={dish.time}
                cost={dish.cost}
                needed={dish.neededIngredients.length}
                available={dish.availableIngredients.length}
              />
            );
          })}
        </ul>

        <Link href={"/missingIngredients"}>Missing Ingredients</Link>

        <DishForm onSubmit={handleOnSubmit}></DishForm>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/dishesMock`
  );
  const { dishes } = await response.json();

  return {
    props: {
      dishes,
    },
  };
}
