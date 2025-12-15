import products from "../data/products";

function Home() {
    return (
        <div>
            <h2>Danh sách sản phẩm</h2>
            {products.map(p => (
                <div key={p.id}>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <p>{p.price} VND</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
