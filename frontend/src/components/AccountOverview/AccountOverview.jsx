import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './AccountOverview.scss';

/**
 * Displays an overview of a bank account.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.acctType - Type of the account (e.g., 'Checking', 'Savings', 'Credit Card').
 * @param {string} props.acctNumber - Last digits of the account number.
 * @param {number} props.acctAmount - Current balance of the account.
 * @returns {JSX.Element} The AccountOverview component.
 */
export default function AccountOverview({ acctType, acctNumber, acctAmount }) {
    const navTo = useNavigate();

    /**
     * Selects the appropriate description based on account type.
     * 
     * @param {string} acctType - Type of the account.
     * @returns {string} The description for the account type.
     */
    const selectDescription = (acctType) => {
        if (acctType === 'Checking' || acctType === 'Savings') {
            return 'Available Balance';
        } else if (acctType === 'Credit Card') {
            return 'Current Balance';
        } else {
            return '';
        }
    };

      /**
     * Formats the account amount to include commas as thousand separators.
     * 
     * @param {number} amount - The account amount.
     * @returns {string} The formatted account amount.
     */
    const formatAmount = (amount) => {
        return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    return (
        <article className="account">
            <div className='account__textBox'>
                <h3 className="account__title">Argent Bank {acctType} (x{acctNumber})</h3>
                <p className="account__amount">${formatAmount(acctAmount)}</p>
                <p className="account__description">
                    {selectDescription(acctType)}
                </p>
            </div>

            <div className='account__BtnBox'>
                <button className="account__BtnBox__Btn"
                    onClick={() => navTo('/transactions')}>
                    View transactions
                </button>
            </div>
        </article>
    );
}

AccountOverview.propTypes = {
    acctType: PropTypes.string.isRequired,
    acctNumber: PropTypes.number.isRequired,
    acctAmount: PropTypes.number.isRequired,
};
