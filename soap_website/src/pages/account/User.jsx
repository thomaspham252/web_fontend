import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';
import UserInfo from '../../components/personal_page/UserInfo';
import Orders from '../../components/personal_page/Orders';
// Link API
const API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/users";

const User = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // 1. Kiểm tra có đang đăng nhập không
        const storedUser = sessionStorage.getItem("user");

        if (storedUser) {
            const parsedSessionUser = JSON.parse(storedUser);
            // Hiển thị tạm dữ liệu cũ trong khi chờ tải mới (để ko bị trắng trang)
            setUser(parsedSessionUser);

            // 2. Gọi API lấy dữ liệu mới nhất từ Server (đồng bộ hóa)
            fetch(`${API_URL}/${parsedSessionUser.id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Không tải được dữ liệu");
                    return res.json();
                })
                .then(latestUserData => {
                    // Cập nhật State để hiển thị thông tin mới nhất
                    setUser(latestUserData);
                    // Cập nhật ngược lại vào Session để các trang khác dùng
                    sessionStorage.setItem("user", JSON.stringify(latestUserData));
                })
                .catch(err => {
                    console.error("Lỗi đồng bộ dữ liệu:", err);
                    // Nếu lỗi mạng, vẫn giữ nguyên dữ liệu cũ từ session
                });

        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleLogout = () => {
        // Xóa session và quay về đăng nhập
        sessionStorage.removeItem("user");
        navigate("/login");
    };

    if (!user) return <div style={{textAlign: "center", marginTop: "50px"}}>Đang tải thông tin...</div>;

    return (
        <div className="container" style={{maxWidth: '1200px', margin: '30px auto', padding: '0 15px'}}>

            {/* Header Phần User */}
            <div style={{marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <h1 style={{fontSize: '24px', textTransform: 'uppercase', marginBottom: '5px'}}>Xin Chào Quí Khách</h1>
                    <p style={{fontSize: '16px', fontStyle: 'italic', color: '#666'}}>{user.name}</p>
                </div>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: '8px 15px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    Đăng xuất
                </button>
            </div>

            <div style={{display: 'flex', flexWrap: 'wrap', gap: '30px'}}>
                {/* Cột Đơn hàng */}
                <div style={{flex: '2', minWidth: '300px'}}>
                    <Orders />
                </div>

                {/* Cột Thông tin cá nhân */}
                <div style={{flex: '1', minWidth: '250px'}}>
                    {/* Truyền user mới nhất vào UserInfo để hiển thị */}
                    <UserInfo user={user} />
                </div>
            </div>
        </div>
    );
};

export default User;