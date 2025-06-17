import { useState, useEffect } from 'react';
import User_Search_Preference_API from '../API/User_Search_Preference_API';

const useSearchPreference = () => {
    const [searchHook, setSearchHook] = useState([]);
    const [searchLoading, isSearchLoading] = useState(false);

    const addSearchPreference = async(email, keyword, city_id, career_id) => {
        try {
            const newSearch = await User_Search_Preference_API.add_User_Search(email, keyword, city_id, career_id);
            return newSearch;
        } catch (error) {
            console.error('Failed to fetch specialities:', error);
            return null;
        } finally {
        }
    }

    return [searchLoading, searchHook, addSearchPreference];
};

export default useSearchPreference;
