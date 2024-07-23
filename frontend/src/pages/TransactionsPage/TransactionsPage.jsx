import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NotConnected from '../../components/NotConnected/NotConnected';
import AccountTable from '../../components/AccountTable/AccountTable';
import './TransactionsPage.scss';
import EditTransactionModal from '../../components/EditTransactionModal/EditTransactionModal';
import SearchBar from '../../components/SearchBar/SearchBar';
import { setSearchValue, filterTransactions, setFilteredTransactionData } from '../../redux/features/transactionsSlice/transactionsSlice';

export default function TransactionsPage() {
    const stokedToken = localStorage.getItem('token');
    const authToken = useSelector((state) => state.auth.token);
    let token = stokedToken || authToken;

    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.transactions.searchValue);
    const transactionsData = useSelector((state) => state.transactions.transactionsData);
    const selectedTransaction = useSelector((state) => state.transactions.selectedTransaction);

    const handleEditClick = (transaction) => {
        dispatch({ type: 'transactions/setSelectedTransaction', payload: transaction });
    };

    const handleCloseModal = () => {
        dispatch({ type: 'transactions/setSelectedTransaction', payload: null });
    };

    const handleSearchChange = (value) => {
        dispatch(setSearchValue(value));
        if (value.length >= 3) {
            dispatch(filterTransactions());
        } else {
            dispatch(setFilteredTransactionData(transactionsData));
        }
    };

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
