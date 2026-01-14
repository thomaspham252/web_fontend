import React from "react";
import productsData from "../../data/products.json";
import "./NewProduct.css";
import ProductCard from "./ProductCard";

const ProductNew = () => {
    const newProducts = productsData.filter((p) => p.isNew);

    return (
        <section className="product-new">
            <h2>SẢN PHẨM MỚI</h2>
            <div className="products-container">
                {newProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductNew;
