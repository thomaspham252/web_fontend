import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPen, FaMapMarkerAlt, FaCheckCircle, FaPlus } from "react-icons/fa";
import './AddressBook.css';

const API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/users";

const AddressBook = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(0);
    const [notification, setNotification] = useState(null);

    // API ĐỊA CHÍNH
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedWard, setSelectedWard] = useState("");
    const [specificAddress, setSpecificAddress] = useState("");

    const [contactInfo, setContactInfo] = useState({ name: '', phone: '' });

    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            let parsedUser = JSON.parse(storedUser);
            if (!parsedUser.list_addresses) {
                parsedUser.list_addresses = [];
            }
            setUser(parsedUser);
        } else {
            navigate("/login");
        }

        fetch('https://provinces.open-api.vn/api/?depth=1')
            .then(response => response.json())
            .then(data => setProvinces(data))
            .catch(err => console.error("Lỗi tải tỉnh thành:", err));
    }, [navigate]);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
        if (provinceCode) {
            fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then(res => res.json())
                .then(data => setDistricts(data.districts));
        } else { setDistricts([]); }
    };

    const handleDistrictChange = (e) => {
        const districtCode = e.target.value;
        setSelectedDistrict(districtCode);
        setSelectedWard("");
        if (districtCode) {
            fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(res => res.json())
                .then(data => setWards(data.wards));
        } else { setWards([]); }
    };

    const handleContactChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '');

            if (numericValue.length <= 10) {
                setContactInfo({ ...contactInfo, [name]: numericValue });
            }
        } else {
            setContactInfo({ ...contactInfo, [name]: value });
        }
    };

    const handleOpenEdit = (index) => {
        setEditIndex(index);
        const currentData = user.list_addresses && user.list_addresses[index];

        if (index === 0) {
            setContactInfo({
                name: user.name,
                phone: (currentData && currentData.phone) || user.phone || ''
            });
        } else {
            if (currentData) {
                setContactInfo({
                    name: currentData.name || '',
                    phone: currentData.phone || ''
                });
            } else {
                setContactInfo({ name: '', phone: '' });
            }
        }
        setSpecificAddress("");
        setSelectedProvince("");
        setSelectedDistrict("");
        setSelectedWard("");
        setWards([]);
        setIsEditing(true);
    };

    const showToast = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    const handleSave = () => {
        if (!user) return;

        const pName = provinces.find(p => p.code == selectedProvince)?.name || "";
        const dName = districts.find(d => d.code == selectedDistrict)?.name || "";
        const wName = wards.find(w => w.code == selectedWard)?.name || "";

        if (!pName || !dName || !wName || !specificAddress) {
            alert("Vui lòng chọn đầy đủ địa chỉ!");
            return;
        }

        if (!contactInfo.name.trim() || !contactInfo.phone.trim()) {
            alert("Vui lòng nhập tên và số điện thoại!");
            return;
        }

        if (contactInfo.phone.length > 10) {
            alert("Số điện thoại");
            return;
        }

        const fullAddress = `${specificAddress}, ${wName}, ${dName}, ${pName}`;
        const newAddressObj = {
            name: contactInfo.name,
            phone: contactInfo.phone,
            address: fullAddress
        };

        const updatedList = [...(user.list_addresses || [])];
        updatedList[editIndex] = newAddressObj;

        let updatedUser = { ...user, list_addresses: updatedList };

        if (editIndex === 0) {
            updatedUser.phone = contactInfo.phone;
            updatedUser.address = fullAddress;
        }

        fetch(`${API_URL}/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        })
            .then(res => {
                if (!res.ok) throw new Error("Lỗi lưu dữ liệu");
                return res.json();
            })
            .then(data => {
                sessionStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                setIsEditing(false);
                showToast("Lưu địa chỉ thành công!");
                window.dispatchEvent(new Event("userLogin"));
            })
            .catch(err => {
                console.error(err);
                alert("Có lỗi xảy ra khi kết nối tới máy chủ.");
            });
    };

    const getAddressData = (index) => {
        if (user && user.list_addresses && user.list_addresses[index]) {
            return user.list_addresses[index];
        }
        return null;
    };

    if (!user) return <div>Đang tải...</div>;

    return (
        <div className="address-book-container">
            {notification && (
                <div className="custom-toast">
                    <FaCheckCircle style={{marginRight: '10px', fontSize: '18px'}}/>
                    {notification}
                </div>
            )}

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
                            {getAddressData(editIndex) ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}
                        </h4>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>Họ và tên:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={contactInfo.name}
                                    onChange={handleContactChange}
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    disabled={editIndex === 0}
                                    title={editIndex === 0 ? "Tên mặc định theo tài khoản, không thể sửa" : ""}
                                    style={editIndex === 0 ? {backgroundColor: '#f0f0f0', cursor: 'not-allowed'} : {}}
                                />
                                {editIndex === 0 && <small style={{color: 'red', fontSize: '12px'}}>* Tên mặc định không thể thay đổi</small>}
                            </div>
                            <div className="form-group">
                                <label>Số điện thoại:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={contactInfo.phone}
                                    onChange={handleContactChange}
                                    placeholder=""
                                    maxLength={10}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Tỉnh / Thành phố:</label>
                            <select value={selectedProvince} onChange={handleProvinceChange} className="form-select">
                                <option value="">-- Chọn Tỉnh/Thành --</option>
                                {provinces.map(p => (<option key={p.code} value={p.code}>{p.name}</option>))}
                            </select>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>Quận / Huyện:</label>
                                <select value={selectedDistrict} onChange={handleDistrictChange} className="form-select" disabled={!selectedProvince}>
                                    <option value="">-- Chọn Quận/Huyện --</option>
                                    {districts.map(d => (<option key={d.code} value={d.code}>{d.name}</option>))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Phường / Xã:</label>
                                <select value={selectedWard} onChange={(e) => setSelectedWard(e.target.value)} className="form-select" disabled={!selectedDistrict}>
                                    <option value="">-- Chọn Phường/Xã --</option>
                                    {wards.map(w => (<option key={w.code} value={w.code}>{w.name}</option>))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Địa chỉ cụ thể:</label>
                            <input type="text" value={specificAddress} onChange={(e) => setSpecificAddress(e.target.value)} placeholder="Số nhà, tên đường, ấp/thôn..."/>
                        </div>

                        <div className="btn-group">
                            <button className="btn-save" onClick={handleSave}>LƯU THÔNG TIN</button>
                            <button className="btn-cancel" onClick={() => setIsEditing(false)}>TRỞ VỀ</button>
                        </div>
                    </div>
                ) : (
                    <div className="address-grid-layout">
                        {/* --- Ô MẶC ĐỊNH (INDEX 0) --- */}
                        {getAddressData(0) ? (
                            <div className="address-box filled">
                                <div className="box-header">
                                    <span className="badge-default">Mặc định</span>
                                    <button className="icon-btn" onClick={() => handleOpenEdit(0)}>
                                        <FaPen />
                                    </button>
                                </div>
                                <div className="box-content">
                                    <strong>{getAddressData(0).name}</strong>
                                    <p>{getAddressData(0).address}</p>
                                    <p>{getAddressData(0).phone}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="address-box empty">
                                <div className="box-header"><span className="badge-name">MẶC ĐỊNH</span></div>
                                <div className="box-content-empty">
                                    <FaMapMarkerAlt className="empty-icon"/>
                                    <p>Chưa thiết lập</p>
                                    <button className="btn-mini-add" onClick={() => handleOpenEdit(0)}><FaPlus /> Thêm</button>
                                </div>
                            </div>
                        )}

                        {/* --- Ô ĐỊA CHỈ KHÁC (INDEX 1) --- */}
                        {getAddressData(1) ? (
                            <div className="address-box filled">
                                <div className="box-header">
                                    <span className="badge-name">ĐỊA CHỈ KHÁC</span>
                                    <button className="icon-btn" onClick={() => handleOpenEdit(1)}>
                                        <FaPen />
                                    </button>
                                </div>
                                <div className="box-content">
                                    <strong>{getAddressData(1).name}</strong>
                                    <p>{getAddressData(1).address}</p>
                                    <p>{getAddressData(1).phone}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="address-box empty">
                                <div className="box-header"><span className="badge-name">ĐỊA CHỈ KHÁC</span></div>
                                <div className="box-content-empty">
                                    <FaMapMarkerAlt className="empty-icon"/>
                                    <p>Chưa thiết lập</p>
                                    <button className="btn-mini-add" onClick={() => handleOpenEdit(1)}><FaPlus /> Thêm</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddressBook;