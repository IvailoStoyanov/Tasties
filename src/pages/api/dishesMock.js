// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
    availableIngredients: [
      "banana",
      "garlic",
      "creme",
      "onion",
      "eggs",
      "sausage",
      "cucumber",
      "milk",
      "pumpkin",
    ],
    missingIngredients: ["avocado", "cheese", "bread", "sugar", "carrots"],
    allDishes: [
      {
        id: "soup",
        image: "/images/soup.jpg",
        alt: "rout",
        name: "Pumpkin Soup",
        price: "$",
        time: "10 min",
        ingredients: {
          "pumpkin": true,
          "garlic": true,
          "creme": true,
          "onion": true,
          "broth":true ,
          "carrots": true
        }
      },
      {
        id: "iceCream",
        image: "/images/iceCream.jpg",
        alt: "rout",
        name: "Ice Cream",
        price: "$",
        time: "10 min",
        ingredients: {
          "milk": true,
          "sugar": true,
          "eggs": true,
          "carrots": false,
        }
      },
      {
        id: "carrotCake",
        image: "/images/carrotCake.jpg",
        alt: "rout",
        alt: "rout",
        name: "Carrot Cake",
        price: "$",
        time: "10 min",
        ingredients: {
          "milk": true,
          "sugar": true,
          "eggs": false,
          "carrots": false,
        }
      },
    ],
  });
};
