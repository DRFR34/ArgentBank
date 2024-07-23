import { createSlice } from '@reduxjs/toolkit';
import sampleData from '../../../assets/data/accountTableSampleData.json';

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        transactionsData: sampleData,
        filteredTransactionData: sampleData,
        searchValue: '',
        selectedTransaction: null,
    },
    reducers: {
        setTransactionsData: (state, action) => {
            state.transactionsData = action.payload;
            state.filteredTransactionData = action.payload;
        },
        setFilteredTransactionData: (state, action) => {
            state.filteredTransactionData = action.payload;
        },
        setSearchValue: (state, action) => {
            state.searchValue = action.payload;
        },
        filterTransactions: (state) => {
            state.filteredTransactionData = state.transactionsData.filter((transaction) =>
                Object.entries(transaction)
                    .filter(([key]) => key !== 'id') // ignore id value in the search
                    .some(([, value]) =>
                        value.toString().toLowerCase().includes(state.searchValue.toLowerCase())
                    )
            );
        },
        setSelectedTransaction: (state, action) => {
            state.selectedTransaction = action.payload;
        },
    },
});

export const { setTransactionsData, setFilteredTransactionData, setSearchValue, filterTransactions, setSelectedTransaction } = transactionsSlice.actions;

export default transactionsSlice.reducer;
