import React, { useEffect, useState } from "react";
import CartView from "./CartView";

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("cart_guest")) || [];
        const formattedData = storedData.map(item => ({
            ...item,
            isChecked: item.isChecked ?? false,
        }));
        setCart(formattedData);
    }, []);

    const saveCart = (newCart) => {
        setCart(newCart);
        localStorage.setItem("cart_guest", JSON.stringify(newCart));
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleUpdateQuantity = (key, delta) => {
        const newCart = cart.map((item) => {
            if (item.key === key) {
                const newQty = item.quantity + delta;
                return { ...item, quantity: newQty > 0 ? newQty : 1 };
            }
            return item;
        });
        saveCart(newCart);
    };

    const handleRemove = (key) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này ra khỏi giỏ hàng?")) {
            const newCart = cart.filter((i) => i.key !== key);
            saveCart(newCart);
        }
    };

    const handleCheckItem = (key) => {
        const newCart = cart.map((item) =>
            item.key === key ? { ...item, isChecked: !item.isChecked } : item
        );
        saveCart(newCart);
    };

    const handleCheckAll = (e) => {
        const isChecked = e.target.checked;
        const newCart = cart.map((item) => ({ ...item, isChecked: isChecked }));
        saveCart(newCart);
    };

    const handleRemoveSelected = () => {
        if (window.confirm("Xóa các sản phẩm đã chọn?")) {
            const newCart = cart.filter((item) => !item.isChecked);
            saveCart(newCart);
        }
    };

    const handleCheckout = () => {
        const hasItem = cart.some(item => item.isChecked);
        if (hasItem) {
            window.location.href = "/payment";
        }
    };

    const selectedItems = cart.filter(item => item.isChecked);
    const totalCount = selectedItems.length;
    const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const isAllChecked = cart.length > 0 && cart.every(item => item.isChecked);

    return (
        <CartView
            cart={cart}
            isAllChecked={isAllChecked}
            totalCount={totalCount}
            totalPrice={totalPrice}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemove}
            onCheckItem={handleCheckItem}
            onCheckAll={handleCheckAll}
            onRemoveSelected={handleRemoveSelected}
            onCheckout={handleCheckout}
        />
    );
};

export default Cart;