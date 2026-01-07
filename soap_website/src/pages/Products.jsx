import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../utils/cartUtils";
import productsData from "../data/products.json";
import "../assets/css/Products.css";

const Products = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedPrice, setSelectedPrice] = useState("all");

    const productsPerPage = 8;
    const filteredProducts = useMemo(() => {
        return productsData.filter((p) => {
            const price = p.weight[0].price;

            const matchCategory =
                selectedCategory === "all" || p.category === selectedCategory;

            const matchPrice =
                selectedPrice === "all" ||
                (selectedPrice === "under100" && price < 100000) ||
                (selectedPrice === "100-200" && price >= 100000 && price <= 200000) ||
                (selectedPrice === "200-300" && price > 200000 && price <= 300000) ||
                (selectedPrice === "300-500" && price > 300000 && price <= 500000);

            return matchCategory && matchPrice;
        });
    }, [selectedCategory, selectedPrice]);
    //phân trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const handlePriceChange = (price) => {
        setSelectedPrice(price);
        setCurrentPage(1);
    };
    return (
        <div className="products-page">
            {/* Sidebar */}
            <aside className="sidebar">
                <h3>Danh mục sản phẩm</h3>
                <ul>
                    <li
                        className={selectedCategory === "all" ? "active" : ""}
                        onClick={() => handleCategoryChange("all")}
                    >
                        Tất cả
                    </li>
                    <li
                        className={selectedCategory === "xa-phong-thien-nhien" ? "active" : ""}
                        onClick={() => handleCategoryChange("xa-phong-thien-nhien")}
                    >
                        Xà phòng thiên nhiên
                    </li>
                    <li
                        className={selectedCategory === "duong-am" ? "active" : ""}
                        onClick={() => handleCategoryChange("duong-am")}
                    >
                        Xà phòng dưỡng ẩm
                    </li>
                    <li
                        className={selectedCategory === "tri-mun" ? "active" : ""}
                        onClick={() => handleCategoryChange("tri-mun")}
                    >
                        Xà phòng trị mụn
                    </li>
                </ul>

                <h3>Theo giá</h3>
                <ul>
                    <li
                        className={selectedPrice === "all" ? "active" : ""}
                        onClick={() => handlePriceChange("all")}
                    >
                        Tất cả
                    </li>
                    <li
                        className={selectedPrice === "under100" ? "active" : ""}
                        onClick={() => handlePriceChange("under100")}
                    >
                        Dưới 100.000đ
                    </li>
                    <li
                        className={selectedPrice === "100-200" ? "active" : ""}
                        onClick={() => handlePriceChange("100-200")}
                    >
                        100.000đ - 200.000đ
                    </li>
                    <li
                        className={selectedPrice === "200-300" ? "active" : ""}
                        onClick={() => handlePriceChange("200-300")}
                    >
                        200.000đ - 300.000đ
                    </li>
                    <li
                        className={selectedPrice === "300-500" ? "active" : ""}
                        onClick={() => handlePriceChange("300-500")}
                    >
                        300.000đ - 500.000đ
                    </li>
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
                            <button onClick={() => addToCart(p, p.weight[0], 1)}>
                                Mua ngay
                            </button>
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
