import React, {useState} from 'react';
import '../assets/css/Payment.css';
import qrCodeImg from '../assets/image/qr.jpg';

const Payment = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        gmail: '',
        address: '',
        discountCode: ''
    });

    // State quản lý phương thức thanh toán (Mặc định là COD)
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    // Hàm xử lý khi thay đổi phương thức thanh toán
    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="payment-container">
            <div className="payment-wrapper">

                {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
                <div className="main-content">
                    <div className="header">
                        <h1>Thanh toán</h1>
                    </div>

                    <div className="section-header">
                        <h2>Thông tin giao hàng</h2>
                    </div>

                    <form className="shipping-form">
                        <div className="form-group">
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
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Số điện thoại"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="gmail"
                                className="form-control"
                                placeholder="Gmail"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Địa chỉ"
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* --- PHƯƠNG THỨC THANH TOÁN --- */}
                        <div className="payment-methods-section">
                            <h2>Phương thức thanh toán</h2>
                            <div className="payment-options">

                                {/* Method 1: Ship COD */}
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

                                {/* Method 2: Chuyển khoản QR */}
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

                                    {/* Hiển thị mã QR nếu chọn banking */}
                                    {paymentMethod === 'banking' && (
                                        <div className="option-content qr-content">
                                            <p>Vui lòng quét mã QR dưới đây để thanh toán:</p>
                                            <img
                                                src={qrCodeImg}
                                                alt="Mã QR Chuyển khoản"
                                                className="qr-image"
                                            />
                                            <div className="bank-note">
                                                <p>Nội dung chuyển khoản: <b>HỌ TÊN + SĐT</b></p>
                                            </div>
                                        </div>
                                    )}
                                </label>

                            </div>
                        </div>
                        {/* --- KẾT THÚC PHẦN PHƯƠNG THỨC THANH TOÁN --- */}

                        <div className="form-footer">
                            <button type="button" className="btn-continue">
                                {paymentMethod === 'cod' ? 'Hoàn tất đơn hàng' : 'Đã chuyển khoản'}
                            </button>
                        </div>
                    </form>
                </div>
                {/* --- CỘT PHẢI (SIDEBAR - GIỎ HÀNG) --- */}
                <div className="sidebar-content">
                    <div className="product-list">

                        {/* SẢN PHẨM MẪU (Dữ liệu tĩnh) */}
                        <div className="product-item">
                            {/* Khung ảnh + Số lượng */}
                            <div className="product-image-wrapper">
                                <div className="product-thumbnail">
                                    {/* Thay link ảnh thật của bạn vào src bên dưới */}
                                    <img src="https://placehold.co/150x200/1a4d2e/fff?text=Book" alt="Sách Aroma"/>
                                </div>
                                {/* Số lượng nằm đè lên góc */}
                                <span className="product-qty">1</span>
                            </div>

                            {/* Tên + Giá */}
                            <div className="product-info">
                                <h3 className="product-name">Sách Aromarketing – Marketing Hương Thơm (Tập 1)</h3>
                                <div className="product-price">180,000₫</div>
                            </div>
                        </div>
                        {/* HẾT SẢN PHẨM MẪU */}

                    </div>

                    {/* Phần tính tiền (Tĩnh) */}
                    <div className="pricing-section">
                        <div className="price-row">
                            <span>Tạm tính</span>
                            <span>180,000₫</span>
                        </div>
                        <div className="price-row">
                            <span>Phí vận chuyển</span>
                            <span>—</span>
                        </div>
                    </div>

                    <div className="total-section">
                        <span className="total-label">Tổng cộng</span>
                        <div className="total-value">
                            <span className="currency">VND</span>
                            <span className="amount">180,000₫</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Payment;