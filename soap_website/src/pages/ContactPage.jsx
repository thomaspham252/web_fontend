import React from "react";
import ContactForm from "../components/form/ContactForm";

const ContactPage = () => {
    return (
        <div className="contact-page">
            {/* Tiêu đề trang */}
            <h1>Liên hệ với chúng tôi</h1>

            {/* Grid hai cột */}
            <div className="contact-container">

                {/* Cột form liên hệ */}
                <div className="contact-left">
                    <h2>Gửi thông tin</h2>
                    <p>
                        Vui lòng điền thông tin bên dưới, chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.
                    </p>
                    <ContactForm />
                </div>

                {/* Cột thông tin & bản đồ */}
            </div>
        </div>
    );
};

export default ContactPage;
