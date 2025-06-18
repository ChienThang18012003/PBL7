import classNames from 'classnames/bind';
import styles from './AdminJobPost.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faMagnifyingGlass, faUser, faTrash, faUsers, faCity, faMountainCity, faLocationDot, faFileInvoice, faImage, faRotate, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useJobPost from '../../hook/useJobPost';
import Pagination from '../../components/Pagination';
import JobPostModal from '../../components/JobPostModal';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminJobPost() {
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
    const [selectedAppliedState, setSelectedAppliedState] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(5);
    const [allJobPost, setAllJobPost] = useState([]);
    const [
        jobPostHook,
        jobPostLoading,
        getAllJobPosts,
        filterJobPostList,
        searchJobPost,
        getJobPost,
        updateJobPostView,
        getJobPostByEmail,
        addJobPost,
        updateJobPost,
        deleteJobPost
    ] = useJobPost();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(()=>{
        const filterJobPost = () => {
            let jobPost = [];
            if (selectedStatus === 'all' && selectedAppliedState === 'all') {
                setDisplayedJobPost(allJobPost);
            } else if (selectedStatus === 'all' && selectedAppliedState !== 'all') {
                if (selectedAppliedState === 'Tuyển gấp') {
                    jobPost = (allJobPost || []).filter(post=>post?.is_urgent === true);
                } else if (selectedAppliedState === 'Không tuyển gấp') {
                    jobPost = (allJobPost || []).filter(post=>post?.is_urgent === false);
                }
                setDisplayedJobPost(jobPost);
            } else if (selectedStatus !== 'all' && selectedAppliedState === 'all') {
                jobPost = (allJobPost || []).filter(post=>post?.status === selectedStatus);
                setDisplayedJobPost(jobPost);
            } else if (selectedStatus !== 'all' && selectedAppliedState !== 'all') {
                if (selectedAppliedState === 'Tuyển gấp') {
                    jobPost = (allJobPost || []).filter(post=>post?.is_urgent === true && post?.status === selectedStatus);
                } else if (selectedAppliedState === 'Không tuyển gấp') {
                    jobPost = (allJobPost || []).filter(post=>post?.is_urgent === false && post?.status === selectedStatus);
                }
                setDisplayedJobPost(jobPost);
            }
            setCurrentPage(1);
        }
        filterJobPost();
    },[selectedStatus,selectedAppliedState]);

    useEffect(()=>{
        const fetchJobPost = async() => {
            const jobs = await getAllJobPosts();
            if (jobs) {setDisplayedJobPost(jobs);setAllJobPost(jobs)}
        }
        fetchJobPost();
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
                post?.job_name?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };
    const handleAddJobPost = (submittedObject) =>{
        if (!submittedObject) return;

        setDisplayedJobPost((prev) => [...prev, submittedObject]);
        setAllJobPost((prev) => [...prev, submittedObject]);
    }
    const handleUpdateJobPost = (submittedObject) => {
        if (!submittedObject || !submittedObject?._id) return;

        setDisplayedJobPost((prev) =>
            prev.map((item) =>
                item._id === submittedObject?._id ? submittedObject : item
            )
        );

        setAllJobPost((prev) =>
            prev.map((item) =>
                item._id === submittedObject?._id ? submittedObject : item
            )
        );
    };
    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (jobPostLoading) {
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
                            Danh sách tin đăng
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập tên tin đăng' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedAppliedState} onChange={(e)=>{setSelectedAppliedState(e.target.value)}}>
                            <option key='0' value='all'>
                                Trạng thái tuyển dụng
                            </option>
                            <option key='1' value='Tuyển gấp'>
                                Tuyển gấp
                            </option>
                            <option key='2' value='Không tuyển gấp'>
                                Không tuyển gấp
                            </option>
                        </select>
                        <select className={cx('select')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                            <option key='0' value='all'>
                                Trạng thái duyệt
                            </option>
                            <option key='1' value='Chờ duyệt'>
                                Chờ duyệt
                            </option>
                            <option key='2' value='Không duyệt'>
                                Không duyệt
                            </option>
                            <option key='2' value='Đã duyệt'>
                                Đã duyệt
                            </option>
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allJobPost); setSelectedAppliedState('all'); setSelectedStatus('all'); setSearchValue('')}}>
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
                                Tên tin đăng
                            </span>
                        </div>
                        <div className={cx('posted-date')}>
                            <span>
                                Ngày đăng
                            </span>
                        </div>
                        <div className={cx('deadline')}>
                            <span>
                                Thời hạn nộp
                            </span>
                        </div>
                        <div className={cx('applied-count')}>
                            <span>
                                Lượt nộp
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Lượt xem
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
                                    {company?.is_urgent ? (
                                        <div className={cx('urgent-container')}>
                                            <div className={cx('job-name-item-urgent')}>
                                                <span>
                                                    {company?.job_name || 'Chưa xác định'}
                                                </span>
                                            </div>
                                            <div className={cx('urgent-wrapper')}>
                                                <div className={cx('urgent-text')}>
                                                    <span>
                                                        Tuyển gấp
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        ) : (
                                        <div className={cx('job-name-item')}>
                                            <span>
                                                {company?.job_name || 'Chưa xác định'}
                                            </span>
                                        </div>
                                        )
                                    }
                                    <div className={cx('posted-date-item')}>
                                        <span>
                                            {formatDate(company?.created_at) || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('deadline-item')}>
                                        <span>
                                            {formatDate(company?.deadline) || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('applied-count-item')}>
                                        <span>
                                            {company?.applied_count || '0'}
                                        </span>
                                    </div>
                                    <div className={cx('view-item')}>
                                        <span>
                                            {company?.view || '0'}
                                        </span>
                                    </div>
                                    <div className={cx('status-item')}>
                                        <span>
                                            {company?.status || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('action-button-wrapper')}>
                                        <JobPostModal data={company} type="update" onSubmitModal={handleUpdateJobPost} status='admin'></JobPostModal>
                                        <button className={cx('delete-button')} onClick={async()=>{
                                            const id = company?._id;
                                            const jobPost = await deleteJobPost(id);
                                            if (jobPost) {setDisplayedJobPost(prev => prev.filter(item => item._id !== id)); alert('Xóa tin đăng thành công!');};
                                        }}>
                                            <FontAwesomeIcon className={cx('action-button-icon')} icon={faTrash}></FontAwesomeIcon>
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

export default AdminJobPost;