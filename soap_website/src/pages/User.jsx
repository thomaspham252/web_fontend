import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/auth.css';

const User = () => {
    const navigate = useNavigate();
    // Giả lập dữ liệu user
    const user = {
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        phone: "0901234567"
    };

    const handleLogout = () => {
        // Xử lý đăng xuất (xóa token, v.v.)
        alert("Đã đăng xuất!");
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <h2>Thông tin tài khoản</h2>
            <div className="user-info">
                <p><strong>Họ tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>SĐT:</strong> {user.phone}</p>
            </div>
            <button onClick={handleLogout} className="btn-logout">Đăng Xuất</button>
        </div>
    );
};

export default User;