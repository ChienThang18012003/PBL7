import classNames from 'classnames/bind';
import styles from './ResumeInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCaretDown, faCaretUp, faEnvelopesBulk, faNewspaper, faBookmark, faMagnifyingGlass, faUser, faHeart as faHeartSolid, faChartSimple} from '@fortawesome/free-solid-svg-icons';
import { faHeart} from '@fortawesome/free-regular-svg-icons';
import { useState, useEffect, useRef } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import 'react-quill/dist/quill.snow.css';
import useLocate from '../../hook/useLocate';
import useResume from '../../hook/useResume';
import useExperienceDetail from '../../hook/useExperienceDetail';
import useEducationDetail from '../../hook/useEducationDetail';
import useCertificate from '../../hook/useCertificate';
import useLanguageSkill from '../../hook/useLanguageSkill';
import useAdvanceSkill from '../../hook/useAdvanceSkill';
import ExperienceItem from '../../components/ExperienceItem';
import EducationItem from '../../components/EducationItem';
import CertificateItem from '../../components/CertificateItem';
import LanguageItem from '../../components/LanguageItem';
import MajorItem from '../../components/MajorItem';
import PdfPreviewer from '../../components/PdfPreviewer';
import useResumeSaved from '../../hook/useResumeSaved';
import useResumeViewed from '../../hook/useResumeViewed';
import GmailModal from '../../components/GmailModal';


const cx = classNames.bind(styles);

