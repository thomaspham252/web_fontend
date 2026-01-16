import React from "react";
import productsData from "../../data/products.json";
import "./HotDeals.css";
import ProductCard from "./ProductCard";

const HotDeals = () => {
    const hotDeals = productsData.filter((p) => p.isHotDeal);

    return (
        <section className="hot-deals">
            <h2>HOT DEALS</h2>
            <div className="deals-container">
                {hotDeals.map((deal) => (
                    <ProductCard key={deal.id} product={deal} />
                ))}
            </div>
        </section>
    );
};

export default HotDeals;
