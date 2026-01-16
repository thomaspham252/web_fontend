import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import productsData from "../../data/products.json";
import "../../assets/css/Products.css";
import ProductCard from "../../components/product/ProductCard";

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const selectedCategory = searchParams.get("category") || "all";
    const selectedPrice = searchParams.get("price") || "all";

    const productsPerPage = 8;

    const filteredProducts = useMemo(() => {
        return productsData.filter((p) => {
            const price = p.weight[0].price;
            const searchTerm = searchParams.get("search") || "";

            const matchCategory =
                selectedCategory === "all" || p.category === selectedCategory;

            let matchPrice = true;
            if (selectedPrice === "under100") matchPrice = price < 100000;
            else if (selectedPrice === "100-200") matchPrice = price >= 100000 && price <= 200000;
            else if (selectedPrice === "200-300") matchPrice = price > 200000 && price <= 300000;
            else if (selectedPrice === "300-500") matchPrice = price > 300000 && price <= 500000;

            const matchSearch = searchTerm === "" ||
                p.name.toLowerCase().includes(searchTerm.toLowerCase());

            return matchCategory && matchPrice && matchSearch;
        });
    }, [selectedCategory, selectedPrice, searchParams]);


    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const indexOfLast = currentPage * productsPerPage;
    const indexOfFirst = indexOfLast - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);


    const updateFilter = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    const handleCategoryChange = (cat) => updateFilter("category", cat);
    const handlePriceChange = (price) => updateFilter("price", price);
    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        setSearchParams(newParams);
    };

    return (
        <div className="products-page">
            <div className="breadcrumb">
                <Link to="/home">Trang chủ</Link> <span>/</span>
                <span className="current">Sản phẩm</span>
            </div>
            <aside className="sidebar">
                <h3>Danh mục sản phẩm</h3>
                <ul>
                    {[
                        { id: "all", label: "Tất cả" },
                        { id: "tri-mun-khang-khuan", label: "Trị mụn & Kháng khuẩn" },
                        { id: "duong-sang-mo-tham", label: "Dưỡng sáng & Mờ thâm" },
                        { id: "duong-am-phuc-hoi", label: "Dưỡng ẩm & Phục hồi" },
                        { id: "tay-te-bao-chet", label: "Tẩy tế bào chết" },
                        { id: "thu-gian-spa", label: "Thư giãn & Spa" },
                    ].map((cat) => (
                        <li
                            key={cat.id}
                            className={selectedCategory === cat.id ? "active" : ""}
                            onClick={() => handleCategoryChange(cat.id)}
                        >
                            {cat.label}
                        </li>
                    ))}
                </ul>

                <h3>Theo giá</h3>
                <ul>
                    {[
                        { id: "all", label: "Tất cả" },
                        { id: "under100", label: "Dưới 100.000đ" },
                        { id: "100-200", label: "100.000đ - 200.000đ" },
                        { id: "200-300", label: "200.000đ - 300.000đ" },
                        { id: "300-500", label: "300.000đ - 500.000đ" },
                    ].map((price) => (
                        <li
                            key={price.id}
                            className={selectedPrice === price.id ? "active" : ""}
                            onClick={() => handlePriceChange(price.id)}
                        >
                            {price.label}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Products */}
            <section className="products-content">
                <h3>TẤT CẢ SẢN PHẨM</h3>
                <div style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}>
                    Tìm thấy {filteredProducts.length} sản phẩm
                </div>
                {filteredProducts.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>Không tìm thấy sản phẩm nào.</p>
                ) : (
                    <div className="products-grid">
                        {currentProducts.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            «
                        </button>

                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            »
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Products;
