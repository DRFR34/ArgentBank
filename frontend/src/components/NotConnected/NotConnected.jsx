import React from 'react'
import { Link } from 'react-router-dom'

export default function NotConnected() {
    return (

        <>
            <div className="header">
                <p className='sorryEmoji'>☹</p>
                <h1>Very sorry <br />You're no longer connected.</h1>
                <br />


                <Link
                    className="goToSignIn-button_link"
                    to="/sign-in">
                    <button
                        type="button" className="goToSignIn-button">Reconnect</button></Link>
            </div>
        </>

    )
}
