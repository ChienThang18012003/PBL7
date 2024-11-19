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
import { faQuestion, faMagnifyingGlass, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import Account_API from '../../API/Account_API';
import { useNavigate } from 'react-router-dom';
import ListModal from '../../components/ListModal';
import useAppointment from '../../hook/useAppointment';


const cx = classNames.bind(styles);

function Profile() {
    const [image, setImage] = useState();

    const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID, filterDoctorList, getAccountByEmail, checkAccountType, uploadProof, changePassword, getDoctorActiveList, addDoctorActiveHour, changeAccountInfo, changeDoctorInfo] = useAccount();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality] = useSpeciality();
    const [regionLoading, regionHook] = useRegion();
    const [appointmentLoading, appointmentHook, addAppointment, getAllAppointmentByUserID, cancelAppointment] = useAppointment();
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
    const [doctorActiveList, setDoctorActiveList] = useState([]);
    const [appointmentInfo, setAppointmentInfo] = useState([]);

    const navigate = useNavigate();

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
            
            // Nếu item tồn tại, chuyển đổi từ chuỗi JSON thành đối tượng
            if (item) {
                let obj = JSON.parse(item);
                const AccountInfo = await getAccountByEmail(obj.email);
                setUserInfo(AccountInfo);  // Set userInfo
                const AppointmentInfo = await getAllAppointmentByUserID(AccountInfo._id);
                console.log("AppointmentInfo: ", AppointmentInfo);
                setAppointmentInfo(AppointmentInfo);

                
                
                // Cập nhật các state khác như username, address, phone, email sau khi nhận dữ liệu
                if (AccountInfo) {
                    setUserName(AccountInfo.username);
                    setPhoneNum(AccountInfo.phone);
                    setAddress(AccountInfo.address);
                    setEmail(AccountInfo.email);
                    setUnderlyingCondition(AccountInfo.underlying_condition);
                    
                    // Kiểm tra và chuyển đổi date_of_birth
                    if (AccountInfo.date_of_birth) {
                        const birthDate = new Date(AccountInfo.date_of_birth);
                        if (!isNaN(birthDate)) {
                            setBirthday(toDateInputFormat(birthDate)); // Use `yyyy-MM-dd` for the date input
                        } else {
                            console.error("Invalid date format in AccountInfo.date_of_birth");
                        }
                    }

                    // Gán profile_image cho state image
                    if (AccountInfo.profile_image) {
                        const imageFile = {
                            preview: `data:image/jpeg;base64,${AccountInfo.profile_image}`,
                        };
                        setImage(imageFile); // Gọi hàm setImage với object chứa link preview
                    }
                    
                }

                const handleBirthdayChange = (e) => {
                    const date = new Date(e.target.value);
                    if (!isNaN(date)) {
                        setBirthday(formatDate(date)); // Converts to MM/dd/yyyy
                    }
                };
                
    
                const AccountType = await checkAccountType(AccountInfo._id);
                console.log("Account type: ", AccountType);
                if (AccountType.role === "Doctor") {
                    setIsDoctor(true);
                    setAccountRole("Doctor");
                    setDocFaculty(AccountInfo.speciality_id.name);
                    setDocRegion(AccountInfo.region_id.name);
                    setDocBio(AccountInfo.bio);
                    const DoctorActiveList = await getDoctorActiveList(AccountInfo._id);
                    setDoctorActiveList(DoctorActiveList);
                }
            }
        };
        fetchAccount();
    }, []);
    

    const handlePreviewImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
    };

    function formatDate(date) {
        if (!(date instanceof Date)) {
            throw new Error('Invalid date object');
        }
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, '0'); // Ngày trong tháng
        const year = date.getFullYear(); // Năm
    
        return `${month}/${day}/${year}`;
    }

    function base64ToFile(base64, fileName) {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    }
    

    const handleSubmitAccountInfo = async () => {
        console.log("Image before processing: ", image);
    
    
        // Nếu không upload ảnh mới và `userInfo.profile_image` tồn tại dạng Base64
        if (userInfo.profile_image) {
            console.log("case 1");
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
        else {
            await changeAccountInfo(
                userInfo._id, 
                userName, 
                phoneNum, 
                underlyingCondition, 
                birthday, 
                address,
                image
            );
        }
        
    
        if (isDoctor) {
            console.log("Doc Faculty: ", docFaculty);
            console.log("Doc Region: ", docRegion);
            console.log("Doc Bio: ", docBio);
    
            await changeDoctorInfo(userInfo._id, docFaculty, docRegion, docBio);
        }
    };
    
    
    
    
    
    
    const handleBirthdayChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setBirthday(formatDate(date)); // Converts to MM/dd/yyyy
        }
    };
    

    return (
        <div className={cx('wrapper')}>
            <PageTitle>TÀI KHOẢN CÁ NHÂN</PageTitle>
            <div className={cx('image-container')}>
                 <img className={cx('background-img')} src="https://media.gettyimages.com/id/1312706413/photo/modern-hospital-building.jpg?s=612x612&w=gi&k=20&c=1-EC4Mxf--5u4ItDIzrIOrduXlbKRnbx9xWWtiifrDo="></img>
                 <div className={cx('profile-image-container')}>
                    {userInfo.profile_image ? (
                        <img 
                            src={`data:image/jpeg;base64,${userInfo.profile_image}`}
                            alt="User Profile" 
                            className={cx('profile-image')}
                        />
                    ) : (
                        image && (
                            <img 
                                name="image" 
                                src={image.preview} 
                                alt="Uploaded Preview" 
                                className={cx('profile-image')} 
                            />
                        )
                    )}
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
                            <span>{userInfo.username}</span>
                        </div>
                        <div className={cx('phone-number')}>
                            <span>+ {userInfo.phone}</span>
                        </div>
                        <div className={cx('email')}>
                            <span>{userInfo.email}</span>
                        </div>
                        <ListModal data={appointmentInfo}>+ Danh sách cuộc hẹn</ListModal>
                     </div>
                     <div className={cx('buttons-container')}>
                        <Button primary onClick={handleSubmitAccountInfo}>Lưu</Button>
                        <Button primary onClick={()=>{navigate('/')}}>Thoát</Button>
                     </div>
                </div>
                <div className={cx('main-info-container')}>
                     <div className={cx('personal-info-container')}>
                            <div className={cx('info-title-container')}>
                                <div className={cx('info-title')}>
                                  <span>THÔNG TIN CÁ NHÂN</span>
                                </div>
                                <InsuranceModal>BHYT</InsuranceModal>
                            </div>
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
                                    {regionHook.map((region) => (
                                        <option value = {region.name}>{region.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Chuyên khoa</span>
                                </div>
                                <select className={cx('field-input')} value={docFaculty} onChange={(e)=>{setDocFaculty(e.target.value)}} disabled={!isDoctor}>
                                    {specialityHook.map((speciality) => (
                                        <option value = {speciality.name}>{speciality.name}</option>
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
                                     <select className={cx('half-field-input')}>
                                     {doctorActiveList.map((item) => (
                                        <option key={item._id} value={`${item.day} ${item.start_time} ${item.end_time}`}>
                                            {`${item.day} ${item.start_time} - ${item.end_time}`}
                                        </option>
                                     ))}
                                     </select>
                                     <DateModal disabled={!isDoctor} data={userInfo}>Thêm</DateModal>
                                </div>
                            </div>
                     </div>
                     <div className={cx('account-info-container')}>
                            <div className={cx('info-title-container')}>
                                <div className={cx('info-title')}>
                                  <span>THÔNG TIN TÀI KHOẢN</span>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Email</span>
                                </div>
                                <input className={cx('field-input')} value={email} onChange={(e) => {setEmail(e.target.value)}} readOnly></input>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                     <span>Mật khẩu</span>
                                </div>
                                <div className={cx('button-content-container')}>
                                     <input className={cx('half-field-input')}></input>
                                     <Modal data={userInfo}>Đổi</Modal>
                                </div>
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