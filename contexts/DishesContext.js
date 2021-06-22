import { createContext, useState } from "react";

const DishesContext = createContext();

const DishesProvider = ({ children }) => {
  const [dishesContext, setDishesContext] = useState([]);
  const [availableIngredientsContext, setAvailableIngredientsContext] = useState([]);
  const [availableIngArrayID, setAvailableIngArrayID] = useState('');
  const [missingIngredientsContext, setMissingIngredientsContext] = useState([]);
  const [missingIngArrayID, setMissingIngArrayID] = useState('');
  const [cartIngredientsContext, setCartIngredientsContext] = useState([]);
  const [cartIngArrayID, setCartIngArrayID] = useState('');

  const data = {
    dishesContext,
    setDishesContext,
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
  };

  return (
    <DishesContext.Provider value={data}>{children}</DishesContext.Provider>
  );
};

export { DishesContext, DishesProvider };
