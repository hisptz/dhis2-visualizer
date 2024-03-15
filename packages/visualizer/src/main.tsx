import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

function ErrorContainer() {

		return (
				<div id="error-container">
						Something went wrong
				</div>
		)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
		<React.StrictMode>
				<ErrorBoundary fallback={<ErrorContainer/>}>
						<BrowserRouter>
								<QueryClientProvider client={queryClient}>
										<Routes>
												<Route element={<App/>} path={'/:id'}/>
										</Routes>
								</QueryClientProvider>
						</BrowserRouter>
				</ErrorBoundary>
		</React.StrictMode>,
)
