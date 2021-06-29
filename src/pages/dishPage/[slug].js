import { DishesContext } from "../../../contexts/DishesContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getAllDishes } from "../../lib/dishes";
import { getSingleDish } from "../../lib/dishes";
import UserNav from "../../components/UserNav";
import {
  updateMissingIngredients,
  updateAvailableIngredients,
  updateCartIngredients,
} from "../../lib/ingredients";
import styles from "./DishPage.module.scss";

export const getStaticProps = async (context) => {
  const id = context.params.slug;

  const singleDish = await getSingleDish(id);

  return {
    props: {
      extendedDishData: singleDish,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await getAllDishes();
  const paths = res.map((dish) => {
    return {
      params: {
        slug: dish.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

const DishDetails = ({ extendedDishData }) => {
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

  const { user, login, logout, authReady } = useContext(AuthContext);
  const [ownedDishIng, setOwnedDishIng] = useState([]);

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
              setOwnedDishIng(
                extendedDishData.neededIngredients.filter((neededIng) =>
                  list.fields.ingredients.find(
                    (ingredient) => ingredient === neededIng
                  )
                )
              );
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

    if (availableIngredientsContext.length) {
      setOwnedDishIng(
        extendedDishData.neededIngredients.filter((ing) =>
          availableIngredientsContext.find((ingredient) => ingredient === ing)
        )
      );
    }
  }, [user, authReady]);

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
    if (
      cartIngredientsContext &&
      cartIngredientsContext.includes(eventIngredient)
    ) {
      const filteredCart = cartIngredientsContext.filter((value) => {
        return value !== eventIngredient;
      });
      setCartIngredientsContext(filteredCart);
      updateCartIngredients(filteredCart, setCartIngArrayID);
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
      updateAvailableIngredients(
        [...availableIngredientsContext, eventIngredient],
        availableIngArrayID
      );

      const missingIngredientsWithoutSelected = missingIngredientsContext
        ? missingIngredientsContext.filter(function (value) {
            return value !== eventIngredient;
          })
        : [];
      updateMissingIngredients(
        missingIngredientsWithoutSelected,
        missingIngArrayID
      );
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
      updateAvailableIngredients(
        availableIngredientsWithoutSelected,
        availableIngArrayID
      );
      setAvailableIngredientsContext(availableIngredientsWithoutSelected);

      updateMissingIngredients(
        missingIngredientsContext
          ? [...missingIngredientsContext, eventIngredient]
          : [eventIngredient],
        missingIngArrayID
      );
      setMissingIngredientsContext(
        missingIngredientsContext
          ? [...missingIngredientsContext, eventIngredient]
          : [eventIngredient]
      );

      checkCartIngredients(eventIngredient);
    }
  };

  return (
    <>
      {!user && <UserNav />}
      {user && (
        <>
          <UserNav />
          <main className={styles.main}>
            <header className={styles.header}>
              <h1>{extendedDishData.name}</h1>
              <div className={styles.dishIntro}>
                <img
                  className={styles.leaf}
                  src="/icons/leaf.svg"
                  alt="leaf"
                ></img>
                <img
                  className={styles.dishImage}
                  src={
                    !!extendedDishData.image[0].thumbnails
                      ? extendedDishData.image[0].thumbnails.large.url
                      : extendedDishData.image[0].url
                  }
                  alt={`image of ${extendedDishData.name}`}
                />
                <ul>
                  {getDishAvailability()}
                  <li>Time: {extendedDishData.time} min</li>
                  <li>Price: {extendedDishData.cost}</li>
                </ul>
              </div>
              <img
                className={styles.stalk}
                src="/icons/leafStalk.svg"
                alt="leaf"
              ></img>
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
                      <span>
                        {ingr.charAt(0).toUpperCase() + ingr.slice(1)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default DishDetails;
