import classNames from 'classnames/bind';
import styles from './ForumItem.module.scss';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import Image from '../Image';

const cx = classNames.bind(styles);

function ForumItem({ data, onHashtagClick }) {
    const removeAllSpaces = (str) => {
        if (typeof str !== 'string') return '';
        return str.replace(/\s+/g, '');
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleHashtagClick = () => {
        onHashtagClick(data?.speciality_id?.name);
    }

    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('user-avatar-section')}>
                    <Image className={cx('user-avatar')} src={data?.user_id?.profile_image} alt="User Avatar" />
                </div>

                <div className={cx('question-section')}>
                    <div className={cx('question-title-wrapper')}>
                        <h4 className={cx('question-title')}>
                            <span>{data?.post_title}</span>
                        </h4>
                        <FontAwesomeIcon className={cx('comment-icon')} icon={faComment} />
                        <h4 className={cx('question-count')}>
                            <span>{data?.post_comments.length}</span>
                        </h4>
                    </div>
                    <div className={cx('question-info-wrapper')}>
                        <h4 className={cx('post-by')}>
                            <span>Đăng bởi</span>
                        </h4>
                        <h4 className={cx('question-asker')}>
                            <span>{data?.user_id?.username}</span>
                        </h4>
                        <h4 className={cx('when')}>
                            <span>vào ngày</span>
                        </h4>
                        <h4 className={cx('asked-time')}>
                            <span>{formatDate(data?.createdAt)}</span>
                        </h4>
                    </div>
                    <div className={cx('question-info-wrapper')}>
                        <button className={cx('hashtag-button')} onClick={handleHashtagClick}>
                            <FontAwesomeIcon icon={faHashtag} className={cx('hashtag-icon')}></FontAwesomeIcon>
                            {removeAllSpaces(data?.speciality_id?.name)}
                        </button>
                    </div>
                    <div className={cx('question-wrapper')}>
                        <h4 className={cx('question')}>
                            <span>{data?.post_content}</span>
                        </h4>
                    </div>
                    <div className={cx('question-link-wrapper')}>
                        <a className={cx('link')} href={`/forum/${data?._id}`}>
                            Xem câu trả lời
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForumItem;
