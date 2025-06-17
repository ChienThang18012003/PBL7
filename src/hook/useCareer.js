import { useState, useEffect } from 'react';
import Career_API from '../API/Career_API';

const useCareer = () => {
    const [careerHook, setCareerHook] = useState([]);
    const [careerLoading, isCareerLoading] = useState(false);

    const filterCareer = async () => {
        isCareerLoading(true);
        try {
            const allCareers = await Career_API.get_All_Career();
            setCareerHook(allCareers);
        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isCareerLoading(false);
        }
    };

    const getAllCareers = async () => {
        isCareerLoading(true);
        try {
            const allCareers = await Career_API.get_All_Career();
            return allCareers;
        } catch (error) {
            console.error('Failed to fetch careers:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    const addCareer = async (career_name, career_logo) => {
        isCareerLoading(true);
        try {
            const newCareer = await Career_API.add_Career(career_name, career_logo);
            return newCareer;
        } catch (error) {
            console.error('Failed to add Career:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    const updateCareer = async (id, career_name, career_logo) => {
        isCareerLoading(true);
        try {
            const newCareer = await Career_API.update_Career(id, career_name, career_logo);
            return newCareer;
        } catch (error) {
            console.error('Failed to update Career:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    const deleteCareer = async (career_Ids) => {
        isCareerLoading(true);
        try {
            const newCareer = await Career_API.delete_Career(career_Ids);
            return newCareer;
        } catch (error) {
            console.error('Failed to delete Career:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    const statisticTop5CareerByJobPost = async (start_date, end_date) => {
        try {
            const newCareer = await Career_API.statistic_Top5_Career_By_Job_Post(start_date, end_date);
            return newCareer;
        } catch (error) {
            console.error('Failed to delete Career:', error);
            return null;
        } finally {
        }
    };

    useEffect(() => {
        filterCareer();
    }, []);

    return [careerLoading, careerHook, getAllCareers, addCareer, updateCareer, deleteCareer, statisticTop5CareerByJobPost];
};

export default useCareer;
