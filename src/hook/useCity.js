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

    const addCity = async (name) => {
        isCityLoading(true);
        try {
            const newCity = await City_API.add_City(name);
            return newCity;
        } catch (error) {
            console.error('Failed to add City:', error);
            return null;
        } finally {
            isCityLoading(false);
        }
    };

    const updateCity = async (id, name) => {
        isCityLoading(true);
        try {
            const newCity = await City_API.update_City(id, name);
            return newCity;
        } catch (error) {
            console.error('Failed to update City:', error);
            return null;
        } finally {
            isCityLoading(false);
        }
    };

    const deleteCity = async (city_Ids) => {
        isCityLoading(true);
        try {
            const newCity = await City_API.delete_City(city_Ids);
            return newCity;
        } catch (error) {
            console.error('Failed to update City:', error);
            return null;
        } finally {
            isCityLoading(false);
        }
    };

    useEffect(() => {
        filterCity();
    }, []);

    return [cityLoading, cityHook, addCity, updateCity, deleteCity];
};

export default useCity;
