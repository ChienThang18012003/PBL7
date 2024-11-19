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

const cx = classNames.bind(styles);

function SpecialityInfo(){
    const {id} = useParams();
    const docId = "6732198c5f49322d376d3e3b";
    const speciality = "Khoa phục hồi chức năng";
    const [specialityLoading, specialityHook, getSpecialityByID] = useSpeciality();
    const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList] = useAccount();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
    const [relatedDoctors, setRelatedDoctors] = useState([]);
    const [specialityInfo, setSpecialityInfo] = useState({});

    const maxVisible = 6; 
    const maxDoctorVisible = 4;

    const visibleSpecialities = specialityHook.slice(currentIndex, currentIndex + maxVisible);

    useEffect(() => {
        const fetchSpecialityInfo = async () => {
            const SpecialityInfo = await getSpecialityByID(id); // Chờ kết quả từ API
            setSpecialityInfo(SpecialityInfo); // Gán kết quả vào state
            console.log("SpecialityID: ", id);
            console.log("specialityInfo: ", SpecialityInfo);
    
            if (SpecialityInfo?.name) {
                const RelatedDoctors = await filterDoctorList(SpecialityInfo.name);
                setRelatedDoctors(RelatedDoctors);
                console.log("RelatedDoctors: ", RelatedDoctors);
                
            }
        };
    
        fetchSpecialityInfo();
    }, [id]); // Thêm `specialityId` làm dependency

    useEffect(() => {
        console.log("relatedDoctors: ", relatedDoctors);
    }, [relatedDoctors]);

    const visibleDoctors = relatedDoctors.slice(currentDoctorIndex, currentDoctorIndex + maxDoctorVisible);
    console.log("Visible Doctors: ",visibleDoctors);
    

    const handleBack = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Xử lý sự kiện khi nhấn nút fort
    const handleForward = () => {
        setCurrentIndex((prevIndex) =>
            Math.min(prevIndex + 1, specialityHook.length - maxVisible)
        );
    };

    const handleDoctorBack = () => {
        setCurrentDoctorIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    // Xử lý sự kiện khi nhấn nút fort
    const handleDoctorForward = () => {
        setCurrentDoctorIndex((prevIndex) =>
            Math.min(prevIndex + 1, relatedDoctors.length - maxDoctorVisible)
        );
    };

    

    

     return(
        <div className={cx('wrapper')}>
             <PageTitle>{specialityInfo.name?.toUpperCase()}</PageTitle>
             
                 <div className={cx('introduction-wrapper')}>
                    <div className={cx('rectangle')}>
                        <div className={cx('image-container')}>
                             <img className={cx('speciality-image')} src="https://tamnhatpharma.com/wp-content/uploads/2021/03/tiem-huyet-tuong-giau-tieu-cau-phuong-phap-dieu-tri-thoai-hoa-khop-hieu-qua-hien-nay1556008132.png"></img>
                        </div>
                    </div>
                    <div className={cx('speciality-info')}>
                    <div className={cx('title')}>
                             <span>GIỚI THIỆU</span>
                        </div>
                        <div className={cx('content')}>
                             <span>Các bệnh Cơ – Xương – Khớp là một nhóm bệnh thường gặp nhất trong mọi nhóm bệnh, có nguyên nhân và cơ chế bệnh sinh phức tạp, diễn tiến kéo dài liên quan đến nhiều bệnh lý nội ngoại khoa.
Các bệnh Cơ – Xương – Khớp rất phổ biến trên thế giới và cũng đang có xu hướng gia tăng nhanh ở Việt Nam.
Khoa Cơ – Xương – Khớp thuộc Phòng khám Bệnh viện Đại học Y Dược 1 với đội ngũ bác sĩ giàu kinh nghiệm đã và đang làm việc tại các bệnh viện lớn như (Bệnh viện Đại học Y Dược TP.HCM, Chợ Rẫy…). Khoa Cơ – Xương – Khớp của phòng khám quản lý, theo dõi và điều trị hiệu quả các bệnh lý về xương khớp, giúp người bệnh giảm bớt đau đớn và nhanh chóng hòa nhịp với cuộc sống hàng ngày.</span>
                        </div>
                    </div>
                 </div>
                 <div className={cx('major-activities-wrapper')}>
                    <div className={cx('speciality-info')}>
                        <div className={cx('title')}>
                             <span>HOẠT ĐỘNG CHUYÊN MÔN</span>
                        </div>
                        <div className={cx('content')}>
                             <span>Khoa Cơ – Xương – Khớp thuộc Phòng khám Bệnh viện Đại học Y Dược 1 hiện khám và điều trị các bệnh lý gồm:
- Các bệnh khớp thoái hóa: Thoái hóa khớp gối, thoái hóa cột sống, thoái hóa khớp háng, thoái hóa đa khớp, hoại tử chỏm xương đùi…
- Bệnh lý phần mềm và rối loạn ngoài khớp: Viêm gân cơ chóp xoay, viên gân gấp ngón tay (ngón tay cò súng), viêm mỏm trâm quay, viêm lồi cầu cánh tay, viêm cân gan chân, hội chứng ống cổ tay, thoát vị đĩa đệm…
- Các bệnh khớp chuyển hóa: Viêm khớp gout, viêm khớp giả gout…
- Loãng xương và các biến chứng liên quan.</span>
                        </div>
                    </div>
                 </div>
            <PageTitle>CÁC KHOA KHÁC</PageTitle>
            <div className={cx('other-specialities-wrapper')}>
                <button className={cx('back-button')}>
                    <FontAwesomeIcon icon={faBackward} className={cx('button-icon')} onClick={handleBack}></FontAwesomeIcon>
                </button>
                <div className={cx('other-specialities')}>
                    {visibleSpecialities.map((speciality, index) => (
                        <OtherSpeciality key={index} data={speciality} />
                    ))}
                </div>
                <button className={cx('fort-button')}>
                    <FontAwesomeIcon icon={faForward} className={cx('button-icon')} onClick={handleForward}></FontAwesomeIcon>
                </button>
            </div>
            <PageTitle2>BÁC SĨ THUỘC CHUYÊN KHOA</PageTitle2>
            <div className={cx('speciality-doctor')}>
                <button className={cx('back-button')} onClick={handleDoctorBack}>
                    <FontAwesomeIcon icon={faBackward} className={cx('button-icon')}></FontAwesomeIcon>
                </button>
                 <div className={cx('related-doctors-container')}>
                 {visibleDoctors.map((doctor) => (
                     <RelatedDoctors key={doctor._id} docId={doctor._id} speciality={doctor?.speciality_id?.name}/>
                 ))}
                 </div>
                 <button className={cx('fort-button')} onClick={handleDoctorForward}>
                    <FontAwesomeIcon icon={faForward} className={cx('button-icon')}></FontAwesomeIcon>
                </button>
            </div>
        </div>
     )
}

export default SpecialityInfo;