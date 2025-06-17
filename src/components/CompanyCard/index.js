import classNames from 'classnames/bind';
import styles from './CompanyCard.module.scss';
import { faLocationDot, faHeart as faHeartSolid, faBriefcase, faUsers, faUser, faFlag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '../Image';
import { useState, useEffect } from 'react';
import { assets } from '../../assets/assets_fe/assets';
import { useNavigate } from 'react-router-dom';
import useCompanyFollowed from '../../hook/useCompanyFollowed';

const cx = classNames.bind(styles);

function CompanyCard({ data, children, email }) {

    const navigate = useNavigate();
    const [isFollowed, setIsFollowed] = useState(false);
    const [companyFollowed, setCompanyFollowed] = useState({});
    const [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed] = useCompanyFollowed();

    const handleFollowClick = async(e) => {
        e.stopPropagation();
        const company = await addCompanyFollowed(data?._id, email);
        if (company) {setIsFollowed(true);setCompanyFollowed(company)}
    }
    const handleUnfollowClick = async(e) => {
        e.stopPropagation();
        const company = await deleteCompanyFollowed(companyFollowed?._id);
        if (company) {setIsFollowed(false);setCompanyFollowed({})}
    }

    useEffect(()=>{
        const fetchSpecificCompanyFollowed = async() => {
            const companyFollowed = await getSpecificCompanyFollowed(data?._id, email);
            if (companyFollowed) {setIsFollowed(true);setCompanyFollowed(companyFollowed);}
            else {setIsFollowed(false);}
        }
        fetchSpecificCompanyFollowed();
    },[email, data])

    return (
        <div className={cx('wrapper')} onClick={() => {navigate(`/company-info/${data?._id}`); window.scrollTo(0,0);}}>
            <div className={cx('company-image-wrapper')}>
                <div className={cx('company-cover-image-container')}>
                    <Image src={data?.cover_image} className={cx('company-image')} fallback={assets.CompanyCoverImage}></Image>
                </div>
                <div className={cx('company-image-container')}>
                    <Image src={data?.logo} className={cx('company-image')} fallback={assets.CompanyLogo}></Image>
                </div>
            </div>
            <div className={cx('follower-wrapper')}>
                <div className={cx('follower-num')}>
                    <span>
                        {data?.follower_count || '0'} người theo dõi
                    </span>
                </div>
                <FontAwesomeIcon className={cx('follower-icon')} icon={faUsers}></FontAwesomeIcon>
            </div>
            <div className={cx('company-name-wrapper')}>
                <div className={cx('company-name')}>
                    <span>
                        {data?.company_name || "Chưa xác định"}
                    </span>
                </div>
            </div>
            <div className={cx('company-info-wrapper')}>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('follower-icon')} icon={faFlag}></FontAwesomeIcon>
                    <div className={cx('follower-num')}>
                        <span>
                            {data?.career_id?.career_name || "Chưa xác định"}
                        </span>
                    </div>
                </div>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('follower-icon')} icon={faLocationDot}></FontAwesomeIcon>
                    <div className={cx('follower-num')}>
                        <span>
                            {data?.location_id?.city_id?.name || " Chưa xác định"}
                        </span>
                    </div>
                </div>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('follower-icon')} icon={faUser}></FontAwesomeIcon>
                    <div className={cx('follower-num')}>
                        <span>
                            {data?.employee_size}
                        </span>
                    </div>
                </div>
                <div className={cx('info-wrapper')}>
                    <FontAwesomeIcon className={cx('follower-icon')} icon={faBriefcase}></FontAwesomeIcon>
                    <div className={cx('follower-num')}>
                        <span>
                            {data?.job_post_count || "0"} việc làm
                        </span>
                    </div>
                </div>
            </div>
            {
                email && (
                    <div className={cx('follow-button-wrapper')}>
                        {
                            isFollowed ? (
                                <button className={cx('followed-button')} onClick={handleUnfollowClick}>
                                    <FontAwesomeIcon className={cx('followed-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                    Bỏ theo dõi
                                </button>
                            ) : (
                                <button className={cx('follow-button')} onClick={handleFollowClick}>
                                    <FontAwesomeIcon className={cx('follow-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                    Theo dõi
                                </button>
                            )   
                        }
                    </div>
                )
            }
        </div>
    );
}

export default CompanyCard;
