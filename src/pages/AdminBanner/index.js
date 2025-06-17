import classNames from 'classnames/bind';
import styles from './AdminBanner.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faMagnifyingGlass, faUser, faTrash, faUsers, faCity, faMountainCity, faLocationDot, faImage, faFileInvoice, faRotate, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import 'react-quill/dist/quill.snow.css';
import Pagination from '../../components/Pagination';
import useCareer from '../../hook/useCareer';
import useBanner from '../../hook/useBanner';
import BannerModal from '../../components/BannerModal';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminBanner() {
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
    const [selectedType, setSelectedType] = useState('all');
    const [bannerLoading, bannerHook, getAllBanner, addBanner, updateBanner, deleteBanner] = useBanner();
    const [allBanner, setAllBanner] = useState([]);
    const [selectedBannerIds, setSelectedBannerIds] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        const fetchAllBanner = async() => {
            const banners = await getAllBanner();
            if (banners && Array.isArray(banners)) {setDisplayedJobPost(banners); setAllBanner(banners)}
        }
        fetchAllBanner();
    },[])

    useEffect(()=>{
        if (selectedType === 'all') {
            setDisplayedJobPost(allBanner);
        } else {
            const filterBanners = (allBanner || []).filter(item => item?.type === selectedType);
            if (filterBanners) setDisplayedJobPost(filterBanners);
        }
    },[selectedType])

    useEffect(()=>{
        if (displayedJobPost.length !== 0) {
            if (displayedJobPost.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPost])

    const handleSearch = () => {
        let filtered = displayedJobPost || [];

        if (searchValue.trim() !== '') {
            filtered = filtered.filter(post =>
                post?.user_id?.email?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };

    const handleCheckboxChange = (id, checked) => {
        setSelectedBannerIds((prev) => {
            if (checked) {

                return prev.includes(id) ? prev : [...prev, id];
            } else {

                return prev.filter((itemId) => itemId !== id);
            }
        });
    };


    const handleAddBanner = (submittedObject) =>{
        if (!submittedObject) return;

        setDisplayedJobPost((prev) => [...prev, submittedObject]);
        setAllBanner((prev) => [...prev, submittedObject]);
    }

    const handleUpdateBanner = (submittedObject) => {
        if (!submittedObject || !submittedObject._id) return;

        setDisplayedJobPost((prev) =>
            prev.map((item) =>
                item._id === submittedObject._id ? submittedObject : item
            )
        );
        setAllBanner((prev) =>
            prev.map((item) =>
                item._id === submittedObject._id ? submittedObject : item
            )
        );
    };

    const handleDeleteBanner = async () => {
        const deletedBanner = await deleteBanner(selectedBannerIds);

        if (deletedBanner) {
            setDisplayedJobPost((prev) =>
                prev.filter((item) => !selectedBannerIds.includes(item._id))
            );
            setAllBanner((prev) =>
                prev.filter((item) => !selectedBannerIds.includes(item._id))
            );
            setSelectedBannerIds([]);
            alert('Xóa banner thành công!')
        }
    };


    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (bannerLoading) {
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
                            Danh sách banner
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập email tải lên' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedType} onChange={(e)=>{setSelectedType(e.target.value)}}>
                            <option key='0' value='all'>
                                --Loại banner--
                            </option>
                            <option key='1' value='Home'>
                                Home
                            </option>
                            <option key='2' value='Job'>
                                Job
                            </option>
                            <option key='3' value='Company'>
                                Company
                            </option>
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setSelectedType('all'); setDisplayedJobPost(allBanner)}}>
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
                        <BannerModal type='add' onSubmitModal={handleAddBanner}></BannerModal>
                        <div className={cx('add-button')} onClick={handleDeleteBanner}>
                            <FontAwesomeIcon className={cx('search-icon')} icon={faTrash}></FontAwesomeIcon>
                            <div className={cx('search-text')}>
                                <span>
                                    Xóa banner
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('table-title')}>
                        <div className={cx('job-name')}>
                            <span>
                                Tài khoản tải lên
                            </span>
                        </div>
                        <div className={cx('deadline')}>
                            <span>
                                Ảnh banner
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Loại banner
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
                                <input type='checkbox' className={cx('city-checkbox')} checked={selectedBannerIds.includes(company?._id)} onChange={(e) => handleCheckboxChange(company?._id, e.target.checked)}></input>
                                <div className={cx('job-name-item')}>
                                    <span>
                                        {company?.user_id?.email || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('career-logo-wrapper')}>
                                    <Image className={cx('career-logo')} src={company?.banner_image || ''} fallback={assets.DefaultBanner}></Image>
                                </div>
                                <div className={cx('view-item')}>
                                        <span>
                                            {company?.type || '0'}
                                        </span>
                                    </div>
                                <div className={cx('action-button-wrapper')}>
                                    <BannerModal type='update' data={company} onSubmitModal={handleUpdateBanner}></BannerModal>
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

export default AdminBanner;