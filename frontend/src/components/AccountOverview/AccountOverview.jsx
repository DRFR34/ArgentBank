import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AccountOverview.scss'

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
        <article className="account">
            <div className='account__textBox'>
                <h3 className="account__title">Argent Bank {acctType} (x{acctNumber})</h3>
                <p className="account__amount">${acctAmount}</p>
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
    )
}
