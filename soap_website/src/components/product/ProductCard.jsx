import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart } from '../../utils/cartUtils';
import { formatCurrency } from '../../utils/currencyUtils';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const defaultWeight = product.weight[0];

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
                <div className="product-image-wrapper">
                    <img src={product.img} alt={product.name} />
                </div>
                <h4>{product.name}</h4>
            </Link>
            <p className="price">
                <span className="new">
                    {formatCurrency(defaultWeight.price)}
                </span>
                {defaultWeight.oldPrice > 0 && (
                    <span className="old">
                        {formatCurrency(defaultWeight.oldPrice)}
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
