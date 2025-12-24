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
import ForgotPassword from './pages/auth/ForgotPassword';

function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />


                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />


                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactPage />} />


                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />


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