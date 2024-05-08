import React from 'react'

import './FeatureCard.scss'

import chatIcon from '../../assets/img/icon-chat.png';
import moneyIcon from '../../assets/img/icon-money.png';
import securityIcon from '../../assets/img/icon-security.png';

export const cardOptions = {

    opt1 : {
        img : chatIcon,
        alt : "Chat icon",
        title : "You are our #1 priority",
        text : "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    opt2 : {
        img : moneyIcon,
        alt : "Money icon",
        title : "More savings means higher rates",
        text : "The more you save with us, the higher your interest rate will be!"
    },
    opt3 : {
        img : securityIcon,
        alt : "Security icon",
        title : "Security you can trust",
        text : "We use top of the line encryption to make sure your data and money is always safe."
    }


}

export default function FeatureCard(options) {
    return (
        <div className="feature-item">
            
            <img src={options.img} alt={options.alt} className="feature-icon" />
            <h3 className="feature-item-title">{options.title}</h3>
            <p> {options.text} </p>
        </div>
    )
}
