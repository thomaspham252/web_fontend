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

        const cleanEmail = formData.email.trim();
        const cleanName = formData.name.trim();

        // 1. Kiểm tra mật khẩu khớp
        if (formData.password !== formData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        // 2.  KIỂM TRA ĐUÔI EMAIL
        if (!cleanEmail.toLowerCase().endsWith("@gmail.com")) {
            setError("Vui lòng sử dụng email có đuôi @gmail.com");
            return;
        }


        // 3. Fetch toàn bộ user về để kiểm tra trùng lặp
        fetch(API_URL)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Không thể kết nối đến danh sách User");
                }
                return res.json();
            })
            .then(users => {
                const isDuplicate = users.some(user => user.email === cleanEmail);

                if (isDuplicate) {
                    setError("Email này đã được sử dụng! Vui lòng chọn email khác.");
                } else {
                    // Tạo user mới
                    const newUser = {
                        name: cleanName,
                        email: cleanEmail,
                        password: formData.password,
                        phone: "",
                        address: "",
                        list_addresses: [],
                        loginType: 'email',
                        avatar: 'default.jpg',
                        role: 'user',
                        createdAt: new Date().toISOString()
                    };

                    // Gửi lệnh POST
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
                console.error("Fetch Error:", err); // Xem lỗi cụ thể ở Console (F12)
                setError("Lỗi kết nối Server khi tải dữ liệu.");
            });
    };

    return (
        <div className="auth-container">
            <h2>Đăng Ký Tài Khoản</h2>

            {error && <p style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</p>}

            <form onSubmit={handleRegister}>
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
                    <label>Họ tên:</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder=""
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
                <div className="form-group">
                    <label>Nhập lại mật khẩu:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        placeholder=""
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