import React from "react";
import "../../assets/css/Cart.css";

const CartView = ({
                      cart,
                      isAllChecked,
                      totalCount,
                      totalPrice,

                      onCheckAll,
                      onCheckItem,
                      onUpdateQuantity,
                      onRemove,
                      onRemoveSelected,
                      onCheckout
                  }) => {

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN", { style: 'currency', currency: 'VND' }).format(amount);
    };

    return (
        <div className="cart-wrapper">
            <div className="cart-header">
                <div className="col-checkbox">
                    <input
                        type="checkbox"
                        checked={isAllChecked}
                        onChange={onCheckAll}
                    />
                </div>
                <div className="col-product">Sản Phẩm</div>
                <div className="col-category">Danh Mục</div>
                <div className="col-price">Đơn Giá</div>
                <div className="col-qty">Số Lượng</div>
                <div className="col-total">Số Tiền</div>
                <div className="col-action">Thao Tác</div>
            </div>

            <div className="cart-list">
                {cart.length === 0 ? (
                    <div className="empty-cart">Giỏ hàng trống</div>
                ) : (
                    cart.map((item) => (
                        <div className="cart-item-row" key={item.key}>
                            <div className="col-checkbox">
                                <input
                                    type="checkbox"
                                    checked={item.isChecked}
                                    onChange={() => onCheckItem(item.key)}
                                />
                            </div>

                            <div className="col-product">
                                <img src={item.img} alt={item.name} className="item-img" />
                                <span className="item-name" title={item.name}>{item.name}</span>
                            </div>

                            <div className="col-category">
                                <span className="category-tag">{item.category}</span>
                            </div>

                            <div className="col-price">
                                {formatCurrency(item.price)}
                            </div>

                            <div className="col-qty">
                                <div className="qty-control">
                                    <button onClick={() => onUpdateQuantity(item.key, -1)}>-</button>
                                    <input type="text" value={item.quantity} readOnly />
                                    <button onClick={() => onUpdateQuantity(item.key, 1)}>+</button>
                                </div>
                            </div>

                            <div className="col-total highlight-text">
                                {formatCurrency(item.price * item.quantity)}
                            </div>

                            <div className="col-action">
                                <button className="btn-delete" onClick={() => onRemove(item.key)}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="cart-footer">
                <div className="footer-left">
                    <div className="select-all-box">
                        <input
                            type="checkbox"
                            id="selectAllFooter"
                            checked={isAllChecked}
                            onChange={onCheckAll}
                        />
                        <label htmlFor="selectAllFooter">Chọn Tất Cả ({cart.length})</label>
                    </div>

                    <button
                        className="btn-delete-selected"
                        disabled={totalCount === 0}
                        onClick={onRemoveSelected}
                    >
                        Bỏ chọn tất cả mục đã chọn (Xóa)
                    </button>
                </div>

                <div className="footer-right">
                    <div className="total-info">
                        <span>Tổng thanh toán ({totalCount} sản phẩm): </span>
                        <span className="total-price-text">{formatCurrency(totalPrice)}</span>
                    </div>
                    <button
                        className={`btn-checkout ${totalCount === 0 ? 'disabled' : ''}`}
                        onClick={onCheckout}
                    >
                        Mua Hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartView;