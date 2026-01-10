import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:3002/orders');
                if (!response.ok) {
                    throw new Error('Không thể tải danh sách đơn hàng');
                }
                const data = await response.json();

                setOrders(data.reverse());
            } catch (error) {
                console.error("Lỗi:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const parts = dateString.split(' ');
        return parts.length > 1 ? parts[1] : dateString; // Lấy giờ hoặc ngày tùy format
    };

    const getStatusText = (status) => {
        const statusMap = {
            'pending': 'Chờ xử lý',
            'completed': 'Hoàn thành',
            'cancelled': 'Đã hủy',
            'shipping': 'Đang giao'
        };
        return statusMap[status] || status;
    };

    if (isLoading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Đang tải dữ liệu...</div>;

    return (
        <div className="recent-orders-container">
            <h3 className="section-title">Đơn hàng gần nhất</h3>

            <table className="orders-table">
                <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày</th>
                    <th>Chuyển đến</th>
                    <th>Địa chỉ</th>
                    <th>Giá trị</th>
                    <th>TT Thanh toán</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <tr key={order.id}>
                            {/* Cắt ngắn ID cho gọn */}
                            <td>#{order.id.toString().substring(0, 6)}...</td>

                            <td>{formatDate(order.created_at)}</td>

                            <td>{order.customer_info?.fullName}</td>

                            <td>{order.customer_info?.address}</td>

                            <td>{formatCurrency(order.total)}</td>

                            <td>
                                <span className={order.status === 'pending' ? 'status-pending' : ''}>
                                    {getStatusText(order.status)}
                                </span>
                            </td>

                            <td>
                                <Link to={`/order/${order.id}`} className="detail-link">
                                    Chi tiết
                                </Link>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="7" style={{textAlign: 'center'}}>Chưa có đơn hàng nào</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default Orders;