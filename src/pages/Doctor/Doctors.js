import React, { useContext, useEffect, useState } from 'react';
import { DoctorsLayout, DoctorsLeft, DoctorsRight } from "./doctors.element";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import useSpeciality from '../../hook/useSpeciality';
import useAccount from '../../hook/useAccount';

const Doctors = () => {
    const { speciality } = useParams();
    const [filterDoc, setFilterDoc] = useState([]);
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [specialityLoading, specialityHook] = useSpeciality();
    const [checkLogin, signUp, loadingAccount, doctorsHook] = useAccount();

    const applyFilter = () => {
        console.log("DoctorsHook: ",doctorsHook);
        if (speciality && Array.isArray(doctorsHook)) {
            setFilterDoc(doctorsHook.filter(doctor => doctor.speciality_id.name === speciality));
            console.log("1");
        } else {
            console.log("2");
            setFilterDoc(doctorsHook);
        }
        console.log('Filtered doctors:', filterDoc);

    };

    useEffect(() => {
        applyFilter();
    }, [doctorsHook, speciality]);

    return (
        <div>
            <DoctorsLayout>
                <DoctorsLeft>
                    {Array.isArray(specialityHook) && specialityHook.map((specialities) => (
                        <p
                            key={specialities.name}
                            onClick={() => speciality === specialities.name ? navigate('/doctors') : navigate(`/doctors/${specialities.name}`)}
                            className={`speciality-button ${speciality === specialities.name ? "selected" : ""}`}
                        >
                            {specialities.name}
                        </p>
                    ))}
                </DoctorsLeft>

                <DoctorsRight>
                    {Array.isArray(filterDoc) && filterDoc.map((item, index) => (
                        <div onClick={() => navigate(`/appointment/${item._id}`)} className='card' key={index}>
                            <img className='image-background' src={`data:image/jpeg;base64,${item.profile_image}`} alt='img' />
                            <div className='content'>
                                <div className='status'>
                                    <p className='dot'></p> <p>Available</p>
                                </div>
                                <p className='name-style'>{item.username}</p>
                                <p className='speciality-style'>{item.speciality_id?.name}</p>
                            </div>
                        </div>
                    ))}
                </DoctorsRight>
            </DoctorsLayout>
        </div>
    );
};

export default Doctors;
