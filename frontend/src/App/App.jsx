import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

import HomePage from '../pages/HomePage/HomePage';
import SignInPage from '../pages/SignInPage/SignInPage';
import UserPage from '../pages/UserPage/UserPage';
import E404Page from '../pages/E404Page/E404Page';
import TransactionsPage from '../pages/TransactionsPage/TransactionsPage';


export default function App() {
    return (

        <React.StrictMode>
            

            <BrowserRouter
            // basename="/argentbank"
            >
                <NavBar />


                
                    <Routes>

                        <Route path="/"
                            element={<HomePage />}
                        />

                        <Route
                            path="/sign-in"
                            element={<SignInPage />}
                        />
                        <Route
                            path="/user"
                            element={<UserPage />}
                        />
                        <Route
                            path="/transactions"
                            element={<TransactionsPage />}
                        />
                        <Route
                            path="*"
                            element={<E404Page />}
                        />

                    </Routes>
                

    
                <Footer />
            </BrowserRouter>


        </React.StrictMode>
    )
}
