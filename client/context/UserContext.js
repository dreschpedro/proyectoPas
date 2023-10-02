import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children, initialPayload }) => {
  // Usar un nombre de variable más claro, como "userData", en lugar de "user", para evitar confusiones
  const [userData, setUserData] = useState(initialPayload);

  return (
    <UserContext.Provider value={{
      userData, 
      setUserData 
    }}>
      {children}
    </UserContext.Provider>
  );
};
