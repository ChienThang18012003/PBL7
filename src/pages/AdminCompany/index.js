import classNames from 'classnames/bind';
import styles from './AdminCompany.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faMagnifyingGlass, faUser, faPen, faUsers, faCity, faMountainCity, faLocationDot, faImage, faFileInvoice, faRotate, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Pagination from '../../components/Pagination';
import useCity from '../../hook/useCity';
import useCompany from '../../hook/useCompany';
import useCareer from '../../hook/useCareer';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminCompany() {
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
    const [searchValue, setSearchValue] = useState('');
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(10);
    const [cityLoading, cityHook, addCity, updateCity, deleteCity] = useCity();
    const [allCompany, setAllCompany] = useState([]);
    const [selectedCity, setSelectedCity] = useState('all');
    const [selectedCareer, setSelectedCareer] = useState('all');
    const [careerLoading, careerHook, getAllCareers, addCareer, updateCareer, deleteCareer] = useCareer();
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
    const navigate = useNavigate();

    const handleSearch = () => {
        let filtered = displayedJobPost || [];

        if (searchValue.trim() !== '') {
            filtered = filtered.filter(post =>
                post?.company_name?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };

    useEffect(()=>{
        const fetchCompany = async() => {
            const companies = await getAllCompanies();
            if (companies) {
                setDisplayedJobPost(companies);
                setAllCompany(companies);
            }
        }
        fetchCompany();
    },[])

    useEffect(()=>{
        if (selectedCity === 'all' && selectedCareer === 'all') {
            setDisplayedJobPost(allCompany);
        } else if (selectedCity !== 'all' && selectedCareer === 'all') {
            const companies = (allCompany || []).filter(item => item?.location_id?.city_id?.name === selectedCity)
            setDisplayedJobPost(companies);
        } else if (selectedCity === 'all' && selectedCareer !== 'all') {
            const companies = (allCompany || []).filter(item => item?.career_id?.career_name === selectedCareer)
            setDisplayedJobPost(companies);
        } else if (selectedCity !== 'all' && selectedCareer !== 'all') {
            const companies = (allCompany || []).filter(item => item?.career_id?.career_name === selectedCareer && item?.location_id?.city_id?.name === selectedCity)
            setDisplayedJobPost(companies);
        }
    }, [selectedCity, selectedCareer])

    useEffect(()=>{
        if (displayedJobPost.length !== 0) {
            if (displayedJobPost.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPost])

    


    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (cityLoading || careerLoading || loading) {
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
                <div className={cx('job-post-wrapper')}>
                    <div className={cx('page-title')}>
                        <span>
                            Danh sách công ty
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập tên công ty' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedCity} onChange={(e)=>{setSelectedCity(e.target.value)}}>
                            <option key='0' value='all'>
                                --Tỉnh/Thành phố--
                            </option>
                            {
                                (cityHook || []).map((city,index) => (
                                    <option key={index} value={city?.name}>
                                        {city?.name}
                                    </option>
                                ))
                            }
                        </select>
                        <select className={cx('select')} value={selectedCareer} onChange={(e)=>{setSelectedCareer(e.target.value)}}>
                            <option key='1' value='all'>
                                --Ngành nghề--
                            </option>
                            {
                                (careerHook || []).map((career,index) => (
                                    <option key={index} value={career?.career_name}>
                                        {career?.career_name}
                                    </option>
                                ))
                            }
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allCompany); setSelectedCareer('all'); setSelectedCity('all'); setSearchValue('')}}>
                            <FontAwesomeIcon className={cx('reload-icon')} icon={faRotate}></FontAwesomeIcon>
                        </button>
                        <div className={cx('search-button')} onClick={handleSearch}>
                            <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                            <div className={cx('search-text')}>
                                <span>
                                    Tìm kiếm
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('table-title')}>
                        <div className={cx('job-name')}>
                            <span>
                                Tên công ty
                            </span>
                        </div>
                        <div className={cx('posted-date')}>
                            <span>
                                Ngành nghề
                            </span>
                        </div>
                        <div className={cx('deadline')}>
                            <span>
                                Địa điểm
                            </span>
                        </div>
                        <div className={cx('applied-count')}>
                            <span>
                                Email công ty
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Quy mô
                            </span>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                Tài khoản
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <span>
                                Hành động
                            </span>
                        </div>
                    </div>
                    <div className={cx('table-container')}>
                    {
                         Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                            <div className={cx('table-item')} key={index}>
                                <div className={cx('job-name-item')}>
                                    <span>
                                        {company?.company_name || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('posted-date-item')}>
                                    <span>
                                        {company?.career_id?.career_name || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('deadline-item')}>
                                    <span>
                                        {company?.location_id?.city_id?.name || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('applied-count-item')}>
                                    <span>
                                        {company?.company_email || '0'}
                                    </span>
                                </div>
                                <div className={cx('view-item')}>
                                    <span>
                                        {company?.employee_size || '0'}
                                    </span>
                                </div>
                                <div className={cx('status-item')}>
                                    <span>
                                        {company?.user_id?.email || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('action-button-wrapper')}>
                                    <button className={cx('update-button')} onClick={()=>{navigate(`/admin-company-info/${company?._id}`)}}>
                                        <FontAwesomeIcon className={cx('action-button-icon')} icon={faPen}></FontAwesomeIcon>
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                    <Pagination
                        totalPosts={(displayedJobPost || []).length}
                        postsPerPage={docPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    )
}

export default AdminCompany;