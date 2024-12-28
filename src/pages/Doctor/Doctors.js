import React, { useContext, useEffect, useState } from 'react';
import { DoctorsLayout, ImageContainer, DoctorsRight } from "./doctors.element";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import useSpeciality from '../../hook/useSpeciality';
import useAccount from '../../hook/useAccount';
import classNames from 'classnames/bind';
import styles from './Doctor.module.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useRegion from '../../hook/useRegion';
import Pagination from '../../components/Pagination';
import PageTitle from '../../components/PageTitle';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import { assets } from '../../assets/assets_fe/assets';

const cx = classNames.bind(styles);

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [specialityLoading, specialityHook] = useSpeciality();
    const [
        checkLogin, 
        signUp, 
        loadingAccount, 
        doctorsHook, 
        getAccountByID, 
        filterDoctorList, 
        getAccountByEmail, 
        checkAccountType, 
        uploadProof, 
        changePassword, 
        getDoctorActiveList, 
        addDoctorActiveHour, 
        changeAccountInfo, 
        changeDoctorInfo, 
        searchDoctor, 
        forgotPassword, 
        getDoctorList, 
        deleteDoctorActiveHour, 
        updateDoctorActiveHour,
        softDeleteAccount,
        getFilterDoctorList
        ] = useAccount();
    const [selectedFaculty, setSelectedFaculty] = useState('all');
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [searchValue, setSearchValue] = useState('');
    const [regionLoading, regionHook] = useRegion();
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(10);
    const [isFirstAccess, setIsFirstAccess] = useState(true);
    let intervalId;

    
    
    const handleFacultyChange = (event) => {
        setSelectedFaculty(event.target.value);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSubmitSearch = async () => {
         const relatedDoctors = await searchDoctor(searchValue, filterDoc);
         setCurrentPage(1);
         setFilterDoc(relatedDoctors);
    };

    useEffect(() => {
        const fetchDoctors = async () => {
             
             const doctors = await filterDoctorList(selectedFaculty, selectedRegion);
             setCurrentPage(1);
             setFilterDoc(doctors);
         };
        fetchDoctors();

        const fetchDoctorsPeriodically = async () => {
            const doctors = await getFilterDoctorList(selectedFaculty, selectedRegion);
            if (doctors) setFilterDoc(doctors);
        };
        
            intervalId = setInterval(() => {
                fetchDoctorsPeriodically();
            }, 5000);
            

        return () => {
            clearInterval(intervalId);
        };

    }, [selectedFaculty, selectedRegion]);

    if (loadingAccount || regionLoading || specialityLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (filterDoc || []).slice(firstDoctorIndex, lastDoctorIndex);

    return (
        <div>
            <PageTitle>CHUYÊN GIA - BÁC SĨ</PageTitle>
            <div className={cx('search-section')}>
                <div className={cx('search-section-title-wrapper')}>
                    <h4 className={cx('search-section-title')}>
                        <span>Thông tin tra cứu</span>
                    </h4>
                </div>
                <div className={cx('search-section-options-wrapper')}>
                    <div className={cx('search-section_faculty-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Chuyên khoa</span>
                        </h4>
                        <select
                            className={cx('faculty')}
                            name="faculty"
                            value={selectedFaculty}
                            onChange={handleFacultyChange}
                        >
                            <option value={'all'}>All</option>
                            {(specialityHook || []).map((speciality) => (
                                <option key={speciality?.id} value={speciality?.name}>
                                    {speciality?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('search-section_bar-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Tìm kiếm</span>
                        </h4>
                        <div className={cx('search-bar')}>
                            <input
                                className={cx('search-bar-textbox')}
                                type="text"
                                value={searchValue}
                                onChange={handleSearchChange}
                            ></input>
                            <button className={cx('search-bar-button')} onClick={handleSubmitSearch}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('search-section_sort-wrapper')}>
                        <h4 className={cx('search-section_option-title')}>
                            <span>Vùng</span>
                        </h4>
                        <select className={cx('sort')} name="region" value={selectedRegion} onChange={handleRegionChange}>
                            <option value="all">All</option>
                            {(regionHook || []).map((region) => (
                                <option key={region?.id} value={region?.name}>
                                    {region?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <DoctorsLayout>
            
                

                <DoctorsRight>
                    {Array.isArray(currentDoctors) && currentDoctors.map((item, index) => (
                        <div onClick={() => navigate(`/appointment/${item?._id}`)} className='card' key={index}>
                            
                            <ImageContainer><Image className='image-background' src={item?.profile_image} alt='img' fallback={assets.NoImage}/></ImageContainer>

                            
                            <div className='content'>
                                <div className='status'>
                                    <p className='dot'></p> <p>Available</p>
                                </div>
                                <p className='name-style'>{item?.username}</p>
                                <p className='speciality-style'>{item?.speciality_id?.name}</p>
                            </div>
                        </div>
                    ))}
                </DoctorsRight>
            </DoctorsLayout>
            {(filterDoc || []).length > docPerPage && (
                <div className={cx('pagination-wrapper')}>
                <div className={cx('pagination')}>
                    <Pagination
                        totalPosts={filterDoc.length}
                        postsPerPage={docPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    ></Pagination>
                </div>
                </div>
            ) }
            
        </div>
    );
};

export default Doctors;
