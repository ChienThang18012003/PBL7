import classNames from 'classnames/bind';
import styles from './AdminUser.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faRotate, faNewspaper, faMagnifyingGlass, faUser, faPen, faUsers, faCity, faMountainCity, faLocationDot, faImage, faFileInvoice, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import 'react-quill/dist/quill.snow.css';
import Pagination from '../../components/Pagination';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminUser() {
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
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail,
    getAllAccount,
    changeAccountRole,
    updateAccountStatus
    ] = useAccount();
    const [allAccount, setAllAccount] = useState([]);
    const [selectedRole, setSelectedRole] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchAllAccount = async() => {
            const accounts = await getAllAccount();
            setDisplayedJobPost(accounts);
            setAllAccount(accounts);
        }
        fetchAllAccount();
    }, [])

    useEffect(()=>{
        if (displayedJobPost.length !== 0) {
            if (displayedJobPost.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPost])

    const handleSearch = () => {
        let filtered = displayedJobPost || [];

        if (searchValue.trim() !== '') {
            filtered = filtered.filter(post =>
                post?.email?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };

    useEffect(()=>{
        if (selectedRole === 'all' && selectedStatus === 'all') {
            setDisplayedJobPost(allAccount);
        } else if (selectedRole !== 'all' && selectedStatus === 'all') {
            const acc = (allAccount || []).filter(acc => acc?.role === selectedRole)
            setDisplayedJobPost(acc);
        } else if (selectedRole === 'all' && selectedStatus !== 'all') {
            if (selectedStatus === 'true') {
                const acc = (allAccount || []).filter(acc => acc?.is_active === true);
                setDisplayedJobPost(acc);
            } else if (selectedStatus === 'false') {
                const acc = (allAccount || []).filter(acc => acc?.is_active === false);
                setDisplayedJobPost(acc);
            }
        } else if (selectedRole !== 'all' && selectedStatus !== 'all') {
            if (selectedStatus === 'true') {
                const acc = (allAccount || []).filter(acc => acc?.is_active === true && acc?.role === selectedRole);
                setDisplayedJobPost(acc);
            } else if (selectedStatus === 'false') {
                const acc = (allAccount || []).filter(acc => acc?.is_active === false && acc?.role === selectedRole);
                setDisplayedJobPost(acc);
            }
        }
    },[selectedRole, selectedStatus])


    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (loadingAccount) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <ToastContainer position="top-right" autoClose={3000} className={cx('custom-toast-container')}/>
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
                            Danh sách tài khoản
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập email tài khoản' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedRole} onChange={(e)=>{setSelectedRole(e.target.value)}}>
                            <option key='0' value='all'>
                                --Vai trò--
                            </option>
                            <option key='1' value='user'>
                                user
                            </option>
                            <option key='2' value='employer'>
                                employer
                            </option>
                            <option key='3' value='admin'>
                                admin
                            </option>
                        </select>
                        <select className={cx('select')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                            <option key='4' value='all'>
                                --Trạng thái--
                            </option>
                            <option key='5' value='true'>
                                Hoạt động
                            </option>
                            <option key='6' value='false'>
                                Không hoạt động
                            </option>
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allAccount); setSearchValue(''); setSelectedStatus('all'); setSelectedRole('all')}}>
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
                                Avatar
                            </span>
                        </div>
                        <div className={cx('posted-date')}>
                            <span>
                                Email
                            </span>
                        </div>
                        <div className={cx('deadline')}>
                            <span>
                                Tên người dùng
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Vai trò
                            </span>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                Trạng thái
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
                                <div className={cx('avatar-wrapper')}>
                                    <Image className={cx('avatar')} src={company?.profile_image || ''} fallback={assets.UserImage}></Image>
                                </div>
                                <div className={cx('posted-date-item')}>
                                    <span>
                                        {company?.email || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('deadline-item')}>
                                    <span>
                                        {company?.username || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('view-item')}>
                                    <span>
                                        {company?.role || 'Chưa xác định'}
                                    </span>
                                </div>
                                <input type='checkbox' className={cx('active-checkbox')} checked={company?.is_active} onClick={async () => {
                                    try {
                                        const updatedAccount = await updateAccountStatus(company._id, !company.is_active);
                                        if (updatedAccount) {
                                            setDisplayedJobPost((prev) =>
                                                prev.map((item) =>
                                                    item._id === updatedAccount._id ? updatedAccount : item
                                                )
                                            );
                                            setAllAccount((prev) =>
                                                prev.map((item) =>
                                                    item._id === updatedAccount._id ? updatedAccount : item
                                                )
                                            );
                                            toast.success('Cập nhật trạng thái tài khoản thành công!')
                                        }
                                    } catch (error) {
                                        console.error("Error updating account:", error);
                                    }
                                    }}
                                    ></input>
                                <div className={cx('action-button-wrapper')}>
                                    <button className={cx('update-button')} onClick={()=>{navigate(`/admin-user-info/${company?._id}`)}}>
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

export default AdminUser;