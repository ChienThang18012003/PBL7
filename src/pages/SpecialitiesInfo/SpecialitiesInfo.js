import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AppContext} from "../../context/AppContext";
import {
    SIBiggerContainer, SIBottom,
    SIHeader, SIInfo,
    SIInfoLeft, SIInfoRight, SIInfoRightBottom, SIInfoRightTop,
    SILayout, SIMiddle, SIMiddleBottom, SIMiddleTop, SITop
} from "./specialitiesinfo.element";

const SpecialitiesInfo = () => {
    const {id} = useParams();
    const {specialityData} = useContext(AppContext);
    const [specInfo, setSpecInfo] = useState(null);


    const fetchData = async () => {
        const specInfo = specialityData.find(doc => doc?._id === id);
        setSpecInfo(specInfo)
    }
    useEffect(() => {
        fetchData()
    }, [specialityData, id]);


    return (
        <SILayout>
            <SIBiggerContainer>

                <SITop>

                    <SIHeader>
                        {specInfo?.speciality}
                        {/*<HeaderUnderline/>*/}
                    </SIHeader>

                </SITop>
                <SIMiddle>

                    <SIInfo>

                        <SIInfoLeft>
                            <img src={specInfo?.image} alt={specInfo?.speciality}/>
                        </SIInfoLeft>

                        <SIInfoRight>


                        </SIInfoRight>
                    </SIInfo>
                    <SIMiddleTop>
                        <SIInfoRightTop>
                            <p className='header-top'>GIỚI THIỆU</p>
                            <p className='content-top'>
                                {specInfo?.description}
                            </p>

                        </SIInfoRightTop>


                    </SIMiddleTop>


                    <SIMiddleBottom>

                        <SIInfoRightBottom>

                            <p className='header-bottom'>HOẠT ĐỘNG CHUYÊN MÔN</p>
                            <p className='content-top'>
                                {specInfo?.description}
                            </p>

                        </SIInfoRightBottom>
                    </SIMiddleBottom>


                </SIMiddle>

                <SIBottom>

                </SIBottom>

                {/*<SIContainer>*/}

                {/*</SIContainer>*/}
            </SIBiggerContainer>

        </SILayout>
    );
};

export default SpecialitiesInfo;
