import React from "react";
import productsData from "../../data/products.json";
import "./HotDeals.css";
import {Link} from "react-router-dom";

const HotDeals = () => {
    const hotDeals = productsData.filter((p) => p.isHotDeal);

    return (
        <section className="hot-deals">
            <h2>HOT DEALS</h2>
            <div className="deals-container">
                {hotDeals.map((deal) => (
                    <div key={deal.id} className="deal-card">
                        <Link to={`/products/${deal.id}`}>
                            <img src={deal.img} alt={deal.name}/>
                            <h4>{deal.name}</h4>
                        </Link>
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
