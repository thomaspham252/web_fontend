import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FaGoogle, FaFacebookF} from "react-icons/fa"; // Import thêm icon
import '../assets/css/auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    // Hàm xử lý đăng nhập thường
    const handleLogin = (e) => {
        e.preventDefault();

        // Tạo user giả lập từ form
        const user = {
            name: "Khách hàng thân thiết", // Tạm để tên cố định
            email: email,
            loginType: 'email'
        };

        saveUserAndRedirect(user);
    };

    // Hàm xử lý đăng nhập Social (Giả lập)
    const handleSocialLogin = (platform) => {
        // Giả lập dữ liệu mà Google/Facebook trả về
        let fakeUser = {};

        if (platform === 'google') {
            fakeUser = {
                name: "Người dùng Google",
                email: "google_user@gmail.com",
                loginType: 'google'
            };
        } else if (platform === 'facebook') {
            fakeUser = {
                name: "Người dùng Facebook",
                email: "fb_user@yahoo.com",
                loginType: 'facebook'
            };
        }

        alert(`Đang kết nối tới ${platform}... (Giả lập thành công)`);
        saveUserAndRedirect(fakeUser);
    };

    // Hàm chung để lưu và chuyển trang
    const saveUserAndRedirect = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));

        window.location.href = "/user";
    };

    return (
        <div className="auth-container">
            <h2>Đăng Nhập</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        required
                        placeholder="Nhập email của bạn"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Mật khẩu:</label>
                    <input type="password" required placeholder="Nhập mật khẩu"/>
                </div>
                <button type="submit" className="btn-auth">Đăng Nhập</button>
            </form>


            <div className="divider">
                <span>Hoặc đăng nhập bằng</span>
            </div>

            <div className="social-login">
                <button
                    type="button"
                    className="btn-social btn-google"
                    onClick={() => handleSocialLogin('google')}
                >
                    <FaGoogle/> Google
                </button>

                <button
                    type="button"
                    className="btn-social btn-facebook"
                    onClick={() => handleSocialLogin('facebook')}
                >
                    <FaFacebookF/> Facebook
                </button>
            </div>


            <p style={{marginTop: '20px'}}>
                Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
            </p>
        </div>
    );
};

export default Login;