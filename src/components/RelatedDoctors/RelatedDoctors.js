import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import {ImageContainer, RelatedCard, RelatedContainer, RelateDisplay} from "./relateddoctors.element";
import useAccount from '../../hook/useAccount';
import Image from '../Image';

const RelatedDoctors = ({speciality, docId}) => {
    const [
        checkLogin, 
        signUp, 
        loadingAccount, 
        doctorsHook, 
        getAccountByID, 
        filterDoctorList, 
        getAccountByEmail, 
        checkAccountType, 
        uploadProof, 
        changePassword, 
        getDoctorActiveList, 
        addDoctorActiveHour, 
        changeAccountInfo, 
        changeDoctorInfo, 
        searchDoctor, 
        forgotPassword, 
        getDoctorList, 
        deleteDoctorActiveHour, 
        updateDoctorActiveHour,
        softDeleteAccount,
        getFilterDoctorList,
        getAccountStatus
        ] = useAccount();
    const [relateDoc, setRelateDoc] = useState([]);
    const navigate = useNavigate()

    // useEffect(() => {
    //     if (Array.isArray(doctorsHook) && doctorsHook.length > 0 && speciality) {
    //         const doctorsData = doctorsHook.filter((doc) => doc?.speciality_id?.name === speciality && doc._id !== docId);
    //         console.log(doctorsHook);
    //         console.log(speciality, docId);
    //         console.log(doctorsData);
    //         setRelateDoc(doctorsData);
    //     }
    //     console.log(doctorsHook);
    //     console.log(speciality, docId);
    // }, [doctorsHook]);

    useEffect(() => {
        const fetchDoctorList = async() => {
            const RelatedDoctors = await filterDoctorList(speciality);
            const doctorsData = (RelatedDoctors || []).filter((doc) => doc._id !== docId);
            setRelateDoc(doctorsData);
        }
        fetchDoctorList();

        const fetchSpecialitiesAndDoctorsPeriodically = async () => {
            const RelatedDoctors = await getFilterDoctorList(speciality);
            const doctorsData = (RelatedDoctors || []).filter((doc) => doc._id !== docId);
            setRelateDoc(doctorsData);
        };

        const intervalId = setInterval(() => {
            fetchSpecialitiesAndDoctorsPeriodically();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    

    

    return (
        <RelatedContainer>
            <RelateDisplay>
                {relateDoc.slice(0, 4).map((item, index) => (

                    <RelatedCard onClick={() => {
                        navigate(`/appointment/${item?._id}`);
                        window.scrollTo(0, 0)
                    }}
                                 key={index}
                    >
                        <ImageContainer>
                            <Image className='img-custom' src={item?.profile_image} alt='img'/>

                        </ImageContainer>
                        <div className='info-custom'>

                            <p className='name-doc'>{item?.username}</p>
                            <p className='speciality-doc'>{item?.speciality_id.name}</p>
                        </div>
                    </RelatedCard>

                ))}
            </RelateDisplay>

        </RelatedContainer>
    );
};

export default RelatedDoctors;
