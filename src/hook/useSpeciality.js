import { useState, useEffect } from 'react';
import Speciality_API from '../API/Speciality_API';

const useSpeciality = () => {
    const [specialityHook, setSpecialityHook] = useState([]);
    const [specialityLoading, isSpecialityLoading] = useState(false);

    const filterSpeciality = async () => {
        isSpecialityLoading(true);
        try {
            const allSpecialities = await Speciality_API.get_All_Speciality();
            const sortedSpecialities = allSpecialities.sort((a, b) => a.name.localeCompare(b.name));
            setSpecialityHook(sortedSpecialities);
        } catch (error) {
            console.error('Failed to fetch specialities:', error);
        } finally {
            isSpecialityLoading(false);
        }
    };

    const getAllSpeciality = async() => {
        try {
            const allSpecialities = await Speciality_API.get_All_Speciality();
            const sortedSpecialities = allSpecialities.sort((a, b) => a.name.localeCompare(b.name));
            return sortedSpecialities;
        } catch (error) {
            console.error('Failed to fetch specialities:', error);
            return null;
        } finally {
        }
    }

    const searchSpeciality = (searchValue, displayedSpecialities) => {
        if (!searchValue) return displayedSpecialities;

        return (displayedSpecialities || []).filter((speciality) =>
            speciality.name.toUpperCase().includes(searchValue.toUpperCase())
        );
    };


    const getSpecialityByID = async (id) => {
        isSpecialityLoading(true);
        try {
            const Speciality = await Speciality_API.get_Speciality_By_ID(id);
            return Speciality;
        } catch (error) {
            console.error('Failed to fetch speciality by ID:', error);
            return null;
        } finally {
            isSpecialityLoading(false);
        }
    }

    useEffect(() => {
        filterSpeciality();
    }, []);

    return [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality, getAllSpeciality];
};

export default useSpeciality;
