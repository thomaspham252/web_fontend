import React from "react";
import { Link } from "react-router-dom";
import ContactForm from "../../components/form/ContactForm";
import '../../assets/css/ContactPage.css';
const ContactPage = () => {
    return (
        <div className="contact-page">
            <div className="breadcrumb">
                <Link to="/home">Trang chủ</Link> <span>/</span>
                <span className="current">Liên hệ</span>
            </div>
            <h1>Liên hệ với chúng tôi</h1>

            <div className="contact-container">

                <div className="contact-left">
                    <h2>GỬI THÔNG TIN</h2>
                    <p>
                        Vui lòng điền thông tin bên dưới, chúng tôi sẽ trả lời bạn trong thời gian sớm nhất.
                    </p>
                    <ContactForm />
                </div>

            </div>
        </div>
    );
};

export default ContactPage;
