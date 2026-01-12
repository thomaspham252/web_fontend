import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header_footer/Header";
import Footer from "./components/header_footer/Footer";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/products/ProductDetail";
import TermsAndConditions from "./pages/navigation/TermsAndConditions";
import About from "./pages/navigation/About";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import User from "./pages/account/User";
import ContactPage from "./pages/navigation/ContactPage";
import Payment from "./pages/checkout/Payment";
import Cart from "./pages/checkout/Cart";
import OrderDetail from "./pages/account/OrderDetail";
import Orders from "./components/personal_page/Orders";
import AddressBook from './components/personal_page/AddressBook';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                {/* Trang chủ */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />

                {/* Trang sản phẩm   */}
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />

                {/*Trang điều hướng trên menu  */}
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />

                {/*Trang đăng kí đăng nhập  */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/*Trang thông tin  */}
                <Route path="/user" element={<User />} />
                <Route path="/order/:id" element={<OrderDetail />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/user/addresses" element={<AddressBook />} />

                {/*Trang thanh toán  */}
                <Route path="/payment" element={<Payment />} />
                <Route path="/cart" element={<Cart />} />


            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;