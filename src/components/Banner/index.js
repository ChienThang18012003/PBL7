import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import useBanner from '../../hook/useBanner';

const cx = classNames.bind(styles);

function Banner({ data, type }) {

    const [bannerLoading, bannerHook, getAllBanner, addBanner, updateBanner, deleteBanner, getAllBannerByType] = useBanner();
    const [banner, setBanner] = useState([]);

    useEffect(()=>{
        const fetchBanners = async() => {
            const banners = await getAllBannerByType(type);
            if (banners) setBanner(banners);
        }
        fetchBanners();
    },[type])

    const handleScrollToSlide = (e, slideId) => {
        e.preventDefault();
        const slider = document.querySelector(`.${styles['slider']}`);
        const slide = document.getElementById(slideId);
        if (slider && slide) {
            const offsetLeft = slide.offsetLeft;
            slider.scrollTo({ left: offsetLeft, behavior: 'smooth' });
        }
    };
    

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-wrapper')}>
                <div className={cx('slider')}>
                    {banner.map((item, index) => (
                        <Image
                            key={item.id || index}
                            id={`slide-${index + 1}`}
                            src={item.banner_image}
                            fallback={assets.DefaultBanner}
                            alt={`Banner ${index + 1}`}
                        />
                    ))}
                </div>
                <div className={cx('slider-nav')}>
                    {banner.map((_, index) => (
                        <a
                            key={index}
                            onClick={(e) => handleScrollToSlide(e, `slide-${index + 1}`)}
                        ></a>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Banner;
