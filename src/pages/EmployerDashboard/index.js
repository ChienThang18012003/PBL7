import classNames from 'classnames/bind';
import styles from './EmployerDashboard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Chart as ChartJS, defaults} from 'chart.js/auto';
import {Bar, Doughnut, Line} from 'react-chartjs-2';
import { faClock, faBuilding, faBriefcase, faCaretDown, faCaretUp, faEnvelopesBulk, faNewspaper, faBookmark, faMagnifyingGlass, faUser, faAddressCard, faArrowRight, faCircleXmark, faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useJobPost from '../../hook/useJobPost';
import useCity from '../../hook/useCity';
import useResumeApplied from '../../hook/useResumeApplied';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function EmployerDashboard() {
    const [isVisibleOne, setIsVisibleOne] = useState(true);
    const [isVisibleTwo, setIsVisibleTwo] = useState(true);
    const [isVisibleThree, setIsVisibleThree] = useState(true);
    const [isVisibleFour, setIsVisibleFour] = useState(true);
    const [isClickedOne, setIsClickedOne] = useState(false);
    const [isClickedTwo, setIsClickedTwo] = useState(false);
    const [isClickedThree, setIsClickedThree] = useState(false);
    const [isClickedFour, setIsClickedFour] = useState(false);
    const [jobCount, setJobCount] = useState(null);
    const [apply, setApplyCount] = useState(null);
    const [expiredCount, setExpiredCount] = useState(null);
    const [pendingCount, setPendingCount] = useState(null);
    const [start_date, setStartDate] = useState(null);
    const [end_date, setEndDate] = useState(null);
    const [job_start_date, setJobStartDate] = useState(null);
    const [job_end_date, setJobEndDate] = useState(null);
    const [career_start_date, setCareerStartDate] = useState(null);
    const [career_end_date, setCareerEndDate] = useState(null);
    const [apply_start_date, setApplyStartDate] = useState(null);
    const [apply_end_date, setApplyEndDate] = useState(null);
    const [applyChartData, setApplyChartData] = useState({});
    const [resumeStatusChartData, setResumeStatusChartData] = useState({});
    const [topJobChartData, setTopJobChartData] = useState({});
    const [jobLevelChartData, setJobLevelChartData] = useState({});
    const [email, setEmail] = useState('');
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
        countJobPostByUser,
        statisticJobPostByAcademicLevel,
        statisticTop5JobPostByResumeApplied
    ] = useJobPost();
    const navigate = useNavigate();

    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied, updateResumeApplied, countResumeAppliedByUser, statisticResumeAppliedByDate, statisticResumeAppliedByStatus] = useResumeApplied();
    
    const [hoverIndex, setHoverIndex] = useState(null);

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
        const fetchTopJobChart = async() => {
            const topJobChartData = await statisticTop5JobPostByResumeApplied(email);
            if (topJobChartData) setTopJobChartData(topJobChartData);
        }
        const fetchJobLevelChart = async() => {
            const jobLevelChartData = await statisticJobPostByAcademicLevel(email);
            if (jobLevelChartData) setJobLevelChartData(jobLevelChartData);
        }
        const fetchResumeStatusChart = async() => {
            const resumeStatusChartData = await statisticResumeAppliedByStatus(email);
            if (resumeStatusChartData) setResumeStatusChartData(resumeStatusChartData);
        }
        const fetchApplyChart = async() => {
            const applyChartData = await statisticResumeAppliedByDate(email);
            if (applyChartData) setApplyChartData(applyChartData);
        }
        const countJobPost = async() => {
            const jobs = await countJobPostByUser(email);
            if (jobs) {
                setJobCount(jobs?.job);
                setPendingCount(jobs?.pending);
                setExpiredCount(jobs?.expired);
            }
        }
        const countResumeApplied = async() => {
            const apply = await countResumeAppliedByUser(email);
            if (apply) setApplyCount(apply?.apply);
        }
        if (email) {
            countJobPost();
            countResumeApplied();
            fetchTopJobChart();
            fetchJobLevelChart();
            fetchResumeStatusChart();
            fetchApplyChart();
        }
    },[email])

    useEffect(() => {
        const fetchResumeStatusChart = async() => {
            const newUserChartData = await statisticResumeAppliedByStatus(email, formatDateToYYYYMMDD(start_date), formatDateToYYYYMMDD(end_date));
            if (newUserChartData) setResumeStatusChartData(newUserChartData);
        }
        if (start_date && end_date) {
            if (new Date(start_date) > new Date(end_date)) {
                setEndDate(start_date); 
            } else {
                fetchResumeStatusChart();
            }
        }
        if (start_date && !end_date) {

        }
        if (!start_date && end_date) {

        }
    }, [start_date, end_date]);

    useEffect(() => {
        const fetchApplyChart = async() => {
            const newJobChartData = await statisticResumeAppliedByDate(email, formatDateToYYYYMMDD(job_start_date), formatDateToYYYYMMDD(job_end_date));
            if (newJobChartData) setApplyChartData(newJobChartData);
        }
        if (job_start_date && job_end_date) {
            if (new Date(job_start_date) > new Date(job_end_date)) {
                setJobEndDate(job_start_date); 
            } else {
                fetchApplyChart();
            }
        }
        if (job_start_date && !job_end_date) {

        }
        if (!job_start_date && job_end_date) {

        }
    }, [job_start_date, job_end_date]);

    useEffect(() => {
        const fetchTopJobChart = async() => {
            const newCareerChartData = await statisticTop5JobPostByResumeApplied(email, formatDateToYYYYMMDD(career_start_date), formatDateToYYYYMMDD(career_end_date));
            if (newCareerChartData) setTopJobChartData(newCareerChartData);
        }
        if (career_start_date && career_end_date) {
            if (new Date(career_start_date) > new Date(career_end_date)) {
                setCareerEndDate(career_start_date); 
            } else {
                fetchTopJobChart();
            }
        }
        if (career_start_date && !career_end_date) {

        }
        if (!career_start_date && career_end_date) {

        }
    }, [career_start_date, career_end_date]);

    useEffect(() => {
        const fetchJobLevelChart = async() => {
            const newApplyChartData = await statisticJobPostByAcademicLevel(email, formatDateToYYYYMMDD(apply_start_date), formatDateToYYYYMMDD(apply_end_date));
            if (newApplyChartData) setJobLevelChartData(newApplyChartData);
        }
        if (apply_start_date && apply_end_date) {
            if (new Date(apply_start_date) > new Date(apply_end_date)) {
                setApplyEndDate(apply_start_date); 
            } else {
                fetchJobLevelChart();
            }
        }
        if (apply_start_date && !apply_end_date) {

        }
        if (!apply_start_date && apply_end_date) {

        }
    }, [apply_start_date, apply_end_date]);

    function formatDateToYYYYMMDD(date) {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        const month = `${d.getMonth() + 1}`.padStart(2, '0');
        const day = `${d.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    

    const entityData = [
    {
        type: 'job-seeker',
        label: 'Job',
        value: jobCount,
        icon: faBriefcase
    },
    {
        type: 'employer',
        label: 'Pending Job',
        value: pendingCount,
        icon: faClock
    },
    {
        type: 'job',
        label: 'Expired Job',
        value: expiredCount,
        icon: faCircleXmark
    },
    {
        type: 'apply',
        label: 'Apply',
        value: apply,
        icon: faAddressCard
    },
    ];

    if (jobPostLoading || resumeAppliedLoading) {
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
                            <div className={cx('manager-button')} onClick={()=>{navigate('/employer-dashboard')}}>
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
                                    Apply status chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={start_date} onChange={(e)=>{setStartDate(e.target.value)}} max={end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={end_date} onChange={(e)=>{setEndDate(e.target.value)}} min={start_date || undefined}>
                                </input>
                            </div>
                            <Bar
                               data = {{
                                labels: (resumeStatusChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: 'Count',
                                        data: (resumeStatusChartData?.count || []).map((data)=>data),
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
                        <div className={cx('chart-item')}>
                            <div className={cx('dashboard-title')}>
                                <span>
                                    Application chart
                                </span>
                            </div>
                            <div className={cx('input-container')}>
                                <input type = 'date' className={cx('input-date')} value={job_start_date} onChange={(e)=>{setJobStartDate(e.target.value)}} max={job_end_date || undefined}>
                                </input>
                                <input type = 'date' className={cx('input-date')} value={job_end_date} onChange={(e)=>{setJobEndDate(e.target.value)}} min={job_start_date || undefined}>
                                </input>
                            </div>
                            <Line
                               data = {{
                                labels: (applyChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Application",
                                        data: (applyChartData?.appliedCounts || []).map((data)=>data),
                                        backgroundColor: '#ff3030',
                                        borderColor: '#ff3030'
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
                                    Top 5 job chart
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
                                labels: (topJobChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: "Count",
                                        data: (topJobChartData?.counts || []).map((data)=>data),
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
                                    Job by academic level
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
                                labels: (jobLevelChartData?.labels || []).map((data) => data),
                                datasets: [
                                    {
                                        label: 'Count',
                                        data: (jobLevelChartData?.count || []).map((data)=>data),
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

export default EmployerDashboard;