function ResumeInfo() {
    const [isVisibleOne, setIsVisibleOne] = useState(true);
    const [isVisibleTwo, setIsVisibleTwo] = useState(true);
    const [isVisibleThree, setIsVisibleThree] = useState(true);
    const [isVisibleFour, setIsVisibleFour] = useState(true);
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);
    const [isClickedFour, setIsClickedFour] = useState(false);

    const {id} = useParams();

    const fileInputRef = useRef(null);

    const [resumeInfo, setResumeInfo] = useState('');

    const [expDetail, setExpDetail] = useState([]);
    const [eduDetail, setEduDetail] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const [languageSkill, setLanguageSkill] = useState([]);
    const [advanceSkill, setAdvanceSkill] = useState([]);
    const [email, setEmail] = useState('');

    const [experienceDetailLoading, experienceDetailHook, getExpDetailByResume, addExpDetail, updateExpDetail, deleteExpDetail] = useExperienceDetail();
    const [educationDetailLoading, educationDetailHook, getEduDetailByResume, addEduDetail, updateEduDetail, deleteEduDetail] = useEducationDetail();
    const [certificateLoading, certificateHook, getCertificateByResume, addCertificate, updateCertificate, deleteCertificate] = useCertificate();
    const [languageSkillLoading, languageSkillHook, getLanguageSkillByResume, addLanguageSkill, updateLanguageSkill, deleteLanguageSkill] = useLanguageSkill();
    const [advanceSkillLoading, advanceSkillHook, getAdvanceSkillByResume, addAdvanceSkill, updateAdvanceSkill, deleteAdvanceSkill] = useAdvanceSkill();
    const [resumeSavedLoading, resumeSavedHook, getResumeSavedByEmail, getSpecificResumeSaved, addResumeSaved, deleteResumeSaved] = useResumeSaved();
    const [resumeSaved, setResumeSaved] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    
    const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume, uploadAttachedFile] = useResume();
    const [resumeViewedLoading, resumeViewedHook, getResumeViewedByEmail, getSpecificResumeViewed, addResumeViewed, deleteResumeViewed] = useResumeViewed();

    let intervalId;

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchResume = async() => {
            const resume = await getResume(id);
            if (resume) setResumeInfo(resume);
        }
        const fetchSpecificResumeSaved = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email)
                    const resumeSaved = await getSpecificResumeSaved(id, obj?.email);
                    if (resumeSaved) {setIsSaved(true);setResumeSaved(resumeSaved);}
                    else {setIsSaved(false);}
                }
            }
        }
        fetchResume();
        fetchSpecificResumeSaved();
    },[id])

    useEffect(()=>{
        const fetchSpecificResumeViewed = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email && obj?.role === 'employer'){
                    const resumeViewed = await getSpecificResumeViewed(resumeInfo?.user_id?._id, obj?.email);
                    if (!resumeViewed) {
                        const resume = await addResumeViewed(resumeInfo?.user_id?._id, obj?.email);
                    }
                }
            }
        }
        const fetchExperienceDetail = async() => {
            const expDetail = await getExpDetailByResume(resumeInfo?._id);
            if (expDetail) setExpDetail(expDetail);
        }
        const fetchEducationDetail = async() => {
            const eduDetail = await getEduDetailByResume(resumeInfo?._id);
            if (eduDetail) setEduDetail(eduDetail);
        }
        const fetchCertificate = async() => {
            const certificate = await getCertificateByResume(resumeInfo?._id);
            if (certificate) setCertificate(certificate);
        }
        const fetchLanguageSkill = async() => {
            const language = await getLanguageSkillByResume(resumeInfo?._id);
            if (language) setLanguageSkill(language);
        }
        const fetchAdvanceSkill = async() => {
            const skill = await getAdvanceSkillByResume(resumeInfo?._id);
            if (skill) setAdvanceSkill(skill);
        }

        if (resumeInfo && resumeInfo?.user_id?._id) {
            fetchSpecificResumeViewed();
        }

        if (resumeInfo && resumeInfo?._id && resumeInfo?.is_default) {
            fetchExperienceDetail();
            fetchEducationDetail();
            fetchCertificate();
            fetchLanguageSkill();
            fetchAdvanceSkill();
        }
    }, [resumeInfo])

    const handleSaveResume = async() => {
        const resume = await addResumeSaved(resumeInfo?._id, email);
        if (resume) {
            setIsSaved(true);
            setResumeSaved(resume);
        }
    }

    const handleUnsaveResume = async() => {
        const resume = await deleteResumeSaved(resumeSaved?._id);
        if (resume) {
            setIsSaved(false);
            setResumeSaved([]);
        }
    }

    function formatToDateInputValue(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar')}>
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleFour(!isVisibleFour); setIsClickedFour(!isClickedFour)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedFour ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Bảng điều khiển
                        </span>
                    </div>
                </div>
                {
                    isVisibleFour && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faChartSimple}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Dashboard
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleOne(!isVisibleOne); setIsClickedOne(!isClickedOne)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedOne ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý đăng tuyển
                        </span>
                    </div>
                </div>
                {
                    isVisibleOne && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-job-post')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faEnvelopesBulk}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Danh sách tin đăng
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleTwo(!isVisibleTwo); setIsClickedTwo(!isClickedTwo)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedTwo ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý ứng viên
                        </span>
                    </div>
                </div>
                {
                    isVisibleTwo && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/resume-applied')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faNewspaper}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Hồ sơ ứng tuyển
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/resume-saved')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBookmark}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Hồ sơ đã lưu
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/candidate-search')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Tìm ứng viên mới
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleThree(!isVisibleThree); setIsClickedThree(!isClickedThree)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedThree ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý tài khoản
                        </span>
                    </div>
                </div>
                {
                    isVisibleThree && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-company')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBuilding}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Thông tin công ty
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-account')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faUser}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Thông tin tài khoản
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={cx('page-content')}>
                <div className={cx('resume-container')}>
                    <div className={cx('user-info-container')}>
                        <div className={cx('user-info-wrapper')}>
                            <div className={cx('user-avatar-wrapper')}><Image className={cx('user-avatar')} src={resumeInfo?.user_id?.profile_image || ''} fallback={assets.UserImage}></Image></div>
                            <div className={cx('detail-info-wrapper')}>
                                <div className={cx('user-name')}>
                                    <span>{resumeInfo?.user_id?.username}</span>
                                </div>
                                <div className={cx('user-position')}>
                                    <span>{resumeInfo?.desired_position}</span>
                                </div>
                                <div className={cx('user-position')}>
                                    <span>Cập nhật lần cuối: {formatToDateInputValue(resumeInfo?.updatedAt)}</span>
                                </div>
                                <div className={cx('button-container')}>
                                    {
                                        isSaved ? (
                                            <>
                                                <button className={cx('unsave-button')} onClick={handleUnsaveResume}>
                                                    <FontAwesomeIcon icon={faHeartSolid} className={cx('unsave-icon')}></FontAwesomeIcon>
                                                    Bỏ lưu hồ sơ
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className={cx('save-button')} onClick={handleSaveResume}>
                                                    <FontAwesomeIcon icon={faHeart} className={cx('save-icon')}></FontAwesomeIcon>
                                                    Lưu hồ sơ
                                                </button>
                                            </>
                                        )
                                    }
                                    <GmailModal receiverName={resumeInfo?.user_id?.username} receiverEmail={resumeInfo?.user_id?.email}></GmailModal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('personal-info-title')}>
                        <span>
                            Thông tin cá nhân
                        </span>
                    </div>
                    <div className={cx('personal-info-container')}>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Email
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.email || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Ngày sinh
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {formatToDateInputValue(resumeInfo?.user_id?.date_of_birth) || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Quận/Huyện
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.location_id?.district_id?.name || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Số điện thoại
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.phone || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Tình trạng hôn nhân
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.martial_status || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Địa chỉ
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.location_id?.address || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Giới tính
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.gender || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Tỉnh/Thành phố
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.user_id?.location_id?.city_id?.name || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('personal-info-title')}>
                        <span>
                            Thông tin chung
                        </span>
                    </div>
                    <div className={cx('personal-info-container')}>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Vị trí mong muốn
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.desired_position || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Kinh nghiệm
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.experience || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Mức lương mong muốn
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.salary_min + ' - ' + resumeInfo?.salary_max}
                                </span>
                            </div>
                        </div>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Cấp bậc mong muốn
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.desired_job_level || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Nghề nghiệp
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.career_id?.career_name || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Nơi làm việc
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.type_of_workplace || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                        <div className={cx('three-field-container')}>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Trình độ học vấn
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.academic_level || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Địa điểm làm việc
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.city_id?.name || 'Chưa xác định'}
                                </span>
                            </div>
                            <div className={cx('field-title-two')}>
                                <span>
                                    Hình thức làm việc
                                </span>
                            </div>
                            <div className={cx('field-data')}>
                                <span>
                                    {resumeInfo?.job_type || 'Chưa xác định'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('personal-info-title')}>
                        <span>
                            Mục tiêu nghề nghiệp
                        </span>
                    </div>
                    <div className={cx('career-goal-wrapper')}>
                        <div className={cx('field-data')}>
                            <span>
                                {resumeInfo?.career_goal || 'Chưa xác định'}
                            </span>
                        </div>
                    </div>
                    {
                        (resumeInfo?.is_default) ? (
                            <>
                                <div className={cx('personal-info-title')}>
                                    <span>
                                        Kinh nghiệm làm việc
                                    </span>
                                </div>
                                <div className={cx('detail-info-wrapper')}>
                                    <div className={cx('detail-info-container')}>
                                        <div className={cx('milestone-wrapper')}>
                                            {
                                                (expDetail || []).map((experience, index)=>(
                                                    <ExperienceItem data={experience} key={index} type="view"></ExperienceItem>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('personal-info-title')}>
                                    <span>
                                        Thông tin học vấn
                                    </span>
                                </div>
                                <div className={cx('detail-info-wrapper')}>
                                    <div className={cx('detail-info-container')}>
                                        <div className={cx('milestone-wrapper')}>
                                            {
                                                (eduDetail || []).map((education, index)=>(
                                                    <EducationItem data={education} key={index} type="view"></EducationItem>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('personal-info-title')}>
                                    <span>
                                        Chứng chỉ
                                    </span>
                                </div>
                                <div className={cx('detail-info-wrapper')}>
                                    <div className={cx('detail-info-container')}>
                                        <div className={cx('milestone-wrapper')}>
                                            {
                                                (certificate || []).map((data, index)=>(
                                                    <CertificateItem data={data} key={index} type="view"></CertificateItem>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('personal-info-title')}>
                                    <span>
                                        Kỹ năng ngôn ngữ
                                    </span>
                                </div>
                                <div className={cx('detail-info-wrapper')}>
                                    <div className={cx('detail-info-container')}>
                                        <div className={cx('skills-wrapper')}>
                                            <div className={cx('table-wrapper')}>
                                                <div className={cx('language')}>
                                                    <span>Ngôn ngữ</span>
                                                </div>
                                                <div className={cx('level')}>
                                                    <span>Trình độ</span>
                                                </div>
                                                <div className={cx('action')}>
                                                    <span>Hành động</span>
                                                </div>
                                            </div>
                                            {
                                                (languageSkill || []).map((data, index)=>(
                                                    <LanguageItem data={data} key={index} type="view"></LanguageItem>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('personal-info-title')}>
                                    <span>
                                        Kỹ năng chuyên môn
                                    </span>
                                </div>
                                <div className={cx('detail-info-wrapper')}>
                                    <div className={cx('detail-info-container')}>
                                        <div className={cx('skills-wrapper')}>
                                            <div className={cx('table-wrapper')}>
                                                <div className={cx('language')}>
                                                    <span>Ngôn ngữ</span>
                                                </div>
                                                <div className={cx('level')}>
                                                    <span>Trình độ</span>
                                                </div>
                                                <div className={cx('action')}>
                                                    <span>Hành động</span>
                                                </div>
                                            </div>
                                            {
                                                (advanceSkill || []).map((data, index)=>(
                                                    <MajorItem data={data} key={index} type="view"></MajorItem>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={cx('personal-info-title')}>
                                        <span>
                                            Hồ sơ đính kèm
                                        </span>
                                    </div>
                                <PdfPreviewer pdfUrl={resumeInfo?.attached_file} updatedAt={resumeInfo?.updatedAt} title={resumeInfo?.desired_position || 'Hồ sơ đính kèm'}></PdfPreviewer>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ResumeInfo;