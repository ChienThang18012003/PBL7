import classNames from 'classnames/bind';
import styles from './SpecialityInfo.module.scss';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import OtherSpeciality from '../../components/OtherSpeciality';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faQuestion, faMagnifyingGlass, faUpload, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import PageTitle2 from '../../components/PageTitle2';
import RelatedDoctors from '../../components/RelatedDoctors/RelatedDoctors';
import useSpeciality from '../../hook/useSpeciality';
import { useEffect, useState } from 'react';
import useAccount from '../../hook/useAccount';
import { useParams } from 'react-router-dom';
import DoctorItem from '../../components/DoctorItem/DoctorItem';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';

const cx = classNames.bind(styles);

function SpecialityInfo(){
    const {id} = useParams();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality, getAllSpeciality] = useSpeciality();
    const [
        checkLogin, 
        signUp, 
        loadingAccount, 
        doctorsHook, 
        getAccountByID, 
        filterDoctorList, 
        getAccountByEmail, 
        checkAccountType, 
        uploadProof, 
        changePassword, 
        getDoctorActiveList, 
        addDoctorActiveHour, 
        changeAccountInfo, 
        changeDoctorInfo, 
        searchDoctor, 
        forgotPassword, 
        getDoctorList, 
        deleteDoctorActiveHour, 
        updateDoctorActiveHour,
        softDeleteAccount,
        getFilterDoctorList,
        getAccountStatus
        ] = useAccount();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const [specialityInfo, setSpecialityInfo] = useState({});
    const [specialityDes, setSpecialityDes] = useState({});
    const [specialityName, setSpecialityName] = useState("");
    const [otherSpecialities, setOtherSpecialities] = useState([]);

    const maxVisible = 6; 
    const maxDoctorVisible = 4;

    function splitText(text) {
        const validText = text || '';
        const sections = validText.split(/(?=GIỚI THIỆU|DỊCH VỤ)/g);
        
        const result = {
            introduction: '',
            service: ''
        };
    
        sections.forEach(section => {
            if (section.startsWith('GIỚI THIỆU')) {
                result.introduction = section.replace('GIỚI THIỆU', '').trim();
            } else if (section.startsWith('DỊCH VỤ')) {
                result.service = section.replace('DỊCH VỤ', '').trim();
            }
        });
    
        return result;
    }

    const renderService = (content) => {
        
        const displayedContent = (content || '').split('\n').map((exp, index) => {
            return (
                <p key={index} style={{ marginLeft: '20px' }}>
                    + {exp}
                </p>
            );
        });
    
        return displayedContent;
    };

    const renderIntroduction = (content) => { 
        return (content || '').split('\n').map((line, index) => (
            <div className={cx('blog-content')} key={index}>
                
                <span>{line.trim()}</span>
            </div>
        ));
    }

    useEffect(() => {
        const fetchSpecialityInfo = async () => {
            const SpecialityInfo = await getSpecialityByID(id);
            if (SpecialityInfo) setSpecialityInfo(SpecialityInfo);
            if (SpecialityInfo && SpecialityInfo?.description){
                setSpecialityDes(splitText(SpecialityInfo?.description));
            }
    
            if (SpecialityInfo?.name) {
                const RelatedDoctors = await filterDoctorList(SpecialityInfo?.name);
                if (RelatedDoctors) setRelatedDoctors(RelatedDoctors);
                setSpecialityName(SpecialityInfo?.name);
            }

            const specialities = await getAllSpeciality();
            const Spec = (specialities || []).filter((speciality) => speciality?._id !== id);
            setOtherSpecialities(Spec);
        };
    
        fetchSpecialityInfo();

    }, [id]);

    useEffect(()=> {
        const fetchSpecialitiesAndDoctorsPeriodically = async () => {
            const specialities = await getAllSpeciality();
            if (specialities) setOtherSpecialities(specialities);
            if (specialityName) {
                const RelatedDoctors = await getFilterDoctorList(specialityName);
                if (RelatedDoctors) setRelatedDoctors(RelatedDoctors);
            }
        };

        const intervalId = setInterval(() => {
            fetchSpecialitiesAndDoctorsPeriodically();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [specialityName])


    const visibleDoctors = (relatedDoctors || []).slice(currentDoctorIndex, currentDoctorIndex + maxDoctorVisible);
    const visibleSpecialities = (otherSpecialities || []).slice(currentIndex, currentIndex + maxVisible);
    

    const handleBack = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleForward = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, specialityHook.length - maxVisible)
        );
    };

    const handleDoctorBack = () => {
        setCurrentDoctorIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleDoctorForward = () => {
        setCurrentDoctorIndex((prevIndex) =>
            Math.min(prevIndex + 1, relatedDoctors.length - maxDoctorVisible)
        );
    };

    
    if (loadingAccount || specialityLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )
    

     return specialityInfo && (
        <div className={cx('wrapper')}>
             <PageTitle>{specialityInfo?.name?.toUpperCase()}</PageTitle>
             
                 <div className={cx('introduction-wrapper')}>
                    <div className={cx('rectangle')}>
                        <div className={cx('image-container')}>
                             <Image className={cx('speciality-image')} src={specialityInfo?.speciality_image}></Image>
                        </div>
                    </div>
                    <div className={cx('speciality-info')}>
                        <div className={cx('title')}>
                             <span>GIỚI THIỆU</span>
                        </div>
                        <div className={cx('content')}>
                             <span>{renderIntroduction(specialityDes.introduction)}</span>
                        </div>
                    </div>
                 </div>
                 <div className={cx('major-activities-wrapper')}>
                    <div className={cx('speciality-info')}>
                        <div className={cx('title')}>
                             <span>DỊCH VỤ</span>
                        </div>
                        <div className={cx('content')}>
                             <span>{renderService(specialityDes.service)}</span>
                        </div>
                    </div>
                 </div>
            <div className={cx('related-info')}>
                <PageTitle>CÁC KHOA KHÁC</PageTitle>
                <div className={cx('other-specialities-wrapper')}>
                    {
                        (specialityHook || []).length > 6 && (
                            <button className={cx('back-button')}>
                                <FontAwesomeIcon icon={faBackward} className={cx('button-icon')} onClick={handleBack}></FontAwesomeIcon>
                            </button>
                        )
                    }
                    <div className={cx('other-specialities')}>
                        {visibleSpecialities.map((speciality, index) => (
                            <OtherSpeciality key={index} data={speciality} />
                        ))}
                    </div>

                    {
                        (specialityHook || []).length > 6 && (
                            <button className={cx('fort-button')}>
                                <FontAwesomeIcon icon={faForward} className={cx('button-icon')} onClick={handleForward}></FontAwesomeIcon>
                            </button>
                        )
                    }
                    
                </div>
                <PageTitle2>BÁC SĨ THUỘC CHUYÊN KHOA</PageTitle2>
                <div className={cx('speciality-doctor')}>
                    {
                        (relatedDoctors || []).length > 4 && (
                            <button className={cx('back-button')} onClick={handleDoctorBack}>
                                <FontAwesomeIcon icon={faBackward} className={cx('button-icon')}></FontAwesomeIcon>
                            </button>
                        )
                    }
                     <div className={cx('related-doctors-container')}>
                     {visibleDoctors.map((doctor) => (
                         <DoctorItem data={doctor}></DoctorItem>
                     ))}
                     </div>
                     {
                        (relatedDoctors || []).length > 4 && (
                            <button className={cx('fort-button')} onClick={handleDoctorForward}>
                                <FontAwesomeIcon icon={faForward} className={cx('button-icon')}></FontAwesomeIcon>
                            </button>
                        )
                     }
                </div>
            </div>
        </div>
     )
}

export default SpecialityInfo;