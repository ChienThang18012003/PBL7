import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import {ImageContainer, RelatedCard, RelatedContainer, RelateDisplay} from "./relateddoctors.element";
import useAccount from '../../hook/useAccount';

const RelatedDoctors = ({speciality, docId}) => {
    const [checkLogin, signUp, loadingAccount, doctorsHook] = useAccount();
    const [relateDoc, setRelateDoc] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (doctorsHook.length > 0 && speciality) {
            const doctorsData = doctorsHook.filter((doc) => doc.speciality_id.name === speciality && doc._id !== docId)
            setRelateDoc(doctorsData)
        }
    }, [doctorsHook, speciality, docId]);

    return (
        <RelatedContainer>
            <RelateDisplay>
                {relateDoc.slice(0, 4).map((item, index) => (

                    <RelatedCard onClick={() => {
                        navigate(`/appointment/${item._id}`);
                        window.scrollTo(0, 0)
                    }}
                                 key={index}
                    >
                        <ImageContainer>
                            <img className='img-custom' src={`data:image/jpeg;base64,${item.profile_image}`} alt='img'/>

                        </ImageContainer>
                        <div className='info-custom'>

                            <p className='name-doc'>{item.username}</p>
                            <p className='speciality-doc'>{item.speciality_id.name}</p>
                        </div>
                    </RelatedCard>

                ))}
            </RelateDisplay>

        </RelatedContainer>
    );
};

export default RelatedDoctors;
