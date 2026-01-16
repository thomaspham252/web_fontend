import React from 'react';

const Voucher = ({
                     code,
                     onCodeChange,
                     onApply,
                     message,
                     isLoading
                 }) => {
    return (
        <div className="voucher-container">
            <div className="voucher-input-group">
                <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={code}
                    onChange={(e) => onCodeChange(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    className="btn-apply-voucher"
                    type="button"
                    onClick={onApply}
                    disabled={!code || isLoading}
                >
                    {isLoading ? "Đang kiểm tra..." : "Áp dụng"}
                </button>
            </div>

            {message && message.text && (
                <span className={`voucher-msg ${message.type}`}>
                    {message.text}
                </span>
            )}
        </div>
    );
};

export default Voucher;