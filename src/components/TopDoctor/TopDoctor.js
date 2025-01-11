import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ImageContainer, RelatedCard, RelatedContainer, RelateDisplay} from "./TopDoctor.element";
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import { faMagnifyingGlass, faStethoscope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';

const TopDoctor = ({data}) => {
    const navigate = useNavigate();
    const [regionLoading, regionHook, getRegionByID] = useRegion();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality, getAllSpeciality] = useSpeciality();
    const [region, setRegion] = useState({});
    const [speciality, setSpeciality] = useState({});
    const [docInfo, setDocInfo] = useState({});
    const { setSharedData } = useAppContext();

    useEffect(()=>{
        const fetchSpecialityAndRegion = async() => {
            let regionObject = {};
            let specialityObject = {};
            const region = await getRegionByID(data?.doctorDetails?.region_id);
            if (region) {
               setRegion(region?.data);
               regionObject = {
                _id: data?.doctorDetails?.region_id,
                name: region?.data?.name || 'Unknown Region',
              };
            }
            const speciality = await getSpecialityByID(data?.doctorDetails?.speciality_id);
            if (speciality) {
                setSpeciality(speciality);
                specialityObject = {
                    id: data?.doctorDetails?.speciality_id,
                    name: speciality?.name || 'Unknown Speciality',
                  };
            }
            const updatedData = {
                ...data?.doctorDetails,
                region_id: regionObject, 
                speciality_id: specialityObject,
              };

            setDocInfo(updatedData);
        }
        fetchSpecialityAndRegion();
    },[])

    const handleBooking = (event) => {
        event.stopPropagation();
        setSharedData(docInfo);
        navigate('/appointment');
        window.scrollTo(0,0);
    }

    return (
                

                    <RelatedCard onClick={() => {
                        navigate(`/appointment/${data?._id}`);
                        window.scrollTo(0, 0)
                    }}
                                 key={data?._id}
                    >
                        <ImageContainer>
                            <div className='circle-container'><Image className='img-custom' src={data?.doctorDetails?.profile_image} alt='img'/></div>

                        </ImageContainer>
                        <div className='total-app-wrapper'>
                            <p className='speciality-doc'>Lượt khám: </p>
                            <p className='total-app'>{data?.appointmentCount || '0'}</p>
                            <FontAwesomeIcon className='total-app' icon={faCalendarCheck}></FontAwesomeIcon>
                        </div>
                        <div className='info-custom'>
                            
                            <p className='name-doc'>{data?.doctorDetails?.username}</p>
                            <div className='status'>
                                <FontAwesomeIcon icon={faStethoscope} className="speciality-icon"></FontAwesomeIcon>
                                <p className='speciality-style'>{speciality?.name}</p>
                            </div>
                            <div className='status'>
                                <FontAwesomeIcon icon={faLocationDot} className="location-icon"></FontAwesomeIcon>
                                <p className='speciality-style'>{region?.name}</p>
                            </div>
                        </div>

                        <div className='button-wrapper'>
                            <div className='book-button' onClick={handleBooking}>
                                Đặt lịch khám
                            </div>
                        </div>
                    </RelatedCard>

                
    );
};

export default TopDoctor;
