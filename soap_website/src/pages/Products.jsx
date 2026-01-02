import React, { useState } from "react";
import { Link } from "react-router-dom";

import productsData from "../data/products.json";
import "../assets/css/Products.css";

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const totalPages = Math.ceil(productsData.length / productsPerPage);

    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = productsData.slice(indexOfFirst, indexOfLast);

    return (
        <div className="products-page">
            {/* Sidebar */}
            <aside className="sidebar">
                <h3>Danh mục sản phẩm</h3>
                <ul>
                    <li>Xà phòng thiên nhiên</li>
                    <li>Xà phòng dưỡng ẩm</li>
                    <li>Xà phòng trị mụn</li>
                </ul>

                <h3>Theo giá</h3>
                <ul>
                    <li>Dưới 100.000đ</li>
                    <li>100.000đ - 200.000đ</li>
                    <li>200.000đ - 300.000đ</li>
                    <li>300.000đ - 500.000đ</li>
                </ul>
            </aside>

            {/* Products */}
            <section className="products-content">
                <h3>TẤT CẢ SẢN PHẨM</h3>
                <div className="products-grid">
                    {currentProducts.map((p) => (
                        <div className="product-card" key={p.id}>
                            <Link to={`/products/${p.id}`}>
                                <img src={p.img} alt={p.name}/>
                                <h4>{p.name}</h4>
                            </Link>
                            <p className="price">
                                <span className="new">
                                    {p.weight[0].price.toLocaleString()}₫
                                </span>
                                {p.oldPrice > 0 && (
                                    <span className="old">
                                    {p.oldPrice.toLocaleString()}₫
                                     </span>
                                )}
                            </p>
                            <button>Mua ngay</button>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        «
                    </button>

                    {Array.from({length: totalPages}).map((_, i) => (
                        <button
                            key={i}
                            className={currentPage === i + 1 ? "active" : ""}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        »
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Products;
