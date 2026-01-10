import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaPen, FaMapMarkerAlt } from "react-icons/fa";
import './AddressBook.css';

const AddressBook = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editMode, setEditMode] = useState('edit');

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        } else {
            navigate("/login");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickEdit = () => {
        setEditMode('edit');
        setFormData({
            name: user.name || '',
            address: user.address || '',
            phone: user.phone || ''
        });
        setIsEditing(true);
    };

    const handleClickAdd = () => {
        setEditMode('add');
        setFormData({
            name: '',
            address: '',
            phone: ''
        });
        setIsEditing(true);
    };

    const handleSave = () => {
        if (!user) return;

        const updatedUser = { ...user, ...formData };
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
        alert(editMode === 'edit' ? "Cập nhật thành công!" : "Thêm địa chỉ mới thành công!");
    };

    if (!user) return <div>Đang tải...</div>;

    return (
        <div className="address-book-container">

            {!isEditing && (
                <div className="top-nav">
                    <Link to="/user" className="back-link">
                        <FaArrowLeft style={{ marginRight: '8px' }} />
                        Quay lại trang thông tin tài khoản
                    </Link>
                </div>
            )}

            <h2 className="page-title">ĐỊA CHỈ CỦA BẠN</h2>

            <div className="address-content">
                {isEditing ? (
                    <div className="edit-form">
                        <h4 style={{marginBottom: '20px', textTransform: 'uppercase', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
                            {editMode === 'edit' ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                        </h4>

                        <div className="form-group">
                            <label>Họ và tên người nhận:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ví dụ: Nguyễn Văn A"
                            />
                        </div>

                        <div className="form-group">
                            <label>Số điện thoại:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="Nhập số điện thoại liên hệ"
                            />
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ nhận hàng:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Số nhà, đường, phường/xã..."
                            />
                        </div>

                        <div className="btn-group">
                            <button className="btn-save" onClick={handleSave}>LƯU THÔNG TIN</button>
                            <button className="btn-cancel" onClick={() => setIsEditing(false)}>TRỞ VỀ</button>
                        </div>
                    </div>
                ) : (
                    <div className="address-grid-layout">
                        <div className="address-box filled">
                            <div className="box-header">
                                <span className="badge-default">Mặc định</span>
                                <button className="icon-btn" onClick={handleClickEdit}>
                                    <FaPen />
                                </button>
                            </div>
                            <div className="box-content">
                                <strong>{user.name}</strong>
                                <p>{user.address || "Chưa cập nhật địa chỉ"}</p>
                                <p>{user.phone || "Chưa cập nhật SĐT"}</p>
                            </div>
                        </div>

                        <div className="address-box empty">
                            <div className="box-header">
                                <span className="badge-name">ĐỊA CHỈ 1</span>
                            </div>
                            <div className="box-content-empty">
                                <FaMapMarkerAlt className="empty-icon"/>
                                <p>Chưa thiết lập</p>
                                <button className="btn-mini-add" onClick={handleClickAdd}>
                                    <FaPlus /> Thêm
                                </button>
                            </div>
                        </div>

                        <div className="address-box empty">
                            <div className="box-header">
                                <span className="badge-name">ĐỊA CHỈ 2</span>
                            </div>
                            <div className="box-content-empty">
                                <FaMapMarkerAlt className="empty-icon"/>
                                <p>Chưa thiết lập</p>
                                <button className="btn-mini-add" onClick={handleClickAdd}>
                                    <FaPlus /> Thêm
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressBook;