import { useState, useEffect } from 'react';
import City_API from '../API/City_API';

const useCity = () => {
    const [cityHook, setCityHook] = useState([]);
    const [cityLoading, isCityLoading] = useState(false);

    const filterCity = async () => {
        isCityLoading(true);
        try {
            const allCities = await City_API.get_All_City();
            const sortedCities = allCities.sort((a, b) => {
                const normalizeName = (name) =>
                    name.replace(/^(Thành phố|Tỉnh)\s+/i, '').trim().toLowerCase();
                return normalizeName(a.name).localeCompare(normalizeName(b.name));
            });
            setCityHook(sortedCities);
        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isCityLoading(false);
        }
    };

    useEffect(() => {
        filterCity();
    }, []);

    return [cityLoading, cityHook];
};

export default useCity;
