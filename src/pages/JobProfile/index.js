import classNames from 'classnames/bind';
import styles from './JobProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLightbulb, faUser, faDollarSign, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import Pagination from '../../components/Pagination';
import PdfPreviewer from '../../components/PdfPreviewer';
import UserItem from '../../components/UserItem';
import useResume from '../../hook/useResume';
import ResumeModal from '../../components/ResumeModal';
import useResumeViewed from '../../hook/useResumeViewed';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function JobProfile() {

    const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume] = useResume();
    const [resumeInfo, setResumeInfo] = useState({});
    const [attachedResume, setAttachedResume] = useState([]);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [resumeViewedLoading, resumeViewedHook, getResumeViewedByEmail, getSpecificResumeViewed, addResumeViewed, deleteResumeViewed] = useResumeViewed();
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(4);

    const handleEditResume = (submittedObject) => {
        if (submittedObject) {
            setAttachedResume(prev =>
            prev.map(item =>
                item._id === submittedObject?._id ? submittedObject : item
            )
        );
        }
    };


    const handleAddResume = (submittedObject) =>{
        if (!submittedObject) return;

        setAttachedResume((prev) => [...prev, submittedObject]);
    }

    const handleDeleteResume = (submittedObject) => {
        if (!submittedObject) return;

        setAttachedResume(prev =>
            prev.filter(item => item._id !== submittedObject._id)
        );
    };


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        const fetchEmail = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email)
                }
           }
        }
        const fetchResume = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const DefaultResume = await getDefaultResume(obj?.email);
                if (DefaultResume === null) {
                    const newResume = await addResume(obj?.email, true);
                    setResumeInfo(newResume);
                } else if (DefaultResume && typeof(DefaultResume) === 'object') {
                    setResumeInfo(DefaultResume);
                }
                const AttachedResume = await getAttachedResume(obj?.email);
                console.log("Resume: ", AttachedResume);
                if (AttachedResume && Array.isArray(AttachedResume)) setAttachedResume(AttachedResume)
            }
        };
        fetchResume();
        fetchEmail();
    }, []);

    useEffect(()=>{
        const fetchResumeViewed = async() => {
            if (email) {
                const resume = await getResumeViewedByEmail(email);
                if (resume && Array.isArray(resume)) setDisplayedJobPost(resume);
            }
        }
        fetchResumeViewed()
    },[email])

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (resumeLoading || resumeViewedLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('popular-company-container')}>
                <div className={cx('job-info-container')}>
                    <div className={cx('account-info-container')}>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Hồ sơ cá nhân
                                </span>
                            </div>
                        </div>
                        <div className={cx('user-info-wrapper')}>
                            <div className={cx('user-avatar-wrapper')}>
                                <Image className={cx('user-avatar')} src={resumeInfo?.user_id?.profile_image || ''} fallback={assets.UserImage}></Image>
                            </div>
                            <div className={cx('user-info-container')}>
                                <div className={cx('user-name')}>
                                    <span>
                                        {resumeInfo?.user_id?.username}
                                    </span>
                                </div>
                                <div className={cx('user-job')}>
                                    <span>
                                        {resumeInfo?.desired_position || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('user-detail-info-wrapper')}>
                                    <FontAwesomeIcon className={cx('user-detail-info-icon')} icon={faLightbulb}></FontAwesomeIcon>
                                    <div className={cx('user-detail-info-title')}>
                                        <span>
                                            Kinh nghiệm:
                                        </span>
                                    </div>
                                    <div className={cx('user-detail-info')}>
                                        <span>
                                            {resumeInfo?.experience || 'Chưa xác định'}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('user-detail-info-wrapper')}>
                                    <FontAwesomeIcon className={cx('user-detail-info-icon')} icon={faUser}></FontAwesomeIcon>
                                    <div className={cx('user-detail-info-title')}>
                                        <span>
                                            Cấp bậc:
                                        </span>
                                    </div>
                                    <div className={cx('user-detail-info')}>
                                        <span>
                                            {resumeInfo?.desired_job_level || 'Chưa xác định'}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('user-detail-info-wrapper')}>
                                    <FontAwesomeIcon className={cx('user-detail-info-icon')} icon={faDollarSign}></FontAwesomeIcon>
                                    <div className={cx('user-detail-info-title')}>
                                        <span>
                                            Mức lương mong muốn:
                                        </span>
                                    </div>
                                    <div className={cx('user-detail-info')}>
                                        <span>
                                            {(resumeInfo?.salary_min && resumeInfo?.salary_max) ? (`${resumeInfo?.salary_min} - ${resumeInfo?.salary_max}`) : ("Chưa xác định")}
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('user-detail-info-wrapper')}>
                                    <FontAwesomeIcon className={cx('user-detail-info-icon')} icon={faCalendar}></FontAwesomeIcon>
                                    <div className={cx('user-detail-info-title')}>
                                        <span>
                                            Ngày cập nhật:
                                        </span>
                                    </div>
                                    <div className={cx('user-detail-info')}>
                                        <span>
                                            {formatDate(resumeInfo?.updatedAt) || "Chưa xác định"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('buttons-wrapper')}>
                            <button className={cx('like-button')} onClick={()=>{navigate(`/resume/${resumeInfo?._id}`)}}>
                                <FontAwesomeIcon className={cx('like-icon')} icon={faPen}></FontAwesomeIcon>
                                Chỉnh sửa hồ sơ
                            </button>
                        </div>
                    </div>
                    <div className={cx('attached-profile-wrapper')}>
                        <div className={cx('title-wrapper')}>
                            <div className={cx('title')}>
                                <span>
                                    Hồ sơ đính kèm ({(attachedResume || [])?.length})
                                </span>
                            </div>
                        </div>
                        <div className={cx('attach-profile-container')}>
                            {
                                (attachedResume || []).map((resume, index)=>(
                                    <PdfPreviewer type='update' onEdit={handleEditResume} onDelete={handleDeleteResume} data={resume} key={index} pdfUrl={resume?.attached_file} updatedAt={resume?.updatedAt} title={resume?.desired_position || 'Hồ sơ đính kèm'}></PdfPreviewer>
                                ))
                            }
                        </div>
                        <div className={cx('buttons-wrapper')}>
                            <ResumeModal type="add" email={email} onSubmitModal={handleAddResume} resumeType='attached'></ResumeModal>
                        </div>
                    </div>
                </div>
                
                <div className={cx('account-detail-container')}>
                    <div className={cx('title-wrapper')}>
                        <div className={cx('title')}>
                            <span>
                                Nhà tuyển dụng đã xem
                            </span>
                        </div>
                    </div>
                    <div className={cx('section-ten')}>
                        <div className={cx('separator')}>
                        </div>
                        {
                            (currentDoctors || []).map((resume,index)=>(
                                <UserItem key={index} data={resume}></UserItem>
                            ))
                        }
                        <Pagination
                            totalPosts={(displayedJobPost || []).length}
                            postsPerPage={docPerPage}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        ></Pagination>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobProfile;