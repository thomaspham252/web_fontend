import React from 'react';
import "../../assets/css/about.css";

function About() {
    return (
        <div className="about-container">
            <div className="about-banner">
                <img src="/assets/image/about-us/banner.webp" alt="Giới thiệu" />
            </div>

            <h1 className="about-title">VỀ CHÚNG TÔI</h1>

            <section className="about-section">
                <p>
                    Trong hơn một thập kỷ qua, chúng tôi đã viết nên câu chuyện đầy cảm hứng về hành trình
                    mang tới giá trị tốt nhất cho khách hàng. Từ một niềm đam mê giản dị, thương hiệu đã
                    phát triển mạnh mẽ và trở thành lựa chọn uy tín trên thị trường, đem lại niềm tin và sự
                    hài lòng cho hàng ngàn khách hàng.
                </p>
            </section>

            <section className="about-section">
                <h2>Thương hiệu & Giá trị cốt lõi</h2>
                <p>
                    Chúng tôi cung cấp sản phẩm chất lượng cao kết hợp với dịch vụ tư vấn chuyên sâu, đặt
                    khách hàng làm trọng tâm trong mọi hoạt động. Sự hòa quyện giữa giá trị truyền thống và
                    công nghệ hiện đại giúp mỗi khách hàng tìm được trải nghiệm hoàn hảo.
                </p>
            </section>

            <section className="about-section">
                <h2>Dịch vụ / Sản phẩm nổi bật</h2>
                <ul>
                    <li>Dịch vụ tư vấn sản phẩm độc đáo</li>
                    <li>Sản phẩm đạt chuẩn chất lượng cao</li>
                    <li>Hệ thống chăm sóc khách hàng thân thiện & hiệu quả</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Tại sao chọn chúng tôi?</h2>
                <ul>
                    <li>Sản phẩm đạt chất lượng cao, kiểm định nghiêm ngặt</li>
                    <li>Đội ngũ nhân viên tư vấn giàu kinh nghiệm</li>
                    <li>Phản hồi tích cực từ khách hàng trên toàn quốc</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Liên hệ</h2>
                <p>
                    Nếu bạn có thắc mắc hoặc muốn tìm hiểu thêm, vui lòng liên hệ với chúng tôi để được hỗ
                    trợ chi tiết.
                </p>
            </section>
        </div>
    );


}
export default About;