import React, {useContext, useEffect, useState} from 'react';
import {
    HeaderUnderline, PageInput, PageSelect, PaginationButton, PaginationContainer, PaginationInfo,
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

const Specialities = () => {
    const navigate = useNavigate();
    const {speciality} = useParams();
    const {specialityData} = useContext(AppContext);
    const [specialityLoading, specialityHook, getSpecialityByID, searchSpeciality] = useSpeciality();
    const [filterSpec, setFilterSpec] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const debounced = useDebounce(searchValue, 500);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
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
    }, [specialityHook, speciality]);

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

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    return (
        <SpecialitiesLayout>
            <SpecialitiesContainer>
                <SpecialitiesHeader>DANH SÁCH CHUYÊN KHOA
                    <HeaderUnderline/>
                </SpecialitiesHeader>
                <SearchBar>
                    <img src={assets.search_icon} alt='icon'/>
                    <input type='text' placeholder='Tìm kiếm chuyên khoa' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
                </SearchBar>

                <SpecialitiesContent >
                    {
                        paginatedData.map((item, index) => (
                            <div onClick={() => navigate(`/speciality-info/${item._id}`)} className='card-spec' key={index}>
                                <div className='content'>
                                    <img className='speciality-img' src={`data:image/jpeg;base64,${arrayBufferToBase64(item.speciality_image.data)}`} alt={item.speciality}/>
                                    <p className='name-style'>{item.name}</p>
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
                    {/*/!* Page Size Selector *!/*/}
                    {/*<PageSelect*/}
                    {/*    value={pagination.pageSize}*/}
                    {/*    onChange={(e) => setPagination(prev => ({*/}
                    {/*        ...prev,*/}
                    {/*        pageSize: Number(e.target.value),*/}
                    {/*        pageIndex: 0*/}
                    {/*    }))}*/}
                    {/*>*/}
                    {/*    {[5, 10, 15, 20].map(size => (*/}
                    {/*        <option key={size} value={size}>*/}
                    {/*            Show {size}*/}
                    {/*        </option>*/}
                    {/*    ))}*/}
                    {/*</PageSelect>*/}


                </PaginationContainer>
            </SpecialitiesContainer>
        </SpecialitiesLayout>
    );
};

export default Specialities;
