import classNames from 'classnames/bind';
import styles from './LoadingAnimation.module.scss';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

function LoadingAnimation() {
    return (
        <div className={cx('container')}>
            <img src={assets.PageLoader} alt="Loading" className="loading-image">
            </img>
        </div>
    );
}

export default LoadingAnimation;
