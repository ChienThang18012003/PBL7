import classNames from 'classnames/bind';
import styles from './Company.module.scss';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBriefcase, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';
import Banner from '../../components/Banner';
import CompanyCard from '../../components/CompanyCard';
import Pagination from '../../components/Pagination';
import useCareer from '../../hook/useCareer';
import useCity from '../../hook/useCity';
import useCompany from '../../hook/useCompany';


const cx = classNames.bind(styles);

function Company() {
    const [cityLoading, cityHook] = useCity();
    const [careerLoading, careerHook, getAllCareers] = useCareer();
    const [selectedCity, setSelectedCity] = useState('all');
    const [selectedCareer, setSelectedCareer] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [displayedCompany, setDisplayedCompany] = useState([]);
    const [email, setEmail] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(6);
    const [
        companyHook,
        loading,
        getAllCompanies,
        addCompany,
        filterCompanyList,
        searchCompany
    ] = useCompany();

    const handleSubmitSearch = async () => {
        const relatedCompanies = await searchCompany(searchValue, displayedCompany);
        setCurrentPage(1);
        setDisplayedCompany(relatedCompanies);
    };

    useEffect(() => {
        const fetchCompanies = async () => {
                const companies = await filterCompanyList(selectedCity, selectedCareer);
                if (companies && Array.isArray(companies)) setDisplayedCompany(companies);
            };
        fetchCompanies();

    }, [selectedCity, selectedCareer]);

    useEffect(()=>{
        const fetchEmail = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    setEmail(obj?.email)
                }
           }
        }
        fetchEmail();
    },[])

    if (loading || cityLoading || careerLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedCompany || []).slice(firstDoctorIndex, lastDoctorIndex);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-container')}>
                <div className={cx('slider-wrapper')}>
                    <Banner type="Company"></Banner>
                </div>
            </div>
            <div className={cx('search-box-container')}>
                <div className={cx('search-box-wrapper')}>
                    <Image src={assets.CompanySearchCover} className={cx('company-search-cover')}></Image>
                    <div className={cx('search-title')}>
                        <span>
                            Tìm kiếm công ty
                        </span>
                    </div>
                    <div className={cx('search-bar-wrapper')}>
                        <div className={cx('search-bar')}>
                            <input type="text" placeholder='Nhập tên công ty' className={cx('search-input')} value={searchValue} onChange={(e)=>{setSearchValue(e.target.value)}}></input>
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
                            Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                                <CompanyCard data={company} key={index} email={email}></CompanyCard>
                            ))
                        }
                    </div>
                    <Pagination 
                        totalPosts={(displayedCompany || []).length}
                        postsPerPage={docPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    ></Pagination>
                </div>
            </div>
        </div>
    )
}

export default Company;