import React from "react";
import productsData from "../../data/products.json";
import "./NewProduct.css";

const ProductNew = () => {
    const newProducts = productsData.filter((p) => p.isNew);

    return (
        <section className="product-new">
            <h2>SẢN PHẨM MỚI</h2>
            <div className="products-container">
                {newProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.img} alt={product.name} />
                        <h3>{product.name}</h3>
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
                        <button>Mua Ngay</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductNew;
