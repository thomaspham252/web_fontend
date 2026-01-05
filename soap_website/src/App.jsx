import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header_footer/Header";
import Footer from "./components/header_footer/Footer";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import TermsAndConditions from "./pages/TermsAndConditions";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";

function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                {/* Trang chủ */}
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} /> {/* Thêm dòng này để vào tên miền chính là ra Home luôn */}

                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />

                {/* --- BẠN BỊ THIẾU ĐOẠN NÀY --- */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/user" element={<User />} />

            </Routes>

            <Footer />
        </BrowserRouter>
    );
}

export default App;