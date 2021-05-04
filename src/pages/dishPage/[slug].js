import styles from "./DishPage.module.scss";

export const getStaticPaths = async () => {
  // const response = await fetch("http://localhost:3000/api/dishesMock");
  // const data = await response.json();

  const data = {
    "availableIngredients": [
      "banana",
      "garlic",
      "creme",
      "onion",
      "eggs",
      "sausage",
      "cucumber",
      "milk",
      "pumpkin"
    ],
    "missingIngredients": ["avocado", "cheese", "bread", "sugar", "carrots"],
    "allDishes": [
      {
        "id": "soup",
        "image": "/images/soup.jpg",
        "alt": "rout",
        "name": "Pumpkin Soup",
        "price": "$",
        "time": "10 min",
        "ingredients": {
          "pumpkin": true,
          "garlic": true,
          "creme": true,
          "onion": true,
          "broth": true,
          "carrots": true
        }
      },
      {
        "id": "iceCream",
        "image": "/images/iceCream.jpg",
        "alt": "rout",
        "name": "Ice Cream",
        "price": "$",
        "time": "10 min",
        "ingredients": {
          "milk": true,
          "sugar": true,
          "eggs": true,
          "carrots": false
        }
      },
      {
        "id": "carrotCake",
        "image": "/images/carrotCake.jpg",
        "alt": "rout",
        "alt": "rout",
        "name": "Carrot Cake",
        "price": "$",
        "time": "10 min",
        "ingredients": {
          "milk": true,
          "sugar": true,
          "eggs": false,
          "carrots": false
        }
      }
    ]
  }
  

  const paths = data.allDishes.map((dish) => {
    return {
      params: { slug: dish.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.slug;
  // const response = await fetch(`http://localhost:3000/api/dishesMock`);
  // const allData = await response.json();

const allData = {
  "availableIngredients": [
    "banana",
    "garlic",
    "creme",
    "onion",
    "eggs",
    "sausage",
    "cucumber",
    "milk",
    "pumpkin"
  ],
  "missingIngredients": ["avocado", "cheese", "bread", "sugar", "carrots"],
  "allDishes": [
    {
      "id": "soup",
      "image": "/images/soup.jpg",
      "alt": "rout",
      "name": "Pumpkin Soup",
      "price": "$",
      "time": "10 min",
      "ingredients": {
        "pumpkin": true,
        "garlic": true,
        "creme": true,
        "onion": true,
        "broth": true,
        "carrots": true
      }
    },
    {
      "id": "iceCream",
      "image": "/images/iceCream.jpg",
      "alt": "rout",
      "name": "Ice Cream",
      "price": "$",
      "time": "10 min",
      "ingredients": {
        "milk": true,
        "sugar": true,
        "eggs": true,
        "carrots": false
      }
    },
    {
      "id": "carrotCake",
      "image": "/images/carrotCake.jpg",
      "alt": "rout",
      "alt": "rout",
      "name": "Carrot Cake",
      "price": "$",
      "time": "10 min",
      "ingredients": {
        "milk": true,
        "sugar": true,
        "eggs": false,
        "carrots": false
      }
    }
  ]
}


  // CHECK fi this function .find can be more efficient?
  const data = allData.allDishes.find(function (dish) {
    if (dish.id == id) {
      return dish;
    }
  });

  return {
    props: { dish: data },
  };
};

const calculateOwnedIngredients = (ingredients) => {
  const owned = [];
  for (const [key, value] of Object.entries(ingredients)) {
    if (value) {
      owned.push(key);
    }
  }
  return owned;
};

const getDishAvailability = ({ ingredients }) => {
  const numberOfNeeded = Object.entries(ingredients).length;
  const owned = calculateOwnedIngredients(ingredients);

  if (numberOfNeeded === owned.length) {
    return <li className={styles.available}>Available</li>;
  } else if (
    owned.length < numberOfNeeded &&
    numberOfNeeded * 0.6 < owned.length
  ) {
    return <li className={styles.partiallyAvailable}>Partially available</li>;
  } else if (numberOfNeeded * 0.6 > owned.length) {
    return <li className={styles.notAvailable}>Not available</li>;
  }
};

const DishDetails = ({ dish }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>{dish.name}</h1>
        <div className={styles.dishIntro}>
          <img src={dish.image} alt={dish.alt} />
          <ul>
            {getDishAvailability(dish)}
            <li>Time: {dish.time}</li>
            <li>Price: {dish.price}</li>
          </ul>
        </div>
      </header>
      <div className={styles.ingredients}>
        <h2>Ingredients</h2>
        <ul>
          {Object.entries(dish.ingredients).map((ingr, i) => {
            return (
              <li key={i} className={ingr[1] ? styles.true : ""}>
                <img
                  src={
                    ingr[1]
                      ? "/icons/checkBoxChecked.svg"
                      : "/icons/checkBoxOutline.svg"
                  }
                />
                <span>
                  {ingr[0].charAt(0).toUpperCase() + ingr[0].slice(1)}
                </span>
                <img
                  className={styles.iconRight}
                  src={
                    ingr[1]
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
