import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/header_footer/Header";
import Footer from "./components/header_footer/Footer";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Home/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



