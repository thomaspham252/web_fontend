import React, { useState } from "react";

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
            <div className="form-group">
                <label>Họ & Tên</label>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Số điện thoại</label>
                <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Nội dung</label>
                <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    required
                ></textarea>
            </div>

            <button type="submit">Gửi</button>
        </form>
    );
};

export default ContactForm;