import React from 'react';
import ordersData from '../../data/orders.json';
import './Orders.css';

const RecentOrders = () => {
    const orders = ordersData.orders;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const formatDate = (dateString) => {
        const parts = dateString.split(' ');
        return parts.length > 1 ? parts[1] : dateString;
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
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td>#{order.id.substring(0, 6)}</td>

                        <td>{formatDate(order.created_at)}</td>

                        <td>{order.customer_info.fullName}</td>

                        <td>{order.customer_info.address}</td>

                        <td>{formatCurrency(order.total)}</td>

                        <td>
                            <span className={order.status === 'pending' ? 'status-pending' : ''}>
                  {getStatusText(order.status)}
                </span>
                        </td>

                        <td>
                            <a href={`/order/${order.id}`} className="detail-link">
                                Chi tiết
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentOrders;