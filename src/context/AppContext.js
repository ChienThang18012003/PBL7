import {createContext, useState, useContext, useEffect} from "react";
import {doctors, specialityData} from '../assets/assets_fe/assets.js'

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [sharedData, setSharedData] = useState(null);
    const [chatMessages, setChatMessages] = useState(() => {
        const saved = localStorage.getItem('chatMessages');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    }, [chatMessages]);

    const value = {
        doctors,
        currencySymbol,
        specialityData,
        sharedData, 
        setSharedData,
        chatMessages,
        setChatMessages
    }
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
