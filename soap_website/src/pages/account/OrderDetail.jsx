import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import '../../assets/css/OrderDetail.css';

const OrderDetail = () => {
    const {id} = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetail = async () => {
            try {
                const response = await fetch(`https://69678c20bbe157c088b24c4f.mockapi.io/orders/orders/${id}`);

                if (!response.ok) {
                    throw new Error('Không tìm thấy đơn hàng!');
                }

                const data = await response.json();
                setOrder(data);
            } catch (err) {
                console.error("Lỗi:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetail();
    }, [id]);

    const getStatusText = (status) => {
        const statusMap = {
            'pending': 'Chờ xử lý',
            'shipping': 'Đang giao hàng',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy',
        };
        return statusMap[status] || status;
    };

    if (loading) return <div style={{padding: '50px', textAlign: 'center'}}>Đang tải chi tiết đơn hàng...</div>;
    if (error) return <div style={{padding: '50px', textAlign: 'center', color: 'red'}}>Lỗi: {error}</div>;
    if (!order) return null;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price || 0);
    };

    return (
        <div className="order-detail-container">
            <h1 className="page-title">CHI TIẾT ĐƠN HÀNG #{id.toString()}</h1>
            <p className="order-date">Ngày đặt: {order.created_at}</p>

            <div className="address-section">
                <div className="address-col">
                    <h3 className="col-title">THÔNG TIN NGƯỜI ĐẶT</h3>
                    <div className="user-info">
                        <p>Họ và tên: <b>{order.customer_info?.fullName}</b></p>
                        <p>Địa chỉ: {order.customer_info?.address}</p>
                        <p>Số điện thoại: {order.customer_info?.phone}</p>
                        <p>Email: {order.customer_info?.gmail}</p>
                    </div>
                </div>

                <div className="address-col">
                    <h3 className="col-title">THÔNG TIN THANH TOÁN</h3>
                    <p className="status-text">Phương thức: <b>
                        {order.payment_method === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản QR'}
                    </b></p>
                    <p className="status-text">
                        Trạng thái:
                        <span
                            className="status-highlight"
                            style={{
                                fontWeight: 'bold',
                                marginLeft: '8px'
                            }}
                        >
                            {getStatusText(order.status)}
                        </span>
                    </p>
                </div>
            </div>

            <table className="product-table">
                <thead>
                <tr>
                    <th style={{textAlign: 'left'}}>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th>Số lượng</th>
                    <th>Tạm tính</th>
                </tr>
                </thead>
                <tbody>
                {order.items && order.items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <div className="product-item-cell">
                                <img src={item.img} alt={item.name} className="product-thumb-small"/>
                                <div className="product-name-text">{item.name}</div>
                            </div>
                        </td>
                        <td className="text-center">{formatPrice(item.price)}</td>
                        <td className="text-center">x{item.quantity}</td>
                        <td className="text-right product-subtotal">
                            {formatPrice(item.price * item.quantity)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="order-summary">
                <div className="summary-row">
                    <span className="summary-label">Tổng tiền hàng:</span>
                    <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="summary-row">
                    <span className="summary-label">Phí vận chuyển:</span>
                    <span>{formatPrice(order.shipping_fee)}</span>
                </div>
                <div className="summary-row total">
                    <span className="summary-label">TỔNG CỘNG:</span>
                    <span className="amount">{formatPrice(order.total)}</span>
                </div>
            </div>

            <Link to="/home" className="btn-back">↩ Quay lại trang chủ</Link>
        </div>
    );
};

export default OrderDetail;