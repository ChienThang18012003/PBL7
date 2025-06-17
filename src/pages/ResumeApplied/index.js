import classNames from 'classnames/bind';
import styles from './ResumeApplied.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCaretDown, faCaretUp, faEnvelopesBulk, faNewspaper, faBookmark, faMagnifyingGlass, faUser, faChartSimple, faRotate } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useJobPost from '../../hook/useJobPost';
import Pagination from '../../components/Pagination';
import useResumeSaved from '../../hook/useResumeSaved';
import useCareer from '../../hook/useCareer';
import useCity from '../../hook/useCity';
import useResumeApplied from '../../hook/useResumeApplied';
import ResumeAppliedItem from '../../components/ResumeAppliedItem';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function ResumeApplied() {
    const [isVisibleOne, setIsVisibleOne] = useState(true);
    const [isVisibleTwo, setIsVisibleTwo] = useState(true);
    const [isVisibleThree, setIsVisibleThree] = useState(true);
    const [isVisibleFour, setIsVisibleFour] = useState(true);
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);
    const [isClickedFour, setIsClickedFour] = useState(false);
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [email, setEmail] = useState('');
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(5);
    const [allJobPost, setAllJobPost] = useState([]);
    const [jobPostName, setJobPostName] = useState([]);
    const [selectedJobPost, setSelectedJobPost] = useState('all');
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied] = useResumeApplied();
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
        deleteJobPost,
        getJobPostNameByEmail
    ] = useJobPost();

    const handleUpdateStatus = (submittedObject) => {
        setDisplayedJobPost(prev =>
            prev.map(item => item._id === submittedObject._id ? submittedObject : item)
        );
        setAllJobPost(prev =>
            prev.map(item => item._id === submittedObject._id ? submittedObject : item)
        );
    };


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

    useEffect(()=>{
        const filterJobPost = () => {
            let jobPost = [];
            if (selectedStatus === 'all' && selectedJobPost === 'all') {
                setDisplayedJobPost(allJobPost);
            } else if (selectedStatus === 'all' && selectedJobPost !== 'all') {
                jobPost = (allJobPost || []).filter(post=>post?.job_post_id?.job_name === selectedJobPost);
                setDisplayedJobPost(jobPost);
            } else if (selectedStatus !== 'all' && selectedJobPost === 'all') {
                jobPost = (allJobPost || []).filter(post=>post?.status === selectedStatus);
                setDisplayedJobPost(jobPost);
            } else {
                jobPost = (allJobPost || []).filter(post=>post?.job_post_id?.job_name === selectedJobPost && post?.status === selectedStatus);
                setDisplayedJobPost(jobPost);
            }
            setCurrentPage(1);
        }
        filterJobPost();
    },[selectedStatus,selectedJobPost]);

    useEffect(()=>{
        const fetchResumeApplied = async() => {
            if (email) {
                const resume = await getResumeAppliedByEmail(email, 'employer');
                if (resume && Array.isArray(resume)) {setDisplayedJobPost(resume); setAllJobPost(resume);}
            }
        }
        const fetchJobPostName = async() => {
            if (email) {
                const resume = await getJobPostNameByEmail(email);
                if (resume) {setJobPostName(resume?.data)}
            }
        }
        fetchResumeApplied();
        fetchJobPostName();
    },[email])
    useEffect(()=>{
        if (displayedJobPost.length !== 0) {
            if (displayedJobPost.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPost])
    const handleSearch = () => {
        let filtered = displayedJobPost || [];

        if (searchValue.trim() !== '') {
            filtered = filtered.filter(post =>
                post?.resume_id?.user_id?.username?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        setDisplayedJobPost(filtered);
        setCurrentPage(1);
    };
    const handleDeleteResumeApplied = (id) => {
        setDisplayedJobPost(prev => prev.filter(item => item?._id !== id));
        setAllJobPost(prev => prev.filter(item => item?._id !== id));
    }
    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (resumeAppliedLoading || jobPostLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar')}>
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleFour(!isVisibleFour); setIsClickedFour(!isClickedFour)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedFour ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Bảng điều khiển
                        </span>
                    </div>
                </div>
                {
                    isVisibleFour && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faChartSimple}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Dashboard
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleOne(!isVisibleOne); setIsClickedOne(!isClickedOne)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedOne ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý đăng tuyển
                        </span>
                    </div>
                </div>
                {
                    isVisibleOne && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-job-post')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faEnvelopesBulk}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Danh sách tin đăng
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className={cx('drop-down')} onClick={()=>{setIsVisibleTwo(!isVisibleTwo); setIsClickedTwo(!isClickedTwo)}}>
                    <FontAwesomeIcon className={cx('drop-down-icon')} icon={isClickedTwo ? faCaretDown : faCaretUp}></FontAwesomeIcon>
                    <div className={cx('drop-down-title')}>
                        <span>
                            Quản lý ứng viên
                        </span>
                    </div>
                </div>
                {
                    isVisibleTwo && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/resume-applied')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faNewspaper}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Hồ sơ ứng tuyển
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/resume-saved')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBookmark}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Hồ sơ đã lưu
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/candidate-search')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faMagnifyingGlass}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Tìm ứng viên mới
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
                            Quản lý tài khoản
                        </span>
                    </div>
                </div>
                {
                    isVisibleThree && (
                        <div className={cx('drop-down-list')}>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-company')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faBuilding}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Thông tin công ty
                                    </span>
                                </div>
                            </div>
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-account')}}>
                                <FontAwesomeIcon className={cx('button-icon')} icon={faUser}></FontAwesomeIcon>
                                <div className={cx('button-title')}>
                                    <span>
                                        Thông tin tài khoản
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
                            Hồ sơ đã ứng tuyển
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập tên ứng viên' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedJobPost} onChange={(e)=>{setSelectedJobPost(e.target.value)}}>
                            <option key='0' value='all'>
                                --Chọn tin đăng--
                            </option>
                            {(jobPostName || []).map((job) => (
                                <option value={job}>
                                    {job}
                                </option>
                            ))}
                        </select>
                        <select className={cx('select')} value={selectedStatus} onChange={(e)=>{setSelectedStatus(e.target.value)}}>
                            <option key='0' value='all'>
                                --Chọn trạng thái tuyển--
                            </option>
                            <option key='1' value='Chờ xác nhận'>
                                Chờ xác nhận
                            </option>
                            <option key='2' value='Đã liên hệ'>
                                Đã liên hệ
                            </option>
                            <option key='3' value='Đã test'>
                                Đã test
                            </option>
                            <option key='4' value='Đã phỏng vấn'>
                                Đã phỏng vấn
                            </option>
                            <option key='5' value='Trúng tuyển'>
                                Trúng tuyển
                            </option>
                            <option key='6' value='Không trúng tuyển'>
                                Không trúng tuyển
                            </option>
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allJobPost); setSelectedJobPost('all'); setSelectedStatus('all'); setSearchValue('')}}>
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
                                Tên hồ sơ
                            </span>
                        </div>
                        <div className={cx('posted-date')}>
                            <span>
                                Tên ứng viên
                            </span>
                        </div>
                        <div className={cx('deadline')}>
                            <span>
                                Tin đăng
                            </span>
                        </div>
                        <div className={cx('applied-count')}>
                            <span>
                                Thời gian nộp
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Loại hồ sơ
                            </span>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                Trạng thái tuyển dụng
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
                            (currentDoctors || []).map((resume,index)=>(
                                <ResumeAppliedItem onUpdateStatus={handleUpdateStatus} onDeleteResume={handleDeleteResumeApplied} key={index} data={resume}></ResumeAppliedItem>
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

export default ResumeApplied;