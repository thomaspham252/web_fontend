import React, { useEffect, useState } from 'react';
import '../assets/css/auth.css';
import UserInfo from '../components/personal_page/UserInfo';
import Orders from '../components/personal_page/Orders';

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

    return (
        <div className="container" style={{maxWidth: '1200px', margin: '30px auto', padding: '0 15px'}}>

            {/* Header Phần User */}
            <div style={{marginBottom: '30px'}}>
                <h1 style={{fontSize: '24px', textTransform: 'uppercase', marginBottom: '5px'}}>Xin Chào Quí Khách</h1>
                <p style={{fontSize: '16px', fontStyle: 'italic', color: '#666'}}>{user.name}</p>
            </div>


            <div style={{display: 'flex', flexWrap: 'wrap', gap: '30px'}}>

                {/* Cột Đơn hàng */}
                <div style={{flex: '2', minWidth: '300px'}}>
                    <Orders />
                </div>

                {/* Cột  Thông tin cá nhân */}
                <div style={{flex: '1', minWidth: '250px'}}>
                    <UserInfo user={user} />

                </div>

            </div>
        </div>
    );
};

export default User;