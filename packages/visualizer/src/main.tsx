import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import {Provider} from "@dhis2/app-runtime";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary"

const appConfig = {
    baseUrl: import.meta.env.DEV ? import.meta.env.VITE_REACT_APP_MEDIATOR_URL ?? "http://localhost:5001" : "http://localhost:5001",
    apiVersion: parseInt(import.meta.env.VITE_REACT_APP_API_VERSION ?? "36")
}


function ErrorContainer() {

    return (
        <div id="error-container">
            Something went wrong
        </div>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider config={appConfig}>
            <ErrorBoundary fallback={<ErrorContainer/>}>
                <BrowserRouter>
                    <Routes>

                        <Route element={<App/>} path={'/:id'}/>
                    </Routes>
                </BrowserRouter>
            </ErrorBoundary>
        </Provider>
    </React.StrictMode>,
)
