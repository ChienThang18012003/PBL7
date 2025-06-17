import classNames from 'classnames/bind';
import styles from './SavedJobPost.module.scss';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import useJobPostSaved from '../../hook/useJobPostSaved';
import SavedJobItem from '../../components/SavedJobItem';
import LoadingAnimation from '../../components/LoadingAnimation';


const cx = classNames.bind(styles);

function SavedJobPost() {
    const [jobPostSavedLoading, jobPostSavedHook, getJobPostSavedByEmail, getSpecificJobPostSaved, addJobPostSaved, deleteJobPostSaved] = useJobPostSaved();
    const [displayedJobPostSaved, setDisplayedJobPostSaved] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [docPerPage, setDocPerPage] = useState(4);
    useEffect(()=>{
        const fetchJobPostSaved = async() => {
            let item = localStorage.getItem('isLoginSuccess');

            if (item) {
                let obj = JSON.parse(item);
                if (obj?.email){
                    const jobposts = await getJobPostSavedByEmail(obj?.email);
                    if (jobposts) setDisplayedJobPostSaved(jobposts)
                }
           }
        }
        fetchJobPostSaved();
    },[])

    useEffect(()=>{
        if (displayedJobPostSaved.length !== 0) {
            if (displayedJobPostSaved.length === (currentPage - 1)*docPerPage) setCurrentPage(currentPage-1);
        }
    },[displayedJobPostSaved])

    const handleDeleteJobPostSaved = (id) => {
        if (!id) return;

        setDisplayedJobPostSaved((prev) =>
            prev.filter((item) => item._id !== id)
        );
    }

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (displayedJobPostSaved || []).slice(firstDoctorIndex, lastDoctorIndex);

    if (jobPostSavedLoading) {
        return <LoadingAnimation></LoadingAnimation>
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('company-followed-wrapper')}>
                <div className={cx('title')}>
                    <span>
                        Công việc đã lưu
                    </span>
                </div>
                <div className={cx('company-followed-container')}>
                    {
                        Array.isArray(currentDoctors) && currentDoctors.map((company,index)=>(
                            <SavedJobItem onDeleteJobPostSaved={handleDeleteJobPostSaved} data={company} key={index}></SavedJobItem>
                        ))
                    }
                </div>
                <Pagination
                    totalPosts={(displayedJobPostSaved || []).length}
                    postsPerPage={docPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </div>
        </div>
    )
}

export default SavedJobPost;