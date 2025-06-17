import { useState, useEffect } from 'react';
import Location_API from '../API/Location_API';

const useLocate = () => {
    const [locationHook, setLocationHook] = useState([]);
    const [locationLoading, isLocationLoading] = useState(false);

    const filterLocation = async () => {
        isLocationLoading(true);
        try {
            const allLocations = await Location_API.get_All_Location();
            setLocationHook(allLocations);
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            isLocationLoading(false);
        }
    };

    const getAllLocations = async () => {
        isLocationLoading(true);
        try {
            const allLocations = await Location_API.get_All_Location();
            return allLocations;
        } catch (error) {
            console.error('Failed to fetch locations:', error);
            return null;
        } finally {
            isLocationLoading(false);
        }
    };

    // useEffect(() => {
    //     filterLocation();
    // }, []);

    const addLocation = async (city_name, district_name, address, is_deleted, lat, lng) => {
        isLocationLoading(true);
        try {
            const newLocation = await Location_API.add_Location(city_name, district_name, address, is_deleted , lat, lng);
            return newLocation;
        } catch (error) {
            console.error('Failed to add location:', error);
            return null;
        } finally {
            isLocationLoading(false);
        }
    };

    const changeLocation = async (id, city_name, district_name, address, lat, lng) => {
        isLocationLoading(true);
        try {
            const newLocation = await Location_API.change_Location_Info(id, city_name, district_name, address, lat, lng);
            return newLocation;
        } catch (error) {
            console.error('Failed to change location:', error);
            return null;
        } finally {
            isLocationLoading(false);
        }
    };

    return [locationLoading, locationHook, getAllLocations, addLocation, changeLocation];
};

export default useLocate;
