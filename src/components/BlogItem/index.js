import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    return (
        <a className={cx('blog-wrapper')} href={`/bloginfo/${data?._id}`}>
            <div className={cx('img-wrapper')}><Image className={cx('blog-image')} fallback={assets.ArticleImage} src={data?.article_image} alt="Blog_image"></Image></div>
            <h4 className={cx('blog-title')}>
                <span>{data?.article_title}</span>
            </h4>
            <h4 className={cx('blog-description')}>
                <span>{data?.article_content}</span>
            </h4>
            <div className={cx('blog-info-wrapper')}>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('blog-info-user-icon')} icon={faUser} />
                    <h4 className={cx('blog-owner')}>
                        <span>{data?.doctor_id?.username}</span>
                    </h4>
                </div>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('blog-info-calendar-icon')} icon={faCalendar} />
                    <h4 className={cx('blog-post-date')}>
                        <span>{formatDate(data?.date_published)}</span>
                    </h4>
                </div>
            </div>
        </a>
    );
}

export default BlogItem;
