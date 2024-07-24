import React from 'react';
import PropTypes from 'prop-types';
import './FeatureCard.scss';

import chatIcon from '../../assets/img/icon-chat.png';
import moneyIcon from '../../assets/img/icon-money.png';
import securityIcon from '../../assets/img/icon-security.png';

/**
 * Options for the FeatureCard component.
 * 
 * @type {Object}
 * @property {Object} optX, the Xth group of options for the feature card.
 * @property {string} optX.img, The image source for the feature card.
 * @property {string} optX.alt - The alt text for the image.
 * @property {string} optX.title - The title of the feature card.
 */
export const cardOptions = {
    opt1: {
        img: chatIcon,
        alt: "Chat icon",
        title: "You are our #1 priority",
        text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
    },
    opt2: {
        img: moneyIcon,
        alt: "Money icon",
        title: "More savings means higher rates",
        text: "The more you save with us, the higher your interest rate will be!"
    },
    opt3: {
        img: securityIcon,
        alt: "Security icon",
        title: "Security you can trust",
        text: "We use top of the line encryption to make sure your data and money is always safe."
    }
};

/**
 * FeatureCard component displays a card with an icon, title, and a text.
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.img - The image source for the feature card.
 * @param {string} props.alt - The alt text for the image.
 * @param {string} props.title - The title of the feature card.
 * @param {string} props.text - The text description of the feature card.
 * @returns {JSX.Element} The FeatureCard component.
 */
export default function FeatureCard({ img, alt, title, text }) {
    return (
        <div className="featureCard">
            <img src={img} alt={alt} className="featureCard__icon" />
            <h3 className="featureCard__title">{title}</h3>
            <p className="featureCard__text">{text}</p>
        </div>
    );
}

FeatureCard.propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
