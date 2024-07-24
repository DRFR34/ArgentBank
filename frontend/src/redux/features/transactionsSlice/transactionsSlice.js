import { createSlice } from '@reduxjs/toolkit';
import sampleData from '../../../assets/data/accountTableSampleData.json';

/**
 * A slice for managing transactions state.
 * 
 * @type {Slice}
 * @param {string} name - The name of the slice.
 * @param {Object} initialState - The initial state of the slice.
 * @param {Array} initialState.transactionsData - The list of all transactions.
 * @param {Array} initialState.filteredTransactionData - The list of filtered transactions based on search value.
 * @param {string} initialState.searchValue - The current search value.
 * @param {Object||null} initialState.selectedTransaction - The currently selected transaction.
 * @param {Object} reducers - The reducer functions.
 */
const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactionsData: sampleData,
        filteredTransactionData: sampleData,
        searchValue: '',
        selectedTransaction: null,
    },
    reducers: {
        
        /**
         * Sets the transactions data.
         * 
         * Action type: 'transactions/setTransactionsData'
         * 
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Array} action.payload - The new transactions data.
         */
        setTransactionsData: (state, action) => {
            state.transactionsData = action.payload;
            state.filteredTransactionData = action.payload;
        },

        /**
         * Sets the filtered transactions data.
         * 
         * Action type: 'transactions/setFilteredTransactionData'
         * 
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Array} action.payload - The new filtered transactions data.
         */
        setFilteredTransactionData: (state, action) => {
            state.filteredTransactionData = action.payload;
        },

        /**
         * Sets the search value.
         * 
         * Action type: 'transactions/setSearchValue'
         * 
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {string} action.payload - The new search value.
         */
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },

        /**
         * Filters the transactions, based on the search value.
         * 
         * Action type: 'transactions/filterTransactions'
         * 
         * @param {Object} state - The current state.
         */
        filterTransactions: (state) => {
            state.filteredTransactionData = state.transactionsData.filter((transaction) =>
                Object.entries(transaction)
                    .filter(([key]) => key !== 'id') // ignore id value in the search
                    .some(([, value]) =>
                        value.toString().toLowerCase().includes(state.searchValue.toLowerCase())
                    )
            );
        },

        /**
         * Sets the selected transaction.
         * 
         * Action type: 'transactions/setSelectedTransaction'
         * 
         * @param {Object} state - The current state.
         * @param {Object} action - The action object.
         * @param {Object|null} action.payload - The selected transaction.
         */
        setSelectedTransaction: (state, action) => {
            state.selectedTransaction = action.payload;
        },
    },
});

export const { setTransactionsData, setFilteredTransactionData, setSearchValue, filterTransactions, setSelectedTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
