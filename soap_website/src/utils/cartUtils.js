export const addToCart = (product, selectedWeight, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem("cart_guest")) || [];

    const key = `${product.id}_${selectedWeight.size}`;

    const exist = cart.find(item => item.key === key);

    if (exist) {
        exist.quantity += quantity;
    } else {
        cart.push({
            key: key,
            id: product.id,
            name: product.name,
            img: product.img,
            size: selectedWeight.size,
            price: selectedWeight.price,
            quantity: quantity
        });
    }

    localStorage.setItem("cart_guest", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
};

export const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart_guest")) || [];
    return cart.reduce((sum, item) => sum + item.quantity, 0);
};