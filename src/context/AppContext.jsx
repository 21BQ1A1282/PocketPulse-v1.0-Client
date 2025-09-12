import { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    
    const contextValue = {
        user
    }

    return (
        <AppContext.Provider value={contextValue} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;