import classNames from 'classnames/bind';
import styles from './ResumeSaved.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCaretDown, faCaretUp, faEnvelopesBulk, faNewspaper, faBookmark, faMagnifyingGlass, faUser, faHeartBroken, faEye, faChartSimple, faRotate } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useJobPost from '../../hook/useJobPost';
import Pagination from '../../components/Pagination';
import useResumeSaved from '../../hook/useResumeSaved';
import useCareer from '../../hook/useCareer';
import useCity from '../../hook/useCity';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function ResumeSaved() {
    const [isVisibleOne, setIsVisibleOne] = useState(true);
    const [isVisibleTwo, setIsVisibleTwo] = useState(true);
    const [isVisibleThree, setIsVisibleThree] = useState(true);
    const [isVisibleFour, setIsVisibleFour] = useState(true);
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);
    const [isClickedFour, setIsClickedFour] = useState(false);
    const navigate = useNavigate();

    const [selectedCity, setSelectedCity] = useState('all');
    const [selectedCareer, setSelectedCareer] = useState('all');
    const [careerLoading, careerHook, getAllCareers] = useCareer();
    const [cityLoading, cityHook] = useCity();
    const [content, setContent] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [selectedAppliedState, setSelectedAppliedState] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [email, setEmail] = useState('');
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(5);
    const [allJobPost, setAllJobPost] = useState([]);
    const [isUrgent, setIsUrgent] = useState(true);
    const [isNotUrgent, setIsNotUrgent] = useState(true);
    const [resumeSavedLoading, resumeSavedHook, getResumeSavedByEmail, getSpecificResumeSaved, addResumeSaved, deleteResumeSaved] = useResumeSaved();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
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
            if (selectedCity === 'all' && selectedCareer === 'all') {
                setDisplayedJobPost(allJobPost);
            } else if (selectedCity === 'all' && selectedCareer !== 'all') {
                jobPost = (allJobPost || []).filter(post=>post?.resume_id?.career_id?._id === selectedCareer);
                setDisplayedJobPost(jobPost);
            } else if (selectedCity !== 'all' && selectedCareer === 'all') {
                jobPost = (allJobPost || []).filter(post=>post?.resume_id?.city_id?._id === selectedCity);
                setDisplayedJobPost(jobPost);
            } else {
                jobPost = (allJobPost || []).filter(post=>post?.resume_id?.career_id?._id === selectedCareer && post?.resume_id?.city_id?._id === selectedCity);
                setDisplayedJobPost(jobPost);
            }
            setCurrentPage(1);
        }
        filterJobPost();
    },[selectedCity,selectedCareer]);

    useEffect(()=>{
        const fetchResumeSaved = async() => {
            if (email) {
                const resume = await getResumeSavedByEmail(email);
                if (resume && Array.isArray(resume)) {setDisplayedJobPost(resume); setAllJobPost(resume);}
            }
        }
        fetchResumeSaved();
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
    if (cityLoading || careerLoading || resumeSavedLoading) {
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
                            Hồ sơ đã lưu
                        </span>
                    </div>
                    <div className={cx('filter-wrapper')}>
                        <div className={cx('filter-title')}>
                            Bộ lọc: 
                        </div>
                        <input className={cx('search-box')} placeholder='Nhập tên ứng viên' type='text' value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                        <select className={cx('select')} value={selectedCity} onChange={(e)=>{setSelectedCity(e.target.value)}}>
                            <option key='0' value='all'>
                                --Chọn tỉnh/thành phố--
                            </option>
                            {(cityHook || []).map((city) => (
                                <option key={city?._id} value={city?._id}>
                                    {city?.name}
                                </option>
                            ))}
                        </select>
                        <select className={cx('select')} value={selectedCareer} onChange={(e)=>{setSelectedCareer(e.target.value)}}>
                            <option key='0' value='all'>
                                --Chọn nghề nghiệp--
                            </option>
                            {(careerHook || []).map((career) => (
                                <option key={career?._id} value={career?._id}>
                                    {career?.career_name}
                                </option>
                            ))}
                        </select>
                        <button className={cx('reload-button')} onClick={()=>{setDisplayedJobPost(allJobPost); setSelectedCity('all'); setSelectedCareer('all'); setSearchValue('')}}>
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
                                Kinh nghiệm
                            </span>
                        </div>
                        <div className={cx('applied-count')}>
                            <span>
                                Ngành nghề
                            </span>
                        </div>
                        <div className={cx('view')}>
                            <span>
                                Tỉnh/Thành phố
                            </span>
                        </div>
                        <div className={cx('status')}>
                            <span>
                                Ngày lưu
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
                                            {company?.resume_id?.desired_position || 'Chưa xác định'}
                                        </span>
                                    </div>

                                    <div className={cx('posted-date-item')}>
                                        <span>
                                            {company?.resume_id?.user_id?.username || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('deadline-item')}>
                                        <span>
                                            {company?.resume_id?.experience || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('applied-count-item')}>
                                        <span>
                                            {company?.resume_id?.career_id?.career_name || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('view-item')}>
                                        <span>
                                            {company?.resume_id?.city_id?.name || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('status-item')}>
                                        <span>
                                            {formatDate(company?.createdAt) || 'Chưa xác định'}
                                        </span>
                                    </div>
                                    <div className={cx('action-button-wrapper')}>
                                        <FontAwesomeIcon className={cx('like-button')} icon={faHeartBroken} onClick={async()=>{
                                            const id = company?._id;
                                            const jobPost = await deleteResumeSaved(id);
                                            if (jobPost) setDisplayedJobPost(prev => prev.filter(item => item._id !== id));
                                        }}/>
                                        <FontAwesomeIcon className={cx('view-button')} icon={faEye} onClick={()=>{navigate(`/resume-info/${company?.resume_id?._id}`)}}/>
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

export default ResumeSaved;