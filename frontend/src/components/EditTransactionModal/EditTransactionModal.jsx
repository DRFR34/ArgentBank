import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EditTransactionModal.scss';

/**
 * Edits transaction notes.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.transaction - The transaction object to be edited.
 * @param {Function} props.onClose - Function to close the transaction modal.
 * @returns {JSX.Element} Rendered JSX element for editing transaction details.
 */
export default function EditTransactionModal({ transaction, onClose }) {
    const [description, setDescription] = useState(transaction.description);
    const [isEditing, setIsEditing] = useState(false);

    /**
     * Handles the change in the description text area.
     *
     * @param {string} value - The new description value.
     */
    const handleEditing = (value) => {
        setIsEditing(true);
        setDescription(value);
    };

    /**
     * Handles saving the edited description.
     */
    const handleSave = () => {
        //*** TO DO: Will send updated transaction when v2 backend will be ready.
        // dispatch(updateTransaction({ ...transaction, description }));
        console.log("Updated transaction:", { ...transaction, description });
        setIsEditing(false);
        onClose();
    };

    /**
     * Handles canceling the edition.
     */
    const handleCancel = () => {
        setIsEditing(false);
        onClose();
    };

    return (
        <div className='transactionModal'>
            <article className='transactionModal__content'>
                <h2>Edit your transaction's notes</h2>
                <br />
                <h3>Transaction reference: {transaction.id}</h3>
                <br />
                <h3 className="Amount">
                    {(transaction.deposit > 0)
                        ? <span>Deposit: {transaction.deposit} $</span>
                        : <span>Withdrawal: {transaction.withdrawal} $</span>
                    }    
                </h3>
                <br />
                <form className='infosAndNotes'>
                    <label htmlFor="description">Notes:</label>
                    <textarea
                        value={description}
                        onChange={(e) => handleEditing(e.target.value)}
                    />
                    <div className="saveOrCancelBox">
                        <button
                            className="saveOrCancelBox__btn"
                            type="button"
                            disabled={!isEditing}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="saveOrCancelBox__btn"
                            type="button"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </article>
        </div>
    );
}

EditTransactionModal.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        description: PropTypes.string,
        deposit: PropTypes.number,
        withdrawal: PropTypes.number,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};
