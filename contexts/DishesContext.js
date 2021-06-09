import { createContext, useState } from "react";

const DishesContext = createContext();

const DishesProvider = ({ children }) => {
  const [dishesContext, setDishesContext] = useState([]);
  const [availableIngredientsContext, setAvailableIngredientsContext] = useState([]);
  const [missingIngredientsContext, setMissingIngredientsContext] = useState([]);
  const [cartIngredientsContext, setCartIngredientsContext] = useState([]);

  const data = {
    dishesContext,
    setDishesContext,
    availableIngredientsContext,
    setAvailableIngredientsContext,
    missingIngredientsContext,
    setMissingIngredientsContext,
    cartIngredientsContext,
    setCartIngredientsContext,
  };

  return (
    <DishesContext.Provider value={data}>{children}</DishesContext.Provider>
  );
};

export { DishesContext, DishesProvider };
