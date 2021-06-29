import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { DishesContext } from "../../contexts/DishesContext";
import { AuthContext } from "../../contexts/AuthContext";

import { useEffect, useContext } from "react";

import Dish from "../components/Dish";
import Intro from "../components/Intro";
import DishForm from "../components/DishForm";
import UserNav from "../components/UserNav";
import { createDish } from "../lib/dishes";
import { createIngredientsForDish } from "../lib/ingredients";

export default function Home() {
  const {
    setAvailableIngArrayID,
    availableIngredientsContext,
    setAvailableIngredientsContext,

    setMissingIngArrayID,
    missingIngredientsContext,
    setMissingIngredientsContext,

    setCartIngArrayID,
    cartIngredientsContext,
    setCartIngredientsContext,

    dishesContext,
    setDishesContext,
  } = useContext(DishesContext);

  const { user, login, logout, authReady } = useContext(AuthContext);

  useEffect(() => {
    if (
      authReady &&
      user &&
      !availableIngredientsContext.length &&
      !missingIngredientsContext.length &&
      !cartIngredientsContext.length
    ) {
      //FetchIngredients
      fetch(
        "/.netlify/functions/ingredients",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then(({ data }) => {
          data.forEach((list) => {
            if (list.fields.name === "availableIngredients") {
              setAvailableIngredientsContext(
                list.fields.ingredients ? list.fields.ingredients : []
              );
              setAvailableIngArrayID(list.id);
            }
            if (list.fields.name === "missingIngredients") {
              setMissingIngredientsContext(list.fields.ingredients);
              setMissingIngArrayID(list.id);
            }
            if (list.fields.name === "cartIngredients") {
              setCartIngredientsContext(list.fields.ingredients);
              setCartIngArrayID(list.id);
            }
          });
        })
        .catch(() => {
          setAvailableIngredientsContext([]);
          setMissingIngredientsContext([]);
          setCartIngredientsContext([]);
        });
    }
    if (authReady && user && !dishesContext.length) {
      //FetchDishes
      fetch(
        "/.netlify/functions/dishes",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setDishesContext(data.data);
        })
        .catch(() => {
          setDishesContext([]);
        });
    }
  }, [user, authReady]);

  const createIngredientsObjectContainer = ({userId, neededIngredients}) => {
    return {
      missingIngredients: neededIngredients,
      availableIngredients: [],
      cartIngredients: [],
      userId
    }
  }

  async function handleOnSubmit(data: any, e) {
    e.preventDefault();
    data.userId = user.id;
    const ingredientsData = createIngredientsObjectContainer(data);

    await createIngredientsForDish(ingredientsData);
    await createDish(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tastiest - the digital kitchen cupboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authReady && (
        <>
          {!user && (
            <div className={styles.introWrapper}>
              <Intro />
              <button onClick={login}>Sign up / Log in</button>
            </div>
          )}
          {user && (
            <>
              <UserNav />
              <main className={styles.main}>
                <ul>
                  {dishesContext.map(({ fields }, id) => {
                    return (
                      <Dish
                        key={dishesContext[id].id}
                        url={`dishPage/${dishesContext[id].id}`}
                        image={
                          !!fields.image[0].thumbnails
                            ? fields.image[0].thumbnails.large.url
                            : fields.image[0].url
                        }
                        dishName={fields.name}
                        time={fields.time}
                        cost={fields.cost}
                        needed={fields.neededIngredients}
                        allAvailable={availableIngredientsContext}
                      />
                    );
                  })}
                </ul>

                <DishForm onSubmit={handleOnSubmit}></DishForm>
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}
