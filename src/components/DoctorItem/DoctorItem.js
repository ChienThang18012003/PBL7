import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {ImageContainer, RelatedCard, RelatedContainer, RelateDisplay} from "./DoctorItem.element";
import Image from '../Image';

const DoctorItem = ({data}) => {
    const navigate = useNavigate()

    return (
                

                    <RelatedCard onClick={() => {
                        navigate(`/appointment/${data?._id}`);
                        window.scrollTo(0, 0)
                    }}
                                 key={data?._id}
                    >
                        <ImageContainer>
                            <Image className='img-custom' src={data?.profile_image} alt='img'/>

                        </ImageContainer>
                        <div className='info-custom'>

                            <p className='name-doc'>{data?.username}</p>
                            <p className='speciality-doc'>{data?.region_id?.name}</p>
                        </div>
                    </RelatedCard>

                
    );
};

export default DoctorItem;
