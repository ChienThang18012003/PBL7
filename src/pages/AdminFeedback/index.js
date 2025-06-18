import classNames from 'classnames/bind';
import styles from './AdminFeedback.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faMagnifyingGlass, faUser, faTrash, faUsers, faCity, faMountainCity, faLocationDot, faImage, faFileInvoice, faRotate, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Pagination from '../../components/Pagination';
import useFeedback from '../../hook/useFeedback';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminFeedback() {
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
    const [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback] = useFeedback();
    const [selectedFeedbackIds, setSelectedFeedbackIds] = useState([]);
    const [allFeedback, setAllFeedback] = useState([]);
    const [selectedRating, setSelectedRating] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const navigate = useNavigate();

    useEffect(()=>{
        if (selectedRating === 'all' && selectedStatus === 'all') {
            setDisplayedJobPost(allFeedback);
        } else if (selectedRating === 'all' && selectedStatus !== 'all') {
            if (selectedStatus === 'true') {
                const feedbacks = (allFeedback || []).filter(item => item?.is_active === true)
                setDisplayedJobPost(feedbacks);
            } else if (selectedStatus === 'false') {
                const feedbacks = (allFeedback || []).filter(item => item?.is_active === false)
                setDisplayedJobPost(feedbacks)
            }
        } else if (selectedRating !== 'all' && selectedStatus === 'all') {
            const feedbacks = (allFeedback || []).filter(item => Number(item?.rating) === Number(selectedRating))
            setDisplayedJobPost(feedbacks)
        } else if (selectedRating !== 'all' && selectedStatus !== 'all') {
            if (selectedStatus === 'true') {
                const feedbacks = (allFeedback || []).filter(item => item?.is_active === true && Number(item?.rating) === Number(selectedRating))
                setDisplayedJobPost(feedbacks);
            } else if (selectedStatus === 'false') {
                const feedbacks = (allFeedback || []).filter(item => item?.is_active === false && Number(item?.rating) === Number(selectedRating))
                setDisplayedJobPost(feedbacks)
            }
        }
    },[selectedRating, selectedStatus])

    useEffect(() => {
        const fetchAllFeedback = async() => {
            const feedback = await getAllFeedback();
            if (feedback && Array.isArray(feedback)) {
                setAllFeedback(feedback);
                setDisplayedJobPost(feedback)
            }
        }
        fetchAllFeedback();
    },[])

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
        setSelectedFeedbackIds((prev) => {
            if (checked) {
                return prev.includes(id) ? prev : [...prev, id];
            } else {
                return prev.filter((itemId) => itemId !== id);
            }
        });
    };

    const handleDeleteFeedback = async () => {
        const deletedFeedback= await deleteFeedback(selectedFeedbackIds);

        if (deletedFeedback) {
            setDisplayedJobPost((prev) =>
                prev.filter((item) => !selectedFeedbackIds.includes(item._id))
            );
            setAllFeedback((prev) =>
                prev.filter((item) => !selectedFeedbackIds.includes(item._id))
            );
            setSelectedFeedbackIds([]);
            alert('Xóa phản hồi thành công!')
        }
    };


    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (feedbackLoading) {
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
                            Danh sách phản hồi
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập email người dùng' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedRating} onChange={(e)=>{setSelectedRating(e.target.value)}}>
                            <option key='0' value='all'>
                                --Đánh giá--
                            </option>
                            <option key='1' value='1'>
                                1
                            </option>
                            <option key='2' value='2'>
                                2
                            </option>
                            <option key='3' value='3'>
                                3
                            </option>
                            <option key='4' value='4'>
                                4
                            </option>
                            <option key='5' value='5'>
                                5
                            </option>
                        </select>
                        <select className={cx('select')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                            <option key='6' value='all'>
                                --Trạng thái duyệt--
                            </option>
                            <option key='7' value='true'>
                                Đã duyệt
                            </option>
                            <option key='8' value='false'>
                                Chưa duyệt
                            </option>
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allFeedback); setSelectedRating('all'); setSelectedStatus('all'); setSearchValue('')}}>
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
                        <div className={cx('add-button')} onClick={handleDeleteFeedback}>
                            <FontAwesomeIcon className={cx('search-icon')} icon={faTrash}></FontAwesomeIcon>
                            <div className={cx('search-text')}>
                                <span>
                                    Xóa phản hồi
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('table-title')}>
                        <div className={cx('job-name')}>
                            <span>
                                Nội dung phản hồi
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Đánh giá
                            </span>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                Trạng thái duyệt
                            </span>
                        </div>
                        <div className={cx('action')}>
                            <span>
                                Tài khoản
                            </span>
                        </div>
                    </div>
                    <div className={cx('table-container')}>
                    {
                        Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                            <div className={cx('table-item')} key={index}>
                                <input type='checkbox' className={cx('city-checkbox')} checked={selectedFeedbackIds.includes(company?._id)} onChange={(e) => handleCheckboxChange(company?._id, e.target.checked)}></input>
                                <div className={cx('job-name-item')}>
                                    <span>
                                        {company?.content || 'Chưa xác định'}
                                    </span>
                                </div>
                                <div className={cx('view-item')}>
                                    <span>
                                        {company?.rating || '0'}
                                    </span>
                                </div>
                                <input type='checkbox' className={cx('active-checkbox')} checked={company?.is_active} onClick={async () => {
                                    try {
                                        const updatedFeedback = await changeFeedbackStatus(company._id, !company.is_active);

                                        if (updatedFeedback) {
                                            setDisplayedJobPost((prev) =>
                                                prev.map((item) =>
                                                    item._id === updatedFeedback._id ? updatedFeedback : item
                                                )
                                            );
                                            setAllFeedback((prev) =>
                                                prev.map((item) =>
                                                    item._id === updatedFeedback._id ? updatedFeedback : item
                                                )
                                            );
                                            toast.success('Cập nhật trạng thái duyệt thành công!')
                                        }
                                    } catch (error) {
                                        console.error("Error updating feedback:", error);
                                    }
                                    }}
                                    ></input>
                                <div className={cx('email-item')}>
                                    <span>
                                        {company?.user_id?.email || 'Chưa xác định'}
                                    </span>
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

export default AdminFeedback;