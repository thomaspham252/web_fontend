import React, { useState,useEffect  } from "react";
import { useParams, Link } from "react-router-dom";
import productsData from "../../data/products.json";
import "../../assets/css/ProductDetail.css";
import NewProduct from "../../components/product/NewProduct";
import { addToCart } from "../../utils/cartUtils";
import { formatCurrency } from "../../utils/currencyUtils";

const ProductDetail = () => {
    const { id } = useParams();
    const product = productsData.find(p => p.id === Number(id));

    const [selectedWeight, setSelectedWeight] = useState(product ? product.weight[0] : null);
    const [quantity, setQuantity] = useState(1);

    const defaultImage = product ? (product.images?.length ? product.images[0] : product.img) : "";
    const [mainImage, setMainImage] = useState(defaultImage);

    useEffect(() => {
        if (product) {
            const img = product.images?.length
                ? product.images[0]
                : product.img;

            setMainImage(img);
            setSelectedWeight(product.weight[0]);
            setQuantity(1);
        }
    }, [id, product]);

    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "50px 20px" }}>
                <h2>Không tìm thấy sản phẩm</h2>
                <p>Sản phẩm bạn tìm kiếm có thể đã bị xóa hoặc đường dẫn không đúng.</p>
                <Link to="/products" className="btn-back">Quay lại danh sách sản phẩm</Link>
            </div>
        );
    }

    const images = product.images?.length ? product.images : [product.img];

    return (
        <div className="product-detail-page">
            <div className="product-main">
                <div className="product-image">
                    <img src={mainImage} className="main-image" alt={product.name} />
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
                            {formatCurrency(selectedWeight.price)}
                        </span>

                        {selectedWeight.oldPrice > 0 && (
                            <span className="old">
                                {formatCurrency(selectedWeight.oldPrice)}
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
                                    className={`weight-btn ${selectedWeight.size === w.size ? "active" : ""
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
                            <button className="qty-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                    </div>


                    <button
                        className="buy-now"
                        onClick={() => addToCart(product, selectedWeight, quantity)}
                    >
                        <span className="txt-main">MUA NGAY VỚI GIÁ {formatCurrency(selectedWeight.price)}</span>
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
            <NewProduct />
        </div>
    );
};

export default ProductDetail;
