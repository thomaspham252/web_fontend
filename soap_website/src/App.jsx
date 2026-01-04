import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header_footer/Header";
import Footer from "./components/header_footer/Footer";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import TermsAndConditions from "./pages/TermsAndConditions";
function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />


            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;
