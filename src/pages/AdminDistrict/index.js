import classNames from 'classnames/bind';
import styles from './AdminDistrict.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faMagnifyingGlass, faUser, faTrash, faUsers, faCity, faMountainCity, faLocationDot, faImage, faFileInvoice, faChartSimple, faRotate } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Pagination from '../../components/Pagination';
import useCity from '../../hook/useCity';
import useDistrict from '../../hook/useDistrict';
import DistrictModal from '../../components/DistrictModal';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminDistrict() {
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
    const [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity, addDistrict, updateDistrict, deleteDistrict] = useDistrict();
    const [selectedCityIds, setSelectedCityIds] = useState([]);
    const [selectedDistrictIds, setSelectedDistrictIds] = useState([]);
    const [selectedCity, setSelectedCity] = useState('all');
    const [allDistrict, setAllDistrict] = useState([]);
    const [selectedLocationIds, setSelectedLocationIds] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        if (districtHook) {setDisplayedJobPost(districtHook);setAllDistrict(districtHook);}
    },[districtHook])

    useEffect(()=>{
        if (selectedCity === 'all') {
            setDisplayedJobPost(allDistrict);
            setCurrentPage(1);
        } else if (selectedCity !== 'all') {
            const district = (allDistrict || []).filter(post=>post?.city_id?.name === selectedCity);
            setDisplayedJobPost(district);
            setCurrentPage(1);
        }
    },[selectedCity])

    useEffect(()=>{
        if (displayedJobPost.length !== 0) {
            if (displayedJobPost.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPost])

    const handleSearch = () => {
        let filtered = displayedJobPost || [];

        if (searchValue.trim() !== '') {
            filtered = filtered.filter(post =>
                post?.name?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };

    const handleCheckboxChange = (id, checked) => {
        setSelectedLocationIds((prev) => {
            if (checked) {
                // Thêm id nếu chưa có
                return prev.includes(id) ? prev : [...prev, id];
            } else {
                // Bỏ id ra khỏi mảng
                return prev.filter((itemId) => itemId !== id);
            }
        });
    };


    const handleAddDistrict = (submittedObject) =>{
        if (!submittedObject) return;

        setDisplayedJobPost((prev) => [...prev, submittedObject]);
        setAllDistrict((prev) => [...prev, submittedObject]);
    }

    const handleUpdateDistrict = (submittedObject) => {
        if (!submittedObject || !submittedObject._id) return;

        setDisplayedJobPost((prev) =>
            prev.map((item) =>
                item._id === submittedObject._id ? submittedObject : item
            )
        );
        setAllDistrict((prev) =>
            prev.map((item) =>
                item._id === submittedObject._id ? submittedObject : item
            )
        );
    };

    const handleDeleteDistrict = async () => {
        const deletedDistrict = await deleteDistrict(selectedLocationIds);

        if (deletedDistrict) {
            setDisplayedJobPost((prev) =>
                prev.filter((item) => !selectedLocationIds.includes(item._id))
            );
            setAllDistrict((prev) =>
                prev.filter((item) => !selectedLocationIds.includes(item._id))
            );
            setSelectedLocationIds([]);
            alert('Xóa quận/huyện thành công!')
        }
    };


    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (cityLoading || districtLoading) {
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
                            Danh sách quận/huyện
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập tên quận/huyện' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
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
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allDistrict); setSearchValue(''); setSelectedCity('all')}}>
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
                    <div className={cx('add-button-wrapper')}>
                        <DistrictModal type='add' onSubmitModal={handleAddDistrict}></DistrictModal>
                        <div className={cx('add-button')} onClick={handleDeleteDistrict}>
                            <FontAwesomeIcon className={cx('search-icon')} icon={faTrash}></FontAwesomeIcon>
                            <div className={cx('search-text')}>
                                <span>
                                    Xóa quận/huyện
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('table-title')}>
                        <div className={cx('job-name')}>
                            <span>
                                Tên quận/huyện
                            </span>
                        </div>
                        <div className={cx('applied-count')}>
                            <span>
                                Tên tỉnh/thành phố
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
                                <input type='checkbox' className={cx('city-checkbox')} checked={selectedLocationIds.includes(company?._id)} onChange={(e) => handleCheckboxChange(company?._id, e.target.checked)}></input>
                                <div className={cx('job-name-item')}>
                                    <span>
                                        {company?.name || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('applied-count-item')}>
                                        <span>
                                            {company?.city_id?.name || 'Chưa xác định'}
                                        </span>
                                    </div>
                                <div className={cx('action-button-wrapper')}>
                                    <DistrictModal type='update' data={company} onSubmitModal={handleUpdateDistrict}></DistrictModal>
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

export default AdminDistrict;