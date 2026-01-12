import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../utils/cartUtils';

const ProductCard = ({ product }) => {
    const defaultWeight = product.weight[0];
    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <img src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
            </Link>
            <p className="price">
                <span className="new">
                    {defaultWeight.price.toLocaleString()}₫
                </span>
                {defaultWeight.oldPrice > 0 && (
                    <span className="old">
                        {defaultWeight.oldPrice.toLocaleString()}₫
                    </span>
                )}
            </p>
            <button onClick={() => addToCart(product, defaultWeight, 1)}>
                Mua ngay
            </button>
        </div>
    );
};

export default ProductCard;
