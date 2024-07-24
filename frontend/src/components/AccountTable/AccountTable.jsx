import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSort, FaSortDown, FaSortUp, FaPen } from 'react-icons/fa';
import './AccountTable.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setFilteredTransactionData } from '../../redux/features/transactionsSlice/transactionsSlice';

/**
 * AccountTable component displays a table of account transactions with sorting and editing functionality.
 * 
 * @param {Object} props - Component properties.
 * @param {function} props.onEditClick - Function to handle edit button click for a transaction.
 * @returns {JSX.Element} The AccountTable component.
 */
export default function AccountTable({ onEditClick }) {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state.transactions.filteredTransactionData);
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');

    const columns = [
        { label: "Date", accessor: "date" },
        { label: "Description", accessor: "description" },
        { label: "Withdrawal", accessor: "withdrawal" },
        { label: "Deposit", accessor: "deposit" }
    ];

    const totalWithdrawals = tableData.reduce((sum, row) => sum + (row.withdrawal || 0), 0).toFixed(2);
    const totalDeposits = tableData.reduce((sum, row) => sum + (row.deposit || 0), 0).toFixed(2);

    /**
     * Sorts the table data by the specified column.
     * 
     * @param {string} column - The column to sort by.
     */
    const sortData = (column) => {
        const sortedData = [...tableData].sort((a, b) => {
            if (a[column] < b[column]) {
                return sortColumn === column && sortDirection === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return sortColumn === column && sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        dispatch(setFilteredTransactionData(sortedData));
        setSortColumn(column);
        setSortDirection(sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc');
    };

    return (
        <table className="transacTable">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th
                            key={column.accessor}
                            className={sortColumn === column.accessor ? 'active' : 'inactive'}
                            onClick={() => sortData(column.accessor)}
                        >
                            <div className='thContent'>
                                <span className='labelName'>{column.label}</span>
                                <div className={sortColumn === column.accessor ? 'active' : 'inactive'}>
                                    {sortColumn !== column.accessor ? <FaSort /> : (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
                                </div>
                            </div>
                        </th>
                    ))}
                    <th>
                        {/*  empty <th> for matching edit button column */}
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    tableData.length === 0 && (
                        <tr>
                            <td colSpan={5}>
                                <div className='noResultDiv'>There is no result matching your search</div>
                            </td>
                        </tr>
                    )
                }
                {tableData.map((data) => (
                    <tr className='tbodyRaw' key={data.id}>
                        {columns.map(({ accessor }) => {
                            const tData = typeof data[accessor] === 'number'
                                ? data[accessor] !== 0 ? data[accessor].toFixed(2) : null
                                : data[accessor];
                            return <td key={accessor}>{tData}</td>;
                        })}
                        <td>
                            <button className='editBtn' onClick={() => onEditClick(data)}>
                                <FaPen />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className='tfoot__row'>
                    <td className='tfoot__row__cell' colSpan={2}>
                        <span className='tfoot__row__cell__title'>
                            Final balance:
                        </span>
                        <span className='tfoot__row__cell__total'>
                            {totalDeposits - totalWithdrawals}
                        </span>
                    </td>
                    <td className='tfoot__row__cell'>
                        <span className='tfoot__row__cell__title'>
                            Total withdrawals:
                        </span>
                        <span className='tfoot__row__cell__total'>
                            {totalWithdrawals}
                        </span>
                    </td>
                    <td className='tfoot__row__cell'>
                        <span className='tfoot__row__cell__title'>
                            Total deposits:
                        </span>
                        <span className='tfoot__row__cell__total'>
                            {totalDeposits}
                        </span>
                    </td>
                    <td className='tfoot__row__cell'>
                        {/* empty <td> for edit button column */}
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

AccountTable.propTypes = {
    onEditClick: PropTypes.func.isRequired,
};
