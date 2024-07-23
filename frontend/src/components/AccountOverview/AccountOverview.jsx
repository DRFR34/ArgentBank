import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AccountOverview({ acctType, acctNumber, acctAmount }) {
    const navTo = useNavigate();
    const selectDescription = (acctType) => {
        if (acctType === 'Checking' || acctType === 'Savings') {
            return 'Available Balance';
        } else if (acctType === 'Credit Card') {
            return 'Current Balance';
        } else {
            return '';
        }
    }




    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank {acctType} (x{acctNumber})</h3>
                <p className="account-amount">${acctAmount}</p>
                <p className="account-amount-description">
                {selectDescription(acctType)}
                </p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button"
                    onClick={() => navTo('/transactions')}>
                        View transactions
                    </button>
            </div>
        </section>
    )
}
