import React, {useState} from "react";
import {useParams} from "react-router-dom";
import productsData from "../data/products.json";
import "../assets/css/ProductDetail.css";
import NewProduct from "../components/product/NewProduct";
const ProductDetail = () => {
    const {id} = useParams();
    const product = productsData.find(p => p.id === Number(id));
    const [selectedWeight, setSelectedWeight] = useState(product.weight[0]);
    const images = product.images?.length ? product.images : [product.img];

    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(images[0]);
    if (!product) {
        return <h2>Không tìm thấy sản phẩm</h2>;
    }

    return (
        <div className="product-detail-page">
            <div className="product-main">
                <div className="product-image">
                    <img src={mainImage} className="main-image" alt={product.name}/>
                    <div className="thumbnail-list">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt=""
                                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="prices">
                      <span className="new">
                        {selectedWeight.price.toLocaleString()}₫
                      </span>

                        {selectedWeight.oldPrice && (
                            <span className="old">
                        {selectedWeight.oldPrice.toLocaleString()}₫
                      </span>
                        )}
                    </p>

                    <p className="status">
                        <strong>Tình trạng:</strong> {product.status}
                    </p>
                    <h1>Xà phòng handmade {product.name} có công dụng gì? </h1>
                    <p className="description">{product.description}</p>
                    <div className="weight-select">
                        <span className="label">Chọn khối lượng:</span>
                        <div className="weight-options">
                            {product.weight.map((w, index) => (
                                <button
                                    key={w.size}
                                    className={`weight-btn ${
                                        selectedWeight.size === w.size ? "active" : ""
                                    }`}
                                    onClick={() => setSelectedWeight(w)}
                                >
                                    {w.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="quantity-wrapper">
                        <label className="quantity-label">Số lượng</label>
                        <div className="quantity-box">
                            <button className="qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}> −</button>
                            <input
                                className="qty-input"
                                type="text"
                                value={quantity}
                                readOnly
                            />
                            <button className="qty-btn"onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                    </div>


                    <button className="buy-now">
                        <span className="txt-main">MUA NGAY VỚI GIÁ {selectedWeight.price.toLocaleString()}₫</span>
                        <span className="txt-add">Đặt mua giao hàng tận nơi</span>
                    </button>
                </div>
            </div>

            <div className="product-detail-content">
                <h2>Thông tin sản phẩm</h2>
                <p><strong>Xuất xứ:</strong> {product.origin}</p>
                <p>
                    <strong>Khối lượng:</strong> {product.weight[0].size} –
                    Đóng gói bằng hộp giấy cao cấp không bọc nilon.
                </p>
                <p>
                    <strong>Thành phần:</strong><br/>
                    {product.ingredients}
                </p>
                <p>
                    <strong>Phương pháp sản xuất:</strong><br/>
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
            <NewProduct />
        </div>
    );
};

export default ProductDetail;
