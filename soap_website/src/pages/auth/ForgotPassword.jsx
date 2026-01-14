import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../assets/css/auth.css';

const API_URL = "https://69666b85f6de16bde44d599c.mockapi.io/users";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [foundUser, setFoundUser] = useState(null);
    const [email, setEmail] = useState('');
    const [passwordData, setPasswordData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleCheckEmail = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        fetch(`${API_URL}?email=${email}`)
            .then(res => res.json())
            .then(users => {
                if (users.length > 0) {
                    setFoundUser(users[0]);
                    setStep(2);
                    setMessage('Email hợp lệ. Vui lòng đặt lại mật khẩu mới.');
                } else {
                    setError('Email này chưa được đăng ký trong hệ thống!');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Lỗi kết nối Server.');
            });
    };

    const handleResetPassword = (e) => {
        e.preventDefault();

        if (passwordData.newPassword.length < 6) {
            setError("Mật khẩu phải có tối thiểu 6 ký tự.");
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError("Mật khẩu nhập lại không khớp!");
            return;
        }

        const updatedUser = {
            ...foundUser,
            password: passwordData.newPassword
        };

        fetch(`${API_URL}/${foundUser.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(res => {
                if (res.ok) {
                    alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
                    navigate("/login");
                } else {
                    setError("Có lỗi xảy ra khi cập nhật mật khẩu.");
                }
            })
            .catch(err => {
                console.error(err);
                setError("Lỗi kết nối Server khi cập nhật.");
            });
    };

    return (
        <div className="auth-container">
            <h2>{step === 1 ? "Quên Mật Khẩu" : "Đặt Lại Mật Khẩu"}</h2>

            {error && <p style={{color: 'red', marginBottom: '10px', textAlign: 'center'}}>{error}</p>}
            {message && <p style={{color: 'green', marginBottom: '10px', textAlign: 'center'}}>{message}</p>}

            {step === 1 ? (
                <form onSubmit={handleCheckEmail}>
                    <p style={{textAlign: 'center', marginBottom: '20px', fontSize: '14px', color: '#666'}}>
                        Nhập email đã đăng ký để tìm lại tài khoản của bạn.
                    </p>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            required
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn-auth">Tiếp tục</button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label>Mật khẩu mới:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            autoComplete="new-password"
                            required
                            placeholder="Nhập mật khẩu mới"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Nhập lại mật khẩu:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            autoComplete="new-password"
                            required
                            placeholder="Xác nhận mật khẩu mới"
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="submit" className="btn-auth">Đổi Mật Khẩu</button>

                    <button
                        type="button"
                        onClick={() => {setStep(1); setError('');}}
                        style={{
                            width: '100%', padding: '10px', marginTop: '10px',
                            background: '#ccc', border: 'none', borderRadius: '4px', cursor: 'pointer'
                        }}
                    >
                        Quay lại
                    </button>
                </form>
            )}

            <p style={{marginTop: '15px'}}>
                Quay lại trang <Link to="/login">Đăng nhập</Link>
            </p>
        </div>
    );
};

export default ForgotPassword;