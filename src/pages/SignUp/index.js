import classNames from 'classnames/bind';
import styles from './SignUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useCity from '../../hook/useCity';
import useDistrict from '../../hook/useDistrict';
import useCareer from '../../hook/useCareer';
import useLocate from '../../hook/useLocate';
import useCompany from '../../hook/useCompany';


const cx = classNames.bind(styles);

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isEmployerAccount, setIsEmployerAccount] = useState(false);
    const [isSignUpForm, setIsSignUpForm] = useState(true);
    const [confirmPassword, setConFirmPassword] = useState('');
    const [isConfirmVisible, setIsConfirmVisible] = useState(false);
    const [ , signUp] = useAccount();
    const [userName, setUserName] = useState('');
    const [cityLoading, cityHook] = useCity();
    const [selectedEmployeeSize, setSelectedEmployeeSize] = useState('');
    const [selectedCareer, setSelectedCareer] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [careerLoading, careerHook, getAllCareers] = useCareer();
    const [displayedDistricts, setDisplayedDistricts] = useState([]);
    const [companyName, setCompanyName] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyTaxCode, setCompanyTaxCode] = useState('');
    const [companyWebsite, setCompanyWebsite] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [establishedDate, setEstablishedDate] = useState(null);
    const [companyHook, loading, getAllCompanies, addCompany] = useCompany();
    const [locationLoading, locationHook, getAllLocations, addLocation] = useLocate();
    const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity] = useDistrict();
    const navigate = useNavigate();

    const decodeToken = (token) => {
        try {
            const payload = token.split('.')[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error('Token decode failed:', error);
            return null;
        }
    };

    function toDateInputFormat(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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

    const handleEstablishedChange = (e) => {
        const date = new Date(e.target.value);
        if (!isNaN(date)) {
            setEstablishedDate(formatDate(date));
        }
    };

    useEffect(()=>{
        const fetchDistrict = async() => {
            if (selectedCity != "") {
                const allDistricts = await getAllDistrictsByCity(selectedCity);
                if (allDistricts && Array.isArray(allDistricts)) setDisplayedDistricts(allDistricts);
            } 
        }
        fetchDistrict();
    },[selectedCity])

    const handleSignUpAccount = async() => {
        if (companyName === '') {
            toast.warning("Vui lòng nhập tên công ty!");
            return;
        }
        else if (companyEmail === ''){
            toast.warning("Vui lòng nhập email công ty!");
            return;
        }
        else if (companyPhone === ''){
            toast.warning("Vui lòng nhập số điện thoại công ty!");
            return;
        }
        else if (companyTaxCode === ''){
            toast.warning("Vui lòng nhập mã số thuế của công ty!");
            return;
        }
        else if (establishedDate === null){
            toast.warning("Vui lòng chọn ngày thành lập công ty!");
            return;
        }
        else if (selectedCareer === ''){
            toast.warning("Vui lòng chọn lĩnh vực hoạt động!");
            return;
        }
        else if (selectedEmployeeSize === ''){
            toast.warning("Vui lòng chọn quy mô công ty!");
            return;
        }
        else if (companyWebsite === '') {
            toast.warning("Vui lòng nhập website của công ty!");
            return;
        }
        else if (selectedCity === ''){
            toast.warning("Vui lòng chọn tỉnh/thành phố!");
            return;
        }
        else if (selectedDistrict === '') {
            toast.warning("Vui lòng chọn quận/huyện!");
            return;
        }
        else if (companyAddress === ''){
            toast.warning("Vui lòng nhập địa chỉ!");
            return;
        }
        else {
            const SignUpInfo = await signUp(email, password, userName, isEmployerAccount);
            if (SignUpInfo && typeof SignUpInfo === 'object') {
                localStorage.setItem('SignUpInfo', JSON.stringify(SignUpInfo));
                const LocationInfo = await addLocation(selectedCity, selectedDistrict, companyAddress, true);
                if (LocationInfo && typeof LocationInfo === 'object') {
                    const decoded = decodeToken(SignUpInfo?.token);
                    const userID = decoded?._id || null;
                    const CompanyInfo = await addCompany(selectedCareer, companyName, companyPhone, companyEmail, selectedEmployeeSize, companyTaxCode, userID, LocationInfo?._id, companyWebsite, establishedDate, true);
                    if (CompanyInfo && typeof CompanyInfo === 'object') {
                        alert("Đăng ký tài khoản thành công, vui lòng kiểm tra email để kích hoạt tài khoản!");
                        navigate('/sign-in');
                    }
                    else if (CompanyInfo && typeof CompanyInfo !== 'object') {
                        toast.error(CompanyInfo);
                    }
                    else {
                        toast.error("Đăng ký tài khoản thất bại, vui lòng thử lại sau!");
                    }
                }
                else if (LocationInfo && typeof LocationInfo !== 'object') {
                    toast.error(LocationInfo);
                }
                else {
                    toast.error("Đăng ký tài khoản thất bại, vui lòng thử lại sau!");
                }
            }
            else if (SignUpInfo && typeof SignUpInfo !== 'object') {
                toast.error(SignUpInfo);
            }
            else {
                toast.error("Đăng ký tài khoản thất bại, vui lòng thử lại sau!");
            }
        }
    }

    const handleSubmitSignUp = async() => {
        if (userName === ''){
            toast.warning("Vui lòng nhập Họ và tên!");
            return;
        } 
        else if (password === ''){
            toast.warning("Vui lòng nhập mật khẩu!");
            return;
        }
        else if (confirmPassword === ''){
            toast.warning("Vui lòng nhập lại mật khẩu!");
            return;
        }
        else if (email === ''){
            toast.warning("Vui lòng nhập email!");
            return;
        }
        else if (confirmPassword !== password){
            toast.warning("Mật khẩu nhập lại không chính xác!");
            return;
        }
        if (isEmployerAccount) {
            setIsSignUpForm(!isSignUpForm);
        }
        else {
            const SignUpInfo = await signUp(email, password, userName, isEmployerAccount);
            if (SignUpInfo && typeof SignUpInfo === 'object') {
                localStorage.setItem('SignUpInfo', JSON.stringify(SignUpInfo));
                alert("Đăng ký tài khoản thành công, vui lòng kiểm tra email để kích hoạt tài khoản!")
                    navigate('/sign-in');
            }
            else if (SignUpInfo && typeof SignUpInfo !== 'object') {
                toast.error(SignUpInfo);
            }
            else {
                toast.error("Đăng ký tài khoản thất bại, vui lòng thử lại sau!");
            }
        }
    }

    return (
        <div className={cx('wrapper')}>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={cx('login-background')}>
                <Image className={cx('background')} src={assets.JobBackground}></Image>
            </div>
            { isSignUpForm ? (
                <div className={cx('login-form')}>
                    <div className={cx('sign-up-title')}>
                        <span>
                            Đăng ký
                        </span>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Họ và tên
                            </span>
                        </div>
                        <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} className={cx('field-inp')} placeholder="Nhập họ và tên"></input>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Email
                            </span>
                        </div>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className={cx('field-inp')} placeholder="Nhập email"></input>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Mật khẩu
                            </span>
                        </div>
                        <input type={ isVisible ? "text" : "password"} className={cx('field-pass')} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Nhập mật khẩu"></input>
                        <FontAwesomeIcon icon={ isVisible ? faEyeSlash : faEye} className={cx('input-icon')} onClick={()=>setIsVisible(!isVisible)}></FontAwesomeIcon>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Xác nhận mật khẩu
                            </span>
                        </div>
                        <input type={ isConfirmVisible ? "text" : "password"} className={cx('field-pass')} value={confirmPassword} onChange={(e) => setConFirmPassword(e.target.value)} placeholder="Nhập xác nhận mật khẩu"></input>
                        <FontAwesomeIcon icon={isConfirmVisible ? faEyeSlash : faEye} className={cx('input-icon')} onClick={()=>setIsConfirmVisible(!isConfirmVisible)}></FontAwesomeIcon>
                    </div>
                    <div className={cx('check-box-wrapper')}>
                        <input type="checkbox" checked={isEmployerAccount} onChange={(e)=>setIsEmployerAccount(!isEmployerAccount)} className={cx('check-box')}></input>
                        <div className={cx('field-title')}>
                            <span>
                                Tài khoản nhà tuyển dụng
                            </span>
                        </div>
                    </div>
                    <button className={cx('sign-up-button')} onClick={handleSubmitSignUp}>
                        TIẾP TỤC
                    </button>
                    <div className={cx('sign-up-link-wrapper')}>
                        <div className={cx('sign-in-title')}>
                            <span>
                                Đã có tài khoản?
                            </span>
                        </div>
                        <a className={cx('sign-up-link')}>
                            <span>
                                Đăng nhập
                            </span>
                        </a>
                    </div>
                </div>
            ) : (
                <div className={cx('company-form')}>
                    <div className={cx('sign-up-title')}>
                        <span>
                            Thông tin công ty
                        </span>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Tên công ty
                            </span>
                        </div>
                        <input type="text" className={cx('field-inp')} placeholder="Nhập tên công ty" value={companyName} onChange={(e)=>setCompanyName(e.target.value)}></input>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Email công ty
                            </span>
                        </div>
                        <input type="email" className={cx('field-inp')} placeholder="Nhập email" value={companyEmail} onChange={(e)=>setCompanyEmail(e.target.value)}></input>
                    </div>
                    <div className={cx('company-field-container')}>
                        <div className={cx('field-container-two')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Số điện thoại
                                </span>
                            </div>
                            <input type="text" className={cx('field-inp')} placeholder="Nhập số điện thoại" value={companyPhone} onChange={(e)=>setCompanyPhone(e.target.value)}></input>
                        </div>
                        <div className={cx('field-container-two')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Mã số thuế
                                </span>
                            </div>
                            <input type="text" className={cx('field-inp')} placeholder="Nhập mã số thuế" value={companyTaxCode} onChange={(e)=>setCompanyTaxCode(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={cx('company-field-container')}>
                        <div className={cx('field-container-three')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Ngày thành lập
                                </span>
                            </div>
                            <input type="date" className={cx('field-inp')} value={establishedDate ? toDateInputFormat(new Date(establishedDate)) : ''} onChange={handleEstablishedChange} ></input>
                        </div>
                        <div className={cx('field-container-four')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Lĩnh vực hoạt động
                                </span>
                            </div>
                            <select className={cx('field-inp')} name="career" value={selectedCareer} onChange={(e)=>{setSelectedCareer(e.target.value)}}>
                                <option key={'1'} value={''}>
                                </option>
                                {(careerHook || []).map((career) => (
                                    <option key={career?._id} value={career?._id}>
                                        {career?.career_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={cx('company-field-container')}>
                        <div className={cx('field-container-three')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Quy mô công ty
                                </span>
                            </div>
                            <select className={cx('field-inp')} name="employee-size" value={selectedEmployeeSize} onChange={(e)=>{setSelectedEmployeeSize(e.target.value)}}>
                                <option key='0' value=''>
                                </option>
                                <option key='1' value='1 - 9 nhân viên'>
                                    1 - 9 nhân viên
                                </option>
                                <option key='2' value='10 - 24 nhân viên'>
                                    10 - 24 nhân viên
                                </option>
                                <option key='3' value='25 - 99 nhân viên'>
                                    25 - 99 nhân viên
                                </option>
                                <option key='4' value='100 - 499 nhân viên'>
                                    100 - 499 nhân viên
                                </option>
                                <option key='5' value='500 - 1000 nhân viên'>
                                    500 - 1000 nhân viên
                                </option>
                                <option key='6' value='1000+ nhân viên'>
                                    1000+ nhân viên
                                </option>
                                <option key='7' value='5000+ nhân viên'>
                                    5000+ nhân viên
                                </option>
                                <option key='8' value='10000+ nhân viên'>
                                    10000+ nhân viên
                                </option>
                            </select>
                        </div>
                        <div className={cx('field-container-four')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Website
                                </span>
                            </div>
                            <input type="text" className={cx('field-inp')} placeholder="Nhập website công ty" value={companyWebsite} onChange={(e)=>setCompanyWebsite(e.target.value)}></input>
                        </div>
                    </div>
                    <div className={cx('company-field-container')}>
                        <div className={cx('field-container-four')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Tỉnh/Thành phố
                                </span>
                            </div>
                            <select className={cx('field-inp')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                                <option key={'1'} value={''}>
                                </option>
                                {(cityHook || []).map((city) => (
                                    <option key={city?._id} value={city?.name}>
                                        {city?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('field-container-three')}>
                            <div className={cx('field-title')}>
                                <span>
                                    Quận/Huyện
                                </span>
                            </div>
                            <select className={cx('field-inp')} name="district" value={selectedDistrict} onChange={(e)=>setSelectedDistrict(e.target.value)}>
                                <option key={'1'} value={''}>
                                </option>
                                {(displayedDistricts || []).map((district) => (
                                    <option key={district?._id} value={district?._id}>
                                        {district?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={cx('field-container')}>
                        <div className={cx('field-title')}>
                            <span>
                                Địa chỉ
                            </span>
                        </div>
                        <input type="text" className={cx('field-inp')} placeholder="Nhập địa chỉ" value={companyAddress} onChange={(e)=>setCompanyAddress(e.target.value)}></input>
                    </div>
                    <div className={cx('button-wrapper')}>
                        <button className={cx('sign-up-button-two')} onClick={()=>{setIsSignUpForm(!isSignUpForm)}}>
                            QUAY LẠI
                        </button>
                        <button className={cx('sign-up-button-two')} onClick={handleSignUpAccount}>
                            ĐĂNG KÝ
                        </button>
                    </div>
                    <div className={cx('sign-up-link-wrapper')}>
                        <div className={cx('sign-in-title')}>
                            <span>
                                Đã có tài khoản?
                            </span>
                        </div>
                        <a className={cx('sign-up-link')}>
                            <span>
                                Đăng nhập
                            </span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}

export default SignUp;