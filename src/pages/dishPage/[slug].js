import { DishesContext } from "../../../contexts/DishesContext";
import { useContext, useEffect, useState } from "react";
import { getAllIngredients } from "../../lib/ingredients";
import { getAllDishes } from "../../lib/dishes";
import {
  updateMissingIngredients,
  updateAvailableIngredients,
  updateCartIngredients,
} from "../../lib/ingredients";
import styles from "./DishPage.module.scss";

export const getServerSideProps = async (context) => {
  const id = context.params.slug;

  const allDishes = await getAllDishes();
  const data = allDishes.find((dish) => {
    if (dish.fields.pageName == id) {
      return dish;
    }
  });

  const allIngredientsResponse = await getAllIngredients();
  const allAvailableIngredients = allIngredientsResponse.some(
    (e) => e.ingredients && e.name === "availableIngredients"
  )
    ? allIngredientsResponse.find(
        (list) => list.name === "availableIngredients"
      ).ingredients
    : [];

  const allMissingIngredients = allIngredientsResponse.some(
    (e) => e.ingredients && e.name === "missingIngredients"
  )
    ? allIngredientsResponse.find((list) => list.name === "missingIngredients")
        .ingredients
    : [];

  const allCartIngredients = allIngredientsResponse.some(
    (e) => e.ingredients && e.name === "cartIngredients"
  )
    ? allIngredientsResponse.find((list) => list.name === "cartIngredients")
        .ingredients
    : [];

  return {
    props: {
      extendedDishData: data.fields,
      allAvailableIngredients,
      allMissingIngredients,
      allCartIngredients,
    },
  };
};

const DishDetails = ({
  extendedDishData,
  allAvailableIngredients,
  allMissingIngredients,
  allCartIngredients,
}) => {
  const {
    availableIngredientsContext,
    setAvailableIngredientsContext,
    missingIngredientsContext,
    setMissingIngredientsContext,
    cartIngredientsContext,
    setCartIngredientsContext,
  } = useContext(DishesContext);

  const [ownedDishIng, setOwnedDishIng] = useState(
    extendedDishData.neededIngredients.filter((ing) =>
      allAvailableIngredients.find((ingredient) => ingredient === ing)
    )
  );

  useEffect(() => {
    setAvailableIngredientsContext(allAvailableIngredients);
    setMissingIngredientsContext(allMissingIngredients);
    setCartIngredientsContext(allCartIngredients);
  }, []);

  const getDishAvailability = () => {
    const needed = extendedDishData.neededIngredients.length;
    const owned = ownedDishIng.length;

    if (needed === owned) {
      return <li className={styles.available}>Available</li>;
    } else if (owned < needed && needed * 0.6 <= owned) {
      return <li className={styles.partiallyAvailable}>Partially available</li>;
    } else if (needed * 0.6 > owned) {
      return <li className={styles.notAvailable}>Not available</li>;
    }
  };

  const checkCartIngredients = (eventIngredient) => {
    if (cartIngredientsContext.includes(eventIngredient)) {
      const filteredCart = cartIngredientsContext.filter((value) => {
        return value !== eventIngredient;
      });
      setCartIngredientsContext(filteredCart);
      updateCartIngredients(filteredCart);
    }
  };

  const toggleState = (e) => {
    const eventIngredient = e.target.closest("li").getAttribute("value");

    if (!ownedDishIng.includes(eventIngredient)) {
      setOwnedDishIng([...ownedDishIng, eventIngredient]);
      setAvailableIngredientsContext([
        ...availableIngredientsContext,
        eventIngredient,
      ]);
      updateAvailableIngredients([
        ...availableIngredientsContext,
        eventIngredient,
      ]);

      const missingIngredientsWithoutSelected =
        missingIngredientsContext.filter(function (value) {
          return value !== eventIngredient;
        });
      updateMissingIngredients(missingIngredientsWithoutSelected);
      setMissingIngredientsContext(missingIngredientsWithoutSelected);

      checkCartIngredients(eventIngredient);
    } else {
      const ingArrayWithoutSelected = ownedDishIng.filter((value) => {
        return value !== eventIngredient;
      });
      const availableIngredientsWithoutSelected =
        availableIngredientsContext.filter((value) => {
          return value !== eventIngredient;
        });

      setOwnedDishIng(ingArrayWithoutSelected);
      updateAvailableIngredients(availableIngredientsWithoutSelected);
      setAvailableIngredientsContext(availableIngredientsWithoutSelected);

      updateMissingIngredients([...missingIngredientsContext, eventIngredient]);
      setMissingIngredientsContext([
        ...missingIngredientsContext,
        eventIngredient,
      ]);

      checkCartIngredients(eventIngredient);
    }
  };

  return (
    <>
      <header className={styles.header}>
        <h1>{extendedDishData.name}</h1>
        <div className={styles.dishIntro}>
          <img
            src={extendedDishData.image[0].url}
            alt={`image of ${extendedDishData.name}`}
          />
          <ul>
            {getDishAvailability()}
            <li>Time: {extendedDishData.time}</li>
            <li>Price: {extendedDishData.cost}</li>
          </ul>
        </div>
      </header>
      <div className={styles.ingredients}>
        <h2>Ingredients</h2>
        <ul>
          {extendedDishData.neededIngredients.map((ingr, i) => {
            ingr = ingr.toLowerCase();
            return (
              <li
                key={i}
                value={ingr}
                className={
                  ownedDishIng.includes(ingr) ? styles.true : styles.false
                }
                onClick={toggleState}
              >
                <img
                  src={
                    ownedDishIng.includes(ingr)
                      ? "/icons/checkBoxChecked.svg"
                      : "/icons/checkBoxOutline.svg"
                  }
                />
                <span>{ingr.charAt(0).toUpperCase() + ingr.slice(1)}</span>
                <img
                  className={styles.iconRight}
                  src={
                    ownedDishIng.includes(ingr)
                      ? "/icons/checkBoxOutline.svg"
                      : "/icons/checkBoxCrossed.svg"
                  }
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default DishDetails;
