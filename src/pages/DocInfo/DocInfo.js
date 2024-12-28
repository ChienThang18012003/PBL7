import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    DocBookButton,
    DocHeader,
    DocInfoHeader,
    DocInfoLayout,
    DocInfoLeft,
    DocInfoRight,
    DocName,
    DocSD,
    DoctorInformation,
    DoctorInformationItem,
    DoctorRelate,
    HeaderUnderline, RelatedDoctorItem,
    Underline
} from "./docinfo.element";
import {useAppContext} from "../../context/AppContext";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";
import useAccount from '../../hook/useAccount';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';
import PageTitle from '../../components/PageTitle';

const DocInfo = () => {
    const [, , loadingAccount, , getAccountByID] = useAccount();
    const {docId} = useParams();
    const [docInfo, setDocInfo] = useState(null);
    const { setSharedData } = useAppContext();
    const [doctorBio, setDoctorBio] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchDoctor = async () => {
            const doctor = await getAccountByID(docId);
            setDocInfo(doctor);
            if (doctor && doctor?.bio) {
            setDoctorBio(splitText(doctor?.bio));
            }
        };

        fetchDoctor();
    }, [docId]);

    function splitText(text) {
        const validText = text || '';
        const sections = validText.split(/(?=GIỚI THIỆU|QUÁ TRÌNH CÔNG TÁC|QUÁ TRÌNH HỌC TẬP)/g);
        
        const result = {
            introduction: '',
            workExperience: '',
            education: ''
        };
    
        sections.forEach(section => {
            if (section.startsWith('GIỚI THIỆU')) {
                result.introduction = section.replace('GIỚI THIỆU', '').trim();
            } else if (section.startsWith('QUÁ TRÌNH CÔNG TÁC')) {
                result.workExperience = section.replace('QUÁ TRÌNH CÔNG TÁC', '').trim();
            } else if (section.startsWith('QUÁ TRÌNH HỌC TẬP')) {
                result.education = section.replace('QUÁ TRÌNH HỌC TẬP', '').trim();
            }
        });
    
        return result;
    }
    

    const renderBio = (content) => {

        const displayedContent = (content || '').split('\n').map((exp, index) => {
            return (
                <p key={index} style={{ marginLeft: '20px' }}>
                    + {exp}
                </p>
            );
        });
    
        return displayedContent;
    };
    
    
    const handleBooking = () => {
        setSharedData(docInfo);
        navigate('/appointment');
    }

    if (loadingAccount || !docInfo) return (
        <LoadingAnimation></LoadingAnimation>
    )


    return docInfo && (
        <div>
            <PageTitle>THÔNG TIN BÁC SĨ</PageTitle>
            <DocInfoLayout>
                <DocInfoLeft>
                    <Image className='image-background' src={docInfo?.profile_image} alt='pic'/>
                </DocInfoLeft>
                <DocInfoRight>
                    <DocName>
                        {docInfo?.username}
                    </DocName>
                    <DocSD>
                    {docInfo?.speciality_id ? (
                        <p>{docInfo?.speciality_id?.name || 'Chưa xác định'}</p>
                    ) : (
                        <p>Chưa xác định</p>
                    )}
                    </DocSD>
                    <DocBookButton onClick={handleBooking}>
                        Đặt lịch khám
                    </DocBookButton>


                </DocInfoRight>

            </DocInfoLayout>
            <DoctorInformation>

                <DoctorInformationItem>
                    <DocHeader>GIỚI THIỆU</DocHeader>
                    <Underline/>
                    <p>{doctorBio.introduction || 'Chưa có thông tin'}</p>
                </DoctorInformationItem>

                <DoctorInformationItem>
                    <DocHeader>QUÁ TRÌNH CÔNG TÁC</DocHeader>
                    <Underline/>
                    <p>{renderBio(doctorBio.workExperience || '')}</p>
                </DoctorInformationItem>

                <DoctorInformationItem>
                    <DocHeader>QUÁ TRÌNH HỌC TẬP</DocHeader>
                    <Underline/>
                    <p>{renderBio(doctorBio.education || '')}</p>
                </DoctorInformationItem>


            </DoctorInformation>

            <DoctorRelate>
                <DocInfoHeader>BÁC SĨ CÙNG CHUYÊN KHOA
                    <HeaderUnderline/>
                </DocInfoHeader>

                {/*{-----------LISTING RELATED DOCTORS-------------}*/}
                <RelatedDoctorItem>
                    <RelatedDoctors docId={docId} speciality={docInfo?.speciality_id?.name}/>
                </RelatedDoctorItem>

            </DoctorRelate>

        </div>
    );
};

export default DocInfo;
