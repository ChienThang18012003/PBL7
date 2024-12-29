import React, {useContext, useEffect, useState} from 'react';
import {
    HeaderUnderline, PageInput, PaginationButton, PaginationContainer, PaginationInfo,
    SearchBar,
    SpecialitiesContainer,
    SpecialitiesContent,
    SpecialitiesHeader,
    SpecialitiesLayout
} from "./specialities.element";
import {assets} from "../../assets/assets_fe/assets";
import {AppContext} from "../../context/AppContext";
import {useNavigate, useParams} from "react-router-dom";
import {
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";
import useSpeciality from '../../hook/useSpeciality';
import useDebounce from '../../hook/useDebounce';
import LoadingAnimation from '../../components/LoadingAnimation';
import Image from '../../components/Image';

const Specialities = () => {
    const navigate = useNavigate();
    const {speciality} = useParams();
    const [specialityLoading, specialityHook, , searchSpeciality, getAllSpeciality] = useSpeciality();
    const [filterSpec, setFilterSpec] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const debounced = useDebounce(searchValue, 500);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 12,
    });

    const applyFilter = () => {
        if (speciality) {
            setFilterSpec(specialityHook.filter(doctor => doctor.speciality === speciality));
        } else {
            setFilterSpec(specialityHook);
        }
    };

    useEffect(() => {
        if (!debounced.trim()){
            setFilterSpec(specialityHook);
            return;
        }

        const fetchSearchResult = async () => {
            const relatedSpecialities = await searchSpeciality(debounced, specialityHook);
            setFilterSpec(relatedSpecialities);
        };

        fetchSearchResult();
    }, [debounced])

    useEffect(() => {
        applyFilter();
        const fetchSpecialitiesPeriodically = async () => {
            const specialities = await getAllSpeciality();
            if (specialities && Array.isArray(specialities)) setFilterSpec(specialities);
        };

        const intervalId = setInterval(() => {
            fetchSpecialitiesPeriodically();
        }, 8000);

        return () => {
            clearInterval(intervalId);
        };
    }, [specialityHook]);

    const table = useReactTable({
        data: filterSpec,
        state: {
            pagination,
        },
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    });

    const paginatedData = filterSpec.slice(
        pagination.pageIndex * pagination.pageSize,
        (pagination.pageIndex + 1) * pagination.pageSize
    );

    if (specialityLoading) return (
        <LoadingAnimation></LoadingAnimation>
    )

    return (
        <SpecialitiesLayout>
            <SpecialitiesContainer>
                <SpecialitiesHeader>DANH SÁCH CHUYÊN KHOA
                    <HeaderUnderline/>
                </SpecialitiesHeader>
                <SearchBar>
                    <img src={assets.search_icon} alt='icon'/>
                    <input type='text' placeholder='Tìm kiếm' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
                </SearchBar>

                <SpecialitiesContent >
                    {
                        paginatedData.map((item, index) => (
                            <div onClick={() => navigate(`/speciality-info/${item?._id}`)} className='card-spec' key={index}>
                                <div className='content'>
                                    <div className='image-wrapper'><Image className='speciality-img' src={item?.speciality_image} alt={item?.speciality}/></div>
                                    <p className='name-style'>{item?.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </SpecialitiesContent>

                <PaginationContainer>
                    <PaginationButton
                        onClick={() => setPagination(prev => ({
                            ...prev,
                            pageIndex: Math.max(prev.pageIndex - 1, 0)}))}
                        disabled={pagination.pageIndex === 0}
                    >
                        Previous
                    </PaginationButton>
                    <PaginationInfo>
                        Page <strong>{pagination.pageIndex + 1} of {Math.ceil(filterSpec.length / pagination.pageSize)}</strong>
                    </PaginationInfo>
                    <PaginationButton
                        onClick={() => setPagination(prev => ({
                            ...prev,
                            pageIndex: Math.min(prev.pageIndex + 1, Math.ceil(filterSpec.length / pagination.pageSize) - 1)
                        }))}
                        disabled={(pagination.pageIndex + 1) * pagination.pageSize >= filterSpec.length}
                    >
                        Next
                    </PaginationButton>
                    <PaginationInfo>
                        Go to page:
                        <PageInput
                            type="number"
                            defaultValue={table.getState().pagination.pageIndex + 1}
                            onChange={(e) => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                table.setPageIndex(page);
                            }}
                        />
                    </PaginationInfo>
                </PaginationContainer>
            </SpecialitiesContainer>
        </SpecialitiesLayout>
    );
};

export default Specialities;
