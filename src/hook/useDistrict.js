import { useState, useEffect } from 'react';
import District_API from '../API/District_API';

const useDistrict = () => {
    const [districtHook, setDistrictHook] = useState([]);
    const [districtLoading, isDistrictLoading] = useState(false);

    const filterDistrict = async () => {
        isDistrictLoading(true);
        try {
            const allDistricts = await District_API.get_All_District();
            setDistrictHook(allDistricts);
        } catch (error) {
            console.error('Failed to fetch districts:', error);
        } finally {
            isDistrictLoading(false);
        }
    };

    useEffect(() => {
        filterDistrict();
    }, []);

    const getAllDistricts = async () => {
        isDistrictLoading(true);
        try {
            const allDistricts = await District_API.get_All_District();
            return allDistricts;
        } catch (error) {
            console.error('Failed to fetch districts:', error);
            return null;
        } finally {
            isDistrictLoading(false);
        }
    };

    const getAllDistrictsByCity = async (name) => {
        isDistrictLoading(true);
        try {
            const allDistricts = await District_API.get_All_District_By_City(name);
            return allDistricts;
        } catch (error) {
            console.error('Failed to fetch districts:', error);
            return null;
        } finally {
            isDistrictLoading(false);
        }
    };

    return [districtLoading, districtHook, getAllDistricts, getAllDistrictsByCity];
};

export default useDistrict;
