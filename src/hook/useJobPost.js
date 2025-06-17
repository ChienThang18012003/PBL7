import { useState, useEffect } from 'react';
import Job_Post_API from '../API/Job_Post_API';

const useJobPost = () => {
    const [jobPostHook, setJobPostHook] = useState([]);
    const [jobPostLoading, isJobPostLoading] = useState(false);
    const [answerLoading, isAnswerLoading] = useState(false);

    const filterJobPosts = async () => {
        isJobPostLoading(true);
        try {
            const allJobPosts = await Job_Post_API.get_All_Job_Post();
            setJobPostHook(allJobPosts)
        } catch (error) {
            console.error('Failed to fetch job posts:', error);
        } finally {
            isJobPostLoading(false);
        }
    };

    const getAllJobPosts = async () => {
        try {
            const allJobPosts = await Job_Post_API.get_All_Job_Post();
            return allJobPosts;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
        }
    };

    const getJobPost = async (id) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.get_Job_Post(id);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const getJobPostByEmail = async (email) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.get_Job_Post_By_Email(email);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const suggestJobPostByEmail = async (email) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.suggest_Job_By_Email(email);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const getJobPostNameByEmail = async (email) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.get_Job_Post_Name_By_Email(email);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const getJobPostByIds = async (job_post_ids) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.get_Job_Post_By_Ids(job_post_ids);
            const today = new Date();
            const filteredJobPostList = (Job_Post || []).filter((JobPost) => {
                return (
                    JobPost?.is_deleted === false &&
                    new Date(JobPost?.deadline) >= today
                );
            });
            return filteredJobPostList;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const getJobPostByCompany = async (company_id) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.get_Job_Post_By_Company(company_id);
            const today = new Date();

            const filteredJobPostList = (Job_Post?.data || []).filter((JobPost) => {
                return (
                    JobPost?.is_deleted === false &&
                    new Date(JobPost?.deadline) >= today
                );
            });
            return filteredJobPostList;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };
    // useEffect(() => {
    //     filterJobPost();
    // }, []);

    const filterJobPostList = async (city_id, career_id, is_urgent) => {
        isJobPostLoading(true);
        try {
            const JobPostList = await Job_Post_API.filter_Job_Posts_List(city_id, career_id, is_urgent);

            const today = new Date();

            const filteredJobPostList = (JobPostList?.data || []).filter((JobPost) => {
                return (
                    JobPost?.is_deleted === false &&
                    new Date(JobPost?.deadline) >= today
                );
            });

            return filteredJobPostList;
        } catch (error) {
            console.error('Failed to fetch job post list:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };


    const searchJobPost = (searchValue, displayedJobPost) => {
        if (!searchValue) return displayedJobPost;

        return displayedJobPost.filter((JobPost) => (JobPost?.job_name || '').toLowerCase().includes(searchValue.toLowerCase()));
    };

    const updateJobPostView = async (id) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.update_Job_Post_View(id);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const addJobPost = async (email, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.add_Job_Post(email, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const updateJobPost = async (id, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.update_Job_Post(id, career_id, company_id, location_id, job_name, deadline, quantity, position, type_of_workplace, experience, academic_level, job_type, salary_min, salary_max, job_description, job_requirement, benefit_enjoyed, gender_required, contact_person_name, contact_person_phone, contact_person_email, is_urgent);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const deleteJobPost = async (id) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.delete_Job_Post(id);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const countJobPostByUser = async (email) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.count_Job_Post_By_User(email);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const extractIntent = async (question) => {
        try {
            isAnswerLoading(true);
            const Job_Post = await Job_Post_API.extract_Intent(question);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isAnswerLoading(false);
        }
    };

    const statisticJobPostByAcademicLevel = async (email, start_date, end_date) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.statistic_Job_Post_By_Academic_Level(email, start_date, end_date);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    const statisticTop5JobPostByResumeApplied = async (email, start_date, end_date) => {
        try {
            isJobPostLoading(true);
            const Job_Post = await Job_Post_API.statistic_Top5_Job_Post_By_Resume_Applied(email, start_date, end_date);
            return Job_Post;
        } catch (error) {
            console.error('Failed to fetch Job Posts:', error);
            return null;
        } finally {
            isJobPostLoading(false);
        }
    };

    return [
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
        suggestJobPostByEmail,
        extractIntent,
        answerLoading
    ];
};
export default useJobPost;
