import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
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
import {AppContext} from "../../context/AppContext";
import {assets} from "../../assets/assets_fe/assets";
import RelatedDoctors from "../../components/RelatedDoctors/RelatedDoctors";
import useAccount from '../../hook/useAccount';

const DocInfo = () => {
    const [checkLogin, signUp, loadingAccount, doctorsHook, getAccountByID] = useAccount();
    const {docId} = useParams();
    const [docInfo, setDocInfo] = useState(null);
    const {doctors} = useContext(AppContext);
    const [doctorBio, setDoctorBio] = useState({});
    useEffect(() => {
        const fetchDoctor = async () => {
            const doctor = await getAccountByID(docId);
            console.log("Doctor info: ",doctor);
            setDocInfo(doctor);
            // Kiểm tra nếu doctor.bio tồn tại thì mới gọi splitText
            if (doctor && doctor.bio) {
            setDoctorBio(splitText(doctor.bio));
            }
        };

        fetchDoctor();
    }, [docId, getAccountByID]);

    function splitText(text) {
        // Tách văn bản theo tiêu đề của từng đoạn
        const sections = text.split(/(?=GIỚI THIỆU|QUÁ TRÌNH CÔNG TÁC|QUÁ TRÌNH HỌC TẬP)/g);
        
        // Khởi tạo đối tượng chứa các đoạn văn tách ra
        const result = {
            introduction: '',
            workExperience: '',
            education: ''
        };
    
        // Lặp qua các đoạn và gán nội dung vào các phần tương ứng
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
        // Tách văn bản theo dấu "–"
        const displayedContent = content.split('\n').map((exp, index) => {
            return (
                <p key={index} style={{ marginLeft: '20px' }}>
                    + {exp}
                </p>
            );
        });
    
        return displayedContent;
    };
    


    return docInfo && (
        <div>
            <DocInfoLayout>
                <DocInfoLeft>
                    <img className='image-background' src={`data:image/jpeg;base64,${docInfo.profile_image}`} alt='pic'/>
                </DocInfoLeft>
                <DocInfoRight>
                    <DocName>
                        {docInfo.username}
                        <img className='w-5' src={assets.verified_icon} alt='icon'/>
                    </DocName>
                    <DocSD>
                        <p> {docInfo.speciality_id.name} </p>
                    </DocSD>
                    <DocBookButton>
                        Đặt lịch khám
                    </DocBookButton>


                </DocInfoRight>

            </DocInfoLayout>
            <DoctorInformation>

                <DoctorInformationItem>
                    <DocHeader>GIỚI THIỆU</DocHeader>
                    <Underline/>
                    <p>{doctorBio.introduction}</p>

                </DoctorInformationItem>
                <DoctorInformationItem>
                    <DocHeader>QUÁ TRÌNH CÔNG TÁC</DocHeader>
                    <Underline/>
                    <p>{renderBio(doctorBio.workExperience)}</p>
                </DoctorInformationItem>
                <DoctorInformationItem>
                    <DocHeader>QUÁ TRÌNH HỌC TẬP</DocHeader>
                    <Underline/>
                    <p>{renderBio(doctorBio.education)}</p>
                </DoctorInformationItem>

            </DoctorInformation>

            <DoctorRelate>
                <DocInfoHeader>BÁC SĨ CÙNG CHUYÊN KHOA
                    <HeaderUnderline/>
                </DocInfoHeader>

                {/*{-----------LISTING RELATED DOCTORS-------------}*/}
                <RelatedDoctorItem>
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality_id.name}/>
                </RelatedDoctorItem>

            </DoctorRelate>

        </div>
    );
};

export default DocInfo;
