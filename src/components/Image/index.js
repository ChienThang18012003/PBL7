import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
import classNames from 'classnames';
import { assets } from '../../assets/assets_fe/assets';
import styles from './Image.module.scss';

const Image = forwardRef(({ src, alt, className, fallback: customFallback = assets.NoImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('');

    const handleError = () => {
        setFallback(customFallback);
    };

    const imageSource = src || customFallback; // Nếu src là null hoặc không hợp lệ, sử dụng fallback

    return (
        <img
            className={classNames(styles.wrapper, className)}
            ref={ref}
            src={fallback || imageSource}
            alt={alt}
            {...props}
            onError={handleError}
        />
    );
});

export default Image;
