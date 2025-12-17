import React from "react";

import Banner from "../components/banner/banner";
import HotDeals from "../components/product/HotDeals";
import NewProduct from "../components/product/NewProduct";

const Home = () => {
    return (
        <main>
            <Banner />
            <HotDeals />     {/* Sản phẩm giảm giá */}
            <NewProduct />   {/* Sản phẩm mới */}
        </main>
    );
};

export default Home;
