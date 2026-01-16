import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import '../../assets/css/auth.css';

const API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/users";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Xóa lỗi khi người dùng bắt đầu nhập lại
        if (errorMessage) setErrorMessage('');
    };

    const handleLogin = (e) => {
        e.preventDefault();

        // KIỂM TRA ĐUÔI EMAIL @GMAIL.COM ---
        const emailInput = formData.email.trim().toLowerCase();
        if (!emailInput.endsWith("@gmail.com")) {
            setErrorMessage("Vui lòng sử dụng email có đuôi @gmail.com");
            return;
        }

        fetch(`${API_URL}?email=${formData.email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length === 0) {
                    setErrorMessage("Email này chưa được đăng ký!");
                } else {
                    const foundUser = users[0];
                    if (foundUser.password === formData.password) {
                        sessionStorage.setItem("user", JSON.stringify(foundUser));

                        // Dispatch event để Header nhận biết và re-render
                        window.dispatchEvent(new Event("userLogin"));

                        navigate("/user");
                    } else {
                        setErrorMessage("Mật khẩu không chính xác!");
                    }
                }
            })
            .catch(err => {
                console.error("Lỗi:", err);
                setErrorMessage("Lỗi kết nối Server!");
            });
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#333',
        fontWeight: '500',
        fontSize: '0.95rem',
        cursor: 'pointer'
    };

    return (
        <div className="auth-container">
            <h2>Đăng Nhập</h2>

            {/* Hiển thị lỗi (bao gồm lỗi sai đuôi gmail) */}
            {errorMessage && <p style={{color: 'red', marginBottom: '10px', textAlign: 'center', fontSize: '14px'}}>{errorMessage}</p>}

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="example@gmail.com"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder=""
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn-auth">Đăng Nhập</button>
            </form>

            <div className="divider">
                <span>Hoặc đăng nhập bằng</span>
            </div>

            <div className="social-login">
                <button type="button" className="btn-social btn-google"><FaGoogle/> Google</button>
                <button type="button" className="btn-social btn-facebook"><FaFacebookF/> Facebook</button>
                <button type="button" className="btn-social btn-apple"><FaApple/> Apple</button>
            </div>

            <div style={{
                marginTop: '25px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/forgot-password" style={linkStyle}>
                    Quên mật khẩu?
                </Link>

                <Link to="/register" style={linkStyle}>
                    Đăng ký ngay
                </Link>
            </div>
        </div>
    );
};

export default Login;