import { Link } from "react-router-dom";

function Header() {
    return (
        <header style={{ padding: "10px", background: "#eee" }}>
            <h2>Soap Website</h2>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/cart">Cart</Link> |{" "}
                <Link to="/about">About</Link>
            </nav>
        </header>
    );
}

export default Header;
