import React from 'react';
import { Link } from "react-router-dom";
import './footer.css';
import { SiGooglemaps } from "react-icons/si";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
function Footer() {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="top-footer">
                    <div className="title">
                        <p>HANDMADE SOAP</p>
                    </div>
                    <div className="contend">
                        <p><SiGooglemaps/> Khu phố 6, Thủ Đức, Thành phố Hồ Chí Minh</p>
                        <p><FaPhone/> HCM: 0393373094 - Zalo 0862055042</p>
                        <p><IoMail/> 22130143@st.hcmuaf.edu.vn</p>
                    </div>
                </div>

                <div className="top-footer">
                    <div className="title">
                        <p>LIÊN KẾT NHANH</p>
                    </div>
                    <div className="contend">
                        <p><Link to="/home">Trang chủ</Link></p>
                        <p><Link to="/products">Sản phẩm </Link></p>
                        <p><Link to="/about">Giới thiệu</Link></p>
                        <p><Link to="/contact">Liên hệ</Link></p>
                    </div>
                </div>

                <div className="top-footer">
                    <div className="title">
                        <p>DỊCH VỤ KHÁCH HÀNG</p>
                    </div>
                    <div className="contend">
                        <p><Link to="/">Điểu khoản mua hàng</Link></p>
                        <p><Link to="/">Điều khoản sử dụng</Link></p>
                        <p><Link to="/">Câu hỏi thường gặp</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
