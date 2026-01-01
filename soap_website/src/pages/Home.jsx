import React from "react";

import Banner from "../components/banner/banner";
import HotDeals from "../components/product/HotDeals";
// import ProductCategory from "../components/ProductCategory";
// import NewProducts from "../components/NewProducts";
// import BrandIntro from "../components/BrandIntro";
// import BlogSection from "../components/BlogSection";

const Home = () => {
    return (
        <div>
            <main>
                <Banner />       {/* Banner lớn */}
                <HotDeals />     {/* Sản phẩm giảm giá */}
                {/*<ProductCategory /> /!* Danh mục sản phẩm *!/*/}
                {/*<NewProducts />  /!* Sản phẩm mới *!/*/}
                {/*<BrandIntro />   /!* Giới thiệu thương hiệu *!/*/}
                {/*<BlogSection />  /!* Bài viết *!/*/}
            </main>
        </div>
    );
};

export default Home;
