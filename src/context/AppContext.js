import {createContext, useState, useContext} from "react";
import {doctors, specialityData} from '../assets/assets_fe/assets.js'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [sharedData, setSharedData] = useState(null);
    const value = {
        doctors,
        currencySymbol,
        specialityData,
        sharedData, 
        setSharedData,
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
