import React, { useEffect, useState } from 'react';
import '../assets/css/auth.css';

const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.location.href = "/login";
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("user");
        window.location.href = "/login";
    };

    if (!user) return <div style={{textAlign: "center", marginTop: "50px"}}>Đang tải...</div>;


    const defaultAvatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    return (
        <div className="auth-container">
            <h2>Hồ sơ cá nhân</h2>

            <div style={{textAlign: 'center', margin: '20px 0'}}>
                <img
                    src={defaultAvatarUrl}
                    alt="Avatar"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #ddd'
                    }}
                />
            </div>

            <div className="user-info" style={{textAlign: 'left', margin: '20px 0'}}>
                <p><strong>Họ tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Loại tài khoản:</strong> {user.loginType === 'email' ? 'Thành viên' : user.loginType}</p>
            </div>

            <button onClick={handleLogout} className="btn-logout">
                Đăng Xuất
            </button>
        </div>
    );
};

export default User;