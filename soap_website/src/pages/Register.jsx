import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/auth.css';
const API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/users";

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

        // Validate mật khẩu
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        // Bước 1: Kiểm tra xem email đã tồn tại trên MockAPI chưa
        fetch(`${API_URL}?email=${formData.email}`)
            .then(res => res.json())
            .then(existingUsers => {
                if (existingUsers.length > 0) {
                    setError("Email này đã được sử dụng! Vui lòng chọn email khác.");
                } else {
                    // Bước 2: Nếu chưa tồn tại, tạo user mới
                    const newUser = {
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                        phone: "",
                        address: "",
                        list_addresses: [],
                        loginType: 'email',
                        avatar: 'default.jpg'
                    };

                    // Gửi lệnh POST để lưu vào API
                    fetch(API_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(newUser)
                    })
                        .then(res => {
                            if (res.ok) {
                                alert("Đăng ký thành công! Vui lòng đăng nhập.");
                                navigate("/login");
                            } else {
                                setError("Có lỗi xảy ra khi tạo tài khoản.");
                            }
                        })
                        .catch(err => {
                            console.error(err);
                            setError("Lỗi kết nối Server.");
                        });
                }
            })
            .catch(err => {
                console.error(err);
                setError("Lỗi kiểm tra email.");
            });
    };

    return (
        <div className="auth-container">
            <h2>Đăng Ký Tài Khoản</h2>

            {error && <p style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</p>}

            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nguyễn Văn A"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@example.com"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Tối thiểu 6 ký tự"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder="Nhập lại mật khẩu trên"
                        onChange={handleChange}
                    />
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