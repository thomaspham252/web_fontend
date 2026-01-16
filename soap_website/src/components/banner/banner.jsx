import React, { useState, useEffect } from "react";
import "./banner.css";
import banner1 from '../../assets/image/banner-soap3.jpg';
import banner2 from '../../assets/image/background-tet.jpg';
import banner3 from '../../assets/image/bgTet.jpg';

const images = [
    banner1,
    banner2,
    banner3
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="banner-container">
            <div
                className="banner-slider"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, index) => (
                    <div className="slide" key={index}>
                        <img src={img} alt={`Banner ${index + 1}`} className="banner-img" />
                    </div>
                ))}
            </div>

            <div className="banner-dots">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Banner;