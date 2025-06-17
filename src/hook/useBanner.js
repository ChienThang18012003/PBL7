import { useState, useEffect } from 'react';
import Banner_API from '../API/Banner_API';

const useBanner = () => {
    const [bannerHook, setBannerHook] = useState([]);
    const [bannerLoading, isBannerLoading] = useState(false);

    const getAllBanner = async () => {
        isBannerLoading(true);
        try {
            const newBanner = await Banner_API.get_All_Banner();
            return newBanner;
        } catch (error) {
            console.error('Failed to get Banner:', error);
            return null;
        } finally {
            isBannerLoading(false);
        }
    };

    const addBanner = async (email, type, banner_image) => {
        isBannerLoading(true);
        try {
            const newBanner = await Banner_API.add_Banner(email, type, banner_image);
            return newBanner;
        } catch (error) {
            console.error('Failed to add Banner:', error);
            return null;
        } finally {
            isBannerLoading(false);
        }
    };

    const updateBanner = async (id, type, banner_image) => {
        isBannerLoading(true);
        try {
            const newBanner = await Banner_API.update_Banner(id, type, banner_image);
            return newBanner;
        } catch (error) {
            console.error('Failed to update Banner:', error);
            return null;
        } finally {
            isBannerLoading(false);
        }
    };

    const deleteBanner = async (banner_Ids) => {
        isBannerLoading(true);
        try {
            const newBanner = await Banner_API.delete_Banner(banner_Ids);
            return newBanner;
        } catch (error) {
            console.error('Failed to delete Banner:', error);
            return null;
        } finally {
            isBannerLoading(false);
        }
    };

    return [bannerLoading, bannerHook, getAllBanner, addBanner, updateBanner, deleteBanner];
};

export default useBanner;
