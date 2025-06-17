import { useState, useEffect } from 'react';
import Education_Detail_API from '../API/Education_Detail_API';

const useEducationDetail = () => {
    const [educationDetailHook, setEducationDetailHook] = useState([]);
    const [educationDetailLoading, isEducationDetailLoading] = useState(false);

    const filterResume = async () => {
        isEducationDetailLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isEducationDetailLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getEduDetailByResume = async (resumeID) => {
        isEducationDetailLoading(true);
        try {
            const eduDetail = await Education_Detail_API.get_All_Education_Detail_By_Resume(resumeID);
            return eduDetail;
        } catch (error) {
            console.error('Failed to fetch eduDetail:', error);
            return null;
        } finally {
            isEducationDetailLoading(false);
        }
    };

    const addEduDetail = async (resume_id, degree_name, major, training_place_name, start_date, completed_date) => {
        isEducationDetailLoading(true);
        try {
            const eduDetail = await Education_Detail_API.add_Education_Detail(resume_id, degree_name, major, training_place_name, start_date, completed_date);
            return eduDetail;
        } catch (error) {
            console.error('Failed to add eduDetail:', error);
            return null;
        } finally {
            isEducationDetailLoading(false);
        }
    };

    const updateEduDetail = async (id, resume_id, degree_name, major, training_place_name, start_date, completed_date, description) => {
        isEducationDetailLoading(true);
        try {
            const eduDetail = await Education_Detail_API.update_Education_Detail(id, resume_id, degree_name, major, training_place_name, start_date, completed_date, description);
            return eduDetail;
        } catch (error) {
            console.error('Failed to update eduDetail:', error);
            return null;
        } finally {
            isEducationDetailLoading(false);
        }
    };

    const deleteEduDetail = async (education_detail_Id) => {
        isEducationDetailLoading(true);
        try {
            const eduDetail = await Education_Detail_API.perma_Delete_Education_Detail(education_detail_Id);
            return eduDetail;
        } catch (error) {
            console.error('Failed to delete eduDetail:', error);
            return null;
        } finally {
            isEducationDetailLoading(false);
        }
    };

    return [educationDetailLoading, educationDetailHook, getEduDetailByResume, addEduDetail, updateEduDetail, deleteEduDetail];
};

export default useEducationDetail;
