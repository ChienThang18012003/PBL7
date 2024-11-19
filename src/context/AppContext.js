import {createContext} from "react";
import {doctors, specialityData} from '../assets/assets_fe/assets.js'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const value = {
        doctors,
        currencySymbol,
        specialityData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
