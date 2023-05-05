import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import {Provider} from "@dhis2/app-runtime";
import {BrowserRouter, Route, Routes} from "react-router-dom";


const appConfig = {
    baseUrl: import.meta.env.VITE_REACT_APP_MEDIATOR_URL ?? "http://locahost:5000",
    apiVersion: parseInt(import.meta.env.VITE_REACT_APP_API_VERSION ?? "36")

}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider config={appConfig}>
            <BrowserRouter>
                <Routes>
                    <Route element={<App/>} path={'/:id'}/>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
)
