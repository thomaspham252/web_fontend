import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';

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

        // Chuẩn hóa input
        const cleanEmail = formData.email.trim();
        const cleanName = formData.name.trim();

        // Validate client-side
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        // Check duplicate email (GET Request)
        fetch(`${API_URL}?email=${cleanEmail}`)
            .then(res => res.json())
            .then(existingUsers => {
                // MockAPI filter trả về mảng, check length > 0 là tồn tại
                if (existingUsers.length > 0) {
                    setError("Email này đã được sử dụng! Vui lòng chọn email khác.");
                } else {
                    // Payload tạo user mới
                    const newUser = {
                        name: cleanName,
                        email: cleanEmail,
                        password: formData.password,
                        phone: "",
                        address: "",
                        list_addresses: [],
                        loginType: 'email',
                        avatar: 'default.jpg',
                        role: 'user', // Default role
                        createdAt: new Date().toISOString()
                    };

                    // Create user (POST Request)
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
                                setError("Lỗi Server: Không thể tạo tài khoản.");
                            }
                        })
                        .catch(err => {
                            console.error("Post Error:", err);
                            setError("Lỗi kết nối khi tạo tài khoản.");
                        });
                }
            })
            .catch(err => {
                console.error("Check Email Error:", err);
                setError("Lỗi kết nối Server khi kiểm tra email.");
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