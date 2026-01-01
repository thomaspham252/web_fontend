import React from 'react';
import { Link } from "react-router-dom";
import '../assets/css/Header.css';
import logo from '../assets/image/logo.jpg';
import { FaShoppingBag } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";


function Header() {
    return (
        <header className="header-container">
            <div className="top-header">
                <div className="logo">
                    {/* LOGO → HOME */}
                    <Link to="/"> <img src={logo} alt="Logo"/></Link>
                </div>
                <div className="search">
                    <input className="input-type"  type="text" placeholder="Tìm sản phẩm yêu thích..."/>
                    <span className="icon-search"><FaSearch /></span>
                </div>
                <div className="acc-cart">
                    <div className="account"><Link to="/">TÀI KHOẢN</Link></div>
                    <div className="cart">
                        <Link to="/cart">
                            <FaShoppingBag/>
                        </Link>
                    </div>


                </div>
            </div>

            <nav className="navigation">
                <ul className="nav-list">
                    <li>
                        <Link to="/">TRANG CHỦ</Link>
                    </li>
                    <li>
                        <Link to="/products">SẢN PHẨM</Link>
                    </li>
                    <li>
                        <Link to="/about">GIỚI THIỆU</Link>
                    </li>
                    <li>
                        <Link to="/about">ĐIỀU KHOẢN MUA HÀNG</Link>
                    </li>
                    <li>
                        <Link to="/contact">LIÊN HỆ</Link>
                    </li>
                </ul>
            </nav>


        </header>
    );
}

export default Header;
