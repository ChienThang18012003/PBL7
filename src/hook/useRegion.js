import { useState, useEffect } from 'react';
import Region_API from '../API/Region_API';
import Account_API from '../API/Account_API';

const useRegion = () => {
    const [regionHook, setRegionHook] = useState([]);
    const [regionLoading, isRegionLoading] = useState(false);

    const filterRegion = async () => {
        isRegionLoading(true);
        try {
            const allRegions = await Region_API.get_All_Region();
            const sortedRegion = allRegions.sort((a, b) => a.name.localeCompare(b.name));
            setRegionHook(sortedRegion);
        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isRegionLoading(false);
        }
    };

    useEffect(() => {
        filterRegion();
    }, []);

    return [regionLoading, regionHook];
};

export default useRegion;
