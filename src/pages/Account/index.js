import classNames from 'classnames/bind';
import styles from './Account.module.scss';
import Modal from '../../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faSave, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import useAccount from '../../hook/useAccount';
import { useLocation, useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import FeedbackItem from '../../components/FeedbackItem';
import AccountModal from '../../components/AccountModal';
import useLocate from '../../hook/useLocate';
import useFeedback from '../../hook/useFeedback';
import FeedbackModal from '../../components/FeedbackModal';
import useResumeApplied from '../../hook/useResumeApplied';
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function Account() {

    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [userInfo, setUserInfo] = useState({});
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhoneNum] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [martial_status, setMartialStatus] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [city_id, setCityID] = useState('');
    const [district_id, setDistrictID] = useState('');
    const [feedback, setFeedback] = useState({});
    const [isFeedback, setIsFeedback] = useState(false);
    
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail
    ] = useAccount();
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [job_start_date, setJobStartDate] = useState(null);
    const [job_end_date, setJobEndDate] = useState(null);
    const [applyChartData, setApplyChartData] = useState({});
    const [resumeStatusChartData, setResumeStatusChartData] = useState({});
    const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation] = useLocate();
    const [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback] = useFeedback();
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied, countResumeAppliedByUser, statisticResumeAppliedByDate, statisticResumeAppliedByStatus] = useResumeApplied();

    const navigate = useNavigate();

    const isLoggedIn = JSON.parse(localStorage.getItem('isLoginSuccess'));

    useEffect(() => {
        
        if (!isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    useEffect(()=>{
        const fetchEmail = () =>{
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email) setEmail(obj?.email);
            }
        }
        fetchEmail();
    },[])

    function formatDateToYYYYMMDD(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

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
        const fetchFeedback = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email) {
                    const feedback = await getSpecificFeedback(obj?.email);
                    console.log(feedback);
                    if (feedback) {setFeedback(feedback); setIsFeedback(true);} else setIsFeedback(false);
                }
            }
        }
        const fetchAccount = async () => {
            let item = localStorage.getItem('isLoginSuccess');
            
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj.email);
                setUserInfo(AccountInfo);
                
                if (AccountInfo) {
                    setUserName(AccountInfo?.username || '');
                    setPhoneNum(AccountInfo?.phone|| '');
                    setGender(AccountInfo?.gender|| '');
                    setMartialStatus(AccountInfo?.martial_status|| '');
                    setAddress(AccountInfo?.location_id?.address|| '');
                    setCity(AccountInfo?.location_id?.city_id?.name || '');
                    setDistrict(AccountInfo?.location_id?.district_id?.name || '');
                    setCityID(AccountInfo?.location_id?.city_id?._id || '');
                    setDistrictID(AccountInfo?.location_id?.district_id?._id || '');
                    setRole(AccountInfo?.role)
                    
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
        fetchFeedback();
    }, []);

    useEffect(()=>{
        const fetchResumeStatusChart = async() => {
            const resumeStatusChartData = await statisticResumeAppliedByStatus(email);
            if (resumeStatusChartData) setResumeStatusChartData(resumeStatusChartData);
        }
        const fetchApplyChart = async() => {
            const applyChartData = await statisticResumeAppliedByDate(email);
            if (applyChartData) setApplyChartData(applyChartData);
        }
        if (email) {
            fetchResumeStatusChart();
            fetchApplyChart();
        }
    },[email])

    useEffect(() => {
        const fetchResumeStatusChart = async() => {
            const newUserChartData = await statisticResumeAppliedByStatus(email, formatDateToYYYYMMDD(start_date), formatDateToYYYYMMDD(end_date));
            if (newUserChartData) setResumeStatusChartData(newUserChartData);
        }
        if (start_date && end_date) {
            if (new Date(start_date) > new Date(end_date)) {
                setEndDate(start_date); 
            } else {
                fetchResumeStatusChart();
            }
        }
        if (start_date && !end_date) {

        }
        if (!start_date && end_date) {

        }
    }, [start_date, end_date]);

    useEffect(() => {
        const fetchApplyChart = async() => {
            const newJobChartData = await statisticResumeAppliedByDate(email, formatDateToYYYYMMDD(job_start_date), formatDateToYYYYMMDD(job_end_date));
            if (newJobChartData) setApplyChartData(newJobChartData);
        }
        if (job_start_date && job_end_date) {
            if (new Date(job_start_date) > new Date(job_end_date)) {
                setJobEndDate(job_start_date); 
            } else {
                fetchApplyChart();
            }
        }
        if (job_start_date && !job_end_date) {

        }
        if (!job_start_date && job_end_date) {

        }
    }, [job_start_date, job_end_date]);

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

    const handleDeleteFeedback = async(submitedObject) => {
        setFeedback({});
        setIsFeedback(false);
    }

    const handleUpdateFeedback = async(submitedObject) => {
        setFeedback(submitedObject);
    }

    const handleAddFeedback = async(submitedObject) => {
        if (submitedObject && typeof submitedObject === 'object') {
            setFeedback(submitedObject);
            setIsFeedback(true);
        }
    }

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
            locationInfo = await changeLocation(userInfo?.location_id?._id, city, district_id, address);
        }
        else {
            if (city && district) {
                locationInfo = await addLocation(city, district_id, address)
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

    if (loadingAccount || locationLoading || feedbackLoading || resumeAppliedLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('popular-company-container')}>
                <div className={cx('account-container')}>
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
                                <button className={cx('upload-button-wrapper')} onClick={() => fileInputRef.current && fileInputRef.current.click()}>
                                    <FontAwesomeIcon icon={faUpload} className={cx('upload-icon')}></FontAwesomeIcon>
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
                                Vai trò
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
                    <div className={cx('account-info-container')}>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Apply status chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={start_date} onChange={(e)=>{setStartDate(e.target.value)}} max={end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={end_date} onChange={(e)=>{setEndDate(e.target.value)}} min={start_date || undefined}>
                                </input>
                            </div>
                            <Bar
                                data = {{
                                labels: (resumeStatusChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: 'Count',
                                        data: (resumeStatusChartData?.count || []).map((data)=>data),
                                        backgroundColor: [
                                            '#d0414d',
                                            '#ff9870',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ],
                                        borderColor: [
                                            '#d0414d',
                                            '#ff9870',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ]
                                    }
                                ]
                                }}
                                    options={{
                                    responsive: false,
                                    plugins: {
                                        legend: {
                                        labels: {
                                            generateLabels: (chart) => {
                                            const labels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                                            return labels.map(label => ({
                                                ...label,
                                                fillStyle: '#000'
                                            }));
                                            }
                                        }
                                        }
                                    }
                                    }}
                                width={520}
                                height={250}
                                style={{'marginTop': '20px'}}
                            >
                            </Bar>
                        </div>
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
                            {
                                isFeedback && (
                                    <div className={cx('feedback-wrapper')}>
                                        <FeedbackItem data={feedback} onSubmitFeedBack={handleUpdateFeedback} onDeleteFeedback={handleDeleteFeedback}></FeedbackItem>
                                    </div>
                                )
                            }
                            <div className={cx('action-info-wrapper')}>
                                <button className={cx('like-button')}
                                    onClick={() => {
                                        const userConfirmed = window.confirm("Bạn có chắc muốn đăng xuất không ?")
                                        if (userConfirmed) {
                                            localStorage.removeItem('isLoginSuccess');
                                            localStorage.removeItem('chatMessages')
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
                                {
                                    !isFeedback && (
                                        <FeedbackModal type='add' onSubmitModal={handleAddFeedback}></FeedbackModal>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('account-info-container')}>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Apply status chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={start_date} onChange={(e)=>{setStartDate(e.target.value)}} max={end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={end_date} onChange={(e)=>{setEndDate(e.target.value)}} min={start_date || undefined}>
                                </input>
                            </div>
                            <Line
                                data = {{
                                labels: (applyChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Application",
                                        data: (applyChartData?.appliedCounts || []).map((data)=>data),
                                        backgroundColor: '#ff3030',
                                        borderColor: '#ff3030'
                                    }
                                ]
                                }}
                                style={{'marginTop': '20px'}}
                                width={520}
                                height={250}
                                options={{
                                    responsive: false
                                }}
                            >
                            </Line>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;