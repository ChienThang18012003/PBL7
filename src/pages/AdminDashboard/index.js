import classNames from 'classnames/bind';
import styles from './AdminDashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { faBuilding, faBriefcase, faComment, faCaretDown, faCaretUp, faNewspaper, faUser, faUsers, faCity, faMountainCity, faLocationDot, faAddressCard, faImage, faFileInvoice, faArrowRight, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import useAccount from '../../hook/useAccount';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useJobPost from '../../hook/useJobPost';
import useResumeApplied from '../../hook/useResumeApplied';
import useCareer from '../../hook/useCareer';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function AdminDashboard() {
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
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(10);
    const [jobSeekerCount, setJobSeekerCount] = useState(null);
    const [employerCount, setEmployerCount] = useState(null);
    const [jobCount, setJobCount] = useState(null);
    const [apply, setApplyCount] = useState(null);
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [job_start_date, setJobStartDate] = useState(null);
    const [job_end_date, setJobEndDate] = useState(null);
    const [career_start_date, setCareerStartDate] = useState(null);
    const [career_end_date, setCareerEndDate] = useState(null);
    const [apply_start_date, setApplyStartDate] = useState(null);
    const [apply_end_date, setApplyEndDate] = useState(null);
    const [userChartData, setUserChartData] = useState({});
    const [jobChartData, setJobChartData] = useState({});
    const [careerChartData, setCareerChartData] = useState({});
    const [applyChartData, setApplyChartData] = useState({});
    const [careerLoading, careerHook, getAllCareers, addCareer, updateCareer, deleteCareer, statisticTop5CareerByJobPost] = useCareer();
    const [
    checkLogin, 
    signUp, 
    loadingAccount, 
    doctorsHook, 
    changeAccountInfo,
    getAccountByEmail,
    getAllAccount,
    changeAccountRole,
    updateAccountStatus,
    getAccountByID,
    countUserByRole,
    statisticUserByDate
    ] = useAccount();
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
        getJobPostNameByEmail,
        getJobPostByCompany,
        countJobPost,
        statisticJobPostByStatus
    ] = useJobPost();
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied, countResumeApplied, statisticResumeAppliedByStatus] = useResumeApplied();
    const [hoverIndex, setHoverIndex] = useState(null);
    const navigate = useNavigate();

    function formatDateToYYYYMMDD(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(()=>{
        const fetchUserChart = async() => {
            const userChartData = await statisticUserByDate();
            if (userChartData) setUserChartData(userChartData);
        }
        const fetchJobChart = async() => {
            const jobChartData = await statisticJobPostByStatus();
            if (jobChartData) setJobChartData(jobChartData);
        }
        const fetchCareerChart = async() => {
            const careerChartData = await statisticTop5CareerByJobPost();
            if (careerChartData) setCareerChartData(careerChartData);
        }
        const fetchApplyChart = async() => {
            const applyChartData = await statisticResumeAppliedByStatus();
            if (applyChartData) setApplyChartData(applyChartData);
        }
        const countUser = async() => {
            const user = await countUserByRole();
            if (user) {setJobSeekerCount(user?.user); setEmployerCount(user?.employer);}
        }
        const countJob = async() => {
            const job = await countJobPost();
            if (job) {setJobCount(job?.job)}
        }
        const countApply = async() => {
            const apply = await countResumeApplied();
            if (apply) {setApplyCount(apply?.apply);}
        }
        countUser();
        countJob();
        countApply();
        fetchUserChart();
        fetchJobChart();
        fetchCareerChart();
        fetchApplyChart();
    },[])

    useEffect(() => {
        const fetchUserChart = async() => {
            const newUserChartData = await statisticUserByDate(formatDateToYYYYMMDD(start_date), formatDateToYYYYMMDD(end_date));
            if (newUserChartData) setUserChartData(newUserChartData);
        }
        if (start_date && end_date) {
            if (new Date(start_date) > new Date(end_date)) {
                setEndDate(start_date); 
            } else {
                fetchUserChart();
            }
        }
        if (start_date && !end_date) {

        }
        if (!start_date && end_date) {

        }
    }, [start_date, end_date]);

        useEffect(() => {
        const fetchApplyChart = async() => {
            const newApplyChartData = await statisticResumeAppliedByStatus(formatDateToYYYYMMDD(apply_start_date), formatDateToYYYYMMDD(apply_end_date));
            if (newApplyChartData) setApplyChartData(newApplyChartData);
        }
        if (apply_start_date && apply_end_date) {
            if (new Date(apply_start_date) > new Date(apply_end_date)) {
                setApplyEndDate(apply_start_date); 
            } else {
                fetchApplyChart();
            }
        }
        if (apply_start_date && !apply_end_date) {

        }
        if (!apply_start_date && apply_end_date) {

        }
    }, [apply_start_date, apply_end_date]);

    useEffect(() => {
        const fetchJobChart = async() => {
            const newJobChartData = await statisticJobPostByStatus(formatDateToYYYYMMDD(job_start_date), formatDateToYYYYMMDD(job_end_date));
            if (newJobChartData) setJobChartData(newJobChartData);
        }
        if (job_start_date && job_end_date) {
            if (new Date(job_start_date) > new Date(job_end_date)) {
                setJobEndDate(job_start_date); 
            } else {
                fetchJobChart();
            }
        }
        if (job_start_date && !job_end_date) {

        }
        if (!job_start_date && job_end_date) {

        }
    }, [job_start_date, job_end_date]);

    useEffect(() => {
        const fetchCareerChart = async() => {
            const newCareerChartData = await statisticTop5CareerByJobPost(formatDateToYYYYMMDD(career_start_date), formatDateToYYYYMMDD(career_end_date));
            if (newCareerChartData) setCareerChartData(newCareerChartData);
        }
        if (career_start_date && career_end_date) {
            if (new Date(career_start_date) > new Date(career_end_date)) {
                setCareerEndDate(career_start_date); 
            } else {
                fetchCareerChart();
            }
        }
        if (career_start_date && !career_end_date) {

        }
        if (!career_start_date && career_end_date) {

        }
    }, [career_start_date, career_end_date]);

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPost || []).slice(firstDoctorIndex, lastDoctorIndex);

    const entityData = [
    {
        type: 'job-seeker',
        label: 'Job seeker',
        value: jobSeekerCount,
        icon: faUser
    },
    {
        type: 'employer',
        label: 'Employer',
        value: employerCount,
        icon: faBuilding
    },
    {
        type: 'job',
        label: 'Job',
        value: jobCount,
        icon: faBriefcase
    },
    {
        type: 'apply',
        label: 'Apply',
        value: apply,
        icon: faAddressCard
    },
    ];

    if (careerLoading || loadingAccount || jobPostLoading || resumeAppliedLoading){
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
                <div className={cx('dashboard-container')}>
                    <div className={cx('dashboard-title')}>
                        <span>
                            Dashboard
                        </span>
                    </div>
                    <div className={cx('entity-count')}>
                        {entityData.map((item, index) => (
                            <div
                                key={item.type}
                                className={cx(
                                'entity-container',
                                `entity-container-${item.type}`,
                                {
                                    'hovered': hoverIndex === index,
                                    'shrinked': hoverIndex !== null && hoverIndex !== index,
                                }
                                )}
                                onMouseEnter={() => setHoverIndex(index)}
                                onMouseLeave={() => setHoverIndex(null)}
                            >
                                <FontAwesomeIcon className={cx('entity-icon')} icon={item.icon} />
                                <div className={cx('entity-text')}>
                                <span>{item.value ?? 0} {item.label}</span>
                                </div>
                                {hoverIndex === index && (
                                <FontAwesomeIcon className={cx('entity-forward')} icon={faArrowRight} />
                                )}
                            </div>
                            ))}
                    </div>
                    <div className={cx('chart-container')}>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    User chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={start_date} onChange={(e)=>{setStartDate(e.target.value)}} max={end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={end_date} onChange={(e)=>{setEndDate(e.target.value)}} min={start_date || undefined}>
                                </input>
                            </div>
                            <Line
                               data = {{
                                labels: (userChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Job seeker",
                                        data: (userChartData?.userCounts || []).map((data)=>data),
                                        backgroundColor: '#ff3030',
                                        borderColor: '#ff3030'
                                    },
                                    {
                                        label: "Employer",
                                        data: (userChartData?.employerCounts || []).map((data)=>data),
                                        backgroundColor: '#064ff0',
                                        borderColor: '#064ff0'
                                    }
                                ]
                               }}
                               style={{'marginTop': '20px'}}
                               width={520}
                                height={250}
                                options={{
                                    responsive: false
                                }}
                            >
                            </Line>
                        </div>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Job Post chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={job_start_date} onChange={(e)=>{setJobStartDate(e.target.value)}} max={job_end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={job_end_date} onChange={(e)=>{setJobEndDate(e.target.value)}} min={job_start_date || undefined}>
                                </input>
                            </div>
                            <Bar
                               data = {{
                                labels: (jobChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Chờ duyệt",
                                        data: (jobChartData?.choDuyet || []).map((data)=>data),
                                        backgroundColor: '#f9b46b',
                                        borderColor: '#f9b46b'
                                    },
                                    {
                                        label: "Không duyệt",
                                        data: (jobChartData?.khongDuyet || []).map((data)=>data),
                                        backgroundColor: '#f0380a',
                                        borderColor: '#f0380a'
                                    },
                                    {
                                        label: "Đã duyệt",
                                        data: (jobChartData?.daDuyet || []).map((data)=>data),
                                        backgroundColor: '#14c517',
                                        borderColor: '#14c517'
                                    }
                                ]
                               }}
                               style={{'marginTop': '20px'}}
                               width={520}
                                height={250}
                                options={{
                                    responsive: false
                                }}
                            >
                            </Bar>
                        </div>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Career chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={career_start_date} onChange={(e)=>{setCareerStartDate(e.target.value)}} max={career_end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={career_end_date} onChange={(e)=>{setCareerEndDate(e.target.value)}} min={career_start_date || undefined}>
                                </input>
                            </div>
                            <Doughnut
                               data = {{
                                labels: (careerChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: (careerChartData?.counts || []).map((data)=>data),
                                        backgroundColor: [
                                            '#d0414d',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ],
                                        borderColor: [
                                            '#d0414d',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ]
                                    }
                                ]
                               }}
                               style={{'marginTop': '20px'}}
                                width={520}
                                height={250}
                                options={{
                                    responsive: false
                                }}
                            >
                            </Doughnut>
                        </div>
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Application chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={apply_start_date} onChange={(e)=>{setApplyStartDate(e.target.value)}} max={apply_end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={apply_end_date} onChange={(e)=>{setApplyEndDate(e.target.value)}} min={apply_start_date || undefined}>
                                </input>
                            </div>
                            <Bar
                               data = {{
                                labels: (applyChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: 'Count',
                                        data: (applyChartData?.count || []).map((data)=>data),
                                        backgroundColor: [
                                            '#d0414d',
                                            '#ff9870',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ],
                                        borderColor: [
                                            '#d0414d',
                                            '#ff9870',
                                            '#ffcc70',
                                            '#70ffa7',
                                            '#70a4ff',
                                            '#c850c0'
                                        ]
                                    }
                                ]
                               }}
                                 options={{
                                    responsive: false,
                                    plugins: {
                                        legend: {
                                        labels: {
                                            generateLabels: (chart) => {
                                            const labels = ChartJS.defaults.plugins.legend.labels.generateLabels(chart);
                                            return labels.map(label => ({
                                                ...label,
                                                fillStyle: '#000'
                                            }));
                                            }
                                        }
                                        }
                                    }
                                    }}
                                width={520}
                                height={250}
                               style={{'marginTop': '20px'}}
                            >
                            </Bar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;