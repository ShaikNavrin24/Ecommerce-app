// context.js
import React, { createContext, useState } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [cartProductCount, setCartProductCount] = useState(0);

  const incrementCartCount = () => {
    setCartProductCount(prevCount => prevCount + 1);
  };

  const decrementCartCount = () => {
    setCartProductCount(prevCount => prevCount - 1);
  };

  return (
    <Context.Provider value={{ cartProductCount, incrementCartCount, decrementCartCount }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
