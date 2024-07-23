import React, { useState } from 'react';
import './EditTransactionModal.scss';

/**
 * Component for editing transaction notes.
 *
 * @param {Object} transaction - The transaction object to be edited
 * @param {Function} onClose - Function to close the transaction modal
 * @return {JSX.Element} Rendered JSX element for editing transaction details
 */
export default function EditTransactionModal({ transaction, onClose }) {
    const [description, setDescription] = useState(transaction.description);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditing = (value) => {
        setIsEditing(true);
        setDescription(value)
    }
    const handleSave = () => {
        //  TO DO : Will send updated transaction when v2 backend will be ready.
        // dispatch(updateTransaction({ ...transaction, description })); 
        console.log("Updated transaction:", { ...transaction, description });
        setIsEditing(false);
        onClose();
    };

    const handleCancel = () => {
        setIsEditing(false);
        onClose();
    };

    return (
        <div className='transactionModal'>
            <article className='transactionModal__content'>
                <h2>Edit your transaction's notes</h2>
                <br />
                <h3 className=''>Transaction reference: {transaction.id}</h3>

                <br />
                <h3 className="Amount">
                    {(transaction.deposit > 0)
                        ? <span>Deposit: {transaction.deposit} $</span>
                        : <span>Withdrawal: {transaction.withdrawal} $</span>
                    }    
                </h3>

                <br />
                
                <form className='infosAndNotes'>
                    <label htmlFor="description">Your notes:</label>
                    <textarea
                        value={description}       
                        onChange={(e) => handleEditing(e.target.value)}
                    />
                    
                    <div className="saveOrCancelBox">
                        <button
                            className="saveOrCancelBox__btn"
                            type="button"
                            disabled={!isEditing}
                            onClick={handleSave}>Save</button>
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
