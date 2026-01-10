import React from 'react';
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaAddressBook } from "react-icons/fa";
import './UserInfo.css';

const UserInfo = ({ user }) => {
    return (
        <div className="user-info-card">
            <h3 className="info-title">Thông tin khách hàng</h3>

            <div className="info-item">
                <FaUser className="info-icon" />
                <span>{user.name}</span>
            </div>

            <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>{user.address || "Chưa cập nhật địa chỉ"}</span>
            </div>

            <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <span>{user.phone || "Chưa cập nhật SĐT"}</span>
            </div>

            <button className="btn-address-book">
                <FaAddressBook style={{marginRight: '8px'}}/>
                SỔ ĐỊA CHỈ (1)
            </button>
        </div>
    );
};

export default UserInfo;