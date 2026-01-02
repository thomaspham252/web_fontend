import React, { useState } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import "../assets/css/ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === Number(id));

    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <h2>Không tìm thấy sản phẩm</h2>;
    }

    return (
        <div className="product-detail-page">

            {/* ===== PHẦN TRÊN ===== */}
            <div className="product-main">
                {/* LEFT: IMAGE */}
                <div className="product-image">
                    <img src={product.img} alt={product.name} />
                </div>

                {/* RIGHT: INFO */}
                <div className="product-info">
                    <h1>{product.name}</h1>

                    <p className="price">
            <span className="new">
              {product.weight[0].price.toLocaleString()}₫
            </span>
                        <span className="old">
              {product.oldPrice.toLocaleString()}₫
            </span>
                    </p>

                    <p className="status">
                        <strong>Tình trạng:</strong> {product.status}
                    </p>

                    <p className="description">{product.description}</p>

                    {/* QUANTITY */}
                    <div className="quantity">
                        <span>Số lượng:</span>
                        <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>

                    <button className="buy-now">MUA NGAY</button>
                </div>
            </div>

            {/* ===== PHẦN DƯỚI (CUỘN 1 CỘT) ===== */}
            <div className="product-detail-content">

                <h2>Thông tin sản phẩm</h2>
                <p><strong>Xuất xứ:</strong> {product.origin}</p>

                <p>
                    <strong>Khối lượng:</strong> {product.weight[0].size} –
                    Đóng gói bằng hộp giấy cao cấp không bọc nilon.
                </p>

                <p>
                    <strong>Thành phần:</strong><br />
                    {product.ingredients}
                </p>

                <p>
                    <strong>Phương pháp sản xuất:</strong><br />
                    {product.productionMethod}
                </p>

                <h2>Cách sử dụng xà phòng</h2>
                <ul>
                    {product.usage.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ul>

                <h2>Lưu ý khi sử dụng</h2>
                <ul>
                    {product.note.map((n, index) => (
                        <li key={index}>{n}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
};

export default ProductDetail;
