import React from "react";
import productsData from "../../data/products.json";
import "./NewProduct.css";
import {Link} from "react-router-dom";
import {addToCart} from "../../utils/cartUtils";
const ProductNew = () => {
    const newProducts = productsData.filter((p) => p.isNew);

    return (
        <section className="product-new">
            <h2>SẢN PHẨM MỚI</h2>
            <div className="products-container">
                {newProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <Link to={`/products/${product.id}`}>
                            <img src={product.img} alt={product.name}/>
                            <h4>{product.name}</h4>
                        </Link>
                        <p className="price">
                            <span className="new">
                                {product.weight[0].price.toLocaleString()}₫
                            </span>
                            {product.oldPrice > 0 && (
                                <span className="old">
                                    {product.oldPrice.toLocaleString()}₫
                                </span>
                            )}
                        </p>
                        <button onClick={()=>addToCart(product,product.weight[0],1)}>Mua Ngay</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductNew;
