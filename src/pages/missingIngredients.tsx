import Head from "next/head";
import styles from "../styles/MissingIngredients.module.scss";

import Checkbox from "../components/Checkbox";

import { DishesContext } from "../../contexts/DishesContext";
import { useContext, useEffect, useRef } from "react";

import {
  updateMissingIngredients,
  updateCartIngredients,
  updateAvailableIngredients,
} from "../lib/ingredients";
import { AuthContext } from "../../contexts/AuthContext";

import UserNav from '../components/UserNav'

export default function MissingIngredients() {
  const {
    availableIngArrayID,
    setAvailableIngArrayID,
    availableIngredientsContext,
    setAvailableIngredientsContext,
    missingIngArrayID,
    setMissingIngArrayID,
    missingIngredientsContext,
    setMissingIngredientsContext,
    cartIngArrayID,
    setCartIngArrayID,
    cartIngredientsContext,
    setCartIngredientsContext,
  } = useContext(DishesContext);

  const ingListElement = useRef(null);

  const { user, authReady } = useContext(AuthContext);

  useEffect(() => {
    //This fetch could be placed within the api folder?!
    if (
      authReady &&
      user &&
      !availableIngredientsContext.length &&
      !missingIngredientsContext.length &&
      !cartIngredientsContext.length
    ) {
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
              setAvailableIngredientsContext(list.fields.ingredients);
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
  }, [user, authReady]);

  const removeFromMissing = (e) => {
    const currentIngr = e.target.parentElement.id;
    setMissingIngredientsContext(
      missingIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
    updateMissingIngredients(
      missingIngredientsContext.filter((ingr) => ingr !== currentIngr), missingIngArrayID
    );
  };

  const removeFromCartList = (e) => {
    const currentIngr = e.target.parentElement.id;
    setCartIngredientsContext(
      cartIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
    updateCartIngredients(
      cartIngredientsContext.filter((ingr) => ingr !== currentIngr), cartIngArrayID
    );
  };

  const moveToCartList = (e) => {
    const currentIngr = e.target.parentElement.id;
    cartIngredientsContext
      ? setCartIngredientsContext([...cartIngredientsContext, currentIngr])
      : setCartIngredientsContext([currentIngr]);
    cartIngredientsContext
      ? updateCartIngredients([...cartIngredientsContext, currentIngr], cartIngArrayID)
      : updateCartIngredients([currentIngr], cartIngArrayID);
    removeFromMissing(e);
  };

  const moveToMissingIngredients = (e) => {
    const currentIngr = e.target.parentElement.id;
    missingIngredientsContext
      ? setMissingIngredientsContext([
          ...missingIngredientsContext,
          currentIngr,
        ])
      : setMissingIngredientsContext([currentIngr]);
    missingIngredientsContext
      ? updateMissingIngredients([...missingIngredientsContext, currentIngr], missingIngArrayID)
      : updateMissingIngredients([currentIngr], missingIngArrayID);
    removeFromCartList(e);
  };

  const getTickedIngredients = (array) => {
    return array
      .filter((item) => item.getAttribute("value") === "true")
      .map((item) => item.getAttribute("id"));
  };

  const moveToAvailableIngredients = () => {
    let cartListIngredientsArray = [
      ...ingListElement.current.querySelectorAll("li"),
    ];

    updateCartIngredients(
      cartIngredientsContext.filter((ing) => {
        return !getTickedIngredients(cartListIngredientsArray).includes(ing);
      }), cartIngArrayID
    );

    setCartIngredientsContext(
      cartIngredientsContext.filter((ing) => {
        return !getTickedIngredients(cartListIngredientsArray).includes(ing);
      })
    );

    setAvailableIngredientsContext([
      ...availableIngredientsContext,
      ...getTickedIngredients([
        ...ingListElement.current.querySelectorAll("li"),
      ]),
    ]);

    updateAvailableIngredients([
      ...availableIngredientsContext,
      ...getTickedIngredients([
        ...ingListElement.current.querySelectorAll("li"),
      ]),
    ], availableIngArrayID);
  };

  return (
    <div>
      <Head>
        <title>Tastiest</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserNav />
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Missing ingredients</h1>
          <img className={styles.aubergine} src="/icons/aubergine.svg" alt="icon of an aubergine" />
          <img className={styles.rosemary} src="/icons/rosemary.svg" alt="icon of the spice rosemary" />
        </header>
        <div className={styles.missingItemsWrapper}>
          <img className={styles.seeds} src="/icons/seeds.svg" alt="icon of seeds" />
          <ul>
            {(missingIngredientsContext ? missingIngredientsContext : []).map(
              (ing) => {
                return (
                  <li key={`${ing}MissingKey`} id={ing}>
                    {ing}{" "}
                    <img onClick={moveToCartList} src="/icons/arrowDown.svg" />
                  </li>
                );
              }
            )}
          </ul>
        </div>
        <div className={styles.cart}>
          <h2>
            Shopping list <img src="/icons/cart.svg" alt="shopping cart" />
          </h2>
          <ul ref={ingListElement}>
            {(cartIngredientsContext ? cartIngredientsContext : []).map(
              (ing) => {
                return (
                  <li key={`${ing}CartKey`} id={ing} value="false">
                    <Checkbox />
                    <span>{ing}</span>
                    <img
                      onClick={moveToMissingIngredients}
                      className={styles.moveArrow}
                      src="/icons/arrowUp.svg"
                    />
                  </li>
                );
              }
            )}
          </ul>
          <button onClick={moveToAvailableIngredients}>We got them</button>
        </div>
      </main>
    </div>
  );
}
