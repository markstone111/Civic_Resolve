import React, { createContext, useContext, useState } from "react";
const PointsContext = createContext<{ coins: number; addPoints: (n: number) => void }>({
  coins: 0,
  addPoints: () => {},
});
export const PointsProvider = ({ children }) => {
  const [coins, setCoins] = useState(0);

  const addPoints = (amount: number) => {
    setCoins((prev) => prev + amount);
  };

  return (
    <PointsContext.Provider value={{ coins, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};

export const usePoints = () => useContext(PointsContext);
