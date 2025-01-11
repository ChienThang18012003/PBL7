import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ImageContainer, RelatedCard, RelatedContainer, RelateDisplay} from "./TopSpeciality.element";
import Image from '../Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor} from '@fortawesome/free-solid-svg-icons';
import useRegion from '../../hook/useRegion';
import useSpeciality from '../../hook/useSpeciality';
import { faMagnifyingGlass, faStethoscope, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useAppContext } from '../../context/AppContext';

const TopSpeciality = ({data : initialData}) => {
    const navigate = useNavigate();
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality, getAllSpeciality] = useSpeciality();
    const [region, setRegion] = useState({});
    const [speciality, setSpeciality] = useState({});
    const [docInfo, setDocInfo] = useState({});
    const [data, setData] = useState(initialData);

    useEffect(()=>{
        const fetchSpecialityImage = async() => {
            if (specialityHook && Array.isArray(specialityHook)) {
                const matchingSpeciality = specialityHook.find(
                  (speciality) => speciality?.name === data?.speciality
                );
        
                if (matchingSpeciality) {
                  console.log("yes");
                  setData((prevData) => ({
                    ...prevData,
                    speciality_image: matchingSpeciality?.speciality_image,
                    _id: matchingSpeciality?._id,
                  }));
                }
            }
        }
        fetchSpecialityImage();
    },[specialityHook])


    return (
                

                    <RelatedCard onClick={() => {
                        navigate(`/speciality-info/${data?._id}`);
                        window.scrollTo(0, 0)
                    }}
                                 key={data?._id}
                    >
                        <ImageContainer>
                            <div className='circle-container'><Image className='img-custom' src={data?.speciality_image} alt='img'/></div>

                        </ImageContainer>
                        <div className='total-app-wrapper'>
                            <p className='speciality-doc'>Số lượng bác sĩ: </p>
                            <p className='total-app'>{data?.doctorCount || '0'}</p>
                            <FontAwesomeIcon className='total-app' icon={faUserDoctor}></FontAwesomeIcon>
                        </div>
                        <div className='info-custom'>                            
                            <p className='name-doc'>{data?.speciality}</p>
                        </div>

                    </RelatedCard>

                
    );
};

export default TopSpeciality;
