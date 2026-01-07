import React, { useState } from "react";
import './form.css';
const ContactForm = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form gửi đi:", form);
        alert("Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.");
        setForm({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-submit">
                <div className="row-form">
                    <div className="col-form-short form-input">
                        <div className="form-group">
                            <label>Họ và tên*</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Họ và tên"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-form-short form-input">
                        <div className="form-group">
                            <label>Email*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="col-form-long form-input">
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Số điện thoại"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-form-long form-input">
                        <div className="form-group">
                            <label>Nội dung*</label>
                            <textarea
                                name="message"
                                placeholder="Nội dung"
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="submit-wrap">
                <button type="submit" className="btn-submit">
                    GỬI TIN NHẮN
                </button>
            </div>

        </form>
    );
};

export default ContactForm;