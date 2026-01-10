import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaPhoneAlt, FaAddressBook } from "react-icons/fa";
import './UserInfo.css';

const UserInfo = ({ user }) => {
    const navigate = useNavigate();

    const defaultData = (user.list_addresses && user.list_addresses.length > 0)
        ? user.list_addresses[0]
        : user;

    return (
        <div className="user-info-card">
            <h3 className="info-title">Thông tin khách hàng</h3>

            <div className="info-item">
                <FaUser className="info-icon" />
                <span>{defaultData.name || user.name}</span>
            </div>

            <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <span>{defaultData.address || "Chưa cập nhật địa chỉ"}</span>
            </div>

            <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <span>{defaultData.phone || "Chưa cập nhật SĐT"}</span>
            </div>

            <button
                className="btn-address-book"
                onClick={() => navigate('/user/addresses')}
            >
                <FaAddressBook style={{marginRight: '8px'}}/>
                SỔ ĐỊA CHỈ
            </button>
        </div>
    );
};

export default UserInfo;