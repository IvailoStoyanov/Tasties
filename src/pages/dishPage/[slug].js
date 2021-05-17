import styles from "./DishPage.module.scss";

export const getStaticPaths = async () => {
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Dishes?`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  )
  const data = await response.json();

  const paths = data.records.map((dish) => {
    return {
      params: { slug: dish.fields.pageName },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/Dishes?`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    }
  )
  const allDishes = await response.json();
  
  // CHECK fi this function .find can be more efficient?
  const data = allDishes.records.find(function (dish) {
    if (dish.fields.pageName == id) {
      return dish;
    }
  });

  return {
    props: { extendedDishData: data },
  };
}

const getDishAvailability = ({ neededIngredients, availableIngredients }) => {
  const needed = neededIngredients.length;
  const owned = availableIngredients.length;

  if (needed === owned) {
    return <li className={styles.available}>Available</li>;
  } else if (owned < needed && needed * 0.6 <= owned) {
    return <li className={styles.partiallyAvailable}>Partially available</li>;
  } else if (needed * 0.6 > owned) {
    return <li className={styles.notAvailable}>Not available</li>;
  }
};

const DishDetails = ({ extendedDishData }) => {
  const dish = extendedDishData.fields;
  
  return (
    <>
      <header className={styles.header}>
        <h1>{dish.name}</h1>
        <div className={styles.dishIntro}>
          <img src={dish.image[0].thumbnails.large.url} alt={`image of ${dish.name}`} />
          <ul>
            {getDishAvailability(dish)}
            <li>Time: {dish.time}</li>
            <li>Price: {dish.cost}</li>
          </ul>
        </div>
      </header>
      <div className={styles.ingredients}>
        <h2>Ingredients</h2>
        <ul>
          {dish.neededIngredients.map((ingr, i) => {
            return (
              <li
                key={i}
                className={
                  dish.availableIngredients.includes(ingr)
                    ? styles.true
                    : styles.false
                }
              >
                <img
                  src={
                    dish.availableIngredients.includes(ingr)
                      ? "/icons/checkBoxChecked.svg"
                      : "/icons/checkBoxOutline.svg"
                  }
                />
                <span>{ingr.charAt(0).toUpperCase() + ingr.slice(1)}</span>
                <img
                  className={styles.iconRight}
                  src={
                    dish.availableIngredients.includes(ingr)
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
