import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/Payment.css';
import qrCodeImg from '../../assets/image/qr.jpg';
import { FaMapMarkerAlt, FaCheckCircle, FaPen } from "react-icons/fa";

// LINK MOCKAPI
const ORDER_API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/orders";

const Payment = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        gmail: '',
        address: '',
        note: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cod');

    useEffect(() => {
        const userStr = sessionStorage.getItem("user");

        if (!userStr) {
            alert("Bạn cần đăng nhập để thanh toán!");
            navigate('/login');
            return;
        }

        const userObj = JSON.parse(userStr);
        setCurrentUser(userObj);

        // LOGIC LẤY DANH SÁCH ĐỊA CHỈ
        const addresses = userObj.list_addresses || [];
        setSavedAddresses(addresses);

        // Tự động điền
        if (addresses.length > 0) {
            const defaultAddr = addresses[0];
            setFormData({
                fullName: defaultAddr.name || userObj.name,
                phone: defaultAddr.phone || userObj.phone || '',
                gmail: userObj.email || '',
                address: defaultAddr.address || '',
                note: ''
            });
        } else {
            setFormData({
                fullName: userObj.name || '',
                phone: userObj.phone || '',
                gmail: userObj.email || '',
                address: userObj.address || '',
                note: ''
            });
        }

        const savedCart = JSON.parse(localStorage.getItem("cart_guest")) || [];
        setCartItems(savedCart);
    }, [navigate]);

    const handleSelectAddress = (index) => {
        setSelectedAddressIndex(index);
        const selectedAddr = savedAddresses[index];

        if (selectedAddr) {
            setFormData(prev => ({
                ...prev,
                fullName: selectedAddr.name,
                phone: selectedAddr.phone,
                address: selectedAddr.address
            }));
        }
    };

    const tempPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = 30000;
    const finalPrice = tempPrice + shippingFee;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCheckout = async () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            alert("Vui lòng điền đầy đủ thông tin giao hàng!");
            return;
        }

        const newOrder = {
            user_id: currentUser ? currentUser.id : "unknown",
            items: cartItems.map(item => ({
                product_id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                img: item.img
            })),
            subtotal: tempPrice,
            shipping_fee: shippingFee,
            total: finalPrice,
            created_at: new Date().toLocaleString("vi-VN"),
            status: "pending",
            customer_info: formData,
            payment_method: paymentMethod
        };

        try {
            const response = await fetch(ORDER_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newOrder),
            });

            if (response.ok) {
                alert("Đặt hàng thành công! Cảm ơn bạn đã mua sắm.");
                localStorage.removeItem("cart_guest");
                window.dispatchEvent(new Event("cartUpdated"));
                navigate('/home');
            } else {
                alert("Lỗi server: Không lưu được đơn hàng.");
            }
        } catch (error) {
            console.error("Lỗi:", error);
            alert("Lỗi kết nối server. Vui lòng thử lại sau.");
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-wrapper">

                <div className="main-content">
                    <div className="header">
                        <h1>Thanh toán</h1>
                    </div>

                    {/* HIỂN THỊ DANH SÁCH ĐỊA CHỈ */}
                    {savedAddresses.length > 0 && (
                        <div className="saved-addresses-section" style={{marginBottom: '20px'}}>
                            <h3 style={{fontSize: '16px', marginBottom: '10px', color: '#2F6A58'}}>
                                <FaMapMarkerAlt style={{marginRight:'5px'}}/> Chọn địa chỉ nhận hàng
                            </h3>
                            <div className="address-options" style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                                {savedAddresses.map((addr, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelectAddress(index)}
                                        style={{
                                            position: 'relative', // Quan trọng: làm mốc cho icon bút
                                            border: selectedAddressIndex === index ? '2px solid #2F6A58' : '1px solid #ddd',
                                            padding: '10px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            backgroundColor: selectedAddressIndex === index ? '#f0f9f4' : '#fff',
                                            flex: '1 1 45%',
                                            fontSize: '13px'
                                        }}
                                    >
                                        {/* ICON SỬA ĐỊA CHỈ */}
                                        <FaPen
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate('/user');
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                fontSize: '12px',
                                                color: '#666',
                                                padding: '2px'
                                            }}
                                            title="Chỉnh sửa địa chỉ này"
                                            onMouseOver={(e) => e.target.style.color = '#2F6A58'}
                                            onMouseOut={(e) => e.target.style.color = '#666'}
                                        />

                                        <div style={{fontWeight: 'bold', marginBottom: '3px', paddingRight: '20px'}}>
                                            {index === 0 ? "Mặc định: " : `Địa chỉ ${index}: `} {addr.name}
                                        </div>
                                        <div>{addr.phone}</div>
                                        <div style={{color: '#666', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                                            {addr.address}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="section-header">
                        <h2>Thông tin giao hàng</h2>
                    </div>

                    <form className="shipping-form">
                        <div className="form-group">
                            <label style={{fontSize: '12px', color:'#666', marginBottom:'4px', display:'block'}}>Họ và tên</label>
                            <input
                                type="text"
                                name="fullName"
                                className="form-control"
                                placeholder="Họ và tên"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{fontSize: '12px', color:'#666', marginBottom:'4px', display:'block'}}>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Số điện thoại"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label style={{fontSize: '12px', color:'#666', marginBottom:'4px', display:'block'}}>Email (để nhận thông báo)</label>
                            <input
                                type="text"
                                name="gmail"
                                className="form-control"
                                placeholder="Gmail"
                                value={formData.gmail}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="payment-methods-section">
                            <h2>Phương thức thanh toán</h2>
                            <div className="payment-options">
                                <label className={`payment-option ${paymentMethod === 'cod' ? 'active' : ''}`}>
                                    <div className="option-header">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={paymentMethod === 'cod'}
                                            onChange={handlePaymentChange}
                                        />
                                        <span className="option-label">Thanh toán khi nhận hàng (COD)</span>
                                    </div>
                                    {paymentMethod === 'cod' && (
                                        <div className="option-content">
                                            <p>Bạn chỉ phải thanh toán khi nhận được hàng.</p>
                                        </div>
                                    )}
                                </label>

                                <label className={`payment-option ${paymentMethod === 'banking' ? 'active' : ''}`}>
                                    <div className="option-header">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="banking"
                                            checked={paymentMethod === 'banking'}
                                            onChange={handlePaymentChange}
                                        />
                                        <span className="option-label">Chuyển khoản qua mã QR</span>
                                    </div>

                                    {paymentMethod === 'banking' && (
                                        <div className="option-content qr-content">
                                            <p>Vui lòng quét mã QR dưới đây để thanh toán:</p>
                                            <img
                                                src={qrCodeImg}
                                                alt="Mã QR Chuyển khoản"
                                                className="qr-image"
                                            />
                                            <div className="bank-note">
                                                <p>Nội dung chuyển khoản: <br/>
                                                    <b>{formData.fullName || "TEN"} {formData.phone || "SDT"}</b>
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div className="form-footer">
                            <button type="button" className="btn-continue" onClick={handleCheckout}>
                                {paymentMethod === 'cod' ? `Hoàn tất đơn hàng - ${formatCurrency(finalPrice)}` : 'Tôi đã chuyển khoản'}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="sidebar-content">
                    <div className="product-list">
                        {cartItems.length === 0 ? (
                            <p style={{ textAlign: 'center', color: '#666' }}>Chưa có sản phẩm nào</p>
                        ) : (
                            cartItems.map((item) => (
                                <div className="product-item" key={item.key || item.id}>
                                    <div className="product-image-wrapper">
                                        <div className="product-thumbnail">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <span className="product-qty">{item.quantity}</span>
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{item.name}</h3>
                                        <div className="product-price">
                                            {formatCurrency(item.price * item.quantity)}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="pricing-section">
                        <div className="price-row">
                            <span>Tạm tính</span>
                            <span>{formatCurrency(tempPrice)}</span>
                        </div>
                        <div className="price-row">
                            <span>Phí vận chuyển</span>
                            <span>{shippingFee === 0 ? "—" : formatCurrency(shippingFee)}</span>
                        </div>
                    </div>
                    <div className="total-section">
                        <span className="total-label">Tổng cộng</span>
                        <div className="total-value">
                            <span className="currency">VND</span>
                            <span className="amount">{formatCurrency(finalPrice)}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;