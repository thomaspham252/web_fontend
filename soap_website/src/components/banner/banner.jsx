import React  from "react";
import "./banner.css";
import bannerImg from '../../assets/image/banner-soap3.jpg';
const Banner = () => {
    return (
        <div className="banner-container">
            <img src={bannerImg} alt="Banner" className="banner-img" />
        </div>
    );
};

export default Banner;