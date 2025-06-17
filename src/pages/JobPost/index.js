import classNames from 'classnames/bind';
import styles from './JobPost.module.scss';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBriefcase, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import Banner from '../../components/Banner';
import JobsContainer from '../../components/JobsContainer';
import useCareer from '../../hook/useCareer';
import useCity from '../../hook/useCity';
import useJobPost from '../../hook/useJobPost';
import useSearchPreference from '../../hook/useSearchPreference';


const cx = classNames.bind(styles);

function JobPost() {
    const [cityLoading, cityHook] = useCity();
    const [careerLoading, careerHook, getAllCareers] = useCareer();
    const [selectedCity, setSelectedCity] = useState('all');
    const [selectedCareer, setSelectedCareer] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [displayedJobPost, setDisplayedJobPost] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchLoading, searchHook, addSearchPreference] = useSearchPreference();

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

    const handleSubmitSearch = async () => {
        const relatedCompanies = await searchJobPost(searchValue, displayedJobPost);
        setDisplayedJobPost(relatedCompanies);
        setCurrentPage(1);
        let item = localStorage.getItem('isLoginSuccess');
        if (item) {
            let obj = JSON.parse(item);
            if (obj?.email) {
                const cityId = (selectedCity === 'all') ? '' : selectedCity;
                const careerId = (selectedCareer === 'all') ? '' : selectedCareer;
                const newSearch = await addSearchPreference(obj?.email, searchValue, cityId, careerId);
            }
        }

    };

    useEffect(() => {
        const fetchJobPosts = async () => {
                const jobposts = await filterJobPostList(selectedCity, selectedCareer);
                if (jobposts && Array.isArray(jobposts)) setDisplayedJobPost(jobposts);
            };
        fetchJobPosts();

    }, [selectedCity, selectedCareer]);

    if (jobPostLoading || cityLoading || careerLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <div className={cx('slider-wrapper')}>
                    <Banner type="Job"></Banner>
                </div>
            </div>
            <div className={cx('search-box-container')}>
                <div className={cx('search-box-wrapper')}>
                    <Image src={assets.CompanySearchCover} className={cx('company-search-cover')}></Image>
                    <div className={cx('search-title')}>
                        <span>
                            Tìm kiếm việc làm
                        </span>
                    </div>
                    <div className={cx('search-bar-wrapper')}>
                        <div className={cx('search-bar')}>
                            <input type="text" placeholder='Nhập tên việc làm' className={cx('search-input')} value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
                            <Button rounded small rightIcon={<FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>} onClick={handleSubmitSearch}></Button>
                        </div>
                    </div>
                    <div className={cx('city-select-wrapper')}>
                        <div className={cx('city-select-container')}>
                            <div className={cx('city-select-icon-wrapper')}>
                                <FontAwesomeIcon icon={faLocationDot} className={cx('city-select-icon')}></FontAwesomeIcon>
                            </div>
                            <select className={cx('city-select')} name="city" value={selectedCity} onChange={(e)=>setSelectedCity(e.target.value)}>
                                <option key="1" className={cx('city-option')} value='all'>Địa điểm</option>
                                {(cityHook || []).map((city) => (
                                    <option key={city?._id} value={city?._id}>
                                        {city?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={cx('career-select-wrapper')}>
                        <div className={cx('city-select-container')}>
                            <div className={cx('city-select-icon-wrapper')}>
                                <FontAwesomeIcon icon={faBriefcase} className={cx('city-select-icon')}></FontAwesomeIcon>
                            </div>
                            <select className={cx('city-select')} name="career" value={selectedCareer} onChange={(e)=>setSelectedCareer(e.target.value)}>
                                <option key='1' className={cx('city-option')} value='all'>Ngành nghề</option>
                                {(careerHook || []).map((career) => (
                                    <option key={career?._id} value={career?._id}>
                                        {career?.career_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('urgent-jobs-container')}>
                <div className={cx('urgent-jobs-wrapper')}>
                    <JobsContainer data={displayedJobPost} currentPage={currentPage} setCurrentPage={setCurrentPage}>
                        <FontAwesomeIcon className={cx('urgent-jobs-icon')} icon={faClock}></FontAwesomeIcon>
                        <span className={cx('urgent-jobs-title')}>
                            Việc làm 
                        </span>
                    </JobsContainer>
                </div>
            </div>
        </div>
    )
}

export default JobPost;