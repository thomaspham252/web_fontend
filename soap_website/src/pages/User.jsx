import React, {useEffect, useState} from 'react';
import '../assets/css/auth.css';

const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            window.location.href = "/login";
        }
    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");


        window.location.href = "/login";
    };

    if (!user) return <div style={{textAlign: "center", marginTop: "50px"}}>Đang xử lý...</div>;

    return (
        <div className="auth-container">
            <h2>Thông tin tài khoản</h2>
            <div className="user-info" style={{textAlign: 'left', margin: '20px 0'}}>
                <p><strong>Họ tên:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Loại tài khoản:</strong> {user.loginType === 'email' ? 'Thường' : user.loginType}</p>
            </div>

            <button onClick={handleLogout} className="btn-logout">
                Đăng Xuất
            </button>
        </div>
    );
};

export default User;