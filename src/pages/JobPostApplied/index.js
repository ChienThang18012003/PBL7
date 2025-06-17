import classNames from 'classnames/bind';
import styles from './JobPostApplied.module.scss';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import useResumeApplied from '../../hook/useResumeApplied';
import AppliedJobItem from '../../components/AppliedJobItem';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function JobPostApplied() {
    const [resumeAppliedLoading, resumeAppliedHook, getResumeAppliedByEmail, getSpecificResumeApplied, addResumeApplied, deleteResumeApplied] = useResumeApplied();
    const [displayedResumeApplied, setDisplayedResumeApplied] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(4);
    useEffect(()=>{
        const fetchResumeApplied = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    const resumes = await getResumeAppliedByEmail(obj?.email,'user');
                    console.log(resumes);
                    if (resumes) setDisplayedResumeApplied(resumes);
                }
           }
        }
        fetchResumeApplied();
    },[])

    useEffect(()=>{
        if (displayedResumeApplied.length !== 0) {
            if (displayedResumeApplied.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedResumeApplied])

    const handleDeleteResumeApplied = (id) => {
        if (!id) return;

        setDisplayedResumeApplied((prev) =>
            prev.filter((item) => item._id !== id)
        );
    }

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedResumeApplied || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (resumeAppliedLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-followed-wrapper')}>
                <div className={cx('title')}>
                    <span>
                        Công việc đã ứng tuyển
                    </span>
                </div>
                <div className={cx('company-followed-container')}>
                    {
                        Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                            <AppliedJobItem onDeleteResumeApplied={handleDeleteResumeApplied} data={company} key={index}></AppliedJobItem>
                        ))
                    }
                </div>
                <Pagination
                    totalPosts={(displayedResumeApplied || []).length}
                    postsPerPage={docPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </div>
        </div>
    )
}

export default JobPostApplied;