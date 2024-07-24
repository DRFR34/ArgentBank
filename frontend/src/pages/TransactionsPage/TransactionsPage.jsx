import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotConnected from '../../components/NotConnected/NotConnected';
import AccountTable from '../../components/AccountTable/AccountTable';
import './TransactionsPage.scss';
import EditTransactionModal from '../../components/EditTransactionModal/EditTransactionModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setSearchValue, filterTransactions, setFilteredTransactionData } from '../../redux/features/transactionsSlice/transactionsSlice';
import PropTypes from 'prop-types';

/**
 * Dysplays the user's transactions of an account, for the current month.
 * 
 * @returns {JSX.Element} The TransactionsPage component.
 */
export default function TransactionsPage() {
    const stokedToken = localStorage.getItem('token');
    const authToken = useSelector((state) => state.auth.token);
    let token = stokedToken || authToken;

    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.transactions.searchValue);
    const transactionsData = useSelector((state) => state.transactions.transactionsData);
    const selectedTransaction = useSelector((state) => state.transactions.selectedTransaction);

    /**
     * Handles the edit button click for a transaction.
     * 
     * @param {Object} transaction - The transaction object to be edited.
     */
    const handleEditClick = (transaction) => {
        dispatch({ type: 'transactions/setSelectedTransaction', payload: transaction });
    };

    /**
     * Handles closing the edit transaction modal.
     */
    const handleCloseModal = () => {
        dispatch({ type: 'transactions/setSelectedTransaction', payload: null });
    };

    /**
     * Handles changing the search value.
     * 
     * @param {string} value - The new search value.
     */
    const handleSearchChange = (value) => {
        dispatch(setSearchValue(value));
        if (value.length >= 3) {
            dispatch(filterTransactions());
        } else {
            dispatch(setFilteredTransactionData(transactionsData));
        }
    };

    /**
     * Handles clicking the search button.
     */
    const handleSearchClick = () => {
        dispatch(filterTransactions());
    };

    useEffect(() => {
        if (searchValue.length >= 3) {
            dispatch(filterTransactions());
        }
    }, [searchValue, dispatch]);

    return (
        <main className="transacMain">
            {!token ? (
                <NotConnected />
            ) : (
                <>
                    <section className="transacHeader">
                        <h1 className='transacHeader__title'>Your latest transactions</h1>
                    </section>
                    <section>
                        <SearchBar 
                            searchValue={searchValue} 
                            setSearchValue={handleSearchChange} 
                            onSearchClick={handleSearchClick} 
                        />
                    </section>
                    <section className='tableContainer'>
                        <AccountTable onEditClick={handleEditClick} />
                    </section>
                    {selectedTransaction && (
                        <section>
                            <EditTransactionModal transaction={selectedTransaction} onClose={handleCloseModal} />
                        </section>
                    )}
                </>
            )}
        </main>
    );
}

TransactionsPage.propTypes = {
    stokedToken: PropTypes.string,
    authToken: PropTypes.string,
    token: PropTypes.string,
    searchValue: PropTypes.string,
    transactionsData: PropTypes.arrayOf(PropTypes.object),
    selectedTransaction: PropTypes.object,
    handleEditClick: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleSearchChange: PropTypes.func,
    handleSearchClick: PropTypes.func,
};
