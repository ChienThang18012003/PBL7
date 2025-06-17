import classNames from 'classnames/bind';
import styles from './AdminCompanyInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faUser, faPen, faSave, faUsers, faCity, faMountainCity, faLocationDot, faFileInvoice, faImage, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useCompany from '../../hook/useCompany';
import useDistrict from '../../hook/useDistrict';
import useCity from '../../hook/useCity';
import useCareer from '../../hook/useCareer';
import useLocate from '../../hook/useLocate';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminCompanyInfo() {
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
    const navigate = useNavigate();

    const {id} = useParams();

    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [lat, setLAT] = useState('');
    const [lng, setLNG] = useState('');
    const [displayedDistricts, setDisplayedDistricts] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCareer, setSelectedCareer] = useState('');
    const [careerLoading, careerHook, getAllCareers] = useCareer();
    const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity] = useDistrict();
    const [cityLoading, cityHook] = useCity();
    const [company_name, setCompanyName] = useState('');
    const [tax_code, setTaxCode] = useState('');
    const [employee_size, setEmployeeSize] = useState('');
    const [established_date, setEstablishedDate] = useState(null);
    const [website_url, setWebsiteUrl] = useState('');
    const [facebook_url, setFacebookUrl] = useState('');
    const [youtube_url, setYoutubeUrl] = useState('');
    const [linkedin_url, setLinkedinUrl] = useState('');
    const [company_email, setCompanyEmail] = useState('');
    const [company_phone, setCompanyPhone] = useState('');
    const [logo, setLogo] = useState(null);
    const [cover, setCover] = useState(null);
    const [companyInfo, setCompanyInfo] = useState({});

    const [
        companyHook,
        loading,
        getAllCompanies,
        addCompany,
        filterCompanyList,
        searchCompany,
        getCompany,
        getCompanyIDByEmail,
        getCompanyByEmail,
        updateCompany
    ] = useCompany();
    const [locationLoading, locationHook, getAllLocations, addLocation, changeLocation] = useLocate();

    const coverRef = useRef(null);
    const logoRef = useRef(null);

    const splitTwoPartString = (str) => {
        const index = str.indexOf(' ');
        if (index === -1) {
            return { first: str, second: '' };
        }
        const first = str.slice(0, index).trim();
        const second = str.slice(index + 1).trim();
        return { first, second };
    };

    useEffect(() => {
        return () => {
            logo && URL.revokeObjectURL(logo.preview);
        };
    }, [logo]);

    useEffect(() => {
        return () => {
            cover && URL.revokeObjectURL(cover.preview);
        };
    }, [cover]);

    const handlePreviewLogo = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validFileTypes = /image\/(jpeg|jpg|png|gif|bmp)/;
        if (!validFileTypes.test(file.type)) {
            alert("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif, hoặc .bmp!");
            return;
        }

        file.preview = URL.createObjectURL(file);
        setLogo(file);
    };

    const handlePreviewCover = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const validFileTypes = /image\/(jpeg|jpg|png|gif|bmp)/;
        if (!validFileTypes.test(file.type)) {
            alert("Chỉ chấp nhận các file định dạng .jpg, .jpeg, .png, .gif, hoặc .bmp!");
            return;
        }

        file.preview = URL.createObjectURL(file);
        setCover(file);
    };

    function formatToDateInputValue(isoDateString) {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const handleUpdateCompany = async() => {
      if (!company_name) {
        alert("Bạn chưa nhập tên công ty");
        return;
      } else if (!tax_code) {
        alert("Bạn chưa nhập mã số thuế");
        return;
      } else if (!employee_size) {
        alert("Bạn chưa chọn quy mô công ty");
        return;
      } else if (!selectedCareer) {
        alert("Bạn chưa chọn lĩnh vực hoạt động");
        return;
      } else if (!established_date) {
        alert("Bạn chưa chọn ngày thành lập");
        return;
      } else if (!website_url) {
        alert("Bạn chưa nhập đường dẫn website");
        return;
      } else if (!company_email) {
        alert("Bạn chưa nhập email công ty");
        return;
      } else if (!company_phone) {
        alert("Bạn chưa nhập số điện thoại công ty");
        return;
      } else if (!selectedCity) {
        alert("Bạn chưa chọn tỉnh/thành phố");
        return;
      } else if (!selectedDistrict) {
        alert("Bạn chưa chọn quận/huyện");
        return;
      } else if (!address) {
        alert("Bạn chưa nhập địa chỉ");
        return;
      } else {
        let LocationInfo = {}
        const cityInfo = splitTwoPartString(selectedCity);
        const districtInfo = splitTwoPartString(selectedDistrict);
        if (companyInfo?.location_id) {
          LocationInfo = await changeLocation(companyInfo?.location_id?._id, cityInfo?.second, districtInfo?.first, address, lat, lng);
        } else {
          LocationInfo = await addLocation(cityInfo?.second, districtInfo?.first, address, false, lat, lng);
        }
        if (LocationInfo && typeof LocationInfo === 'object') {
            const careerInfo = splitTwoPartString(selectedCareer);
            const newCompany = await updateCompany(companyInfo?._id, careerInfo?.first, company_name, company_phone, company_email, employee_size, tax_code, LocationInfo?._id, website_url, established_date, description, facebook_url, youtube_url, linkedin_url, logo, cover);
            if (newCompany && typeof newCompany === 'object') setCompanyInfo(newCompany?.company);
            alert("Cập nhật thành công");
        }
      }
    }

    useEffect(()=>{
        console.log(id);
        const fetchJobPost = async() => {
            if (id) {
                const company = await getCompany(id);
                console.log(company);
                if (company){
                    setCompanyInfo(company);
                    setCompanyName(company?.company_name);
                    setTaxCode(company?.tax_code);
                    setEmployeeSize(company?.employee_size);
                    setSelectedCareer(company?.career_id?._id + ' ' + company?.career_id?.career_name);
                    setEstablishedDate(formatToDateInputValue(company?.established_date));
                    setWebsiteUrl(company?.website_url);
                    setFacebookUrl(company?.facebook_url);
                    setYoutubeUrl(company?.youtube_url);
                    setLinkedinUrl(company?.linkedin_url);
                    setCompanyEmail(company?.company_email);
                    setCompanyPhone(company?.company_phone);
                    setSelectedCity(company?.location_id?.city_id?._id + ' ' + company?.location_id?.city_id?.name);
                    setSelectedDistrict(company?.location_id?.district_id?._id + ' ' + company?.location_id?.district_id?.name)
                    setAddress(company?.location_id?.address);
                    setLAT(company?.location_id?.lat);
                    setLNG(company?.location_id?.lng);
                    setDescription(company?.description);
                } 
            }
        }
        fetchJobPost();
    },[id])

    useEffect(()=>{
    const fetchDistrict = async() => {
        if (selectedCity !== "") {
            const city_name = splitTwoPartString(selectedCity);
            const allDistricts = await getAllDistrictsByCity(city_name?.second);
            if (allDistricts && Array.isArray(allDistricts)) setDisplayedDistricts(allDistricts);
        } 
    }
    fetchDistrict();
    },[selectedCity])

    if (careerLoading || cityLoading || districtLoading || locationLoading || loading) {
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
                <div className={cx('company-container')}>
                    <div className={cx('company-title-wrapper')}>
                        <div className={cx('company-title')}>
                            <span>
                                Thông tin công ty
                            </span>
                        </div>
                    </div>
                    <div className={cx('company-logo-wrapper')}>
                        <div className={cx('company-logo-wrapper')}>
                            <div className={cx('company-logo-title')}>
                                <span>
                                    Logo công ty
                                </span>
                            </div>
                            <div className={cx('company-logo-container')}>
                                <Image className={cx('company-logo')} src={logo?.preview || companyInfo?.logo} alt="Company Logo" fallback = {assets.CompanyLogo}></Image>
                            </div>
                            <div className={cx('company-logo-button-container')}>
                                <button className={cx('company-logo-button')} onClick={() => logoRef.current && logoRef.current.click()}>
                                    <FontAwesomeIcon icon={faPen} className={cx('company-logo-icon')}></FontAwesomeIcon>
                                    Thay logo
                                </button>
                                <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewLogo} ref={logoRef}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('company-logo-wrapper')}>
                        <div className={cx('company-logo-wrapper')}>
                            <div className={cx('company-logo-title')}>
                                <span>
                                    Ảnh bìa hiện tại
                                </span>
                            </div>
                            <div className={cx('company-cover-container')}>
                                <Image className={cx('company-cover')} src={cover?.preview || companyInfo?.cover_image} alt="Company Cover" fallback = {assets.CompanyCoverImage}></Image>
                            </div>
                            <div className={cx('company-logo-button-container')}>
                                <button className={cx('company-logo-button')} onClick={() => coverRef.current && coverRef.current.click()}>
                                    <FontAwesomeIcon icon={faPen} className={cx('company-logo-icon')}></FontAwesomeIcon>
                                    Thay ảnh bìa
                                </button>
                                <input type="file" id="file" className={cx("file-input")} onChange={handlePreviewCover} ref={coverRef}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('career-field-container')}>
                        <div className={cx('field-container')}>
                            <div className={cx('field-name')}>
                                <span>Tên công ty</span>
                            </div>
                            <div className = {cx('field-input-container')}>
                            <input className={cx('field-input')} type='text' placeholder='Nhập tên công ty' value={company_name} onChange={(e)=>{setCompanyName(e.target.value)}}></input>
                            </div>
                        </div>
                    </div>
                    <div className={cx('eight-field-container')}>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Mã số thuế</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <input type='text' className={cx('field-input')} placeholder='Nhập mã số thuế' value={tax_code} onChange={(e)=>{setTaxCode(e.target.value)}}>
                                </input>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Lĩnh vực hoạt động</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <select className={cx('field-input')} type='text' placeholder='Chọn lĩnh vực hoạt động' value={selectedCareer} onChange={(e)=>{setSelectedCareer(e.target.value)}}>
                                    <option key='35' value=''>
                                    --Chọn lĩnh vực hoạt động--
                                    </option>
                                    {(careerHook || []).map((career) => (
                                        <option key={career?._id} value={career?._id + ' ' + career?.career_name}>
                                            {career?.career_name}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Đường dẫn website</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input className={cx('field-input')} type='text' placeholder='Nhập đường dẫn website' value={website_url} onChange={(e)=>{setWebsiteUrl(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Đường dẫn Youtube</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <input 
                                    type="text" 
                                    className={cx('field-input')} 
                                    placeholder='Nhập đường dẫn Youtube'
                                    value={youtube_url} onChange={(e)=>{setYoutubeUrl(e.target.value)}}
                                />
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Email công ty</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input className={cx('field-input')} type='text' placeholder='Nhập email công ty' value={company_email} onChange={(e)=>{setCompanyEmail(e.target.value)}}>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Quy mô công ty</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <select className={cx('field-input')} value={employee_size} onChange={(e)=>{setEmployeeSize(e.target.value)}}>
                                    <option key='37' value=''>
                                    --Chọn quy mô công ty--
                                    </option>
                                    <option key='19' value='1 - 9 nhân viên'>
                                    1 - 9 nhân viên
                                    </option>
                                    <option key='20' value='10 - 24 nhân viên'>
                                    10 - 24 nhân viên
                                    </option>
                                    <option key='21' value='25 - 99 nhân viên'>
                                    25 - 99 nhân viên
                                    </option>
                                    <option key='22' value='100 - 499 nhân viên'>
                                    100 - 499 nhân viên
                                    </option>
                                    <option key='23' value='500 - 1000 nhân viên'>
                                    500 - 1000 nhân viên
                                    </option>
                                    <option key='24' value='1000+ nhân viên'>
                                    1000+ nhân viên
                                    </option>
                                    <option key='25' value='5000+ nhân viên'>
                                    5000+ nhân viên
                                    </option>
                                    <option key='26' value='10000+ nhân viên'>
                                    10000+ nhân viên
                                    </option>
                                </select>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Ngày thành lập công ty</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input className={cx('field-input')} placeholder='Chọn ngày thành lập' type='date' value={established_date || ''} onChange={(e)=>{setEstablishedDate(e.target.value)}}>
                                    </input>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Đường dẫn Facebook</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input className={cx('field-input')} type='text' placeholder='Nhập đường dẫn Facebook' value={facebook_url} onChange={(e)=>{setFacebookUrl(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Đường dẫn Linkedin</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input className={cx('field-input')} type='text' placeholder='Nhập đường dẫn Linkedin' value={linkedin_url} onChange={(e)=>{setLinkedinUrl(e.target.value)}}></input>
                                </div>
                            </div>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Số điện thoại</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                    <input type='number' className={cx('field-input')} value={company_phone} onChange={(e)=>{setCompanyPhone(e.target.value)}}>
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('eight-field-container')}>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Tỉnh/Thành phố</span>
                                </div>
                                <select className={cx('field-input')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                                    <option key='41' value=''>
                                        --Chọn thành phố--
                                    </option>
                                    {(cityHook || []).map((city) => (
                                        <option key={city?._id} value={city?._id + ' ' + city?.name}>
                                            {city?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Quận/huyện</span>
                                </div>
                                <select className={cx('field-input')} name="district" value={selectedDistrict} onChange={(e)=>setSelectedDistrict(e.target.value)}>
                                    <option key='1' value=''>
                                    --Chọn quận/huyện--
                                    </option>
                                    {(displayedDistricts || []).map((district) => (
                                        <option key={district?._id} value={district?._id + ' ' + district?.name}>
                                            {district?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        </div>
                        <div className={cx('career-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Địa chỉ</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <input className={cx('field-input')} type='text' placeholder='Nhập địa chỉ' value={address} onChange={(e)=>{setAddress(e.target.value)}}></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('eight-field-container')}>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Vĩ độ</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <input className={cx('field-input')} type='text' placeholder='Nhập vĩ độ' value={lat} onChange={(e)=>{setLAT(e.target.value)}}></input>
                                </div>
                            </div>
                        </div>
                        <div className={cx('four-field-container')}>
                            <div className={cx('field-container')}>
                                <div className={cx('field-name')}>
                                    <span>Kinh độ</span>
                                </div>
                                <div className = {cx('field-input-container')}>
                                <input className={cx('field-input')} type='text' placeholder='Nhập kinh độ' value={lng} onChange={(e)=>{setLNG(e.target.value)}}></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('career-field-container')}>
                        <div className={cx('field-container-two')}>
                            <div className={cx('field-name')}>
                                <span>Mô tả công việc</span>
                            </div>
                            <div className = {cx('field-input-container-two')}>
                                <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                style={{ height: '200px', width: '100%', marginBottom: '50px', marginTop: '10px', border: '2px soild #a8aaac', borderRadius: '5px' }}
                                >
                                </ReactQuill>
                            </div>
                        </div>
                    </div>
                    <div className={cx('update-button-container')}>
                        <button className={cx('company-logo-button')} onClick={handleUpdateCompany}>
                            <FontAwesomeIcon icon={faSave} className={cx('company-logo-icon')}></FontAwesomeIcon>
                            Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCompanyInfo;