import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Giả lập đăng nhập
        console.log("Đăng nhập:", loginData);
        // Sau này sẽ gọi API ở đây
        alert("Đăng nhập thành công!");
        navigate('/user'); // Chuyển hướng vào trang User
    };

    return (
        <div className="auth-container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-auth">Đăng Nhập</button>
            </form>
            <p>Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>
        </div>
    );
};

export default Login;