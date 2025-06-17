import classNames from 'classnames/bind';
import styles from './JobsContainer.module.scss';
import { useState, useEffect } from 'react';
import JobsItem from '../JobsItem';
import Pagination from '../Pagination';

const cx = classNames.bind(styles);

function JobsContainer({ data, children, currentPage, setCurrentPage }) {
    
    const [docPerPage, setDocPerPage] = useState(9);

    const lastDoctorIndex = currentPage * docPerPage;
    const firstDoctorIndex = lastDoctorIndex - docPerPage;
    const currentDoctors = (data || []).slice(firstDoctorIndex, lastDoctorIndex);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                    <div className={cx('logo-wrapper')}>
                        <div className={cx('logo-container')}>
                            {children}
                        </div>
                    </div>
            </div>
            <div className={cx('jobs-wrapper')}>
                {
                    (currentDoctors||[]).map((job, index)=>(
                        <JobsItem data={job} key={index}></JobsItem>
                    )) 
                }
            </div>  
            <Pagination
            totalPosts={(data || []).length}
            postsPerPage={docPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}>
            </Pagination>
        </div>
    );
}

export default JobsContainer;
