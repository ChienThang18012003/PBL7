import classNames from 'classnames/bind';
import styles from './Resume.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBriefcase, faLightbulb, faUserGraduate, faCertificate, faLanguage, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate, useParams } from 'react-router-dom';
import ExperienceItem from '../../components/ExperienceItem';
import EducationItem from '../../components/EducationItem';
import CertificateItem from '../../components/CertificateItem';
import LanguageItem from '../../components/LanguageItem';
import MajorItem from '../../components/MajorItem';
import AccountModal from '../../components/AccountModal';
import useResume from '../../hook/useResume';
import ResumeModal from '../../components/ResumeModal';
import useExperienceDetail from '../../hook/useExperienceDetail';
import useEducationDetail from '../../hook/useEducationDetail';
import useCertificate from '../../hook/useCertificate';
import useLanguageSkill from '../../hook/useLanguageSkill';
import useAdvanceSkill from '../../hook/useAdvanceSkill';
import ExperienceModal from '../../components/ExperienceModal';
import EducationModal from '../../components/EducationModal';
import CertificateModal from '../../components/CertificateModal';
import LanguageModal from '../../components/LanguageModal';
import MajorModal from '../../components/MajorModal';


const cx = classNames.bind(styles);

function Resume() {
    const { id } = useParams();
    const infoRef = useRef(null);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhoneNum] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [martial_status, setMartialStatus] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [city_id, setCityID] = useState('');
    const [district_id, setDistrictID] = useState('');

    const [career_goal, setCareerGoal] = useState('');
    const [desired_position, setDesiredPosition] = useState('');
    const [desired_job_level, setDesiredJobLevel] = useState('');
    const [academic_level, setAcademicLevel] = useState('');
    const [experience, setExperience] = useState('');
    const [career_id, setCareerID] = useState('');
    const [career, setCareer] = useState('');
    const [job_city, setJobCity] = useState('');
    const [job_city_id, setJobCityID] = useState('');
    const [salary_min, setSalaryMin] = useState('');
    const [salary_max, setSalaryMax] = useState('');
    const [job_type, setJobType] = useState('');
    const [type_of_workplace, setWorkPlace] = useState('');
    const [resumeInfo, setResumeInfo] = useState({});
    const [expDetail, setExpDetail] = useState([]);
    const [eduDetail, setEduDetail] = useState([]);
    const [certificate, setCertificate] = useState([]);
    const [languageSkill, setLanguageSkill] = useState([]);
    const [advanceSkill, setAdvanceSkill] = useState([]);
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail
    ] = useAccount();
    const [resumeLoading, resumeHook, getResume, getAttachedResume, getDefaultResume, getResumeByEmail, addResume, updateResume] = useResume();
    const [experienceDetailLoading, experienceDetailHook, getExpDetailByResume, addExpDetail, updateExpDetail, deleteExpDetail] = useExperienceDetail();
    const [educationDetailLoading, educationDetailHook, getEduDetailByResume, addEduDetail, updateEduDetail, deleteEduDetail] = useEducationDetail();
    const [certificateLoading, certificateHook, getCertificateByResume, addCertificate, updateCertificate, deleteCertificate] = useCertificate();
    const [languageSkillLoading, languageSkillHook, getLanguageSkillByResume, addLanguageSkill, updateLanguageSkill, deleteLanguageSkill] = useLanguageSkill();
    const [advanceSkillLoading, advanceSkillHook, getAdvanceSkillByResume, addAdvanceSkill, updateAdvanceSkill, deleteAdvanceSkill] = useAdvanceSkill();

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoginSuccess'));
    useEffect(() => {
        
        if (!isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj.email);
                setUserInfo(AccountInfo);
                
                if (AccountInfo) {
                    setUserName(AccountInfo?.username || '');
                    setPhoneNum(AccountInfo?.phone|| '');
                    setEmail(AccountInfo?.email|| '');
                    setGender(AccountInfo?.gender|| '');
                    setMartialStatus(AccountInfo?.martial_status|| '');
                    setAddress(AccountInfo?.location_id?.address|| '');
                    setCity(AccountInfo?.location_id?.city_id?.name || '');
                    setDistrict(AccountInfo?.location_id?.district_id?.name || '');
                    setCityID(AccountInfo?.location_id?.city_id?._id || '');
                    setDistrictID(AccountInfo?.location_id?.district_id?._id || '');
                    
                    if (AccountInfo?.date_of_birth) {
                        const birthDate = new Date(AccountInfo?.date_of_birth);
                        if (!isNaN(birthDate)) {
                            setBirthday(toDateInputFormat(birthDate));
                        } else {
                            console.error("Invalid date format in AccountInfo.date_of_birth");
                        }
                    }
                }
                
            }
        };
        const fetchResume = async() => {
            const resume = await getResume(id);
            setResumeInfo(resume);
            if (resume) {
                setCareerGoal(resume?.career_goal || '');
                setDesiredPosition(resume?.desired_position || '');
                setDesiredJobLevel(resume?.desired_job_level || '');
                setAcademicLevel(resume?.academic_level || '');
                setExperience(resume?.experience || '');
                setCareer(resume?.career_id?.career_name || '');
                setCareerID(resume?.career_id?._id || '');
                setJobCity(resume?.city_id?.name || '');
                setJobCityID(resume?.city_id?._id || '');
                setSalaryMin(resume?.salary_min || '');
                setSalaryMax(resume?.salary_max || '');
                setJobType(resume?.job_type || '');
                setWorkPlace(resume?.type_of_workplace || '');
            }
        }
        const fetchExperienceDetail = async() => {
            const expDetail = await getExpDetailByResume(id);
            if (expDetail) setExpDetail(expDetail);
        }
        const fetchEducationDetail = async() => {
            const eduDetail = await getEduDetailByResume(id);
            if (eduDetail) setEduDetail(eduDetail);
        }
        const fetchCertificate = async() => {
            const certificate = await getCertificateByResume(id);
            if (certificate) setCertificate(certificate);
        }
        const fetchLanguageSkill = async() => {
            const language = await getLanguageSkillByResume(id);
            if (language) setLanguageSkill(language);
        }
        const fetchAdvanceSkill = async() => {
            const skill = await getAdvanceSkillByResume(id);
            if (skill) setAdvanceSkill(skill);
        }
        fetchAccount();
        fetchResume();
        fetchExperienceDetail();
        fetchEducationDetail();
        fetchCertificate();
        fetchLanguageSkill();
        fetchAdvanceSkill();
    }, []);

    function toDateInputFormat(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const createUserObject = () => {
        return {
            username,
            phone,
            gender,
            date_of_birth: birthday,
            martial_status,
            address,
            city_id,
            district_id,
            city,
            district,
        };
    };

    const createResumeObject = () => {
        return {
            career_goal,
            desired_position,
            desired_job_level,
            academic_level,
            experience,
            salary_min,
            salary_max,
            job_type,
            type_of_workplace,
            job_city_id,
            career_id,
            job_city,
            career,
            resumeID: resumeInfo?._id
        };
    };

    const createExperienceObject = () => {
        return {
            resume_id: resumeInfo?._id
        }
    }

    const createEducationObject = () => {
        return {
            resume_id: resumeInfo?._id
        }
    }

    const createCertificateObject = () => {
        return {
            resume_id: resumeInfo?._id
        }
    }

    const createLanguageObject = () => {
        return {
            resume_id: resumeInfo?._id
        }
    }

    const createMajorObject = () => {
        return {
            resume_id: resumeInfo?._id
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmitModal = async(submitedObject) => {
        setUserName(submitedObject?.username || '');
        setPhoneNum(submitedObject?.phone || '');
        setGender(submitedObject?.gender || '');
        setMartialStatus(submitedObject?.martial_status || '');
        setAddress(submitedObject?.address || '');
        setCity(submitedObject?.city || '');
        setDistrict(submitedObject?.district || '');
        setCityID(submitedObject?.city_id || '');
        setDistrictID(submitedObject?.district_id || '');
        
        if (submitedObject?.date_of_birth) {
            const birthDate = new Date(submitedObject?.date_of_birth);
            if (!isNaN(birthDate)) {
                setBirthday(toDateInputFormat(birthDate));
            } else {
                console.error("Invalid date format in submitedObject.date_of_birth");
            }
        }
    }

    const handleSubmitExperience = (submittedObject) =>{
        if (!submittedObject) return;

        setExpDetail((prev) => [...prev, submittedObject]);
    }

    const handleSubmitEducation = (submittedObject) =>{
        if (!submittedObject) return;

        setEduDetail((prev) => [...prev, submittedObject]);
    }

    const handleSubmitCertificate = (submittedObject) =>{
        if (!submittedObject) return;

        setCertificate((prev) => [...prev, submittedObject]);
    }

    const handleSubmitLanguage = (submittedObject) =>{
        if (!submittedObject) return;

        setLanguageSkill((prev) => [...prev, submittedObject]);
    }

    const handleSubmitMajor = (submittedObject) =>{
        if (!submittedObject) return;

        setAdvanceSkill((prev) => [...prev, submittedObject]);
    }

    const handleDeleteExperience = (returnObject) => {
        if (!returnObject || !returnObject.id) return;

        setExpDetail((prev) =>
            prev.filter((item) => item._id !== returnObject.id)
        );
    }

    const handleDeleteEducation = (returnObject) => {
        if (!returnObject || !returnObject.id) return;

        setEduDetail((prev) =>
            prev.filter((item) => item._id !== returnObject.id)
        );
    }

    const handleDeleteCertificate = (returnObject) => {
        if (!returnObject || !returnObject.id) return;

        setCertificate((prev) =>
            prev.filter((item) => item._id !== returnObject.id)
        );
    }

    const handleDeleteLanguage = (returnObject) => {
        if (!returnObject || !returnObject.id) return;

        setLanguageSkill((prev) =>
            prev.filter((item) => item._id !== returnObject.id)
        );
    }

    const handleDeleteMajor = (returnObject) => {
        if (!returnObject || !returnObject.id) return;

        setAdvanceSkill((prev) =>
            prev.filter((item) => item._id !== returnObject.id)
        );
    }

    const handleSubmitResume = async(submitedObject) => {
        setCareerGoal(submitedObject?.career_goal || '');
        setDesiredJobLevel(submitedObject?.desired_job_level || '');
        setDesiredPosition(submitedObject?.desired_position || '');
        setAcademicLevel(submitedObject?.academic_level || '');
        setExperience(submitedObject?.experience || '');
        setJobCity(submitedObject?.city || '');
        setCareer(submitedObject?.career || '');
        setJobCityID(submitedObject?.city_id || '');
        setCareerID(submitedObject?.career_id || '');
        setSalaryMin(submitedObject?.salary_min || '');
        setSalaryMax(submitedObject?.salary_max || '');
        setJobType(submitedObject?.job_type || '');
        setWorkPlace(submitedObject?.type_of_workplace || '')
    }

    useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;

        const isNearBottom = scrollY + windowHeight >= fullHeight - 160;

        if (infoRef.current) {
            if (isNearBottom) {
                infoRef.current.classList.add(styles.hidden);
            } else {
                infoRef.current.classList.remove(styles.hidden);
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);
      
    return (
        <div className={cx('wrapper')}>
            <div className={cx('popular-company-container')}>
                <div className={cx('section-eleven')}>
                    <div className={cx('account-detail-container')} id="personal-info">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Thông tin cá nhân
                                    </span>
                                </div>
                                <AccountModal data={createUserObject()} onSubmitModal={handleSubmitModal}  type="update" userInfo={userInfo}></AccountModal>
                            </div>
                            <div className={cx('job-details-three')}>
                                <div className={cx('job-detail-wrapper-two')}>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Họ và tên
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {username || "Chưa xác định"}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Số điện thoại
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {phone || "Chưa xác định"}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Giới tính
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {gender || "Chưa xác định"}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Ngày sinh
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {formatDate(birthday) || "Chưa xác định"}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('job-detail-wrapper-two')}>
                                    <div className={cx('job-detail-container-two')}>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Tỉnh/Thành phố
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {city || "Chưa xác định"}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Quận/Huyện
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {district || "Chưa xác định"}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Địa chỉ
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {address || "Chưa xác định"}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Tình trạng hôn nhân
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {martial_status || "Chưa xác định"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="general-info">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Thông tin chung
                                    </span>
                                </div>
                                <ResumeModal onSubmitModal={handleSubmitResume} data={createResumeObject()}></ResumeModal>
                            </div>
                            <div className={cx('job-details-four')}>
                                <div className={cx('job-detail-container-three')}>
                                    <div className={cx('job-detail-title')}>
                                        Mục tiêu nghề nghiệp
                                    </div>
                                    <div className={cx('job-detail')}>
                                        {career_goal || 'Chưa xác định'}
                                    </div>
                                </div>
                            </div>
                            <div className={cx('job-details-three')}>
                                <div className={cx('job-detail-wrapper-two')}>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Vị trí mong muốn
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {desired_position || 'Chưa xác định'}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Cấp bậc mong muốn
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {desired_job_level || 'Chưa xác định'}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Trình độ học vấn
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {academic_level || 'Chưa xác định'}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Kinh nghiệm
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {experience || 'Chưa xác định'}
                                        </div>
                                    </div>
                                    <div className={cx('job-detail-container')}>
                                        <div className={cx('job-detail-title')}>
                                            Nghề nghiệp
                                        </div>
                                        <div className={cx('job-detail')}>
                                            {career || 'Chưa xác định'}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('job-detail-wrapper-two')}>
                                    <div className={cx('job-detail-container-two')}>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Địa điểm làm việc
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {job_city || 'Chưa xác định'}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Mức lương mong muốn
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {(salary_min && salary_max) ? (`${salary_min} - ${salary_max}`) : ("Chưa xác định")}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Nơi làm việc
                                            </div>
                                            <div className={cx('job-detail')}>
                                                {type_of_workplace || 'Chưa xác định'}
                                            </div>
                                        </div>
                                        <div className={cx('job-detail-container')}>
                                            <div className={cx('job-detail-title')}>
                                                Hình thức làm việc
                                            </div>
                                            <div className={cx('job-detail')}>
                                               {job_type || 'Chưa xác định'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="experience">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Kinh nghiệm làm việc
                                    </span>
                                </div>
                                <ExperienceModal data={createExperienceObject()} type="add" onSubmitModal={handleSubmitExperience}></ExperienceModal>
                            </div>
                            <div className={cx('milestone-wrapper')}>
                                {
                                    (expDetail || []).map((experience, index)=>(
                                        <ExperienceItem data={experience} key={index} onDeleteExperience={handleDeleteExperience}></ExperienceItem>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="education">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Thông tin học vấn
                                    </span>
                                </div>
                                <EducationModal data={createEducationObject()} type="add" onSubmitModal={handleSubmitEducation}></EducationModal>
                            </div>
                            <div className={cx('milestone-wrapper')}>
                                {
                                    (eduDetail || []).map((education, index)=>(
                                        <EducationItem data={education} key={index} onDeleteEducation={handleDeleteEducation}></EducationItem>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="certificate">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Chứng chỉ
                                    </span>
                                </div>
                                <CertificateModal data={createCertificateObject()} type="add" onSubmitModal={handleSubmitCertificate}></CertificateModal>
                            </div>
                            <div className={cx('milestone-wrapper')}>
                                {
                                    (certificate || []).map((data, index)=>(
                                        <CertificateItem data={data} key={index} onDeleteCertificate={handleDeleteCertificate}></CertificateItem>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="language">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Kỹ năng ngôn ngữ
                                    </span>
                                </div>
                                <LanguageModal data={createLanguageObject()} type="add" onSubmitModal={handleSubmitLanguage}></LanguageModal>
                            </div>
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
                                        <LanguageItem data={data} key={index} onDeleteLanguage={handleDeleteLanguage}></LanguageItem>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-detail-container')} id="major">
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Kỹ năng chuyên môn
                                    </span>
                                </div>
                                <MajorModal data={createMajorObject()} type="add" onSubmitModal={handleSubmitMajor}></MajorModal>
                            </div>
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
                                        <MajorItem data={data} key={index} onDeleteteMajor={handleDeleteMajor}></MajorItem>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={infoRef} className={cx('account-info-container')}>
                    <div className={cx('title-wrapper')}>
                        <div className={cx('title')}>
                            <span>
                                Hồ sơ trực tuyến
                            </span>
                        </div>
                    </div>
                    <div className={cx('link-buttons-wrapper')}>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('personal-info');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faUser}></FontAwesomeIcon>
                            Thông tin cá nhân
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('general-info');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faBriefcase}></FontAwesomeIcon>
                            Thông tin chung
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('experience');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faLightbulb}></FontAwesomeIcon>
                            Kinh nghiệm làm việc
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('education');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faUserGraduate}></FontAwesomeIcon>
                            Thông tin học vấn
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('certificate');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faCertificate}></FontAwesomeIcon>
                            Chứng chỉ
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('language');
                            const offset = -160;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faLanguage}></FontAwesomeIcon>
                            Kỹ năng ngôn ngữ
                        </button>
                        <button className={cx('link-button')}
                        onClick={() => {
                            const element = document.getElementById('major');
                            const offset = -200;

                            if (element) {
                            const top = element.getBoundingClientRect().top + window.scrollY + offset;
                            window.scrollTo({ top, behavior: 'smooth' });
                            }
                        }}>
                            <FontAwesomeIcon className={cx('link-button-icon')} icon={faScrewdriverWrench}></FontAwesomeIcon>
                            Kỹ năng chuyên môn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume;