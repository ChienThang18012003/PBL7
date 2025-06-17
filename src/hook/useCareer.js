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
        try {
            isCareerLoading(true);
            const allCareers = await Career_API.get_All_Career();
            return allCareers;
        } catch (error) {
            console.error('Failed to fetch careers:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    const statisticTop8CareerByJobPost = async () => {
        isCareerLoading(true);
        try {
            const newCareer = await Career_API.statistic_Top8_Career_By_Job_Post();
            return newCareer;
        } catch (error) {
            console.error('Failed to delete Career:', error);
            return null;
        } finally {
            isCareerLoading(false);
        }
    };

    useEffect(() => {
        filterCareer();
    }, []);

    return [careerLoading, careerHook, getAllCareers, statisticTop8CareerByJobPost];
};

export default useCareer;
