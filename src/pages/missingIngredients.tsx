import Head from "next/head";
import styles from "../styles/MissingIngredients.module.scss";

import Checkbox from "../components/Checkbox";

import { DishesContext } from "../../contexts/DishesContext";
import { useContext, useState, useEffect, useRef } from "react";
import { getAllIngredients } from "../lib/ingredients";

import {
  updateMissingIngredients,
  updateCartIngredients,
  updateAvailableIngredients,
} from "../lib/ingredients";

export default function MissingIngredients() {
  const {
    availableIngredientsContext,
    setAvailableIngredientsContext,
    missingIngredientsContext,
    setMissingIngredientsContext,
    cartIngredientsContext,
    setCartIngredientsContext,
  } = useContext(DishesContext);

  const ingListElement = useRef(null);

  const fetchAvailableIngredients = async () => {
    const allIngredientsResponse = await getAllIngredients();

    const availableIngredients = allIngredientsResponse.find(
      (list) => list.name === "availableIngredients"
    ).ingredients;
    setAvailableIngredientsContext(availableIngredients);

    const missingIngredients = allIngredientsResponse.find(
      (list) => list.name === "missingIngredients"
    ).ingredients;
    setMissingIngredientsContext(missingIngredients);

    const cartIngredients = allIngredientsResponse.find(
      (list) => list.name === "cartIngredients"
    ).ingredients;
    setCartIngredientsContext(cartIngredients);
  };

  availableIngredientsContext.length === 0 &&
  missingIngredientsContext.length === 0 &&
  cartIngredientsContext.length === 0
    ? fetchAvailableIngredients()
    : null;

  const removeFromMissing = (e) => {
    const currentIngr = e.target.parentElement.id;
    setMissingIngredientsContext(
      missingIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
    updateMissingIngredients(
      missingIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
  };

  const removeFromCartList = (e) => {
    const currentIngr = e.target.parentElement.id;
    setCartIngredientsContext(
      cartIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
    updateCartIngredients(
      cartIngredientsContext.filter((ingr) => ingr !== currentIngr)
    );
  };

  const moveToCartList = (e) => {
    const currentIngr = e.target.parentElement.id;
    cartIngredientsContext
      ? setCartIngredientsContext([...cartIngredientsContext, currentIngr])
      : setCartIngredientsContext([currentIngr]);
    cartIngredientsContext
      ? updateCartIngredients([...cartIngredientsContext, currentIngr])
      : updateCartIngredients([currentIngr]);
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
      ? updateMissingIngredients([...missingIngredientsContext, currentIngr])
      : updateMissingIngredients([currentIngr]);
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
      })
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
    ]);
  };

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
            To Buy <img src="/icons/cart.svg" alt="shopping cart" />
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
