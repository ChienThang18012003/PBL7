import classNames from 'classnames/bind';
import styles from './JobInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBriefcase, faFlag, faCalendar, faEnvelope, faPhone, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import Pagination from '../../components/Pagination';
import MiniJobsItem from '../../components/MiniJobsItem';
import { useParams } from 'react-router-dom';
import useJobPost from '../../hook/useJobPost';
import useCompanyFollowed from '../../hook/useCompanyFollowed';
import useJobPostSaved from '../../hook/useJobPostSaved';
import useResumeApplied from '../../hook/useResumeApplied';
import ResumeAppliedModal from '../../components/ResumeAppliedModal';
import TextEditorViewer from '../../components/TextEditorViewer';


const cx = classNames.bind(styles);

function JobInfo() {
    const { id } = useParams();

    const [jobByID, setJobByID] = useState({});
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(8);
    const [view, setView] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [companyFollowed, setCompanyFollowed] = useState({});
    const [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed] = useCompanyFollowed();
    const [isSaved, setIsSaved] = useState(false);
    const [jobPostSaved, setJobPostSaved] = useState({});
    const [jobPostSavedLoading, jobPostSavedHook, getJobPostSavedByEmail, getSpecificJobPostSaved, addJobPostSaved, deleteJobPostSaved] = useJobPostSaved();
    const [isApplied, setIsApplied] = useState(false);
    const [resumeApplied, setResumeApplied] = useState({});
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied] = useResumeApplied();
    const [email, setEmail] = useState('');

    const handleFollowClick = async(e) => {
        e.stopPropagation();
        const company = await addCompanyFollowed(jobByID?.company_id?._id, email);
        if (company) {setIsFollowed(true);setCompanyFollowed(company)}
    }
    const handleUnfollowClick = async(e) => {
        e.stopPropagation();
        const company = await deleteCompanyFollowed(companyFollowed?._id);
        if (company) {setIsFollowed(false);setCompanyFollowed({})}
    }

    const handleSaveClick = async(e) => {
        e.stopPropagation();
        const job = await addJobPostSaved(jobByID?._id, email);
        if (job) {setIsSaved(true);setJobPostSaved(job)}
    }
    const handleUnsaveClick = async(e) => {
        e.stopPropagation();
        const job = await deleteJobPostSaved(jobPostSaved?._id);
        if (job) {setIsSaved(false);setJobPostSaved({})}
    }

    useEffect(()=>{
        const fetchSpecificCompanyFollowed = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email);
                    if (jobByID && jobByID?.company_id?._id){
                        const companyFollowed = await getSpecificCompanyFollowed(jobByID?.company_id?._id, obj?.email);
                        if (companyFollowed) {setIsFollowed(true);setCompanyFollowed(companyFollowed);}
                        else {setIsFollowed(false);}
                    }
                }
            }
        }
        const fetchSpecificJobPostSaved = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email);
                    if (jobByID){
                        const jobPostSaved = await getSpecificJobPostSaved(jobByID?._id, obj?.email);
                        if (jobPostSaved) {setIsSaved(true);setJobPostSaved(jobPostSaved);}
                        else {setIsSaved(false);}
                    }
                }
            }
        }
        const fetchSpecificResumeApplied = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email);
                    if (jobByID){
                        const resumeApplied = await getSpecificResumeApplied(jobByID?._id, obj?.email);
                        console.log(resumeApplied);
                        if (resumeApplied) {setIsApplied(true);setResumeApplied(resumeApplied);}
                        else {setIsApplied(false);}
                    }
                }
            }
        }
        fetchSpecificCompanyFollowed();
        fetchSpecificJobPostSaved();
        fetchSpecificResumeApplied();
    },[jobByID])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleAddResumeApplied = (newList) => {
        if (newList) setResumeApplied(newList); setIsApplied(true)
    }

    const handleDeleteResumeApplied = () => {
        setIsApplied(false);
        setResumeApplied({});
    }

    const [
        jobPostHook,
        jobPostLoading,
        getAllJobPosts,
        filterJobPostList,
        searchJobPost,
        getJobPost,
        updateJobPostView
    ] = useJobPost();

    useEffect(() => {
        const fetchJobPost = async () => {
            const JobPost = await getJobPost(id);
            if (JobPost) setJobByID(JobPost?.data);
        };
        const updateView = async () => {
            const JobPost = await updateJobPostView(id);
            setView(JobPost?.view)
        }

        fetchJobPost();
        updateView();
    }, [id]);

    const isNotEmptyObject = obj =>
    obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length > 0;

    useEffect(() => {
        const fetchJobPosts = async () => {
            if (isNotEmptyObject(jobByID)) {
                const JobPost = await filterJobPostList(jobByID?.location_id?.city_id?._id, jobByID?.career_id?._id);
                if (JobPost) setDisplayedJobPost(JobPost);
            }
        };

        fetchJobPosts();
    }, [jobByID]);
    const defaultLat = 16.047079;
    const defaultLng = 108.206230;

    const lat = jobByID?.location_id?.lat || defaultLat;
    const lng = jobByID?.location_id?.lng || defaultLng;


    if (jobPostLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('popular-company-container')}>
                <div className={cx('job-info-container')}>
                    <div className={cx('company-header')}>
                        <div className={cx('cover-image-wrapper')}>
                            <Image className={cx('cover-image')} src={jobByID?.company_id?.cover_image || ''} fallback={assets.CompanyCoverImage}></Image>
                            <div className={cx('company-logo-wrapper')}>
                                <Image src={jobByID?.company_id?.logo || ''} fallback={assets.CompanyLogo} className={cx('company-logo')}></Image>
                            </div>
                        </div>
                        <div className={cx('company-name-wrapper')}>
                            <div className={cx('company-info-wrapper')}>
                                <div className={cx('company-name')}>
                                    <span>
                                        {jobByID?.company_id?.company_name || "Chưa xác định"}
                                    </span>
                                </div>
                                <div className={cx('info-container')}>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faFlag}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                    {jobByID?.career_id?.career_name || "Chưa xác định"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faPhone}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                {jobByID?.company_id?.company_phone || "Chưa xác định"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faEnvelope}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                {jobByID?.company_id?.company_email || "Chưa xác định"}
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
                        <div className={cx('job-name-wrapper')}>
                            <div className={cx('job-info-wrapper')}>
                                <div className={cx('job-name')}>
                                    <span>
                                        {jobByID?.job_name || "Chưa xác định"}
                                    </span>
                                </div>
                                <div className={cx('info-container')}>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faClock}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                Hạn nộp hồ sơ: {formatDate(jobByID?.deadline) || "Chưa xác định"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faEye}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                Lượt xem: {view || '0'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={cx('info-wrapper')}>
                                        <FontAwesomeIcon className={cx('follower-icon')} icon={faCalendar}></FontAwesomeIcon>
                                        <div className={cx('follower-num')}>
                                            <span>
                                                Đăng ngày: {formatDate(jobByID?.created_at) || "Chưa xác định"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            email && (
                                <div className={cx('buttons-wrapper')}>
                                    {
                                        !isApplied ? (
                                            <ResumeAppliedModal onSubmitModal={handleAddResumeApplied} type="add" jobPost={jobByID?._id} employerId={jobByID?.user_id?._id}></ResumeAppliedModal>
                                        ) : (
                                            <ResumeAppliedModal data={resumeApplied} onDelete={handleDeleteResumeApplied}></ResumeAppliedModal>
                                        )   
                                    }
                                    {
                                        isSaved ? (
                                            <button className={cx('applied-button')} onClick={handleUnsaveClick}>
                                                <FontAwesomeIcon className={cx('applied-icon')} icon={faHeart}></FontAwesomeIcon>
                                                Bỏ lưu việc làm
                                            </button>
                                        ) : (
                                            <button className={cx('apply-button')} onClick={handleSaveClick}>
                                                <FontAwesomeIcon className={cx('apply-icon')} icon={faHeart}></FontAwesomeIcon>
                                                Lưu việc làm
                                            </button>
                                        )
                                    }
                                </div>
                            )
                        }
                        <div className={cx('job-details-one')}>
                            <div className={cx('job-detail-wrapper')}>
                                <div className={cx('job-detail-title')}>
                                    Yêu cầu kinh nghiệm
                                </div>
                                <div className={cx('job-detail')}>
                                    {jobByID?.experience || "Chưa xác định"}
                                </div>
                            </div>
                            <div className={cx('job-detail-wrapper')}>
                                <div className={cx('job-detail-title')}>
                                    Mức lương
                                </div>
                                <div className={cx('job-detail')}>
                                    {jobByID?.salary_min || '0'} - {jobByID?.salary_max || '0'}
                                </div>
                            </div>
                            <div className={cx('job-detail-wrapper')}>
                                <div className={cx('job-detail-title')}>
                                    Cấp bậc
                                </div>
                                <div className={cx('job-detail')}>
                                    {jobByID?.position || 'Chưa xác định'}
                                </div>
                            </div>
                            <div className={cx('job-detail-wrapper')}>
                                <div className={cx('job-detail-title')}>
                                    Hình thức làm việc
                                </div>
                                <div className={cx('job-detail')}>
                                    {jobByID?.job_type || 'Chưa xác định'}
                                </div>
                            </div>
                        </div>
                        <div className={cx('info-title')}>
                            <span>
                                Thông tin
                            </span>
                        </div>
                        <div className={cx('job-details-two')}>
                            <div className={cx('job-detail-wrapper-two')}>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Nghề nghiệp
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.career_id?.career_name || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Học vấn
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.academic_level || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Khu vực tuyển
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.location_id?.city_id?.name || 'Chưa xác định'}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('job-detail-wrapper-two')}>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Nơi làm việc
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.type_of_workplace || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Số lượng tuyển
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.quantity || '0'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Yêu cầu giới tính
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.gender_required || 'Chưa xác định'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('section-one')}>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Mô tả công việc
                                </span>
                            </div>
                        </div>
                        <div className={cx('blog-content-container')}>
                            <TextEditorViewer html={jobByID?.job_description}></TextEditorViewer>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Yêu cầu công việc
                                </span>
                            </div>
                        </div>
                        <div className={cx('blog-content-container')}>
                            <TextEditorViewer html={jobByID?.job_requirement}></TextEditorViewer>
                        </div>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Quyền lợi
                                </span>
                            </div>
                        </div>
                        <div className={cx('blog-content-container')}>
                            <TextEditorViewer html={jobByID?.benefit_enjoyed}></TextEditorViewer>
                        </div>
                    </div>
                    <div className={cx('section-one')}>
                        <div className={cx('info-title')}>
                            <span>
                                Thông tin
                            </span>
                        </div>
                        <div className={cx('job-details-three')}>
                            <div className={cx('job-detail-wrapper-two')}>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Người liên hệ
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.contact_person_name || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Email liên hệ
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.contact_person_email || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        SĐT liên hệ
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.contact_person_phone || 'Chưa xác định'}
                                    </div>
                                </div>
                                <div className={cx('job-detail-container')}>
                                    <div className={cx('job-detail-title')}>
                                        Địa chỉ
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {jobByID?.location_id?.address || 'Chưa xác định'}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('job-detail-wrapper-two')}>
                                <div className={cx('job-detail-container-two')}>
                                    <div className={cx('job-detail-title-two')}>
                                        Bản đồ
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
                    </div>
                </div>
                <div className={cx('similar-job-container')}>
                    <div className={cx('section-ten')}>
                        <div className={cx('other-job-title')}>
                            <span>
                                Việc làm tương tự
                            </span>
                        </div>
                        <div className={cx('separator')}>
                        </div>
                        {
                            Array.isArray(currentDoctors) && currentDoctors.map((jobpost,index)=>(
                                <MiniJobsItem data={jobpost} key={index}></MiniJobsItem>
                            ))
                        }
                        <Pagination 
                        totalPosts={(displayedJobPost || []).length}
                        postsPerPage={docPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        >
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobInfo;