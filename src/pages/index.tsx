import Head from "next/head";
import styles from "../styles/Home.module.scss";

import { DishesContext } from "../../contexts/DishesContext";
import { AuthContext } from "../../contexts/AuthContext";

import { useState, useEffect, useContext } from "react";

import Dish from "../components/Dish";
import DishForm from "../components/DishForm";

export default function Home({
  dishes: defaultDishes,
  ingredients: allIngredients,
}) {
  const {
    availableIngredientsContext,
    setAvailableIngredientsContext,
    setMissingIngredientsContext,
    setCartIngredientsContext,
    dishesContext,
    setDishesContext,
  } = useContext(DishesContext);

  const { user, login, logout, authReady } = useContext(AuthContext);
  console.log("something here is doubled !!!!");

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/dishes",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content");
          }
          return res.json();
        })
        .then((data) => {
          setDishesContext(data.data);
        })
        .catch(() => {
          setDishesContext([]);
        });


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
          if (!res.ok) {
            throw Error("You must be logged in to view this content");
          }
          return res.json();
        })
        .then((data) => {
          console.log('the INGREDIENTS from the authenticated log in', data);

          //THIS might not be as effective! as the above data
          setAvailableIngredientsContext(
            allIngredients.find((list) => list.name === "availableIngredients")
              .ingredients
          );
          setDishesContext(defaultDishes);
          setMissingIngredientsContext(
            allIngredients.find((list) => list.name === "missingIngredients")
              .ingredients
          );
          setCartIngredientsContext(
            allIngredients.find((list) => list.name === "cartIngredients")
              .ingredients
          );
          // setError(null);
        })
        .catch((err) => {
          setDishesContext([]);
        });



      }

      console.log(
        "Optimisation: there is a fetch request for index.json on load of home page, check dev tfools Network index.json"
      );
  }, [user, authReady]);

  async function handleOnSubmit(data: any, e) {
    e.preventDefault();

    // await createDish(data);

    // const dishes = await getAllDishes();
    // setDishesContext(dishes);
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
            <p>
              Welcome page
              <button onClick={login}>Sign up / Log in</button>
            </p>
          )}
          {user && (
            <>
              <p>
                {user.email} {user.id}
                <button onClick={logout}>Log out</button>
              </p>
              <main className={styles.main}>
                <ul>
                  {dishesContext.map(({ fields }) => {
                    return (
                      <Dish
                        key={fields.pageName}
                        url={fields.url}
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
                {/* {user && (
          <>
            <p>Render stuff once a user is logged in!</p>
          </>
        )} */}
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}

