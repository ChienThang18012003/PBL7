import classNames from 'classnames/bind';
import styles from './UserItem.module.scss';
import { faBuilding, faHeart as faHeartSolid, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function UserItem({ data, children }) {

    const navigate = useNavigate();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-info')}>
                <div className={cx('company-image-wrapper')}>
                    <Image className={cx('company-image')} src={data?.viewer_id?.profile_image} fallback={assets.UserImage}></Image>
                </div>
                <div className={cx('job-detail-wrapper')}>
                    <div className={cx('job-name')}>
                        <span>
                            {data?.viewer_id?.username || 'Chưa xác định'}
                        </span>
                    </div>
                    <div className={cx('company-info-wrapper')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faBuilding}></FontAwesomeIcon>
                        <a className={cx('company-name')} onClick={()=>{navigate(`/company-info/${data?.company_id?._id}`)}}>
                            <span>
                                {data?.company_id?.company_name || 'Chưa xác định'}
                            </span>
                        </a>
                    </div>
                    <div className={cx('company-info-wrapper')}>
                        <FontAwesomeIcon className={cx('company-icon')} icon={faPhone}></FontAwesomeIcon>
                        <div className={cx('phone-number')}>
                            <span>
                                {data?.user_id?.phone || 'Chưa xác định'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserItem;
