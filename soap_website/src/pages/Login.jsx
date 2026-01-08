import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebookF, FaApple } from "react-icons/fa";
import '../assets/css/auth.css';
import listUsers from '../data/users.json';

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
        if (errorMessage) setErrorMessage('');
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const foundUser = listUsers.find(u =>
            u.email === formData.email && u.password === formData.password
        );

        if (foundUser) {
            const { password, ...userSafe } = foundUser;
            saveUserAndRedirect(userSafe);
        } else {
            setErrorMessage("Email hoặc mật khẩu không chính xác!");
        }
    };

    const handleSocialLogin = (platform) => {
        let fakeUser = {};
        if (platform === 'google') {
            fakeUser = { name: "Người dùng Google", email: "google@gmail.com", loginType: 'google' };
        } else if (platform === 'facebook') {
            fakeUser = { name: "Người dùng Facebook", email: "fb@yahoo.com", loginType: 'facebook' };
        } else if (platform === 'apple') {
            fakeUser = { name: "Người dùng Apple", email: "apple@icloud.com", loginType: 'apple' };
        }
        alert(`Đang kết nối tới ${platform}...`);
        saveUserAndRedirect(fakeUser);
    };

    const saveUserAndRedirect = (userData) => {
        sessionStorage.setItem("user", JSON.stringify(userData));
        window.location.href = "/user";
    };

    return (
        <div className="auth-container">
            <h2>Đăng Nhập</h2>

            {errorMessage && <p style={{color: 'red', marginBottom: '10px'}}>{errorMessage}</p>}

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Ví dụ: user@gmail.com"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Nhập mật khẩu"
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn-auth">Đăng Nhập</button>
            </form>

            <div className="divider">
                <span>Hoặc đăng nhập bằng</span>
            </div>

            <div className="social-login">
                <button type="button" className="btn-social btn-google" onClick={() => handleSocialLogin('google')}>
                    <FaGoogle/> Google
                </button>
                <button type="button" className="btn-social btn-facebook" onClick={() => handleSocialLogin('facebook')}>
                    <FaFacebookF/> Facebook
                </button>
                <button type="button" className="btn-social btn-apple" onClick={() => handleSocialLogin('apple')}>
                    <FaApple/> Apple
                </button>
            </div>

            <p style={{marginTop: '20px'}}>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    );
};

export default Login;