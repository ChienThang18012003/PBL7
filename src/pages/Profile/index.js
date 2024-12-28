import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import DateModal from '../../components/DateModal';
import InsuranceModal from '../../components/InsuranceModal';
import ProofModal from '../../components/ProofModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faQuestion, faMagnifyingGlass, faUpload, faFloppyDisk, faRightFromBracket, faPen, faTrash, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import Account_API from '../../API/Account_API';
import { useNavigate } from 'react-router-dom';
import ListModal from '../../components/ListModal';
import useAppointment from '../../hook/useAppointment';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import ArticleListModal from '../../components/ArticleListModal';
import useArticles from '../../hook/useArticles';


const cx = classNames.bind(styles);

function Profile() {
    const [image, setImage] = useState();

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
        ] = useAccount();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality] = useSpeciality();
    const [regionLoading, regionHook] = useRegion();
    const [appointmentLoading, appointmentHook, addAppointment, getAllAppointmentByUserID, cancelAppointment, getAllAppointmentByDoctor] = useAppointment();
    const [
        articlesHook,
        firstArticle,
        fourArticles,
        loading,
        getArticlesByDoctor,
        getArticlesBySpecialty,
        getArticlesByID,
        addComment,
        addArticle,
        getFiveLatestArticles,
        getFourLatestArticles,
        searchArticle,
        getAllArticleByDoctor,
    ] = useArticles();
    const [userInfo, setUserInfo] = useState({});
    const [isDoctor, setIsDoctor] = useState(false);
    const [userName, setUserName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [address, setAddress] = useState('');
    const [underlyingCondition, setUnderlyingCondition] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [email, setEmail] = useState('');
    const [docFaculty, setDocFaculty] = useState('');
    const [docRegion, setDocRegion] = useState('');
    const [docBio, setDocBio] = useState('');
    const [accountRole, setAccountRole] = useState('User');
    const [doctorActiveList, setDoctorActiveList] = useState({});
    const [doctorActiveHours, setDoctorActiveHours] = useState([]);
    const [appointmentInfo, setAppointmentInfo] = useState([]);
    const [articleList, setArticleList] = useState([]);
    const [selectedHour, setSelectedHour] = useState("");
    let intervalId;

    const navigate = useNavigate();

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoginSuccess'));

    useEffect(() => {
        
        if (!isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    function toDateInputFormat(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    useEffect(() => {
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.adminAccess) {
                    setAccountRole('Admin');
                }
                const AccountInfo = await getAccountByEmail(obj.email);
                setUserInfo(AccountInfo);
                let AppointmentInfo;
                if (AccountInfo?.__t){
                    AppointmentInfo = await getAllAppointmentByDoctor(AccountInfo?._id);
                }
                else {
                    AppointmentInfo = await getAllAppointmentByUserID(AccountInfo?._id);
                }
                
                setAppointmentInfo(AppointmentInfo);
                if (AccountInfo) {
                    setUserName(AccountInfo?.username);
                    setPhoneNum(AccountInfo?.phone);
                    setAddress(AccountInfo?.address);
                    setEmail(AccountInfo?.email);
                    setUnderlyingCondition(AccountInfo?.underlying_condition);
                    
                    if (AccountInfo?.date_of_birth) {
                        const birthDate = new Date(AccountInfo?.date_of_birth);
                        if (!isNaN(birthDate)) {
                            setBirthday(toDateInputFormat(birthDate));
                        } else {
                            console.error("Invalid date format in AccountInfo.date_of_birth");
                        }
                    }
                }
                
    
                if (AccountInfo?.__t) {
                    setIsDoctor(true);
                    setAccountRole("Doctor");
                    if (AccountInfo?.speciality_id) setDocFaculty(AccountInfo?.speciality_id?.name);
                    if (AccountInfo?.region_id) setDocRegion(AccountInfo?.region_id?.name);
                    if (AccountInfo?.bio) setDocBio(AccountInfo?.bio);
                    const DoctorActiveList = await getDoctorActiveList(AccountInfo?._id);
                    setDoctorActiveList(DoctorActiveList);
                    setDoctorActiveHours(DoctorActiveList?.active_hours);
                    const ArticleList = await getAllArticleByDoctor(AccountInfo?.email);
                    setArticleList(ArticleList);
                }
            }
        };
        fetchAccount();
    }, []);

    useEffect(()=>{
        const fetchActiveHoursPeriodically = async () => {
            const activeHours = await getDoctorActiveList(userInfo?._id, false);
            if (activeHours) setDoctorActiveHours(activeHours?.active_hours);
        };

        if (isDoctor) {
            intervalId = setInterval(() => {
                fetchActiveHoursPeriodically();
            }, 5000);
        }

        return () => {
            clearInterval(intervalId);
        };
    },[isDoctor])

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validFileTypes = /image\/(jpeg|jpg|png|gif|bmp)/;
        if (!validFileTypes.test(file.type)) {
            alert("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif, hoặc .bmp!");
            return;
        }

        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    const handleActiveHourUpdate = async(newActiveHour, oldActiveHour) => {
        setDoctorActiveHours((prev) => {
            const updated = prev.filter(
              (hour) =>
                hour.day !== oldActiveHour.day &&
                hour.start_time !== oldActiveHour.start_time &&
                hour.end_time !== oldActiveHour.end_time
            );
            return [...updated, newActiveHour];
          });
    
        setSelectedHour(
          `${newActiveHour?.day} ${newActiveHour?.start_time} ${newActiveHour?.end_time} Limit: ${newActiveHour?.appointment_limit}`
        );

        const allAppointment = await getAllAppointmentByDoctor(userInfo?._id);
        setAppointmentInfo(allAppointment);
      };

    function parseSchedule(inputString) {
        const parts = inputString.split(' ');
    
        const day = parts[0];
        const start_time = parts[1];
        const end_time = parts[2];
        const appointment_limit = parts[4];
        const hour_type = parts[5];
    
        return {
            day,
            start_time,
            end_time,
            appointment_limit,
            hour_type
        };
    }

    const handleDeleteActiveHour = async() => {
        if (!selectedHour) {
            alert("Vui lòng chọn giờ làm việc cần xóa!");
            return;
        }

        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa giờ làm việc này không?");
        if (userConfirmed) {
            const hourValue = parseSchedule(selectedHour);
            const deletedActiveHour = await deleteDoctorActiveHour(userInfo?._id, hourValue?.day, hourValue?.start_time, hourValue?.end_time, hourValue?.hour_type);

            if (deletedActiveHour && typeof deletedActiveHour === 'object') {
                alert("Xóa giờ làm việc thành công!");
                const hourValue = parseSchedule(selectedHour);
                setDoctorActiveHours((prev) => {
                    return prev.filter(hour =>
                        hour?.day !== hourValue?.day &&
                        hour?.start_time !== hourValue?.start_time &&
                        hour?.end_time !== hourValue?.end_time
                    );
                });
                setSelectedHour("");
                const allAppointment = await getAllAppointmentByDoctor(userInfo?._id);
                setAppointmentInfo(allAppointment);
                return;
            }
            else if (deletedActiveHour && typeof deletedActiveHour === 'object') {
                alert(deletedActiveHour);
                return;
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
            }
        }
    }
    

    function formatDate(date) {
        if (!(date instanceof Date)) {
            throw new Error('Invalid date object');
        }
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
    
        return `${month}/${day}/${year}`;
    }

    const handleSubmitAccountInfo = async () => {
        if (!image) {
            await changeAccountInfo(
                userInfo._id, 
                userName, 
                phoneNum, 
                underlyingCondition, 
                birthday, 
                address,
                null
            );
        }
        else if (image) {

            await changeAccountInfo(
                userInfo?._id, 
                userName, 
                phoneNum, 
                underlyingCondition, 
                birthday, 
                address,
                image
            );
        }
        
    
        if (isDoctor) {
    
            await changeDoctorInfo(userInfo?._id, docFaculty, docRegion, docBio);
        }
        
        alert("Đổi thông tin thành công!");
        window.location.reload();
    };
    
    
    const handleAddActiveHour = (newActiveHour) => {
        setDoctorActiveHours(newActiveHour);
    };

    const handleDeleteAccount = async() => {
        const userConfirmed = window.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
        if (userConfirmed) {
            const deletedAccount = await softDeleteAccount(userInfo?._id);
            if (deletedAccount && typeof deletedAccount === 'object') {
                alert("Xóa tài khoản thành công, bạn sẽ được chuyển đến trang đăng nhập!");
                localStorage.removeItem('isLoginSuccess');
                if (window.location.pathname === '/profile') {
                    navigate('/login', { replace: true });
                } else {
                    navigate('/login');
                }
                window.location.reload();
            } else if (deletedAccount && typeof deletedAccount !== 'object') {
                alert(deletedAccount);
                return;
            }
            else {
                alert("Có lỗi xảy ra, vui lòng thử lại sau!");
                return;
            }
        }
    }
    
    
    
    const handleBirthdayChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setBirthday(formatDate(date));
        }
    };
    
    if (!isDoctor) {
        if (loadingAccount || appointmentLoading) {
            return (
                <LoadingAnimation></LoadingAnimation>
            )
        } 
    } else {
        if (loadingAccount || specialityLoading || regionLoading || appointmentLoading || loading) {
            return (
                <LoadingAnimation></LoadingAnimation>
            )
        }
    } 

    return (
        <div className={cx('wrapper')}>
            <PageTitle>TÀI KHOẢN CÁ NHÂN</PageTitle>
            <div className={cx('image-container')}>
                 <img className={cx('background-img')} src="https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo="></img>
                 <div className={cx('profile-image-container')}>
                 <Image 
                    src={image?.preview || userInfo?.profile_image || 'default-placeholder.jpg'}
                    alt="User Profile" 
                    className={cx('profile-image')}
                />

                 </div>
                 <div className={cx("file-upload")}>
                    <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewImage} />
                    <label htmlFor="file" className={cx("file-label")}>
                        <FontAwesomeIcon icon={faUpload} />
                    </label>
                 </div>
            </div>
            <div className={cx('user-info-container')}>
                <div className={cx('contact-info-container')}>
                     <div className={cx('contact-info')}>
                        <div className={cx('user-name')}>
                            <span>{userInfo?.username}</span>
                        </div>
                        <div className={cx('phone-number')}>
                            <span>+ {userInfo?.phone}</span>
                        </div>
                        <div className={cx('email')}>
                            <span>{userInfo?.email}</span>
                        </div>
                        <ListModal data={{appointment_list: appointmentInfo, is_doc: userInfo?.__t ? true : false, _id: userInfo?._id}}>+ Danh sách cuộc hẹn</ListModal>
                     </div>
                     <div className={cx('buttons-container')}>
                        <Button primary onClick={handleSubmitAccountInfo} leftIcon={<FontAwesomeIcon icon={faFloppyDisk} />}>Lưu</Button>
                        <Button primary onClick={handleDeleteAccount} leftIcon={<FontAwesomeIcon icon={faUserXmark} />}>Xóa</Button>
                     </div>
                </div>
                <div className={cx('main-info-container')}>
                     <div className={cx('personal-info-container')}>
                            <div className={cx('info-title-container')}>
                                <div className={cx('info-title')}>
                                  <span>THÔNG TIN CÁ NHÂN</span>
                                </div>
                            </div>
                            <div className={cx('separator')}></div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Họ và tên</span>
                                </div>
                                <input className={cx('field-input')} value={userName} onChange={(e) => {setUserName(e.target.value)}}></input>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Số điện thoại</span>
                                </div>
                                <input className={cx('field-input')} value={phoneNum} onChange={(e) => {setPhoneNum(e.target.value)}}></input>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Địa chỉ</span>
                                </div>
                                <input className={cx('field-input')} value={address} onChange={(e) => {setAddress(e.target.value)}}></input>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Ngày sinh</span>
                                </div>
                                <input 
                                    type="date" 
                                    className={cx('field-input')} 
                                    value={birthday ? toDateInputFormat(new Date(birthday)) : ''} 
                                    onChange={handleBirthdayChange}
                                />

                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Bệnh nền</span>
                                </div>
                                <textarea className={cx('field-textarea')} value={underlyingCondition} onChange={(e)=>{setUnderlyingCondition(e.target.value)}} ></textarea>
                            </div>
                     </div>
                     <div className={cx('doctor-info-container')}>
                            <div className={cx('info-title-container')}>
                                <div className={cx('info-title')}>
                                  <span>THÔNG TIN BÁC SĨ</span>
                                </div>
                                <ProofModal disabled={!isDoctor} data={userInfo}>Bằng cấp</ProofModal>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Cơ sở</span>
                                </div>
                                <select className={cx('field-input')} value={docRegion} onChange={(e)=>{setDocRegion(e.target.value)}} disabled={!isDoctor}>
                                    <option value="">Chọn vùng</option>
                                    {regionHook.map((region) => (
                                        <option value = {region?.name}>{region?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Chuyên khoa</span>
                                </div>
                                <select className={cx('field-input')} value={docFaculty} onChange={(e)=>{setDocFaculty(e.target.value)}} disabled={!isDoctor}>
                                    <option value="">Chọn chuyên khoa</option>
                                    {specialityHook.map((speciality) => (
                                        <option value = {speciality?.name}>{speciality?.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Giới thiệu</span>
                                </div>
                                <textarea className={cx('field-textarea')} value={docBio} onChange={(e)=>{setDocBio(e.target.value)}} disabled={!isDoctor}></textarea>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Giờ làm việc</span>
                                </div>
                                <div className={cx('button-content-container')}>
                                     <select className={cx('half-field-input')} disabled={!isDoctor} value={selectedHour} onChange={(e)=>{setSelectedHour(e.target.value)}}>
                                     <option key="1" value="">Chọn giờ làm việc</option>
                                     {(doctorActiveHours || []).map((item) => (
                                            <option key={item?._id} value={`${item?.day} ${item?.start_time} ${item?.end_time} Limit: ${item?.appointment_limit} ${item?.hour_type}`}>
                                            {`${item?.day} ${item?.start_time} - ${item?.end_time} Limit: ${item?.appointment_limit}`}
                                            </option>
                                        ))}
                                    </select>
                                     
                                </div>
                                
                            </div>
                            <div className={cx('manage-buttons-container')}>
                                <div className={cx('edit-buttons')}>
                                    <DateModal disabled={!isDoctor} data={userInfo} onAddActiveHour={handleAddActiveHour}>Thêm</DateModal>
                                    <DateModal disabled={!isDoctor || !selectedHour} data={userInfo} type="update" hourData={selectedHour} onUpdateActiveHour={handleActiveHourUpdate}>Sửa</DateModal>
                                    <Button type="button" disabled={!isDoctor || !selectedHour} primary onClick={handleDeleteActiveHour} leftIcon={<FontAwesomeIcon icon={faTrash} />}>Xóa</Button>
                                </div>
                                <div className={cx('field-name')}>
                                     <span>Quản lý bài báo</span>
                                </div>
                                <div className={cx('separator')}></div>
                                <ArticleListModal data={{article_list: articleList, email: userInfo?.email, is_doc: userInfo?.__t ? true : false}} disabled={!isDoctor} >+ Danh sách bài báo</ArticleListModal>
                            </div>
                     </div>
                     <div className={cx('account-info-container')}>
                            <div className={cx('info-title-container')}>
                                <div className={cx('info-title')}>
                                  <span>THÔNG TIN TÀI KHOẢN</span>
                                </div>
                                <Modal data={userInfo}>Đổi MK</Modal>

                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Email</span>
                                </div>
                                <input className={cx('field-input')} value={email} onChange={(e) => {setEmail(e.target.value)}} readOnly></input>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Loại tài khoản</span>
                                </div>
                                <input className={cx('field-input')} value={accountRole} readOnly></input>
                            </div>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;