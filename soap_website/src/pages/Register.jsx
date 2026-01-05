import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/auth.css'; // Chúng ta sẽ tạo file css này ở Bước 3

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Giả lập đăng ký thành công
        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu không khớp!");
            return;
        }
        console.log("Đăng ký:", formData);
        alert("Đăng ký thành công!");
        navigate('/login'); // Chuyển sang trang đăng nhập
    };

    return (
        <div className="auth-container">
            <h2>Đăng Ký</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên đăng nhập</label>
                    <input type="text" name="username" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" name="password" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu</label>
                    <input type="password" name="confirmPassword" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-auth">Đăng Ký</button>
            </form>
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
        </div>
    );
};

export default Register;