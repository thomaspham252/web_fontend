import React from "react";
import productsData from "../../data/products.json";
import "./HotDeals.css";

const HotDeals = () => {
    const hotDeals = productsData.filter((p) => p.isHotDeal);

    return (
        <section className="hot-deals">
            <h2>HOT DEALS</h2>
            <div className="deals-container">
                {hotDeals.map((deal) => (
                    <div key={deal.id} className="deal-card">
                        <img src={deal.img} alt={deal.name}/>
                        <h3>{deal.name}</h3>
                        <p className="price">
                            <span className="new">{deal.weight[0].price.toLocaleString()}₫</span>
                            {deal.oldPrice > 0 && (
                                <span className="old">{deal.oldPrice.toLocaleString()}₫</span>
                            )}
                        </p>
                        <button>Mua Ngay</button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HotDeals;
