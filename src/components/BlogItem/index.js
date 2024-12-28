import classNames from 'classnames/bind';
import styles from './BlogItem.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function BlogItem({ data }) {
    return (
        <a className={cx('blog-wrapper')} href={`/bloginfo/${data?._id}`}>
            <Image className={cx('blog-image')} src={data?.article_image} alt="Blog_image"></Image>
            <h4 className={cx('blog-title')}>
                <span>{data?.article_title}</span>
            </h4>
            <h4 className={cx('blog-description')}>
                <span>{data?.article_content}</span>
            </h4>
        </a>
    );
}

export default BlogItem;
