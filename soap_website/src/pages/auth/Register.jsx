import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';
import listUsers from '../../data/users.json';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        const isExist = listUsers.some(u => u.email === formData.email);
        if (isExist) {
            setError("Email này đã được sử dụng!");
            return;
        }

        const newUser = {
            name: formData.name,
            email: formData.email,
            loginType: 'email',
            avatar: 'default.jpg'
        };

        sessionStorage.setItem("user", JSON.stringify(newUser));

        alert("Đăng ký thành công! Bạn đã được tự động đăng nhập.");
        window.location.href = "/user";
    };

    return (
        <div className="auth-container">
            <h2>Đăng Ký Tài Khoản</h2>

            {error && <p style={{color: 'red', marginBottom: '10px'}}>{error}</p>}

            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Họ tên:</label>
                    <input type="text" name="name" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input type="password" name="password" required onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu:</label>
                    <input type="password" name="confirmPassword" required onChange={handleChange} />
                </div>
                <button type="submit" className="btn-auth">Đăng Ký</button>
            </form>
            <p style={{marginTop: '15px'}}>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
        </div>
    );
};

export default Register;