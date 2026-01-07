import React, {useEffect, useState} from "react";
import "../assets/css/Cart.css";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cart_guest")) || [];
        setCart(data);
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart_guest", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated")); // update header badge
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("vi-VN").format(amount) + "₫";
    };

    const increase = (key) => {
        const newCart = cart.map((i) =>
            i.key === key ? {...i, quantity: i.quantity + 1} : i
        );
        saveCart(newCart);
    };

    const decrease = (key) => {
        const newCart = cart.map((i) =>
            i.key === key && i.quantity > 1
                ? {...i, quantity: i.quantity - 1}
                : i
        );
        saveCart(newCart);
    };

    const handleRemove = (key) => {
        const newCart = cart.filter((i) => i.key !== key);
        saveCart(newCart);
    };

    const totalQty = cart.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <div className="cart-container">
            <h1 className="cart-title">
                GIỎ HÀNG <span className="cart-count">({totalQty} sản phẩm)</span>
            </h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.length === 0 && (
                        <p style={{padding: 20}}>Giỏ hàng đang trống.</p>
                    )}

                    {cart.map((item) => (
                        <div className="cart-item" key={item.key}>
                            <div className="item-image">
                                <img src={item.img} alt={item.name}/>
                            </div>

                            <div className="item-details">
                                <h3 className="item-name">{item.name}</h3>
                                <button
                                    className="btn-remove"
                                    onClick={() => handleRemove(item.key)}
                                >
                                    Xóa
                                </button>
                            </div>

                            <div className="item-price">
                                {formatCurrency(item.price)}
                            </div>

                            <div className="item-quantity">
                                <div className="quantity-control">
                                    <button onClick={() => decrease(item.key)}>
                                        −
                                    </button>
                                    <input value={item.quantity} readOnly/>
                                    <button onClick={() => increase(item.key)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="summary-row">
                        <span>Tạm tính:</span>
                        <span className="summary-value">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row total-row">
                        <span>Thành tiền:</span>
                        <span className="summary-total">
                            {formatCurrency(totalPrice)}
                        </span>
                    </div>

                    <div className="cart-actions">
                        <button className="btn-checkout"
                                onClick={() => (window.location.href = "/payment")}
                        >THANH TOÁN NGAY</button>
                        <button
                            className="btn-continue"
                            onClick={() => (window.location.href = "/products")}
                        >
                            TIẾP TỤC MUA HÀNG
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;