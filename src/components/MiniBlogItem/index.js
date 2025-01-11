import classNames from 'classnames/bind';
import styles from './MiniBlogItem.module.scss';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

function MiniBlogItem({ data }) {
    return (
        <a className={cx('blog-wrapper')} href={`/bloginfo/${data?._id}`}>
            <div className={cx('blog-image-wrapper')}><Image className={cx('blog-image')} fallback={assets.ArticleImage} src={data?.article_image} alt="Blog_image"></Image></div>
            <div className={cx('blog-content')}>
                <h4 className={cx('blog-title')}>
                    <span>{data?.article_title}</span>
                </h4>
                <h4 className={cx('blog-description')}>
                    <span>{data?.article_content}</span>
                </h4>
            </div>
        </a>
    );
}

export default MiniBlogItem;
