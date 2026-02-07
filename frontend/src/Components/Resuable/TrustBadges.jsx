import React from 'react';
import { ShieldCheck, CreditCard, Lock } from 'lucide-react';
import { Row, Col } from 'react-bootstrap';

const TrustBadges = () => {
    return (
        <div className="mt-4 pt-3 border-top">
            <h6 className="text-muted fw-bold mb-3 small text-uppercase spacing-1">We Accept</h6>
            <div className="d-flex gap-2 mb-4">
                {['Visa', 'Mastercard', 'UPI', 'Rupay'].map((method) => (
                    <div key={method} className="badge bg-light text-dark border px-3 py-2 rounded-2">
                        {method}
                    </div>
                ))}
            </div>

            <div className="d-flex flex-column gap-2 text-muted small">
                <div className="d-flex align-items-center gap-2">
                    <ShieldCheck size={16} className="text-success" />
                    <span>Purchase Protection</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <Lock size={16} className="text-success" />
                    <span>SSL Encrypted Payment</span>
                </div>
            </div>
        </div>
    );
};

export default TrustBadges;
