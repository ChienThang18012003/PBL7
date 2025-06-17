import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBuilding, faBriefcase, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../../components/LoadingAnimation';
import Banner from '../../components/Banner';
import JobsContainer from '../../components/JobsContainer';
import CompanyItem from '../../components/CompanyItem';
import CareerItem from '../../components/CareerItem';
import FeedbackItem from '../../components/FeedbackItem';
import useJobPost from '../../hook/useJobPost';
import useCareer from '../../hook/useCareer';
import useCompany from '../../hook/useCompany';
import useFeedback from '../../hook/useFeedback';


const cx = classNames.bind(styles);

function Main() {
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
        statisticTop5JobPostByResumeApplied,
        getJobPostByIds,
        suggestJobPostByEmail
    ] = useJobPost();
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
        updateCompany,
        statisticTop5Company
    ] = useCompany();
    const [careerLoading, careerHook, getAllCareers, statisticTop8CareerByJobPost] = useCareer();
    const [feedbackLoading, feedbackHook, getAllFeedback, getSpecificFeedback, addFeedback, changeFeedback, changeFeedbackStatus, deleteFeedback, getTop4Feedback] = useFeedback();
    const [suggestedJobPost, setSuggestedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageTwo, setCurrentPageTwo] = useState(1);
    const [topCareer, setTopCareer] = useState([]);
    const [topCompany, setTopCompany] = useState([]);
    const [topFeedback, setTopFeedback] = useState([]);
    const [urgentJobs, setUrgentJobs] = useState([]);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchSuggestedJobs = async() => {
            let item = localStorage.getItem('isLoginSuccess');
            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email) {
                    const jobs = await suggestJobPostByEmail(obj?.email);
                    if (jobs && jobs?.suggestions) {
                        console.log("Suggested", jobs);
                        setSuggestedJobPost(jobs?.suggestions);
                    }
                }
            }
        }
        const fetchTopCareer = async() => {
            const careers = await statisticTop8CareerByJobPost();
            if (careers && Array.isArray(careers)) setTopCareer(careers);
        }

        const fetchTopCompany = async() => {
            const companies = await statisticTop5Company();
            console.log(companies);
            if (companies && Array.isArray(companies)) setTopCompany(companies);
        }

        const fetchTopFeedback = async() => {
            const feedback = await getTop4Feedback();
            console.log("feedback",feedback);
            if (feedback && Array.isArray(feedback)) setTopFeedback(feedback);
        }

        const filterUrgentJobPost = async() => {
            const jobPost = await filterJobPostList('all','all',true);
            if (jobPost && Array.isArray(jobPost)) setUrgentJobs(jobPost);
        }
        fetchSuggestedJobs();
        fetchTopCareer();
        fetchTopCompany();
        fetchTopFeedback();
        filterUrgentJobPost();
    },[])

    if (jobPostLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <div className={cx('slider-wrapper')}>
                    <Banner type="Home"></Banner>
                </div>
            </div>
            <div className={cx('urgent-jobs-container')}>
                <div className={cx('urgent-jobs-wrapper')}>
                    <JobsContainer data={urgentJobs} currentPage={currentPageTwo} setCurrentPage={setCurrentPageTwo}>
                        <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faClock}></FontAwesomeIcon>
                        <span className={cx('urgent-jobs-title')}>
                            Việc làm tuyển gấp
                        </span>
                    </JobsContainer>
                </div>
            </div>
            {
                (suggestedJobPost?.length !== 0) && (
                    <div className={cx('urgent-jobs-container')}>
                        <div className={cx('urgent-jobs-wrapper')}>
                            <JobsContainer data={suggestedJobPost} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                                <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faClock}></FontAwesomeIcon>
                                <span className={cx('urgent-jobs-title')}>
                                    Việc làm gợi ý
                                </span>
                            </JobsContainer>
                        </div>
                    </div>
                )
            }
            <div className={cx('popular-company-container')}>
                <div className={cx('popular-company-wrapper')}>
                    <div className={cx('header')}>
                            <div className={cx('logo-wrapper')}>
                                <div className={cx('logo-container')}>
                                    <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faBuilding}></FontAwesomeIcon>
                                    <span className={cx('urgent-jobs-title')}>
                                        Công ty nổi bật
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div className={cx('companies-wrapper')}>
                        {
                            (topCompany || []).map((company, index) => (
                                <CompanyItem data={company} key={index}></CompanyItem>
                            ))
                        }
                    </div>
                    <div className={cx('button-wrapper')}>
                        <button className={cx('view-all-button')} onClick={()=>{navigate('/company')}}>Xem tất cả</button>
                    </div>
                </div>
            </div>
            <div className={cx('popular-career-container')}>
                <div className={cx('popular-career-wrapper')}>
                    <div className={cx('header')}>
                            <div className={cx('logo-wrapper')}>
                                <div className={cx('logo-container')}>
                                    <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faBriefcase}></FontAwesomeIcon>
                                    <span className={cx('urgent-jobs-title')}>
                                        Ngành nghề trọng điểm
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div className={cx('careers-wrapper')}>
                        {
                            (topCareer || []).map((career, index) => (
                                <CareerItem data={career} key={index}></CareerItem>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={cx('customer-feedback-container')}>
                <div className={cx('customer-feedback-wrapper')}>
                    <div className={cx('header')}>
                            <div className={cx('logo-wrapper')}>
                                <div className={cx('logo-container')}>
                                    <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faComment}></FontAwesomeIcon>
                                    <span className={cx('urgent-jobs-title')}>
                                        Phản hồi khách hàng
                                    </span>
                                </div>
                            </div>
                    </div>
                    <div className={cx('comments-wrapper')}>
                        {
                            (topFeedback || []).map((feedback, index)=>(
                                <FeedbackItem data={feedback} type='view'></FeedbackItem>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;