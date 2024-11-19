import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import AppContextProvider from "./context/AppContext.js";
import GlobalStyles from './components/GlobalStyles/index.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <GlobalStyles>
            <AppContextProvider>
                <App/>
            </AppContextProvider>
        </GlobalStyles>
    </BrowserRouter>
);

