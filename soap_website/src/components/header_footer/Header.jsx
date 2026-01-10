import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Header.css';
import logo from '../../assets/image/logo.jpg';
import {BsCart2} from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import {getCartCount} from "../../utils/cartUtils";

function Header() {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const updateCartCount = () => {
        setCartCount(getCartCount());
    };
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        updateCartCount();
        window.addEventListener("cartUpdated", updateCartCount);
        return () => {
            window.removeEventListener("cartUpdated", updateCartCount);
        };
    }, []);

    // Xử lý tìm kiếm
    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    // LOGIC Xử lý Đăng xuất
    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    };

    return (
        <header className="header-container">
            <div className="top-header">
                <div className="logo">
                    <Link to="/home"> <img src={logo} alt="Logo"/></Link>
                </div>
                <div className="search">
                    <input
                        className="input-type"
                        type="text"
                        placeholder="Tìm sản phẩm yêu thích..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <span className="icon-search" onClick={handleSearch} style={{cursor: 'pointer'}}>
                        <FaSearch/>
                    </span>
                </div>

                <div className="acc-cart">
                    <div className="account account-container">
                        <div className="account-label">
                            {user ? (
                                <Link to="/user" className="acc-link">TÀI KHOẢN</Link>
                            ) : (
                                <div>
                                    <Link to="/login">Đăng nhập</Link>
                                    <span style={{margin: '0 5px'}}>/</span>
                                    <Link to="/register">Đăng ký</Link>
                                </div>
                            )}
                        </div>

                        {user && (
                            <div className="account-dropdown">
                                <div className="dropdown-item greeting">
                                    <Link to="/user" style={{textDecoration: 'none', color: 'inherit'}}>
                                        XIN CHÀO, {user.name.toUpperCase()}
                                    </Link>
                                </div>
                                <div className="dropdown-item logout-btn" onClick={handleLogout}>
                                    ĐĂNG XUẤT
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="cart">
                        <Link to="/cart" className="cart-icon">
                            <BsCart2/>
                            {cartCount > 0 && <span className="badge">{cartCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    <li><Link to="/home">TRANG CHỦ</Link></li>
                    <li><Link to="/products">SẢN PHẨM</Link></li>
                    <li><Link to="/about">GIỚI THIỆU</Link></li>
                    <li><Link to="/terms-and-conditions">ĐIỀU KHOẢN MUA HÀNG</Link></li>
                    <li><Link to="/contact">LIÊN HỆ</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;