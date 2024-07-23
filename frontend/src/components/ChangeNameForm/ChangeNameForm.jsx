import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ChangeNameForm.scss'
import { updateUserProfile } from '../../redux/features/user/userSlice';
export default function ChangeNameForm() {
    const dispatch = useDispatch()
    const [newFirstname, setNewFirstname] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [formOn, setformOn] = useState(false);
    const [responseBoxOn, setResponseBoxOn] = useState(false);
    const updateResponseMsg = useSelector((state) => state.user.updateResponseMsg);


    useEffect(() => {

    }, [formOn, newFirstname, newLastname, updateResponseMsg]);

    const submitChangeNameForm = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile({ firstName: newFirstname, lastName: newLastname }));
        setNewFirstname('');
        setNewLastname('');
        setformOn(false);
        setResponseBoxOn(true);
    };

    const cancelAndHyde = (e) => {
        setNewFirstname('');
        setNewLastname('');
        setformOn(false);
    };

    return (
        <div
            className='changeNameWrapper '
        >
            <div className={`changeNameWrapper__responseBox ${responseBoxOn && "isVisible"}`}>
                <h3>Result of your request :</h3>
                <br />
                <span> {updateResponseMsg} </span>
                <button
                    type="button"
                    className={`close-button `}
                    onClick={() => {
                        setResponseBoxOn(false);
                    }}

                >Close
                </button>

            </div>

            <button
                type="button"
                className={`edit-button ${(formOn || responseBoxOn) && "hidden"}`}
                onClick={() => {
                    setformOn(true);
                }}

            >Edit Name
            </button>

            <form
                className={`changeNameForm ${formOn && "isVisible"}`}
                onSubmit={submitChangeNameForm}
            >

                <h2 className='changeNameForm__title' >Change your name data</h2>

                <fieldset className='changeNameForm__fieldset'>
                    <label htmlFor="newFirstname">New first name</label>
                    <input
                        className='changeNameForm__input'
                        type="text"
                        id="newFirstname"
                        placeholder="First name"
                        value={newFirstname}
                        required
                        onChange={(e) => setNewFirstname(e.target.value)}
                    />
                    <label htmlFor="newLastname">New last name</label>
                    <input
                        className='changeNameForm__input'
                        type="text"
                        id="newLastname"
                        placeholder="Last name"
                        value={newLastname}
                        required
                        onChange={(e) => setNewLastname(e.target.value)}
                    />
                </fieldset>

                <div className='changeNameForm__buttonsBox'>

                    <button
                        type="submit"
                        className="changeNameForm__buttonsBox__submitBtn"
                        disabled={(newFirstname === '' || newLastname === '') ? true : false}
                    >
                        Save
                    </button>

                    <button
                        type="reset"
                        className="changeNameForm__buttonsBox__cancelBtn"
                        onClick={() => { cancelAndHyde() }}
                    >
                        Cancel
                    </button>

                </div>

            </form>
        </div>
    )
}
