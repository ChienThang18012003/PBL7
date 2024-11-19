import { useState, useEffect } from 'react';
import Speciality_API from '../API/Speciality_API';
import Account_API from '../API/Account_API';

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

    const searchSpeciality = (searchValue, displayedSpecialities) => {
        if (!searchValue) return displayedSpecialities;

        return displayedSpecialities.filter((speciality) =>
            speciality.name.toUpperCase().includes(searchValue.toUpperCase())
        );
    };


    const getSpecialityByID = async (id) => {
        const Speciality = await Speciality_API.get_Speciality_By_ID(id);
        return Speciality;
    }

    useEffect(() => {
        filterSpeciality();
    }, []);

    return [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality];
};

export default useSpeciality;
