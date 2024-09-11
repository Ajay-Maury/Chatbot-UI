import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import styles from './index.module.css'

type PropType = {
    value?: number | string | null,
    size?: number,
    onChange?: (arg: number) => void,
    isEdit?: boolean,
    count: number
}

const StarRating = ({ value = null, size = 24, onChange, isEdit = true, count }: PropType) => {
    const [ratingNumber, setRating] = useState(value ? typeof value === 'string' ? parseFloat(value) : value : 0);

    const handleClick = (clickedIndex: number) => {
        if (isEdit && onChange) {
            setRating(clickedIndex + 1);
            onChange(clickedIndex + 1)
        }
    };

    const stars = [];

    for (let i = 0; i < count; i++) {
        if (i < Math.floor(ratingNumber)) {
            stars.push(<FaStar size={size} key={i} onClick={() => handleClick(i)} style={{ color: '#FED402' }} />);
        } else if (i === Math.floor(ratingNumber) && ratingNumber % 1 !== 0) {
            stars.push(<FaStarHalfAlt size={size} key={i} onClick={() => handleClick(i)} style={{ color: '#FED402' }} />);
        } else {
            stars.push(<FaRegStar size={size} key={i} onClick={() => handleClick(i)} style={{ color: '#9FA3A9' }} />);
        }
    }

    return (
        <div className={styles.starContainer} >
            {stars?.map((star, index) => (
                <span key={index} style={{ cursor: isEdit ? 'pointer' : '' }}>{star}</span>
            ))}
        </div>
    );
};

export default StarRating;