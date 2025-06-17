import classNames from 'classnames/bind';
import styles from './AdminAccount.module.scss';
import Modal from '../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faUser, faSave, faRightFromBracket, faUsers, faCity, faMountainCity, faLocationDot, faFileInvoice, faImage, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import 'react-quill/dist/quill.snow.css';
import useLocate from '../../hook/useLocate';
import AccountModal from '../../components/AccountModal';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminAccount() {
    const [isVisibleOne, setIsVisibleOne] = useState(true);
    const [isVisibleTwo, setIsVisibleTwo] = useState(true);
    const [isVisibleThree, setIsVisibleThree] = useState(true);
    const [isVisibleFour, setIsVisibleFour] = useState(true);
    const [isVisibleFive, setIsVisibleFive] = useState(true);
    const [isVisibleSix, setIsVisibleSix] = useState(true);
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);
    const [isClickedFour, setIsClickedFour] = useState(false);
    const [isClickedFive, setIsClickedFive] = useState(false);
    const [isClickedSix, setIsClickedSix] = useState(false);

    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
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
    const [role, setRole] = useState('');
    
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail
    ] = useAccount();
    const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation] = useLocate();

    let intervalId;

    const navigate = useNavigate();

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
                    setRole(AccountInfo?.role || '')
                    
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
        fetchAccount();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

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

    const handleUpdateInfo = async() => {
        let locationInfo = {};
        if (userInfo?.location_id) {
            locationInfo = await changeLocation(userInfo?.location_id?._id, city, district, address);
        }
        else {
            if (city && district) {
                locationInfo = await addLocation(city, district, address)
            }
        }
        if (!image) {
            if (locationInfo?._id){
                const AccountInfo = await changeAccountInfo(
                userInfo?._id, 
                username, 
                phone, 
                martial_status, 
                birthday, 
                gender,
                locationInfo?._id,
                null
                );
                if (AccountInfo) alert("Cập nhật thông tin thành công!")
            }
            else {
                const AccountInfo = await changeAccountInfo(
                userInfo?._id, 
                username, 
                phone, 
                martial_status, 
                birthday, 
                gender,
                null,
                null
                );
                if (AccountInfo) alert("Cập nhật thông tin thành công!")
            }
        }
        else if (image) {
            if (locationInfo?._id){
                console.log("image",image);
                const AccountInfo = await changeAccountInfo(
                userInfo?._id, 
                username, 
                phone, 
                martial_status, 
                birthday, 
                gender,
                locationInfo?._id,
                image
                );
                if (AccountInfo) alert("Cập nhật thông tin thành công!")
            }
            else {
                console.log("image",image);
                const AccountInfo = await changeAccountInfo(
                userInfo?._id, 
                username, 
                phone, 
                martial_status, 
                birthday, 
                gender,
                null,
                image
                );
                if (AccountInfo) alert("Cập nhật thông tin thành công!")
            }
        }
    }

    if (loadingAccount || locationLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
                        <div className={cx('side-bar')}>
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleSix(!isVisibleSix); setIsClickedSix(!isClickedSix)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedSix ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Bảng điều khiển
                        </span>
                    </div>
                </div>
                {
                    isVisibleSix && (
                        <>
                            <div className={cx('drop-down-list')} onClick={()=>{navigate('/')}}>
                                <div className={cx('manager-button')}>
                                    <FontAwesomeIcon className={cx('button-icon')} icon={faChartSimple}></FontAwesomeIcon>
                                    <div className={cx('button-title')}>
                                        <span>
                                            Dashboard
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleOne(!isVisibleOne); setIsClickedOne(!isClickedOne)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedOne ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý tài khoản
                        </span>
                    </div>
                </div>
                {
                    isVisibleOne && (
                        <>
                            <div className={cx('drop-down-list')}>
                                <div className={cx('manager-button')} onClick={()=>{navigate('/admin-user')}}>
                                    <FontAwesomeIcon className={cx('button-icon')} icon={faUsers}></FontAwesomeIcon>
                                    <div className={cx('button-title')}>
                                        <span>
                                            Tài khoản người dùng
                                        </span>
                                    </div>
                                </div>
                                <div className={cx('manager-button')} onClick={()=>{navigate('/admin-account')}}>
                                    <FontAwesomeIcon className={cx('button-icon')} icon={faUser}></FontAwesomeIcon>
                                    <div className={cx('button-title')}>
                                        <span>
                                            Tài khoản cá nhân
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleTwo(!isVisibleTwo); setIsClickedTwo(!isClickedTwo)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedTwo ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý chung
                        </span>
                    </div>
                </div>
                {
                    isVisibleTwo && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-career')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Ngành nghề
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-city')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faCity}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Tỉnh/Thành phố
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-district')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faMountainCity}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Quận/Huyện
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-location')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faLocationDot}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Địa chỉ
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
                            Quản lý thông tin
                        </span>
                    </div>
                </div>
                {
                    isVisibleThree && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-company')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBuilding}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Công ty
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-resume')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faNewspaper}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Hồ sơ tìm việc
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleFour(!isVisibleFour); setIsClickedFour(!isClickedFour)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedFour ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý tin đăng
                        </span>
                    </div>
                </div>
                {
                    isVisibleFour && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-job-post')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faFileInvoice}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Tin đăng
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleFive(!isVisibleFive); setIsClickedFive(!isClickedFive)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedFive ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý giao diện
                        </span>
                    </div>
                </div>
                {
                    isVisibleFive && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-banner')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faImage}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Banner
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/admin-feedback')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faComment}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Phản hồi người dùng
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={cx('page-content')}>
                <div className={cx('account-info-container')}>
                    <div className={cx('title-wrapper')}>
                        <div className={cx('title')}>
                            <span>
                                Thông tin tài khoản
                            </span>
                        </div>
                    </div>
                    <div className={cx('avatar-wrapper')}>
                        <div className={cx('avatar-container')}>
                            <Image className={cx('avatar')} src={image?.preview || userInfo?.profile_image} alt="User Profile" fallback = {assets.UserImage}></Image>
                            <button className={cx('upload-button-wrapper')}>
                                <FontAwesomeIcon icon={faUpload} className={cx('upload-icon')} onClick={() => fileInputRef.current && fileInputRef.current.click()}></FontAwesomeIcon>
                            </button>
                            <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewImage} ref={fileInputRef}/>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            Email
                        </div>
                        <input type="text" className={cx('field-input')} value={email} readOnly>
                        </input>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            Role
                        </div>
                        <input type="text" className={cx('field-input')} value={role} readOnly>
                        </input>
                    </div>
                    <div className={cx('link-wrapper')}>
                        <Modal data={userInfo}>Đổi mật khẩu</Modal>
                    </div>
                    <div className={cx('buttons-wrapper')}>
                        <button className={cx('like-button')} onClick={handleUpdateInfo}>
                            <FontAwesomeIcon className={cx('like-icon')} icon={faSave}></FontAwesomeIcon>
                            Cập nhật
                        </button>
                    </div>
                </div>
                
                <div className={cx('account-container')}>
                    <div className={cx('account-detail-container')}>
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Thông tin cá nhân
                                    </span>
                                </div>
                                <AccountModal data={createUserObject()} onSubmitModal={handleSubmitModal}></AccountModal>
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
                    <div className={cx('account-detail-container-two')}>
                        <div className={cx('section-one')}>
                            <div className={cx('info-header')}>
                                <div className={cx('info-title')}>
                                    <span>
                                        Cài đặt tài khoản
                                    </span>
                                </div>
                            </div>
                            <div className={cx('action-info-wrapper')}>
                                <button className={cx('like-button')}
                                    onClick={() => {
                                        const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                        if (userConfirmed) {
                                            localStorage.removeItem('isLoginSuccess');
                                            if (window.location.pathname === '/account') {
                                                navigate('/sign-in', { replace: true });
                                            } else {
                                                navigate('/sign-in');
                                            }
                                            window.location.reload();
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon className={cx('like-icon')} icon={faRightFromBracket}></FontAwesomeIcon>
                                    Đăng Xuất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAccount;