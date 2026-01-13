import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaAddressBook } from "react-icons/fa";
import './UserInfo.css';

const UserInfo = ({ user }) => {
    const navigate = useNavigate();

    const addressList = user?.list_addresses || [];

    const defaultData = (addressList.length > 0) ? addressList[0] : user;

    return (
        <div className="user-info-card">
            <h3 className="info-title">Thông tin khách hàng</h3>

            <div className="info-item">
                <FaUser className="info-icon" />
                <span>{defaultData?.name || user?.name || "Chưa cập nhật tên"}</span>
            </div>

            <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>{defaultData?.address || "Chưa cập nhật địa chỉ"}</span>
            </div>

            <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <span>{defaultData?.phone || "Chưa cập nhật SĐT"}</span>
            </div>

            <button
                className="btn-address-book"
                onClick={() => navigate('/user/addresses')}
            >
                <FaAddressBook style={{marginRight: '8px'}}/>
                {/* Hiển thị số lượng địa chỉ đang có */}
                SỔ ĐỊA CHỈ ({addressList.length})
            </button>
        </div>
    );
};

export default UserInfo;
// test