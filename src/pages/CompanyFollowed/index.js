import classNames from 'classnames/bind';
import styles from './CompanyFollowed.module.scss';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import CompanyFollowedItem from '../../components/CompanyFollowedItem';
import useCompanyFollowed from '../../hook/useCompanyFollowed';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function CompanyFollowed() {
    const [companyFollowedLoading, companyFollowedHook, getCompanyFollowedByEmail, getSpecificCompanyFollowed, addCompanyFollowed, deleteCompanyFollowed] = useCompanyFollowed();
    const [displayedCompanyFollowed, setDisplayedCompanyFollowed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(4);
    useEffect(()=>{
        const fetchCompanyFollowed = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    const companies = await getCompanyFollowedByEmail(obj?.email);
                    console.log(companies);
                    if (companies) setDisplayedCompanyFollowed(companies)
                }
           }
        }
        fetchCompanyFollowed();
    },[])

    useEffect(()=>{
        if (displayedCompanyFollowed.length !== 0) {
            if (displayedCompanyFollowed.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedCompanyFollowed])

    const handleDeleteCompanyFollowed = (id) => {
        if (!id) return;

        setDisplayedCompanyFollowed((prev) =>
            prev.filter((item) => item._id !== id)
        );
    }

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedCompanyFollowed || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (companyFollowedLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-followed-wrapper')}>
                <div className={cx('title')}>
                    <span>
                        Công ty đã theo dõi
                    </span>
                </div>
                <div className={cx('company-followed-container')}>
                    {
                        Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                            <CompanyFollowedItem onDeleteCompanyFollowed={handleDeleteCompanyFollowed} data={company} key={index}></CompanyFollowedItem>
                        ))
                    }
                </div>
                <Pagination
                    totalPosts={(displayedCompanyFollowed || []).length}
                    postsPerPage={docPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </div>
        </div>
    )
}

export default CompanyFollowed;