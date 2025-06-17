import { useState, useEffect } from 'react';
import Certificate_API from '../API/Certificate_API';

const useCertificate = () => {
    const [certificateHook, setCertificateHook] = useState([]);
    const [certificateLoading, isCertificateLoading] = useState(false);

    const filterResume = async () => {
        isCertificateLoading(true);
        try {

        } catch (error) {
            console.error('Failed to fetch regions:', error);
        } finally {
            isCertificateLoading(false);
        }
    };

    // useEffect(() => {
    //     filterCity();
    // }, []);

    const getCertificateByResume = async (resumeID) => {
        isCertificateLoading(true);
        try {
            const Certificate = await Certificate_API.get_All_Certificate_By_Resume(resumeID);
            return Certificate;
        } catch (error) {
            console.error('Failed to fetch certificate:', error);
            return null;
        } finally {
            isCertificateLoading(false);
        }
    };

    const addCertificate = async (resume_id, name, training_place, start_date, expiration_date, description) => {
        isCertificateLoading(true);
        try {
            const certificate = await Certificate_API.add_Certificate(resume_id, name, training_place, start_date, expiration_date, description);
            return certificate;
        } catch (error) {
            console.error('Failed to add certificate:', error);
            return null;
        } finally {
            isCertificateLoading(false);
        }
    };

    const updateCertificate = async (id, resume_id, name, training_place, start_date, expiration_date, description) => {
        isCertificateLoading(true);
        try {
            const certificate = await Certificate_API.update_Certificate(id, resume_id, name, training_place, start_date, expiration_date, description);
            return certificate;
        } catch (error) {
            console.error('Failed to update certificate:', error);
            return null;
        } finally {
            isCertificateLoading(false);
        }
    };

    const deleteCertificate = async (certificate_Id) => {
        isCertificateLoading(true);
        try {
            const Certificate = await Certificate_API.perma_Delete_Certificate(certificate_Id);
            return Certificate;
        } catch (error) {
            console.error('Failed to delete Certificate:', error);
            return null;
        } finally {
            isCertificateLoading(false);
        }
    };

    return [certificateLoading, certificateHook, getCertificateByResume, addCertificate, updateCertificate, deleteCertificate];
};

export default useCertificate;
