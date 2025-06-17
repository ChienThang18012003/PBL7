import classNames from 'classnames/bind';
import styles from './CompanyInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBriefcase, faFlag, faUsers, faCalendar, faGlobe, faEnvelope, faPhone, faLocationDot, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useState, useEffect } from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import JobsContainer from '../../components/JobsContainer';
import useCompany from '../../hook/useCompany';
import { useParams } from 'react-router-dom';
import useCompanyFollowed from '../../hook/useCompanyFollowed';
import TextEditorViewer from '../../components/TextEditorViewer';
import useJobPost from '../../hook/useJobPost';


const cx = classNames.bind(styles);

function CompanyInfo() {
    const { id } = useParams();

    const [companyByID, setCompanyByID] = useState({});
    const [isFollowed, setIsFollowed] = useState(false);
    const [companyFollowed, setCompanyFollowed] = useState({});
    const [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed] = useCompanyFollowed();
    const [email, setEmail] = useState('');
    const [jobPost, setJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [
        jobPostHook,
        jobPostLoading,
        getAllJobPosts,
        filterJobPostList,
        searchJobPost,
        getJobPost,
        updateJobPostView,
        getJobPostByEmail,
        addJobPost,
        updateJobPost,
        deleteJobPost,
        getJobPostNameByEmail,
        getJobPostByCompany
    ] = useJobPost();
    const [
        companyHook,
        loading,
        getAllCompanies,
        addCompany,
        filterCompanyList,
        searchCompany,
        getCompany
    ] = useCompany();

    const handleFollowClick = async(e) => {
        e.stopPropagation();
        const company = await addCompanyFollowed(id, email);
        if (company) {setIsFollowed(true);setCompanyFollowed(company)}
    }
    const handleUnfollowClick = async(e) => {
        e.stopPropagation();
        const company = await deleteCompanyFollowed(companyFollowed?._id);
        if (company) {setIsFollowed(false);setCompanyFollowed({})}
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchJobPost = async () => {
            const jobs = await getJobPostByCompany(id);
            console.log(jobs);
            if (jobs) setJobPost(jobs);
        }

        const fetchCompany = async () => {
            const Company = await getCompany(id);
            if (Company) setCompanyByID(Company);
        };

        const fetchSpecificCompanyFollowed = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email)
                    const companyFollowed = await getSpecificCompanyFollowed(id, obj?.email);
                    if (companyFollowed) {setIsFollowed(true);setCompanyFollowed(companyFollowed);}
                    else {setIsFollowed(false);}
                }
            }
        }

        fetchCompany();
        fetchJobPost();
        fetchSpecificCompanyFollowed();
    }, [id]);

    const defaultLat = 16.047079;
    const defaultLng = 108.206230;

    const lat = companyByID?.location_id?.lat || defaultLat;
    const lng = companyByID?.location_id?.lng || defaultLng;


    if (loading) return (
        <LoadingAnimation></LoadingAnimation>
    )


    return (
        <div className={cx('wrapper')}>
            <div className={cx('popular-company-container')}>
                <div className={cx('company-header')}>
                    <div className={cx('cover-image-wrapper')}>
                        <Image className={cx('cover-image')} src={companyByID?.cover_image} fallback={assets.CompanyCoverImage}></Image>
                        <div className={cx('company-logo-wrapper')}>
                            <Image src={companyByID?.logo} fallback={assets.CompanyLogo} className={cx('company-logo')}></Image>
                        </div>
                    </div>
                    <div className={cx('company-name-wrapper')}>
                        <div className={cx('company-info-wrapper')}>
                            <div className={cx('company-name')}>
                                <span>
                                    {companyByID?.company_name || "Chưa xác định"}
                                </span>
                            </div>
                            <div className={cx('info-container')}>
                                <div className={cx('info-wrapper')}>
                                    <FontAwesomeIcon className={cx('follower-icon')} icon={faFlag}></FontAwesomeIcon>
                                    <div className={cx('follower-num')}>
                                        <span>
                                                {companyByID?.career_id?.career_name || "Chưa xác định"}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('info-wrapper')}>
                                    <FontAwesomeIcon className={cx('follower-icon')} icon={faCalendar}></FontAwesomeIcon>
                                    <div className={cx('follower-num')}>
                                        <span>
                                                {formatDate(companyByID?.established_date) || "Chưa xác định"}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('info-wrapper')}>
                                    <FontAwesomeIcon className={cx('follower-icon')} icon={faUsers}></FontAwesomeIcon>
                                    <div className={cx('follower-num')}>
                                        <span>
                                                {companyByID?.employee_size || "Chưa xác định"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            email && (
                                <div className={cx('button-wrapper')}>
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
                </div>
                <div className={cx('company-details-wrapper')}>
                    <div className={cx('section-one')}>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Về công ty
                                </span>
                            </div>
                        </div>
                        <div className={cx('blog-content-container')}>
                            <TextEditorViewer html={companyByID?.description}></TextEditorViewer>
                        </div>
                    </div>
                    <div className={cx('section-two')}>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Website
                                </span>
                            </div>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <a className={cx('info-wrapper')}>
                                    <FontAwesomeIcon className={cx('website-icon')} icon={faGlobe}></FontAwesomeIcon>
                                    <div className={cx('website-link')}>
                                        <span>
                                                {companyByID?.website_url || 'Chưa xác định'}
                                        </span>
                                    </div>
                            </a>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Theo dõi tại
                                </span>
                            </div>
                        </div>
                        <div className={cx('link-wrapper')}>
                            <a href={companyByID?.facebook_url || ''} >
                                <FontAwesomeIcon className={cx('facebook-icon')} icon={faFacebook}></FontAwesomeIcon>
                            </a>
                            <a href={companyByID?.youtube_url || ''} >
                                <FontAwesomeIcon className={cx('youtube-icon')} icon={faYoutube}></FontAwesomeIcon>
                            </a>
                            <a href={companyByID?.linkedin_url || ''} >
                                <FontAwesomeIcon className={cx('linkedin-icon')} icon={faLinkedin}></FontAwesomeIcon>
                            </a>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Thông tin chung
                                </span>
                            </div>
                        </div>
                        <div className={cx('info-wrapper-two')}>
                            <FontAwesomeIcon className={cx('follower-icon')} icon={faEnvelope}></FontAwesomeIcon>
                            <div className={cx('follower-num')}>
                                <span>
                                        {companyByID?.company_email || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('info-wrapper-two')}>
                            <FontAwesomeIcon className={cx('follower-icon')} icon={faPhone}></FontAwesomeIcon>
                            <div className={cx('follower-num')}>
                                <span>
                                        {companyByID?.company_phone || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('info-wrapper-two')}>
                            <FontAwesomeIcon className={cx('follower-icon')} icon={faHashtag}></FontAwesomeIcon>
                            <div className={cx('follower-num')}>
                                <span>
                                        {companyByID?.tax_code || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('info-wrapper-three')}>
                            <div className={cx('location-num')}>
                                <FontAwesomeIcon className={cx('location-icon')} icon={faLocationDot}></FontAwesomeIcon>
                                <span className={cx('location-text')}>
                                        {companyByID?.location_id?.address || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Bản đồ
                                </span>
                            </div>
                        </div>
                        <div className={cx('ggmap-wrapper')}>
                            <iframe
                            src={`https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
                </div>
                <div className={cx('urgent-jobs-container')}>
                    <div className={cx('urgent-jobs-wrapper')}>
                        <JobsContainer data={jobPost} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                            <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faClock}></FontAwesomeIcon>
                            <span className={cx('urgent-jobs-title')}>
                                Việc làm đang tuyển
                            </span>
                        </JobsContainer>
                    </div>
                </div>
        </div>
    )
}

export default CompanyInfo;